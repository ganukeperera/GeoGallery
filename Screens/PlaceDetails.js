import { ScrollView, Image, View, Text, StyleSheet } from "react-native";
import OutlineButton from "../Components/ui/OutlineButton";
import { Colors } from "../constants/Colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({ navigation, route }) {
  function viewOnMapHandler() {
    navigation.navigate("MapView", {
      lat: selectedPlace.location.lat,
      long: selectedPlace.location.long,
    });
  }

  const selectedPlaceId = route.params.placeId;
  const [selectedPlace, setSelectedPlace] = useState();

  useEffect(() => {
    async function fetchData() {
      if (selectedPlaceId) {
        const place = await fetchPlaceDetails(selectedPlaceId);
        setSelectedPlace(place);
        navigation.setOptions({ title: place.title });
      }
    }

    fetchData();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return (
      <View style={styles.fallbackView}>
        <Text style={styles.address}>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: selectedPlace.imageUri }}
      ></Image>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlineButton
          name="map"
          size={18}
          color={Colors.primary50}
          onPress={viewOnMapHandler}
        >
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallbackView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
