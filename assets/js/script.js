var userInput = $("#user-form");
var submitButton = $("#form-submit");

// An array of different apiKeys that will work in the fetch api call in the getSpoonApi function
var arrApiKeys = [
  "d4e89512419b4ecfae9d762561d78c97",
  "c39f000be15b48f0b51fc4215771d97b",
];

var cardContainerEl = $("#cards");

var getSpoonApi = function (event) {
  event.preventDefault();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  // Converts the user's input into a value the apiUrl will be able to read
  var userText = document.querySelector(".input");
  var input = userText.value.trim();

  // Chooses an apiKey at random from the arrApiKeys to be used in the fetch api call
  function randomKey(arrApiKeys) {
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  }

  console.log(input);
  var apiUrl =
    "https://api.spoonacular.com/food/search?query=" +
    input +
    "&number=5&apiKey=" +
    randomKey(arrApiKeys);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayRecipeCards(data);
        });
      } else {
        alert("Error: Data Not Found!");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Spoonacular Api");
    });
};

// this function needs to have response from the API call as a parameter
var displayRecipeCards = function (data) {
  var boxContainerEl = $("#box");
  var resultsTextHeader = $("<h1></h1>");
  resultsTextHeader = "Here are the top 5 recipes for:  '" + data.query + "' ";
  boxContainerEl.append(resultsTextHeader);

  // create row for forecast cards
  recipeContainerEl = $("<div></div");
  recipeContainerEl.attr("class", "columns");
  cardContainerEl.append(recipeContainerEl);

  // for loop to create cards
  for (i = 0; i < 5; i++) {
    recipeCardEl = $("<div></div");
    recipeCardEl.attr("class", "card column");
    recipeContainerEl.append(recipeCardEl);

    //set card image
    cardImg = $("<div></div");
    cardImg.attr("class", "card-image");
    recipeCardEl.append(cardImg);

    cardFigureEl = $("<figure></figure>");
    cardFigureEl.attr("class", "image");
    cardImg.append(cardFigureEl);

    // Creates an anchor tag within the figure tag and gives it the href attribute with the recipe link and takes the user to it in a new tab
    cardImgLinkEl = $("<a></a>");
    cardImgLinkEl.attr("href", data.searchResults[0].results[i].link);
    cardImgLinkEl.attr("target", "_blank");
    cardFigureEl.append(cardImgLinkEl);

    cardImgEl = $("<img></img>");
    cardImgEl.attr("src", data.searchResults[0].results[i].image);
    cardImgEl.attr("alt", "Picture of recipe");
    cardImgLinkEl.append(cardImgEl);

    // set card body
    cardBodyEl = $("<div></div");
    cardBodyEl.attr("class", "card-content");
    recipeCardEl.append(cardBodyEl);

    // set card title
    cardTitleEl = $("<p></p>");
    cardTitleEl.attr("class", "title is-4");
    cardTitleEl.text(data.searchResults[0].results[i].name);
    cardBodyEl.append(cardTitleEl);

    // set card content
    cardContentEl = $("<p></p>");
    cardContentEl.attr("class", "content");
    cardContentEl.text(
      "This is placeholder text for the description of a recipe!"
    );
    cardBodyEl.append(cardContentEl);
    cardContainerEl.append(recipeContainerEl);
  }
};

$("#form-submit").on("click", getSpoonApi);
