import React, { Component } from 'react';
//after we npm installed firebase we need to import it - we can call it whatever we want but we have to have the name of the package in quotes. This process replaces importing firebase with a cdn script tag in our html 
import firebase from 'firebase';



// Initialize Firebase
var config = {
    apiKey: "AIzaSyDRRnAqRtwKVbSJF52laItpiBdu-Gj_GvM",
authDomain: "up-with-the-times.firebaseapp.com",
databaseURL: "https://up-with-the-times.firebaseio.com",
projectId: "up-with-the-times",
storageBucket: "",
messagingSenderId: "658191112484"
};
firebase.initializeApp(config);


export default firebase
