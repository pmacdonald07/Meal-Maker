var userInput = document.querySelector("#user-form");
var submitButton = document.querySelector(".submit");

var getSpoonApi = function (event) {
  event.preventDefault();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  var userText = document.querySelector(".input");
  var input = userText.value.trim();

  console.log(input);
  var apiKey = "c39f000be15b48f0b51fc4215771d97b";
  var apiUrl =
    "https://api.spoonacular.com/food/search?query=" +
    input +
    "&number=10&apiKey=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: Data Not Found!");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Spoonacular Api");
    });
};

userInput.addEventListener("submit", getSpoonApi);

// getSpoonApi();
