import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export default function Button({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary800,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    margin: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary50,
  },
});
