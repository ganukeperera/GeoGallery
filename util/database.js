import * as SQLite from "expo-sqlite";
import { Place } from "../Models/Place";
const database = SQLite.openDatabase("places.db"); //Creates new DB if not exist

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places(\
            id INTEGER PRIMARY KEY NOT NULL, \
            title TEXT NOT NULL, \
            imageUri TEXT NOT NULL, \
            address TEXT NOT NULL, \
            lat REAL NOT NULL, \
            lng REAL NOT NULL)",
        [],
        () => {
          //success callback
          resolve();
        },
        (_, error) => {
          //Error Callback
          console.log("failed");
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "insert into places (title, imageUri, address, lat, lng) values (?, ?, ?, ?, ?)",
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.long,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places",
        [],
        (_, result) => {
          const places = [];

          for (const dp of result.rows._array) {
            const place = new Place(
              dp.title,
              dp.imageUri,
              dp.address,
              {
                lat: dp.lat,
                long: dp.lng,
              },
              dp.id
            );
            places.push(place);
          }
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM places WHERE id = ?",
        [id],
        (_, result) => {
          const dp = result.rows._array[0];
          console.log(dp.address);
          const place = new Place(
            dp.title,
            dp.imageUri,
            dp.address,
            {
              lat: dp.lat,
              long: dp.lng,
            },
            dp.id
          );
          resolve(place);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
