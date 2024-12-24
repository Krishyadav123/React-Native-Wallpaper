import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { getImageSize, wp } from '../helpers/common'
import { theme } from '../constants/theme'

const ImageCard = ({item, index, columns}) => {

    const isLastInRow = () => {
        return (index + 1) % columns === 0
    }

    const getImageHeight = () => {
        let {imageHeight: height, imageWidth: width} = item;
        return {height: getImageSize(height, width)}
    }
  return (
    <Pressable style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}>
        <Image
       style={[styles.Image, getImageHeight()]}
        source={item?.webformatURL} 
        transition={100}
        />
      {/* <Image style={styles.Image} source={{uri: item?.webformatURL}} /> */}
    </Pressable>
  )
}

const styles = StyleSheet.create({
    Image: {
        width: "100%",
        height: 300
    },
    imageWrapper: {
        backgroundColor: theme.colors.grayBG,
        borderRadius: 18,
        borderCurve: "continuous",
        overflow: "hidden",
        marginBottom: wp(2)
    },
    spacing: {
        marginRight: wp(2)
    }
})

export default ImageCard