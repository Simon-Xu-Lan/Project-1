var drinksCard = $(".drinksCard")
var yesBtn = $(".yes")
var noBtn = $(".no")
var buttonsDiv = $(".yesOrNo")
const APIKey = '9973533';
const APIURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/';


/*the autocomplete function takes two arguments: the text field element and an array of possible autocompleted values:*/

function autocomplete(id, arr, type) {
    /*the autocomplete function takes two arguments,
    the id of the input element and an array of possible autocompleted values:
    type defines the search method. 
        "start": the search results begin with the input string
        "include": the search results include the input string
        "all: show all possible result whatever the input string*/
    var inp = document.getElementById(id);
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            switch(type) {
                case "all":
                    b = document.createElement("DIV");
                    b.innerHTML = arr[i];
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function(e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                    break;
                case "start":
                    /*check if the item starts with the same letters as the text field value:*/
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                            /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    };
                    break;
                case "include":
                    var index = arr[i].toUpperCase().indexOf(val.toUpperCase());
                    if (index > -1){
                        /*create a DIV element for each matching element:*/
                        b = document.createElement("DIV");
                        /*make the matching letters bold:*/
                        b.innerHTML = arr[i].substr(0,index);
                        b.innerHTML += "<strong>" + arr[i].substr(index, val.length) + "</strong>";
                        b.innerHTML += arr[i].substr(index + val.length);
                        /*insert a input field that will hold the current array item's value:*/
                        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                        /*execute a function when someone clicks on the item value (DIV element):*/
                        b.addEventListener("click", function(e) {
                            /*insert the value for the autocomplete text field:*/
                            inp.value = this.getElementsByTagName("input")[0].value;
                            /*close the list of autocompleted values,
                            (or any other open lists of autocompleted values:*/
                            closeAllLists();
                        });
                        a.appendChild(b);
                    }
                    break;
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    }

$("#i-Input").on("input", function() {
    // var input = $(this).val();
    console.log($(this).attr("id"))
    var queryURl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
    var list = [];
    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function(response) {
        var n = response.meals.length;
        for(i=0; i<n; i++) {
            list.push(response.meals[i].strIngredient);
        };
        /*initiate the autocomplete function on the "myInput" element, and pass along 
        the ingredients array as possible autocomplete values:*/
        autocomplete("i-Input", list, "include");
    });
});

$("#a-Input").on("click", function() {
    // var input = $(this).val();
    var queryURl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
    var list = [];
    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function(response) {
      console.log(response)
      var n = response.meals.length;
      for(var i=0; i<n; i++) {
        list.push(response.meals[i].strArea)
      };
      /*initiate the autocomplete function on the "myInput" element, and pass along 
      the ingredients array as possible autocomplete values:*/
      autocomplete("a-Input",list, "all");
    });

  });

// the submit button will start the search query
$("#search").on("click",function() {
    //get the elements of class ".input-group" and assign them to inputEls
    var inputEls = $(".input-group")
    console.log("1")
    var urlArr = [];
    for(var i=0; i<inputEls.length; i++) {
        if(inputEls[i].value) { 
            
            var qURL = "https://www.themealdb.com/api/json/v1/1/filter.php?"
            //get first letter of ID name
            + inputEls[i].id.charAt(0) 
            + "="
            //get the value of the input
            + inputEls[i].value;
            //put the url to the urlArr array.

            urlArr.push(qURL)
        };
    };
    console.log(urlArr)
    // set the level at 0
    var l = 0;

    if(!urlArr[l]) {
        resultOfMeals("meals");
    } else {
        $.ajax({
            url: urlArr[l],
            method: "GET"
        }).then(function(response0) {
            var result = response0.meals;
            l++;
            if(!urlArr[l]) {
                // resultOfMeals("meals",result);
                populateMealList(result);
            } else {
                $.ajax({
                    url: urlArr[l],
                    method: "GET"
                }).then(function(response1) {
                    result = intersection(result,response1.meals);
                    // resultOfMeals("meals",result);
                    populateMealList(result);

                }); //end of level 1
            }
        }); //end of level 0
    }
}); //end of "search"



// $("#search").on("click", searchForDrinks); // the submit button will start the search query

// $("#myInput").on("keydown", function (e) { // the enter button wills start the search query
//     if (!$("#myInput").val()) return;
//     if (e.keyCode == 13) {
//         /*If the ENTER key is pressed, prevent the form from being submitted,*/
//         searchForDrinks(e);
//     }
// });

// query the database for drinks
// function searchForDrinks(event) {
//     event.preventDefault();

//     $.ajax({
//         url: APIURL + 'filter.php?i=' + $("#myInput").val(),
//         type: "GET"
//     }).then(populateDrinkList);
// }

function populateMealList(resultArr) {
    $("#results").empty(); // reset the results div
    $("#query").empty();

    //🍎
    let searchNode = $('<div><b>Ingredient: ' + $("#i-Input").val() + '</b></div>');
    $("#query").append(searchNode); // list the input field's contents in the UI
    $("#myInput").val(''); // reset the input field after submit

    if (resultArr == "") { // the query failed to return any results
        let card = $('<div class="col m4 s6"><h5>No drinks found</h5></div>');
        $("#results").append(card);
        return;
    };

    for (i = 0; i < resultArr.length; i++) {
        let card = $('<div class="col l4 m6 s12"></div>');
        let body = $('<div class="card">');
        let image = $('<div class="card-image"><img src="' + resultArr[i].strMealThumb + '" class="responsive-img"></div>');
        let title = $('<span class="card-title activator" data-id="' + result[i].idMeal + '">' + response.drinks[i].strMeal + '</span>');
        // let content = $('<div class="card-content"></div>');
        let reveal = $('<div class="card-reveal"><span class="card-title grey-text text-darken-4">' + resultArr[i].strDrink + '<i class="material-icons right">close</i></span><p id="card-reveal-' + resultArr[i].idMeal + '"></p></div>');
        title.on("click", populateReveal);

        image.append(title);
        body.append(image, reveal); // content
        card.append(body);
        $("#results").append(card);

        if (i >= 11) { break; } // 12 is the max number of cards we will display
    }
};

// on click, we make sure the content-reveal card has its proper content. We do this with another API call
function populateReveal(event) {
    let mealID = event.target.dataset.id;
    let node = $('#card-reveal-' + mealID);
    if (node.text()) return; // don't repeat API alls for items that already have content in them

    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + drinkID,
        type: "GET"
    }).then(function (response) {
        let ingredientList = "";
        for (i = 1; i < 16; i++) {
            let m = response.meals[0]['strIngredient' + i];
            if (m === null) {
                ingredientList = ingredientList.slice(0, ingredientList.length - 2);
                ingredientList += '<br><br>';
                break;
            };
            ingredientList += m + ', ';
        }
        node.html('<b>Ingredients:</b> ' + ingredientList + '<b>Instructions:</b> ' + response.meals[0].strInstructions);
        // console.log(node);
        // console.log(response.drinks[0].strInstructions);
    });

}