import React, { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const navigation = useNavigation();

  //console.log(Constants.statusBarHeight);

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      setWarning("Please fill all fields");
    } else {
      try {
        const response = await axios.post(
          " https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response.data.id);

        if (response.data.email === email) {
          const userToken = response.data.token;
          setToken(userToken);

          if (response.data.id) {
            AsyncStorage.setItem("userId", response.data.id);
          } else {
            AsyncStorage.removeItem("userId");
          }

          // console.log("signin response :", response.data.id);
        }
      } catch (error) {
        console.log(error.message);
        setWarning("Paramètres incconus");
      }
    }

    //navigation.navigate("SignUp");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/img/sign.png")}
          style={{ marginTop: 80 }}
        ></Image>
        <Text style={styles.title}>Sign in</Text>

        <View style={styles.inputs}>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <View style={styles.hr}></View>
          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <View style={styles.hr}></View>
        </View>
        <Text style={styles.warning}>{warning}</Text>

        <TouchableOpacity
          style={styles.signIn}
          title="Sign in"
          onPress={handleSubmit}
        >
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "#717171", paddingBottom: 120 }}>
            No account ? Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  warning: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
    marginTop: 100,
    opacity: 0.6,
  },
  title: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputs: {
    marginTop: 50,
    alignSelf: "stretch",
    marginHorizontal: 30,
  },
  input: {
    marginTop: 30,
    fontSize: 16,
  },
  hr: {
    marginTop: 4,
    borderBottomColor: "#F9585D",
    borderBottomWidth: 1,
  },
  signIn: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#F9585D",
    borderWidth: 3,
    borderRadius: 30,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  signInText: {
    color: "#717171",
    fontSize: 18,
  },
});
