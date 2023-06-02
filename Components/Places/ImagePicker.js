import { Alert, View, StyleSheet, Image, Text } from "react-native";
import OutlineButton from "../ui/OutlineButton";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/Colors";

export default function ImagePicker() {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState();
  async function veryfyPermission() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted; //Boolean
    }
    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use the app"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermsission = await veryfyPermission();

    if (!hasPermsission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImageUri(image.assets[0].uri);
  }
  let imageContent = <Text style={styles.text}>No Image Available</Text>;
  if (imageUri) {
    imageContent = (
      <Image style={styles.image} source={{ uri: imageUri }}></Image>
    );
  }
  return (
    <View>
      <View style={styles.previewContainer}>{imageContent}</View>
      <OutlineButton
        name="camera"
        color={Colors.primary500}
        size={18}
        onPress={takeImageHandler}
      >
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    width: "100%",
    height: 200,
    alignItems: "center",
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: Colors.primary700,
    textAlign: "center",
  },
});
