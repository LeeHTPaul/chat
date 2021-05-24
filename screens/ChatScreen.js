import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {TextInput} from "react-native";
import firebase from "../database/firebaseDB";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

const db = firebase.firestore().collection("messages");
let countUs = 0;


export default function ChatScreen({ navigation}) {
    //const em = route.params.email;
    //const em = "a1@a.com";
    const [messages, setMessages] = useState([]);
    console.log("Inside ChatScreen=", "count=", countUs++);
    console.log(firebase.auth().currentUser)
    
    //const usercheck = firebase.auth().currentUser;
    //if (usercheck != null) {
      //email = usercheck.email;
      //photoUrl = usercheck.photoURL;
      //emailVerified = usercheck.emailVerified;
      //uid = usercheck.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
      //console.log("usercheck=", uid);
    //}

    //const [text, setText] = useState(em);
    // handle manual login and out
    useEffect(()=> {
      
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
          if (user) {
              // login
              navigation.navigate("Chat Screen");
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

      const unsubscribe = db
      .orderBy("createdAt", "desc")
      .onSnapshot((collectionSnapshot) => {
        //const serverMessages = collectionSnapshot.docs.map((doc) =>
        // doc.data());
        const serverMessages = collectionSnapshot.docs.map((doc) =>
        {
          const data = doc.data();
          console.log(data);
          const jsDate = new Date(data.createdAt.seconds * 1000);
          const newDoc = {
            ...data,
            createdAt: jsDate,
          };
          console.log("New doc", newDoc);
          return newDoc;
        });
      setMessages(serverMessages);
    });


    return () => {
      //unsubscribeAuth();
      unsubscribe();
    };
      //  setMessages([
      //    {
      //      _id: 1,
      // /     text: "hello..",
      //      createdAt: new Date(),
      //      user: {
      //        _id: 2,
      //        name: "Demo",
      //        avatar: "https://placeimg.com/148/147/any",

      //      },
      //    },
      //  ]);

    }, [] );

    function logout (){
        firebase.auth().signOut();
    }

    function sendMessages(newMessages){
      console.log(newMessages);
      //setMessages([...newMessages, ...messages])
      db.add(newMessages[0]);
    }

    return (  //property cannot be read
      <GiftedChat
      messages={messages}
      onSend={(newMessages) => sendMessages(newMessages)}
      renderUsernameOnMessage={true}
      listViewProps={{
        style: {
          backgroundColor: "#666",
        },
      }}
      user={{
        _id: firebase.auth().currentUser.uid,
        name: firebase.auth().currentUser.email,
      }}
    />
    );

    /* below solution suggested by Ngueen
    if (firebase.auth().currentUser) {
        return (
          <GiftedChat
          messages={messages}
          onSend={(newMessages) => sendMessages(newMessages)}
          renderUsernameOnMessage={true}
          listViewProps={{
            style: {
              backgroundColor: "#666",
            },
          }}
          user={{
            _id: firebase.auth().currentUser.uid,
            name: firebase.auth().currentUser.email,
          }}
        />
        );
    } else {
      return null;
    }  */
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