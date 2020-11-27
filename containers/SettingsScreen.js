import React from "react";
import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken, userToken, idUser }) {
  console.log("idUser :", idUser);
  return (
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
