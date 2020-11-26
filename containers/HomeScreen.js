import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({});

  //console.log(navigation);
  //console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        //console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          // console.log(item);
          //console.log(item.ratingValue);
          //console.log(item.reviews);

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <View>
                <View style={styles.photo}>
                  <Image
                    style={styles.photo}
                    source={{
                      uri: `${item.photos[0].url}`,
                    }}
                  />
                  <View style={styles.price}>
                    <Text style={styles.priceText}>{item.price} €</Text>
                  </View>
                </View>

                <View style={styles.info}>
                  <View>
                    <Text numberOfLines={1} style={styles.description}>
                      {item.title}
                    </Text>

                    <View style={styles.rating}>
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 1 ? "#FFB206" : "#BBBBBB"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 2 ? "#FFB206" : "#BBBBBB"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 3 ? "#FFB206" : "#BBBBBB"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 4 ? "#FFB206" : "#BBBBBB"}
                      />
                      <Entypo
                        name="star"
                        size={20}
                        color={item.ratingValue >= 5 ? "#FFB206" : "#BBBBBB"}
                      />
                      <Text style={{ color: "#C2C2C2", marginLeft: 2 }}>
                        {item.reviews} reviews
                      </Text>
                    </View>
                  </View>
                  <Image
                    style={styles.userProfil}
                    source={{
                      uri: `${item.user.account.photo.url}`,
                    }}
                  ></Image>
                </View>
                <View style={styles.hr}></View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />
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
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingBottom: 10,
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
});
