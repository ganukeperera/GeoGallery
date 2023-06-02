//Video 202
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { Colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import OutlineButton from "../ui/OutlineButton";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getMapPreview } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

export default function LocationPicker() {
  const [location, setLocation] = useState();
  const [locationInfo, requestPermission] = useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocussed = useIsFocused;

  useEffect(() => {
    if (isFocussed && route.params) {
      const mapPickedLocation = route.params.selectedLocation;
      console.log("psrsms  " + mapPickedLocation.toString);
      setLocation(mapPickedLocation);
    }
  }, [isFocussed, route]);

  async function veryfyPermission() {
    if (locationInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted; //Boolean
    }
    if (locationInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant Location permission to use the app"
      );
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermsission = await veryfyPermission();

    if (!hasPermsission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }
  function pickLocationFromHandler() {
    navigation.navigate("MapView");
  }
  let imageContent = (
    <Text style={styles.text}>No Location Data Available Yet</Text>
  );
  if (location) {
    imageContent = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(location.lat, location.long) }}
      ></Image>
    );
  }
  return (
    <View>
      <View style={styles.previewContainer}>{imageContent}</View>
      <View style={styles.buttonContainer}>
        <OutlineButton
          name="location"
          color={Colors.primary500}
          size={18}
          onPress={getLocationHandler}
        >
          Locate User
        </OutlineButton>
        <OutlineButton
          name="map"
          color={Colors.primary500}
          size={18}
          onPress={pickLocationFromHandler}
        >
          Pick on Map
        </OutlineButton>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
