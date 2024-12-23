import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Categories from "../../components/categories";
import { apiCall } from "../../api";
import ImagesGrid from "../../components/imagesGrid";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState(null);
  const searchInputRef = React.useRef(null);
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    fetchImages();
  }, [search]);

  const fetchImages = async (params={page: 1}, append=true) => {
        let res = await apiCall(params);
        // console.log("got result: ", res.data?.hits[0]);
        if(res.success && res.data?.hits) {
            if(append) {
                setImages([...images, ...res.data.hits])
            }
            else{
                setImages(res.data.hits)
            }
        }
  }

  const handleChangeCategory = (cat) => {
      setActiveCategory(cat);
  }

  console.log("activeCategory", activeCategory);
  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Pixels</Text>
        </Pressable>
        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutal(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        {/* search bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={24} color={theme.colors.neutal(0.4)} />
          </View>
          <TextInput
            placeholder="Search for photos..."
            style={styles.searchInput}
            value={search}
            ref={searchInputRef}
            onChangeText={value => setSearch(value)}
          />
          {
            search && (
              <Pressable style={styles.closeIcon} onPress={() => setSearch('')}>
                <Ionicons name="close" size={24} color={theme.colors.neutal(0.6)} />
              </Pressable>
            )
          }
        </View>

        {/* categories */}
        <View style={styles.categories}>
          <Categories activeCategory={activeCategory} 
          handleChangeCategory={handleChangeCategory}
          />
        </View>

        {/* images masonry grid */}
          <View>
            {
              images.length > 0 && <ImagesGrid images={images} />
            }
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semiBold,
    color: theme.colors.neutal(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: theme.colors.grayBG,
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: 16,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutal(0.1),
    padding: 8,
    borderRadius: 12,
  },
});

export default HomeScreen;
