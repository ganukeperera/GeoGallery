import { FlatList, View, Text, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function PlaceList({ places }) {
  const navigation = useNavigation();
  function placeSelctionHandler(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallBackText}>No Items. Please add</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      renderItem={(itemData) => (
        <PlaceItem
          place={itemData.item}
          onSelect={placeSelctionHandler}
        ></PlaceItem>
      )}
      keyExtractor={(item) => item.id}
      style={styles.list}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
