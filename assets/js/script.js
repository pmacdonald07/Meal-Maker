var getSpoonApi = function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d",
      "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    },
  };

  console.log("Hello World");
  var apiUrl =
    "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";

  fetch(apiUrl, options)
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

var patrickApiKey = "d4e89512419b4ecfae9d762561d78c97";

var displayRecipeCards = function (response) {
  // create row for forecast cards

  // need to know container
  weatherContainerEl.append(recipeCardEl);

  // for loop to create cards
  for (i = 0; i < 5; i++) {
    recipeCardEl = $("<div></div");
    recipeCardEl.attr("class", "card");

    //set card image
    cardImg = $("<div></div");
    cardImg.attr("class", "card-image");
    cardImg.html(
      "<img src='https://bulma.io/images/placeholders/1280x960.png' alt='Placeholder image'></img>)"
    );
    recipeCardEl.append(cardImg);

    // set card title
    cardTitle = $("<h4></h4>");
    cardTitle.attr("class", "card-title");
    cardTitle.text(moment().add(forecastCounter, "d").format("L"));
    forecastCounter++;
    cardBody.append(cardTitle);

    // set weather icon
    futureIconSpanEl = $("<span></span>");
    futureIconImgEl = $("<img></img");
    futureIconImgEl.attr("class", "icon-img-sm card-text");
    futureIconImgEl.attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        response.daily[i].weather[0].icon +
        "@2x.png"
    );
    futureIconSpanEl.append(futureIconImgEl);
    cardBody.append(futureIconSpanEl);

    // set card text
    cardText = $("<p></p>");
    cardText.attr("class", "card-text");
    cardText.html(
      "Temp: " +
        response.daily[i].temp.day +
        "&#8457" +
        "<br>" +
        "<br>" +
        "Wind: " +
        response.daily[i].wind_speed +
        " MPH" +
        "<br>" +
        "<br>" +
        "Humidity: " +
        response.daily[i].humidity +
        "%" +
        "<br>"
    );
    cardBody.append(cardText);

    // append cards
    recipeCardEl.append(forecastCard);
  }
};

getSpoonApi();
