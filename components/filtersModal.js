import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { BlurView } from "expo-blur";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { capitalize, hp } from "../helpers/common";
import { theme } from "../constants/theme";
import SectionView, { CommonFilterRows } from "./filterViews";
import { data } from "../constants/data";

const FiltersModal = ({ modalRef }) => {
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
          {
            Object.keys(sections).map((sectionName, index) => {
              let sectionView = sections[sectionName];
              let sectionData = data
              let title = capitalize(sectionName);
              return (
                <View key={sectionName} >
                  <SectionView title={title} 
                  content={sectionView({data: sectionData})}
                  />
                </View>
              )
            })
          }
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  "order": (props) => <CommonFilterRows {...props} />,
  "orientation": (props) => <CommonFilterRows {...props} />,
  "type": (props) => <CommonFilterRows {...props} />,
  "colors": (props) => <CommonFilterRows {...props} />,
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
});

export default FiltersModal;
