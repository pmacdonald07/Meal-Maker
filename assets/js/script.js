var patrickApiKey = "d4e89512419b4ecfae9d762561d78c97";
var cardContainerEl = $("#cards");
var getSpoonApi = function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  var apiUrl =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";

  fetch(apiUrl, options)
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

    cardImgEl = $("<img></img>");
    cardImgEl.attr("src", data.results[i].image);
    cardImgEl.attr("alt", "Picture of recipe");
    cardFigureEl.append(cardImgEl);

    // set card body
    cardBodyEl = $("<div></div");
    cardBodyEl.attr("class", "card-content");
    recipeCardEl.append(cardBodyEl);

    // set card title
    cardTitleEl = $("<p></p>");
    cardTitleEl.attr("class", "title is-4");
    cardTitleEl.text(data.results[i].title);
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
