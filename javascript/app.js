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

  //Search variables
  var animal = ["Cat", "Dog"];
  var sex = ["F", "M"];
  var size = ["S", "M", "L", "XL"];
  var age = ["Baby", "Young", "Adult", "Senior"];

  //Dropdown functions
  function animalSelect() {
    for (i=0; i<animal.length; i++) {
      $("#animalArray").append("<option data-animal='" + animal[i] + "'>" + animal[i] + "</option>");
    }    
  }

  function sexSelect() {
    for (i=0; i<sex.length; i++) {
      $("#sexArray").append("<option data-animal='" + sex[i] + "'>" + sex[i] + "</option>");
    }    
  }

  function sizeSelect() {
    for (i=0; i<size.length; i++) {
      $("#sizeArray").append("<option data-animal='" + size[i] + "'>" + size[i] + "</option>");
    }    
  }

  function ageSelect() {
    for (i=0; i<age.length; i++) {
      $("#ageArray").append("<option data-animal='" + age[i] + "'>" + age[i] + "</option>");
    }    
  }

  //Run dropdown functions
  animalSelect();
  sexSelect();
  sizeSelect();
  ageSelect();

  var url = "http://api.petfinder.com/pet.find?format=json&key=";
  var api = "9503ebe5eee4d378650ea8929cf9c5b7";
  var search = "&location=85224";
  var queryURL = url + api + search;
  console.log(queryURL);

  //  $.getJSON('http://api.petfinder.com/pet.find?format=json&key=9503ebe5eee4d378650ea8929cf9c5b7&location=85224&callback=?').done(function(petApiData) { alert('Data retrieved!'); })
  //  .error(function(err) { alert('Error retrieving data!'); 
	 // });


  // //function for search button to capture variables and displayTopArticles
  // $.ajax({
  //    url: queryURL,
  //    method: "GET"
  //    }).done(function(response) {
  //      console.log(response);
  //      var res = response.pets;
  //      console.log(res);
  //      });
 
});//document ready