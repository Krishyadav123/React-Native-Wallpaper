import { StyleSheet, Text, View } from "react-native";
import { hp } from "../helpers/common";
import { theme } from "../constants/theme";

export const SectionView = ({ title, content }) => {
  return (
    <View style={styles.sectionContainer} >
      <Text style={styles.SectionTitle}>{title}</Text>
      <View>
        {content}
      </View>
    </View>
  );
};

export const CommonFilterRows = ({ title }) => {
  return (
    <View>
      <Text>Order View</Text>
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
   }
});
