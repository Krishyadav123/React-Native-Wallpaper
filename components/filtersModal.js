import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BlurView } from "expo-blur";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { capitalize, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import { ColorFilter, CommonFilterRows, SectionView } from "./filterViews";
import { data } from "../constants/data";

export const FilterModal = ({ modalRef, onClose, onApply, onReset, filters, setFilters }) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
      // onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let sectionView = sections[sectionName];
            const sectionData = data.filters?.[sectionName] || [];
            let title = capitalize(sectionName);
            return (
              <Animated.View
              entering={FadeInDown.delay((index * 100)+100).springify().damping(11)}
               key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({
                    data: sectionData,
                     filters,
                     setFilters,
                     filterName: sectionName
                  })}
                />
              </Animated.View>
            );
          })}

          {/* Actions */}
          <Animated.View
          entering={FadeInDown.delay(500).springify().damping(11)}
          style={styles.button}>
            <Pressable onPress={onReset} style={styles.resetButton}>
              <Text style={[styles.ButtonText, { color: theme.colors.neutal(0.9)}]}>Reset</Text>
            </Pressable>
            <Pressable onPress={onApply} style={styles.applayButton}>
              <Text style={[styles.ButtonText, { color: theme.colors.white}]}>Apply</Text>
            </Pressable>
          </Animated.View>

        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  "order": (props) => <CommonFilterRows {...props} />,
  "orientation": (props) => <CommonFilterRows {...props} />,
  "type": (props) => <CommonFilterRows {...props} />,
  "colors": (props) => <ColorFilter {...props} />,
};

const CustomBackdrop = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];
  return (
    <Animated.View style={containerStyle}>
      {/* blur view */}
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 24,
  //   justifyContent: "center",
  //   backgroundColor: "grey",
  // },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    width: "100%",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.neutal(0.9),
    marginBottom: 5,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  applayButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    // backgroundColor: t,
    borderRadius: 14,
    backgroundColor: theme.colors.neutal(0.8),
    borderCurve: "continuous",
  },
  resetButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    // backgroundColor: t,
    borderRadius: 14,
    backgroundColor: theme.colors.neutal(0.03),
    borderCurve: "continuous",
    borderWidth: 2,
    borderColor: theme.colors.grayBG
  },
  ButtonText: {
    fontSize: hp(2.2),
    // fontWeight: theme.fontWeights.semiBold,
  },
});


