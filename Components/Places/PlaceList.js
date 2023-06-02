import { FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";

export default function PlaceList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View>
        <Text>No Items. Please add</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      renderItem={(itemData) => <PlaceItem place={itemData.item}></PlaceItem>}
      keyExtractor={(item) => item.id}
    ></FlatList>
  );
}
