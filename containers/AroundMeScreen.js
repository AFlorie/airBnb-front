import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AroundMeScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState("denied");
  let locateUser = "";

  if (permission === "granted") {
    locateUser = `?latitude=${latitude}&longitude=${longitude}`;
  }
  //console.log(latitude, longitude);
  //console.log(locateUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around${locateUser}`
        );
        //  console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const askLocation = async () => {
      const response = await Location.requestPermissionsAsync();
      // console.log(response.status);

      if (response.status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setPermission("granted");
      } else {
        console.log("Permission refusée");
        setPermission("denied");
      }
    };

    askLocation();
  }, []);
  //console.log(data);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#EB5A62"
          style={{ marginTop: 50 }}
        />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          {data.map((item, index) => {
            // console.log(item.location);
            return (
              <MapView.Marker
                key={item._id}
                coordinate={{
                  longitude: item.location[0],
                  latitude: item.location[1],
                }}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    height: height,
    width: width,
  },
});
