import firebase from 'firebase/app';
import "firebase/firestore";

var firebaseConfig = {
      apiKey: "AIzaSyCTU9jTA0C2MJ1bZgPWKMIoHXVEd1lgt08",
      authDomain: "chatapp-83ac3.firebaseapp.com",
      projectId: "chatapp-83ac3",
      storageBucket: "chatapp-83ac3.appspot.com",
      messagingSenderId: "569228773849",
      appId: "1:569228773849:web:288fc78c958b8c382031c8"
};

firebase.initializeApp(firebaseConfig);
export default firebase;