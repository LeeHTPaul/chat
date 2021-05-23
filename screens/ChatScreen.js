import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {TextInput} from "react-native";
import firebase from "../database/firebaseDB";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const db = firebase.firestore();
let countUs = 0;

export default function ChatScreen( { navigation}) {
    //const em = route.params.email;
    //const em = "a1@a.com";

    console.log("Inside ChatScreen=", "count=", countUs++);
    //const [text, setText] = useState(em);
    // handle manual login and out
    useEffect(()=> {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user);
            if (user) {
                // login
                navigation.navigate("Chat Screen", {id: user.id, email: user.email });
            }
            else { 
                // logged out
                navigation.navigate("Login Screen");
            }
        });
        // below icon does not appear
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={logout}>
                    <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="grey"
                    style={{ marginRight: 20}} />
                </TouchableOpacity>
            ),
        });
    }, [] );

    function logout (){
        firebase.auth().signOut();
    }

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.label}>Chat view</Text>
        <TouchableOpacity onPress={logout}>
                    <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="grey"
                    style={{ marginRight: 20}} />
        </TouchableOpacity>
      </View>
    );
   }
   
   
   const styles = StyleSheet.create({
    label: {
      fontWeight: "bold",
      fontSize: 24,
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
    button: {
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
   });
   
   
/*        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notes", {text})}
            style={[styles.button, styles.submitButton]}
          >
*/