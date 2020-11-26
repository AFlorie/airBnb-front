import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

export default function SignUpScreen({ setToken }) {
  const handleSubmit = async () => {
    if (!email || !username || !description || !password || !password2) {
      setWarning("Missing parameters !");
    } else {
      if (password !== password2) {
        setWarning("passwords not matching");
      } else {
        setWarning("");
        try {
          const response = await axios.post(
            " https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // console.log("ICI");
          //  console.log(response.data.token);
          const userToken = response.data.token;
          setToken(userToken);
        } catch (error) {
          console.log(error.message);
          setWarning("email or username already in database");
        }
      }
    }
  };

  const navigation = useNavigation();
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/img/sign.png")}
          style={{ marginTop: 80 }}
        ></Image>
        <Text style={styles.title}>Sign up</Text>

        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <View style={styles.hr}></View>
          <TextInput
            style={styles.input}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <View style={styles.hr}></View>
          <TextInput
            style={styles.description}
            multiline={true}
            numberOfLines={5}
            placeholder="  Decribe yourself in a few words..."
            onChangeText={(text) => {
              setDescription(text);
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <View style={styles.hr}></View>
          <TextInput
            style={styles.input}
            placeholder="confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword2(text);
            }}
          />
          <View style={styles.hr}></View>
          <Text style={styles.warning}>{warning}</Text>

          <TouchableOpacity
            style={styles.signUp}
            title="Sign up"
            onPress={handleSubmit}
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text
              style={{
                color: "#717171",
                paddingBottom: 120,
                textAlign: "center",
              }}
            >
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 80,
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
  description: {
    marginTop: 30,
    borderColor: "#F9585D",
    borderWidth: 1,
  },
  hr: {
    marginTop: 4,
    borderBottomColor: "#F9585D",
    borderBottomWidth: 1,
  },
  signUp: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#F9585D",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 10,
    width: 200,
    marginLeft: 60,
  },
  signUpText: {
    color: "#717171",
    fontSize: 18,
    textAlign: "center",
  },
});
