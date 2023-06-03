import { useEffect, useState } from "react";
import PlaceList from "../Components/Places/PlaceList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);
  const isFocussed = useIsFocused();
  useEffect(() => {
    async function getData() {
      const places = await fetchPlaces();
      if (isFocussed) {
        setPlaces(places);
      }
    }
    getData();
  }, [route]);
  return <PlaceList places={places}></PlaceList>;
}
