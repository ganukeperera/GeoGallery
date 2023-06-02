import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
  const [titleText, setTitleText] = useState("");

  function titleInputHandler(inputText) {
    setTitleText(inputText);
  }

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.text}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={titleInputHandler}
        value={titleText}
      ></TextInput>
      <ImagePicker></ImagePicker>
      <LocationPicker></LocationPicker>
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
