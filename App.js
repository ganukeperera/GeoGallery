import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./Screens/AllPlaces";
import AddPlace from "./Screens/AddPlace";
import IconButton from "./Components/ui/IconButton";
import { Colors } from "./constants/Colors";
import Map from "./Screens/Map";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
