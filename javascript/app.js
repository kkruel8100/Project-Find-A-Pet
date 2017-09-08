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
  var animal = ["cat", "dog"];//Note: API only accepts lower case animal in search url
  var sex = ["F", "M"];
  var size = ["S", "M", "L", "XL"];
  var age = ["Baby", "Young", "Adult", "Senior"];
  var results = 25;

  //Search Found/Lost variables
  var lostAndFound = ["Found", "Lost"];
  var lFname = "";
  var lFdate = "";
  var lFanimal = "";
  var lFsex = "";
  var lFsize = "";
  var lFage = "";
  var lFzip = "";


//!!Update id names when moved to new html page - Not able to populate two ids on same page -- Impacts both click functions
//May decide to keep two set of ids
  //Dropdown functions for html page
  function animalSelect() {
    for (i=0; i<animal.length; i++) {
      $("#animalArray").append("<option data-animal='" + animal[i] + "'>" + animal[i] + "</option>");
      $("#animalUpdate").append("<option data-animal='" + animal[i] + "'>" + animal[i] + "</option>");
    }    
  }

  function sexSelect() {
    for (i=0; i<sex.length; i++) {
      $("#sexArray").append("<option data-sex='" + sex[i] + "'>" + sex[i] + "</option>");
      $("#sexUpdate").append("<option data-sex='" + sex[i] + "'>" + sex[i] + "</option>");
    }    
  }

  function sizeSelect() {
    for (i=0; i<size.length; i++) {
      $("#sizeArray").append("<option data-size='" + size[i] + "'>" + size[i] + "</option>");
      $("#sizeUpdate").append("<option data-size='" + size[i] + "'>" + size[i] + "</option>");
    }    
  }

  function ageSelect() {
    for (i=0; i<age.length; i++) {
      $("#ageArray").append("<option data-age='" + age[i] + "'>" + age[i] + "</option>");
      $("#ageUpdate").append("<option data-age='" + age[i] + "'>" + age[i] + "</option>");
    }    
  }

  function lostAndFoundSelect() {
    for (i=0; i<lostAndFound.length; i++) {
      $("#lostFound_input").append("<option data-category='" + lostAndFound[i] + "'>" + lostAndFound[i] + "</option>");
      }    
  }

  //function to clear zip field after submit key
  // function clearField() {
  //   $("#zipCode").val("");
  //   $("#query")[0].reset();
  //   $("#addPet")[0].reset();
  //   $("#name_input").val("");
  //   $("#zipUpdate").val("");
  // }

  //function to remove Top Articles results to be used in multiple places
  function callback() {
    $(".callback").remove();
  }

  //function for clear button to remove elements in callback area
  $(".clear").on("click", function clear () {
    callback();
  }); 

  //Run dropdown functions
  animalSelect();
  sexSelect();
  sizeSelect();
  ageSelect();
  lostAndFoundSelect();


  var url = "http://api.petfinder.com/pet.find?format=json&key=";
  var api = "9503ebe5eee4d378650ea8929cf9c5b7";

  // var search = "&location=85224";
  //  var queryURL = url + api + search;
  //  console.log(queryURL);
  
  //Function for search button to capture variables and displayPetFinds
  $(document).on("click", ".search", function search () {
      
    callback();

    var aniSearch = $("#animalArray").val();
    var sizSearch = $("#sizeArray").val();
    var sexSearch = $("#sexArray").val(); 
    var ageSearch = $("#ageArray").val();
    var zipSearch = $("#zipCode").val();

    console.log(aniSearch);
    console.log(sizSearch);
    console.log(sexSearch);
    console.log(ageSearch);
    console.log(zipSearch);

    var queryURL = url + api + "&animal=" + aniSearch + "&size=" + sizSearch + "&sex=" + sexSearch + "&age=" + ageSearch + "&location=" + zipSearch;
    console.log(queryURL);

    if (zipSearch.length===5) {
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
          var head = $("<h4>").text("My name is: " + headline);
          head.prepend("<span class='label label-primary'>" + (i+1) + "</span>");
          newDiv.append(head);

          if (res[i].media.hasOwnProperty("photos")) {  
            var img = res[i].media.photos.photo[3].$t; 
            var imgResult = "<img src=" + img + ">";
            console.log(img);
            newDiv.append(imgResult);
            }
          else {
            var imgResult = "<img src='icons/adopt-placeholder.png'>";
            newDiv.append(imgResult);
            }

          var animal = res[i].animal.$t;
          var aniResult = $("<p>").text(animal);
          newDiv.append(aniResult);

          var age = res[i].age.$t;
          var ageResult = $("<p>").text("Age: " + age);
          newDiv.append(ageResult);

          var sex = res[i].sex.$t;
          var sexResult = $("<p>").text("Gender: " + sex);
          newDiv.append(sexResult);

          var size = res[i].size.$t;
          var sizResult = $("<p>").text("Size: " + size);
          newDiv.append(sizResult);

          var shelter = res[i].shelterId.$t;
          var shResult = $("<p>").text("Shelter ID: " + shelter);
          newDiv.append(shResult);

          var email = res[i].contact.email.$t;
          var emResult = $("<p>").text("Email: " + email);
          newDiv.append(emResult);

          var phone = res[i].contact.phone.$t;
          var phoResult = $("<p>").text("Phone: " + phone);
          newDiv.append(phoResult);



 
          $(".results").append(newDiv);
        }//end of for

        console.log(res);
      });//end of response function

      // clearField();   
    }//end of if statement

//Need to replace alert with Modal JS      
    else {
      alert("Please verify zip code");
    }
  });//end of search click function  

     // Capture Add a Pet Click
  $("#submit").on("click", function(event) {
    event.preventDefault();
//Need to check ids if update form when new page is added  
    lostAndFound = $("#lostFound_input").val();
    lFname = $("#name_input").val().trim(); 
    lFdate = $("#date").val().trim();   
    lFanimal = $("#animalUpdate").val();
    lFsize = $("#sizeUpdate").val();
    lFsex = $("#sexUpdate").val();
    lFage = $("#ageUpdate").val();
    lFzip = $("#zipUpdate").val().trim();

    if (lFzip.length===5 && lFname.length >= 1) {

      // Code for the push
      database.ref().push({
        lostAndFound: lostAndFound,
        lFname: lFname,
        lFdate: lFdate,
        lFanimal: lFanimal,
        lFsize: lFsize,
        lFsex: lFsex,
        lFage: lFage,
        lFzip: lFzip,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      // Code to clear input fields
      clearField();
    }//end of if

//Need to replace alert with Modal JS    
    else {
      alert("Please verify name and zip")
    }//end of else

  });//end of click

  // Update Pet List
  database.ref().on("child_added", function(childSnapshot) {

    id = childSnapshot.key;//captures unique key value

    // full list of pets
    $("#petList").append("<tr><td> " + childSnapshot.val().lostAndFound +
      " </td><td> " + childSnapshot.val().lFname +
      " </td><td> " + childSnapshot.val().lFdate +
      " </td><td> " + childSnapshot.val().lFanimal +
      " </td><td> " + childSnapshot.val().lFsize +
      " </td><td> " + childSnapshot.val().lFsex +
      " </td><td> " + childSnapshot.val().lFage +
      " </td><td> " + childSnapshot.val().lFzip +
      " </td><td> " + "<button id='"+id+"'class=delete style='background: url(icons/remove.png)'></button>" + " </td></tr>");

      // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });
    
  //delete from view for user and on firebase - need to restrict to admin
  //alerts need to be replaced with modals
  $(document).on("click", ".delete", function(event) {
    var childKey = this.id;
    if (confirm("Are you sure you want to delete this notification?") === true) {
      alert("Removed: " + childKey);
      database.ref(childKey).remove();
      $(this).closest("tr").remove();
        
    } else {
      alert("Cancelled");
    }
  });  
 
 
});//document ready