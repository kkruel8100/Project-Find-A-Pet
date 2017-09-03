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

  //Search Petfinder variables
  var animal = ["Cat", "Dog"];
  var sex = ["F", "M"];
  var size = ["S", "M", "L", "XL"];
  var age = ["Baby", "Young", "Adult", "Senior"];
  var results = 25;

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

  //function to clear zip field after submit key
  function clearField() {
    $("#zipCode").val("");
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
  
  //Function for search button to capture variables and displayPetFinds
      $(document).on("click", ".search", function search () {
        var aniSearch = $("#animalArray").val();
        var sizSearch = $("#sizeArray").val();
        var sexSearch = $("#sexArray").val().trim(); 
        var ageSearch = $("#ageArray").val().trim();
        var zipSearch = $("#zipCode").val().trim();

        console.log(aniSearch);
        console.log(sizSearch);
        console.log(sexSearch);
        console.log(ageSearch);
        console.log(zipSearch);

      // var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      // url += "?" + $.param({
      //   "api-key": "b80c2fd13eed469d84e884b3b42ba135",
      //   "q": q
      // });
        $.ajax({
          url: queryURL,
          method: "GET"
          }).done(function(response) {
            console.log(response);
            var res = response.petfinder.pets.pet;

      //API search default is 25 results
        for (var i = 0; i < results; i++) {
          var newDiv = $("<div class='callback'>" + i);
          var headline = res[i].name.$t;
          var head = $("<h4>").text(headline);
          head.prepend("<span class='label label-primary'>" + (i+1) + "</span>");
          newDiv.append(head);

          // var animal = res[i].animal.$t
          // p = $("<p>").text(animal);
          // newDiv.append(p);

          // if (res[i].byline && res[i].byline.hasOwnProperty("original")) {
          //   p = $("<p>").text(res[i].byline.original);
          //   newDiv.append(p);
          // }
          // else {
          //   p = $("<p>").text("Byline Not Available");
          //   newDiv.append(p);
          // }
          // if (res[i].pub_date != "null") {
          //   p = $("<p>").html("Publication Date: "+ (res[i].pub_date));
          //   newDiv.append(p);
          // }
          // else {
          //   p = $("<p>").text("Publication Date Not Available");
          // }
          // var pix = 0;        
          // var webURL = res[i].media.photos.photo.pix.$t;
          // console.log(webURL);        
          // p = $("<a href>").html(webURL);
          // newDiv.append(p);
          $(".results").append(newDiv);
        }

      console.log(res);
      });

      clearField();   

     });//end of search click function     
 
});//document ready