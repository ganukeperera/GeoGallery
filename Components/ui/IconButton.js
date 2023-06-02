import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ title, color, size, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.PressableNormal, styles.pressablePressed]
          : styles.PressableNormal
      }
    >
      <Ionicons name={title} color={color} size={size}></Ionicons>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  PressableNormal: {
    justifyContent: "center",
    alignItems: "center",
  },
  pressablePressed: {
    opacity: 0.5,
  },
});
