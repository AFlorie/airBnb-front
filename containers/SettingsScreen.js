import React, { useEffect, useState } from "react";
import { Button, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ setToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const [idUser, setIdUser] = useState(null);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIdUser(userId);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  console.log(idUser);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://express-airbnb-api.herokuapp.com/user/${idUser}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${userToken}`,
  //           },
  //         }
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="#EB5A62" style={{ marginTop: 50 }} />
  ) : (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}
