const GOOGLE_API_KEY = "AIzaSyBtX_LOXWwl_PBvrTu40H1Q_tlqk-zjwSQ";

export function getMapPreview(lat, long) {
  const imagePreviewURL =
    "https://maps.googleapis.com/maps/api/staticmap?center=" +
    lat +
    "," +
    long +
    "&zoom=13&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C" +
    lat +
    "," +
    long +
    "&key=" +
    GOOGLE_API_KEY;
  return imagePreviewURL;
}

export async function getAddress(lat, long) {
  const url =
    "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
    lat +
    "," +
    long +
    "&key=" +
    GOOGLE_API_KEY;
  console.log(url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch the address!");
  }
  const data = await response.json();
  return data.results[0].formatted_address;
}
