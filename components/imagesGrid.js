import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from '@shopify/flash-list'
import ImageCard from './imageCard'
import { getColumnCount, wp } from '../helpers/common'

const ImagesGrid = ({images, router}) => {

  const columsn = getColumnCount();
  return (
    <View style={styles.container}>
     <MasonryFlashList
        data={images}
        numColumns={columsn}
        initialNumToRender={1000}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
         <ImageCard item={item} router={router} columsn={columsn} index={index} />
        )}
        estimatedItemSize={200}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 3,
        width: wp(100)
    },
    listContainerStyle: {
        paddingHorizontal: wp(4)
    }
})  

export default ImagesGrid
