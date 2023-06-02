import { Pressable, View, Image } from "react-native";

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable onPress={onSelect}>
      <View>
        <View>
          <Image source={{ uri: place.imageUri }}></Image>
        </View>
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </View>
    </Pressable>
  );
}
