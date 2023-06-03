import PlaceForm from "../Components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  async function placeDataHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onSelectPlaceData={placeDataHandler}></PlaceForm>;
}
