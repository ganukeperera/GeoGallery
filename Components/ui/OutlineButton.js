import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import {loc} from "expo-location"

export default function OutlineButton({
  children,
  name,
  size,
  color,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonNormal,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons name={name} size={size} color={color}></Ionicons>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonNormal: {
    borderColor: Colors.primary500,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: Colors.primary500,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});
