import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./Screens/AllPlaces";
import AddPlace from "./Screens/AddPlace";
import IconButton from "./Components/ui/IconButton";
import { Colors } from "./constants/Colors";
import Map from "./Screens/Map";
import { useCallback, useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./Screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const [isDbInitialized, setIsDbInitialized] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (isDbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [isDbInitialized]);

  useEffect(() => {
    init()
      .then(() => {
        setIsDbInitialized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!isDbInitialized) {
    return;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: Colors.gray700 },
          headerTintColor: Colors.gray700,
          headerStyle: { backgroundColor: Colors.primary500 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <IconButton
                title="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate("AddPlaces")}
              ></IconButton>
            ),

            title: "All Places",
          })}
        ></Stack.Screen>
        <Stack.Screen
          name="AddPlaces"
          component={AddPlace}
          options={{ title: "Add New Place" }}
        ></Stack.Screen>
        <Stack.Screen
          name="MapView"
          component={Map}
          options={{ title: "Map View" }}
        ></Stack.Screen>
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{ title: "Loading..." }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
