import { useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert } from "react-native";
import IconButton from "../Components/ui/IconButton";

export default function Map({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.lat,
    long: route.params.long,
  };
  console.log(initialLocation);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          title="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [navigation, savePickedLocation]);

  const region = {
    latitude: selectedLocation ? selectedLocation.lat : 37.78,
    longitude: selectedLocation ? selectedLocation.long : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const loc = {
      lat: event.nativeEvent.coordinate.latitude,
      long: event.nativeEvent.coordinate.longitude,
    };
    setSelectedLocation(loc);
  }
  function savePickedLocation() {
    if (!selectedLocation) {
      Alert.alert("Location not set!", "Please select a location to proceed");
      return;
    }
    navigation.navigate("AddPlaces", { selectedLocation });
  }
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Selected Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.long,
          }}
        ></Marker>
      )}
    </MapView>
  );
}
