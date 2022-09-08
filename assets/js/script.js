
var getSpoonApi = function () {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '35f49090e6msha1612b0ea8a9d7fp14fe6djsn164414318e8d',
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };

    console.log("Hello World");
    var apiUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch";

    fetch(apiUrl, options)
    .then(function (response) {
        if (response.ok) {
            response.json().then (function (data) {
                console.log(data);
            });
        } else {
            alert("Error: Data Not Found!");
        }
    })
    .catch(function (error) {
        alert("Unable to connect to the Spoonacular Api");
    })
};

getSpoonApi();