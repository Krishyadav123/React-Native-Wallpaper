import { Pressable, StyleSheet, Text, View } from "react-native";
import { capitalize, hp } from "../helpers/common";
import { theme } from "../constants/theme";

export const SectionView = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.SectionTitle}>{title}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommonFilterRows = ({ data, filterName, filters, setFilters }) => {

  const onSelect = (item) => {
    setFilters({...filters, [filterName]: item})
  }

  return (
    <View style={styles.flexRowWrap}>
      {
          data && data.map((item, index) => {
            let isActive = filters && filters[filterName] == item;
            let backgroundColor = isActive ? theme.colors.neutal(0.7) : theme.colors.white;
            let color = isActive ? theme.colors.white : theme.colors.neutal(0.7);
              return (
                <Pressable
                onPress={() => onSelect(item)}
                key={item}
                style={[styles.outlinedButton, { backgroundColor }]}
                >
                  <Text
                  style={[styles.outlinedButtonText, { color }]}
                  >{capitalize(item)}</Text>
                </Pressable>
              )
          })
      }
    </View>
  );
};

export const ColorFilter = ({ data, filterName, filters, setFilters }) => {

  const onSelect = (item) => {
    setFilters({...filters, [filterName]: item})
  }

  return (
    <View style={styles.flexRowWrap}>
      {
          data && data.map((item, index) => {
            let isActive = filters && filters[filterName] == item;
            let borderColor = isActive ? theme.colors.neutal(0.4) : theme.colors.white;
              return (
                <Pressable
                onPress={() => onSelect(item)}
                key={item}
                >
                  <View style={[styles.colorWrapper , { borderColor }]}>
                    <View style={[styles.color, { backgroundColor: item }]} />
                  </View>
                </Pressable>
              )
          })
      }
    </View>
  );
};

const styles = StyleSheet.create({
   sectionContainer: {
      gap: 8
   },
   SectionTitle: {
      fontSize: hp(4),
      fontWeight: theme.fontWeights.semiBold,
      color: theme.colors.neutal(0.8),
   },
   flexRowWrap: {
     gap: 10,
      flexDirection: "row",
      flexWrap: "wrap",
   },
   outlinedButton: {
      padding: 8,
      paddingHorizontal: 14,
      borderWidth: 1,
      borderColor: theme.colors.grayBG,
      borderRadius: 10,
      borderCurve: "continuous",
   },
   color: {
     width: 40,
     height: 30,
     borderRadius: 10,
     borderCurve: "continuous",
    },
    colorWrapper: {
       padding: 3,
       borderRadius: 10,
       borderWidth: 2,
       borderCurve: "continuous",
    },
  //  outlinedButtonText: {
  //     fontSize: hp(1.8),
  //     fontWeight: theme.fontWeights.medium,
  //  },
});
