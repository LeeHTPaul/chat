import React from "react";
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {TextInput} from "react-native";
import firebase from "../database/firebaseDB";
import "firebase/firestore";
import "firebase/auth";

const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    function login() {
        console.log("login");
        Keyboard.dismiss();
        auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Signed in!");
            navigation.navigate("Chat Screen");
        })
        .catch((error) => {
            console.log("Error!");
            setErrorText(error.message);
        });
    }

    return (
      //<TouchableWithoutFeedback onPress={Keyboard.dismiss}> this causes cursor does not rest inside input issue
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        
        <Text style={styles.label}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Email"
          value={email}
          onChangeText={(text) => setEmail(text)} />
          
          <Text style={styles.fieldTitle}>Password</Text>
          <TextInput
          style={styles.textInput}
          placeholder="Enter Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)} />

        <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
      //</TouchableWithoutFeedback>
    );
   }
   
   
   const styles = StyleSheet.create({
    errorText: {
        color: "red",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 40,
    },
    label: {
      fontWeight: "bold",
      fontSize: 24,
      margin: 50,
    },
    textInput: {
      margin: 20,
      borderWidth: 1,
      width: "80%",
      padding: 10,
      borderColor: "#ccc",
    },
    buttons: {
      flexDirection: "row",
    },
    loginButton: {
      padding: 10,
      margin: 5,
    },
    buttonText: {
      fontWeight: "bold",
      color: "white",
    },
    submitButton: {
      backgroundColor: "orange",
    },
    cancelButton: {
      backgroundColor: "red",
    },
    fieldTitle: {
       fontWeight: "bold",
       color: "black",
       backgroundColor: "yellow",
    },
    loginText: {
       fontWeight: "bold",
       color: "black",
    },
   });
   
   
/*        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notes", {text})}
            style={[styles.button, styles.submitButton]}
          >
*/