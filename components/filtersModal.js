import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

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
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const CustomBackdrop = ({animatedIndex, style}) => {
    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay  
    ]
return(
    <View style={containerStyle}>

    </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});

export default FiltersModal;
