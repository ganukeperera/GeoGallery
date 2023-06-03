import { useCallback, useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../Models/Place";

export default function PlaceForm({ onSelectPlaceData }) {
  const [titleText, setTitleText] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  function titleInputHandler(inputText) {
    setTitleText(inputText);
  }

  function pickedImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickedLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  function savePlaceHandler() {
    const place = new Place(
      titleText,
      selectedImage,
      selectedLocation.address,
      { lat: selectedLocation.lat, long: selectedLocation.long }
    );
    onSelectPlaceData(place);
  }

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.text}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={titleInputHandler}
        value={titleText}
      ></TextInput>
      <ImagePicker onImagePicked={pickedImageHandler}></ImagePicker>
      <LocationPicker onLocationPicked={pickedLocationHandler}></LocationPicker>
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    margin: 24,
  },
  text: {
    color: Colors.primary500,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    backgroundColor: Colors.primary100,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});
