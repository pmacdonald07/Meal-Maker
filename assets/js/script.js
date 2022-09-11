var userInput = $("#user-form");
var submitButton = $("#form-submit");
// An array of different apiKeys that will work in the fetch api call in the getSpoonApi function
var arrApiKeys = [
  "c39f000be15b48f0b51fc4215771d97b",
  "d4e89512419b4ecfae9d762561d78c97",
  "2cb1ecb32f4e4eb9a46acc15da086c22",
  "abed78e3630b46feafb9672300be48cc",
];

// All Api Keys
// var arrApiKeys = [
//   "c39f000be15b48f0b51fc4215771d97b",
//   "d4e89512419b4ecfae9d762561d78c97",
//   "2cb1ecb32f4e4eb9a46acc15da086c22",
//   "abed78e3630b46feafb9672300be48cc",
//   "fe6c2d84686842f9af715566ad95611d",
// ];

var cardContainerEl = $("#cards");
var drinkContainerEl = $("#drink");

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
  $("#cards").text("");
  var boxDisplayEl = $("<div></div");
  boxDisplayEl.attr("class", "box more-results-container");
  boxDisplayEl.attr("id", "box");
  $("#cards").append(boxDisplayEl);

  var resultsTextHeader = $("<h1></h1>");
  resultsTextHeader.attr("class", "results-text-header");
  resultsTextHeader.text(
    'Here are some recipes we found based off of your search for:  "' +
      data.query +
      '"'
  );
  boxDisplayEl.append(resultsTextHeader);

  var moreResultsButton = $("<button></button>");
  moreResultsButton.attr("class", "more-results-button button");
  moreResultsButton.attr("id", "more-results");
  moreResultsButton.text("Display Different Recipes");
  boxDisplayEl.append(moreResultsButton);

  // create row for forecast cards
  recipeContainerEl = $("<div></div");
  recipeContainerEl.attr("class", "columns drag is-full-mobile is-centered");
  cardContainerEl.append(recipeContainerEl);

  function randomKey(arrApiKeys) {
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  }

  // for loop to create cards
  for (i = 0; i < 5; i++) {
    recipeCardEl = $("<div></div");
    recipeCardEl.attr(
      "class",
      "card column recipe-card is-half-mobile mx-small"
    );
    recipeCardEl.attr("id", data.searchResults[0].results[i].id);
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

    // set card title div
    cardTitleEl = $("<div></div>");
    cardTitleEl.attr("class", "card-title");
    recipeCardEl.append(cardTitleEl);

    // set card title
    cardTitleText = $("<h1></h1>");
    cardTitleText.attr("class", "recipe-title title is-4");
    cardTitleText.text(data.searchResults[0].results[i].name);
    cardTitleEl.append(cardTitleText);

    // set card body
    cardBodyEl = $("<div></div");
    cardBodyEl.attr("class", "card-content");
    recipeCardEl.append(cardBodyEl);

    // set card content
    cardContentEl = $("<p></p>");
    cardContentEl.attr("class", "content");
    cardContentEl.text(data.searchResults[0].results[i].name);
    cardBodyEl.append(cardContentEl);
    cardContainerEl.append(recipeContainerEl);

    // create another content section in the recipe card
    cardButtonEl = $("<footer></footer>");
    cardButtonEl.attr("class", "card-footer");
    recipeCardEl.append(cardButtonEl);

    // create the favorite button on each recipe card
    cardFavoriteButton = $("<button></button>");
    cardFavoriteButton.attr("class", "favorite card-footer-item button");
    cardFavoriteButton.attr("id", "favorite");
    cardFavoriteButton.text("Favorite");
    cardButtonEl.append(cardFavoriteButton);

    cardButtonIcon = $("<i></i>");
    cardButtonIcon.attr("class", "fa-regular fa-star");
    cardFavoriteButton.append(cardButtonIcon);

    getId(data.searchResults[0].results[i].id);

    // console.log(data.searchResults[0].results[i].id);
  }

  //drag recipe cards
  var Draggable = function () {
    $(".drag").sortable({ connectWith: "#fav" });
    $("#fav").sortable({ connectWith: ".drag" });
  };
  Draggable();

  checkDrinks();
};

var getId = function (id) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  function randomKey(arrApiKeys) {
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  }

  var apiUrl =
    "https://api.spoonacular.com/recipes/" +
    id +
    "/information?includeNutrition=false&apiKey=" +
    randomKey(arrApiKeys);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          checkID(data);
        });
      } else {
        alert("Error: Data Not Found!");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the Spoonacular Api");
    });
};

var updateCardText = function (idCallResponse) {
  currentCard = $("cards").find($);
  cardContentEl.text(idCallResponse.readyInMinutes);
};

// var moreResults = function (event) {
//   console.log(">>>>>>>", event);
// };

var checkID = function (data) {
  $(".recipe-card").each(function () {
    if (data.id == $(this).attr("id")) {
      $(this)
        .find("p")
        .html(
          "Ready in " +
            data.readyInMinutes +
            " min" +
            "<br>" +
            "Servings: " +
            data.servings
        );
    } else {
    }
  });
};

// Function checks if the drink checkbox is true
var checkDrinks = function () {
  console.log(">>>>>>>>>");

  // If checkbox is true then run this function
  getDrinks();
};

var getDrinks = function () {
  console.log("Drinks");

  var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayDrinks(data);
        });
      } else {
        alert("Error: Data Not Found!");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to the CocktailDB Api");
    });
};

var displayDrinks = function (data) {
  console.log("DRINKS", data);

  $("#drink").text("");
  drinkContainerEl.attr("class", "drink-column");
  cardContainerEl.append(drinkContainerEl);

  // create row for drink card
  recipeContainerEl = $("<div></div");
  recipeContainerEl.attr("class", "columns drag is-full-mobile is-centered");
  recipeContainerEl.append(drinkContainerEl);

  recipeCardEl = $("<div></div");
  recipeCardEl.attr(
    "class",
    "card column recipe-card is-half-mobile mx-small drink-card"
  );
  recipeContainerEl.append(recipeCardEl);

  //set card image
  cardImg = $("<div></div");
  cardImg.attr("class", "card-image drink-card-img");
  recipeCardEl.append(cardImg);

  cardFigureEl = $("<figure></figure>");
  cardFigureEl.attr("class", "image");
  cardImg.append(cardFigureEl);

  cardImgEl = $("<img></img>");
  cardImgEl.attr("src", data.drinks[0].strDrinkThumb);
  cardImgEl.attr("alt", "Picture of recipe");
  cardFigureEl.append(cardImgEl);

  // set card title div
  cardTitleEl = $("<div></div>");
  cardTitleEl.attr("class", "card-title drink-title");
  cardImg.append(cardTitleEl);

  // set card title
  cardTitleText = $("<h1></h1>");
  cardTitleText.attr("class", "recipe-title title box is-4");
  cardTitleText.text(data.drinks[0].strDrink);
  cardTitleEl.append(cardTitleText);

  // set card body
  cardBodyEl = $("<div></div");
  cardBodyEl.attr("class", "card-content");
  recipeCardEl.append(cardBodyEl);

  // set card content
  cardContentEl = $("<p></p>");
  cardContentEl.attr("class", "content");
  // cardContentEl.text(data.searchResults[0].results[i].name);
  cardBodyEl.append(cardContentEl);
  cardContainerEl.append(recipeContainerEl);

  // create another content section in the recipe card
  cardButtonEl = $("<footer></footer>");
  cardButtonEl.attr("class", "card-footer");
  recipeCardEl.append(cardButtonEl);

  // create the favorite button on each recipe card
  cardFavoriteButton = $("<button></button>");
  cardFavoriteButton.attr("class", "favorite card-footer-item button");
  cardFavoriteButton.attr("id", "favorite");
  cardFavoriteButton.text("Favorite");
  cardButtonEl.append(cardFavoriteButton);

  cardButtonIcon = $("<i></i>");
  cardButtonIcon.attr("class", "fa-regular fa-star");
  cardFavoriteButton.append(cardButtonIcon);
};

$("#form-submit").on("click", getSpoonApi);

// $("#more-results").on("click", moreResults);
