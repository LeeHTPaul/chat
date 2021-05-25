import React from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import {TextInput} from "react-native";
import firebase from "../database/firebaseDB";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { GiftedChat, InputToolbar, SystemMessage, Bubble } from "react-native-gifted-chat";

const db = firebase.firestore().collection("messages");
let countUs = 0;

// color rendering start
const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "red",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        padding: 3,
      }}
    />
  );
};

const customSystemMessage = props => {
  return (
    <View style={styles.ChatMessageSytemMessageContainer}>
      <Icon name="lock" color="#9d9d9d" size={16} />
      <Text style={styles.ChatMessageSystemMessageText}>
        Your chat is secured. Remember to be cautious about what you share
        with others.
      </Text>
    </View>
  );
};

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#d3d3d3',
        },
      }}
    />
  );
}
// color rendering end
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
              navigation.navigate("Chat Screen", {user: user.id, email: user.email});
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
          //console.log(data);
          const jsDate = new Date(data.createdAt.seconds * 1000);
          const newDoc = {
            ...data,
            createdAt: jsDate,
          };
          //console.log("New doc", newDoc);
          return newDoc;
        });
      setMessages(serverMessages);
    });

    return () => {
      //unsubscribeAuth();
      unsubscribe();
    };
    }, [] );

    function logout (){
        firebase.auth().signOut();
    }

    function sendMessages(newMessages){
      console.log(newMessages);
      //setMessages([...newMessages, ...messages])
      db.add(newMessages[0]);
    }
    
    //return (  //property cannot be read
    //  <GiftedChat
    //  messages={messages}
    //  onSend={(newMessages) => sendMessages(newMessages)}
    //  renderUsernameOnMessage={true}
    //  listViewProps={{
    //   style: {
    //     backgroundColor: "#666",
    //    },
    //  }}
    //  user={{
    //    _id: firebase.auth().currentUser.uid,
    //    name: firebase.auth().currentUser.email,
    //  }}
    ///>
    //);

    // below solution suggested by Nguyen
    if (firebase.auth().currentUser) {
        return (
          <GiftedChat
          messages={messages}
          onSend={(newMessages) => sendMessages(newMessages)}
          renderInputToolbar={props => customtInputToolbar(props)}
          renderSystemMessage={props => customSystemMessage(props)}
          renderUsernameOnMessage={true}
          renderBubble={renderBubble}
          user={{
            _id: firebase.auth().currentUser.uid,
            name: firebase.auth().currentUser.email,
          }}
        />
        );
    } else {
      return null;
    }  //*/ 
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
          listViewProps={{
            style: {
              backgroundColor: "red",
              //color: "yellow",  "#666",
            },
          }}

          */