var userInput = $("#user-form");
var submitButton = $("#form-submit");
var cardContainerEl = $("#cards");
var drinkContainerEl = $("#drink");
var drinkInfoContainerEl = $("#drink-info");
var favButton = $(".favorite");
var favSection = $("#favorites-section");
var favArray = [];

const inputErrorModalEl = document.getElementById("input-error-modal");
const inputNoRecipesModalEl = document.getElementById("input-no-recipes-modal");
const dataNotFoundModalEl = document.getElementById("data-not-found-modal");
const cannotConnectModalEl = document.getElementById("cannot-connect-modal");
let currentSearch = "";

// An array of different apiKeys that will work in the fetch api call in the getSpoonApi function
var arrApiKeys = [
  "c39f000be15b48f0b51fc4215771d97b",
  "ad6278e15c864117bf13998d6f2409e0",
  "d4e89512419b4ecfae9d762561d78c97",
  "2cb1ecb32f4e4eb9a46acc15da086c22",
  "abed78e3630b46feafb9672300be48cc",
  "fe6c2d84686842f9af715566ad95611d",
  "d47220e0ade34b3ea9c039613858c695",
];

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
  currentSearch = input.toUpperCase();

  if (input === undefined || input === "") {
    inputErrorModalEl.classList.add("is-active");
    return;
  }

  // Chooses an apiKey at random from the arrApiKeys to be used in the fetch api call
  function randomKey(arrApiKeys) {
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  }

  var dietParameter = "&diet=";

  if (document.getElementById("veggie-option").checked === true) {
    dietParameter = dietParameter + "vegetarian";
  }

  if (document.getElementById("vegan-option").checked === true) {
    dietParameter = dietParameter + "vegan";
  }

  if (document.getElementById("gluten-free-option").checked === true) {
    dietParameter = dietParameter + "gluten free";
  }

  if (document.getElementById("no-diet").checked === true) {
    dietParameter = dietParameter;
  }

  var apiUrl =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    input +
    "&number=5&addRecipeInformation=true" +
    dietParameter +
    "&apiKey=" +
    randomKey(arrApiKeys);

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.results.length === 0) {
            inputNoRecipesModalEl.classList.add("is-active");
            $("#search-input").val("");
            return;
          }

          displayRecipeCards(data);
        });
      } else {
        dataNotFoundModalEl.classList.add("is-active");
        return;
      }
    })
    .catch(function (error) {
      cannotConnectModalEl.classList.add("is-active");
      return;
    });
};

// this function needs to have response from the API call as a parameter
var displayRecipeCards = function (data) {
  $("#search-input").val("");
  $("#cards").empty();
  $("#ingredients").empty();
  $("#instructions").empty();

  var boxDisplayEl = $("<div></div");
  boxDisplayEl.attr("class", "box more-results-container");
  boxDisplayEl.attr("id", "box");
  $("#cards").append(boxDisplayEl);

  var resultsTextHeader = $("<h1></h1>");
  resultsTextHeader.attr("class", "results-text-header");
  resultsTextHeader.text(
    'Here are some recipes we found based off of your search for:  "' +
      currentSearch +
      '." Click the recipe image to see full recipe details.'
  );
  boxDisplayEl.append(resultsTextHeader);

  recipeContainerEl = $("<div></div");
  recipeContainerEl.attr(
    "class",
    "columns drag is-flex-tablet is-block-mobile is-justify-content-space-between is-flex-wrap-wrap recipe-container"
  );
  cardContainerEl.append(recipeContainerEl);

  function randomKey(arrApiKeys) {
    return arrApiKeys[Math.floor(Math.random() * arrApiKeys.length)];
  }

  // for loop to create cards
  for (i = 0; i < 5; i++) {
    recipeCardEl = $("<div></div");
    recipeCardEl.attr(
      "class",
      "card column is-10-mobile mx-auto is-5-tablet is-4-desktop is-2-widescreen recipe-card my-4"
    );
    recipeCardEl.attr("id", data.results[i].id);
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
    cardImgLinkEl.attr("href", data.results[i].sourceUrl);
    cardImgLinkEl.attr("target", "_blank");
    cardFigureEl.append(cardImgLinkEl);

    cardImgEl = $("<img></img>");
    cardImgEl.attr("src", data.results[i].image);
    cardImgEl.attr("alt", "Picture of recipe");
    cardImgLinkEl.append(cardImgEl);

    // set card title div
    cardTitleEl = $("<div></div>");
    cardTitleEl.attr("class", "card-title");
    recipeCardEl.append(cardTitleEl);

    // set card title
    cardTitleText = $("<h1></h1>");
    cardTitleText.attr("class", "recipe-title title is-4");
    cardTitleText.text(data.results[i].title);
    cardTitleEl.append(cardTitleText);

    // set card body
    cardBodyEl = $("<div></div");
    cardBodyEl.attr("class", "card-content");
    recipeCardEl.append(cardBodyEl);

    // set card content
    cardContentEl = $("<p></p>");
    cardContentEl.attr("class", "content");
    cardContentEl.html(
      "Ready in " +
        data.results[i].readyInMinutes +
        " min" +
        "<br>" +
        "Servings: " +
        data.results[i].servings +
        "<br>" +
        "Source: " +
        data.results[i].sourceName
    );
    cardBodyEl.append(cardContentEl);
    cardContainerEl.append(recipeContainerEl);

    // create another content section in the recipe card
    cardButtonEl = $("<footer></footer>");
    cardButtonEl.attr("class", "card-footer");
    recipeCardEl.append(cardButtonEl);

    // create the more info button on each recipe card
    cardFavoriteButton = $("<button></button>");
    cardFavoriteButton.attr("class", "favorite card-footer-item button");
    cardFavoriteButton.text("Favorite");
    cardButtonEl.append(cardFavoriteButton);
  }

  //drag recipe cards
  var Draggable = function () {
    $(".drag").sortable({ connectWith: "#fav" });
    $("#fav").sortable({ connectWith: ".drag" });
  };
  Draggable();

  checkDrinks();
};

$(document).ready(function () {
  $(".button").click(function () {
    $(".submit").effect(
      "pulsate",
      {
        times: 3,
        distance: 10,
      },
      3000
    );
  });
});

//uses array of options to provide autocomplete options
$(function () {
  var dataSrc = [
    "apples",
    "avacado",
    "almond",
    "bacon",
    "bagel",
    "broccoli",
    "cabbage",
    "chicken",
    "cookies",
    "duck",
    "donuts",
    "dumplings",
    "eggs",
    "eel",
    "enchilada",
    "fish",
    "fajita",
    "franks",
    "garlic",
    "gumbo",
    "grits",
    "ham",
    "hash browns",
    "hot dogs",
    "ice cream",
    "indian food",
    "irish stew",
    "jambalaya",
    "jelly",
    "jalapeno",
    "kale",
    "kiwi",
    "kidney beans",
    "lobster",
    "lamb",
    "lasagna",
    "meatballs",
    "milk",
    "noodles",
    "pizza",
    "pancakes",
    "pepperoni",
    "quesadilla",
    "spinach",
    "toast",
    "venison",
    "waffles",
    "walnuts",
    "yogurt",
    "ziti",
  ];

  $("#search-input").autocomplete({
    source: dataSrc,
  });

  // Lines 307 - 312 came from https://miroslavpopovic.com/posts/2012/06/jqueryui-autocomplete-filter-words-starting-with-term
  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
    });
  };
});

var updateCardText = function (idCallResponse) {
  currentCard = $("cards").find($);
  cardContentEl.text(idCallResponse.readyInMinutes);
};

// Function checks if the drink checkbox is true
var checkDrinks = function () {
  if (document.getElementById("drink-choice").checked === true) {
    getDrinks();
  } else {
    return;
  }
};

var getDrinks = function () {
  var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayDrinks(data);
        });
      } else {
        dataNotFoundModalEl.classList.add("is-active");
        return;
      }
    })
    .catch(function (error) {
      cannotConnectModalEl.classList.add("is-active");
      return;
    });
};

var displayDrinks = function (data) {
  // Empties any content in the drink section so that the user can search for something and there won't be duplicate elements in the section.
  $("#drink").empty();

  // Removes the hidden class in the drink section so that is visible again. Without this the section background is visible on mobile screens
  $("#drink-section").removeClass("hidden");

  drinkContainerEl.attr(
    "class",
    "drink-section box is-flex is-flex-wrap-wrap drink-column columns container"
  );
  cardContainerEl.append(drinkContainerEl);

  recipeCardEl = $("<div></div");
  recipeCardEl.attr(
    "class",
    "column recipe-card is-half-mobile mx-small drink-card drink-recipe"
  );
  recipeCardEl.attr("id", "drink-recipe");
  drinkContainerEl.append(recipeCardEl);

  //set card image
  cardImg = $("<div></div");
  cardImg.attr("class", "drink-card-img");
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

  // Set Ingredients Column
  var ingredientsEl = $("#ingredients");
  ingredientsEl.empty();
  ingredientsEl.attr("class", "column ingredients-column");
  drinkContainerEl.append(ingredientsEl);

  ingredientsTitleText = $("<h1></h1>");
  ingredientsTitleText.attr("class", "ingredients-title");
  ingredientsTitleText.text("INGREDIENTS:");
  ingredientsEl.append(ingredientsTitleText);

  ingredientsListEl = $("<div></div>");
  ingredientsListEl.attr("class", "ingredients-list");
  ingredientsEl.append(ingredientsListEl);

  ingredientsListOrdered = $("<ol></ol>");
  ingredientsListOrdered.attr("class", "ingredients");
  ingredientsListEl.append(ingredientsListOrdered);

  // The drink api returns data back on 1 random drink. Each random drink has 15 ingredient data points and 15 measurement data points to go with each ingredient data point. Below are 15 if statements to check if each ingredient data point has a value. In each if statement there is another if statement to check if that ingredient comes with a measurement data point and sets the text value accordingly.

  // If the ingredient value in the data has a value then create a list element for that unique ingredient
  if (data.drinks[0].strIngredient1 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    // If the ingredient has a measurement value then set the list element text to the ingredient name + the measurement
    if (data.drinks[0].strMeasure1 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient1 + " - " + data.drinks[0].strMeasure1
      );
      //Else the ingredient has a measurement value of null and set the list element text to just the ingredient name
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient1);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient2 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure2 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient2 + " - " + data.drinks[0].strMeasure2
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient2);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient3 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure3 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient3 + " - " + data.drinks[0].strMeasure3
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient3);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient4 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure4 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient4 + " - " + data.drinks[0].strMeasure4
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient4);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient5 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure5 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient5 + " - " + data.drinks[0].strMeasure5
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient5);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient6 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure6 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient6 + " - " + data.drinks[0].strMeasure6
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient6);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient7 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure7 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient7 + " - " + data.drinks[0].strMeasure7
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient7);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient8 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure8 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient8 + " - " + data.drinks[0].strMeasure8
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient8);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient9 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure9 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient9 + " - " + data.drinks[0].strMeasure9
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient9);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient10 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure10 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient10 + " - " + data.drinks[0].strMeasure10
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient10);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient11 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure11 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient11 + " - " + data.drinks[0].strMeasure11
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient11);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient12 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure12 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient12 + " - " + data.drinks[0].strMeasure12
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient12);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient13 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure13 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient13 + " - " + data.drinks[0].strMeasure13
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient13);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient14 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure14 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient14 + " - " + data.drinks[0].strMeasure14
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient14);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  if (data.drinks[0].strIngredient15 !== null) {
    ingredientSingle = $("<li></li>");
    ingredientSingle.attr("class", "single-ingredient");

    if (data.drinks[0].strMeasure15 !== null) {
      ingredientSingle.text(
        data.drinks[0].strIngredient15 + " - " + data.drinks[0].strMeasure15
      );
    } else {
      ingredientSingle.text(data.drinks[0].strIngredient15);
    }
    ingredientsListOrdered.append(ingredientSingle);
  }

  // If the ingredient value in the data has a value then create a list element for that unique ingredient
  var instructionsEl = $("#instructions");
  instructionsEl.empty();
  instructionsEl.attr("class", "column instructions-column");
  drinkContainerEl.append(instructionsEl);

  // Set Ingredients Column
  instructionsTitleEl = $("<div></div>");
  instructionsTitleEl.attr("class", "instructions-titleEl");
  instructionsEl.append(instructionsTitleEl);

  instructionsTitleText = $("<h1></h1>");
  instructionsTitleText.attr("class", "instructions-title");
  instructionsTitleText.text("INSTRUCTIONS:");
  instructionsTitleEl.append(instructionsTitleText);

  instructionsSummaryEl = $("<p></p>");
  instructionsSummaryEl.attr("class", "instructions-summary");
  instructionsSummaryEl.text(data.drinks[0].strInstructions);
  instructionsEl.append(instructionsSummaryEl);

  // Getter
  // var themeClass = $( ".drink-column" ).tooltip( "option", "classes.ui-tooltip" );

  // Setter
  // $( ".drink-column" ).tooltip( "option", "classes.ui-tooltip", "content", "highlight" );
};

var favButton = function (event) {
  var target = $(event.target);
  if (target.is("button.favorite")) {
    var targetCardTitle = target.parent().parent().find("h1").text();
    var targetCardUrl = target.parent().parent().find("a").attr("href");

    var storedRecipe = {
      title: targetCardTitle,
      url: targetCardUrl,
    };

    // check to see if this recipe already exists in the saved recipes array, if so, do not add another button, if not, add button
    if (favArray.some((arrObj) => arrObj.title == storedRecipe.title)) {
      return;
    } else {
      favArray.push(storedRecipe);
      saveRecipes();
      createFavRecipeButton(storedRecipe);
    }
  }
};

var createFavRecipeButton = function (storedRecipe) {
  newAnchor = $("<a>");
  newAnchor.attr("href", storedRecipe.url);
  newAnchor.attr("target", "_blank");

  newButton = $("<button></button>");
  newButton.attr(
    "class",
    "button is-fullwidth is-responsive my-2 saved-fav mx-auto"
  );
  newButton.text(storedRecipe.title);
  newAnchor.append(newButton);

  favSection.append(newAnchor);
};

var loadFavRecipes = function () {
  savedFavRecipes = localStorage.getItem("recipes");
  savedFavRecipes = JSON.parse(savedFavRecipes);
  favArray = savedFavRecipes;

  if (favArray === null) {
    favArray = [];
  }

  for (i = 0; i < favArray.length; i++) {
    newAnchor = $("<a>");
    newAnchor.attr("href", savedFavRecipes[i].url);
    newAnchor.attr("target", "_blank");

    newButton = $("<button></button>");
    newButton.attr(
      "class",
      "button is-fullwidth is-responsive my-2 saved-fav mx-auto"
    );
    newButton.text(savedFavRecipes[i].title);
    newAnchor.append(newButton);

    favSection.append(newAnchor);
  }
};

var saveRecipes = function () {
  localStorage.setItem("recipes", JSON.stringify(favArray));
};
var closeInputModal = function () {
  inputErrorModalEl.classList.remove("is-active");
};

var noData = function () {
  inputNoRecipesModalEl.classList.remove("is-active");
};

var closeDataModal = function () {
  dataNotFoundModalEl.classList.remove("is-active");
};

var closeApiModal = function () {
  cannotConnectModalEl.classList.remove("is-active");
};

document
  .querySelector("#input-modal-close-btn")
  .addEventListener("click", closeInputModal);
document
  .querySelector("#input-modal-close-btn-2")
  .addEventListener("click", noData);
document
  .querySelector("#input-modal-bg")
  .addEventListener("click", closeInputModal);

document
  .querySelector("#data-modal-bg")
  .addEventListener("click", closeDataModal);
document
  .querySelector("#data-modal-close-btn")
  .addEventListener("click", closeDataModal);

document
  .querySelector("#cannot-connect-bg")
  .addEventListener("click", closeApiModal);
document
  .querySelector("#cannot-connect-close-btn")
  .addEventListener("click", closeApiModal);

$("#form-submit").on("click", getSpoonApi);
$(favButton).on("click", favButton);
loadFavRecipes();
