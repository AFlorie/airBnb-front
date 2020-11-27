import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import * as Location from "expo-location";
import MapView from "react-native-maps";

const width = Dimensions.get("window").width;

export default function Roomscreen({ route }) {
  const id = route.params.id;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  //  console.log(data);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#EB5A62"
          style={{ marginTop: 50 }}
        />
      ) : (
        <ScrollView>
          <View style={styles.photo}>
            <Image
              style={styles.photo}
              source={{
                uri: `${data.photos[0].url}`,
              }}
            />
            <View style={styles.price}>
              <Text style={styles.priceText}>{data.price} €</Text>
            </View>
          </View>

          <View style={styles.info}>
            <View>
              <Text numberOfLines={1} style={styles.description}>
                {data.title}
              </Text>

              <View style={styles.rating}>
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 1 ? "#FFB206" : "#BBBBBB"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 2 ? "#FFB206" : "#BBBBBB"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 3 ? "#FFB206" : "#BBBBBB"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 4 ? "#FFB206" : "#BBBBBB"}
                />
                <Entypo
                  name="star"
                  size={20}
                  color={data.ratingValue >= 5 ? "#FFB206" : "#BBBBBB"}
                />
                <Text style={{ color: "#C2C2C2", marginLeft: 2 }}>
                  {data.reviews} reviews
                </Text>
              </View>
            </View>
            <Image
              style={styles.userProfil}
              source={{
                uri: `${data.user.account.photo.url}`,
              }}
            ></Image>
          </View>
          <View style={styles.hr}></View>
          <Text style={styles.description2} numberOfLines={5}>
            {data.description}
          </Text>

          <MapView
            style={styles.map}
            initialRegion={{
              latitude: data.location[1],
              longitude: data.location[0],
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            showsUserLocation={true}
          >
            <MapView.Marker
              coordinate={{
                longitude: data.location[0],
                latitude: data.location[1],
              }}
            />
          </MapView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    paddingRight: 40,
    fontSize: 18,
  },
  photo: {
    position: "relative",
    height: 180,
    width: 370,
    alignSelf: "center",
    marginBottom: 10,
  },
  price: {
    position: "absolute",
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: 100,
    height: 50,
  },
  priceText: {
    color: "white",
    fontSize: 20,
  },
  userProfil: {
    height: 70,
    width: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 17,
  },
  rating: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  hr: {
    borderBottomColor: "#C0C0C0",
    borderWidth: 1,
    marginBottom: 20,
    opacity: 0.2,
  },
  description2: {
    lineHeight: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    paddingRight: 5,
  },
  map: {
    height: 300,
    width: width,
  },
});
