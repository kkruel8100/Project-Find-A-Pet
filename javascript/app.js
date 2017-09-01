$(document).ready(function() {

 var config = {
    apiKey: "AIzaSyDv05y1-GztFyliR0L42WZll3Le0lQxoyk",
    authDomain: "project-find-a-pet.firebaseapp.com",
    databaseURL: "https://project-find-a-pet.firebaseio.com",
    projectId: "project-find-a-pet",
    storageBucket: "",
    messagingSenderId: "1054405260043"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  $("#test").text("can you see me");

  var url = "http://api.petfinder.com/pet.find?key=";
  var api = "9503ebe5eee4d378650ea8929cf9c5b7";
  var search = "&location=85224";
  var queryURL = url + api + search;
  console.log(queryURL);


  //function for search button to capture variables and displayTopArticles
  $.ajax({
     url: "http://api.petfinder.com/pet.find?key=9503ebe5eee4d378650ea8929cf9c5b7&location=85224",
     method: "GET"
     }).done(function(response) {
       console.log(response);
       });
 
});//document ready