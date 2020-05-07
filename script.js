var drinksCard = $(".drinksCard")
var yesBtn = $(".yes")
var noBtn = $(".no")
var buttonsDiv = $(".yesOrNo")
const APIKey = '9973533';
const APIURL = 'https://www.thecocktaildb.com/api/json/v2/9973533/';

// this is a full list of all recognized ingredients available in the cocktail API, as of 5/4/2020
const ingredientList = ["Vodka", "Gin", "Rum", "Tequila", "Scotch", "Absolut Kurant", "Absolut Peppar", "Absolut Vodka", "Advocaat", "Aejo Rum", "Aftershock", "Agave Syrup", "Ale", "Allspice", "Almond Extract", "Almond Flavoring", "Almond", "Amaretto", "Angelica Root", "Angostura Bitters", "Anis", "Anise", "Anisette", "Aperol", "Apfelkorn", "Apple Brandy", "Apple Cider", "Apple Juice", "Apple Schnapps", "Apple", "Applejack", "Apricot Brandy", "Apricot Nectar", "Apricot", "Aquavit", "Asafoetida", "Alejo Rum", "Bacardi Limon", "Bacardi", "Baileys Irish Cream", "Banana Liqueur", "Banana Rum", "Banana Syrup", "Banana", "Barenjager", "Basil", "Beef Stock", "Beer", "Benedictine", "Berries", "Bitter lemon", "Bitters", "Black Pepper", "Black Rum", "Black Sambuca", "Blackberries", "Blackberry Brandy", "Blackberry Schnapps", "Blackcurrant Cordial", "Blackcurrant Schnapps", "Blackcurrant Squash", "Blended Whiskey", "Blue Curacao", "Blue Maui", "Blueberries", "Blueberry Schnapps", "Bourbon", "Brandy", "Brown Sugar", "Butter", "Butterscotch Schnapps", "Cachaca", "Calvados", "Campari", "Canadian Whisky", "Candy", "Cantaloupe", "Caramel Coloring", "Carbonated Soft Drink", "Carbonated Water", "Cardamom", "Cayenne Pepper", "Celery Salt", "Celery", "Chambord Raspberry Liqueur", "Champagne", "Cherries", "Cherry Brandy", "Cherry Cola", "Cherry Grenadine", "Cherry Heering", "Cherry Juice", "Cherry Liqueur", "Cherry", "Chocolate Ice-cream", "Chocolate Liqueur", "Chocolate Milk", "Chocolate Syrup", "Chocolate", "Cider", "Cinnamon Schnapps", "Cinnamon", "Citrus Vodka", "Clamato Juice", "Cloves", "Club Soda", "Coca-Cola", "Cocktail Onion", "Cocoa Powder", "Coconut Cream", "Coconut Liqueur", "Coconut Milk", "Coconut Rum", "Coconut Syrup", "Coffee Brandy", "Coffee Liqueur", "Coffee", "Cognac", "Cointreau", "Cola", "Cold Water", "Condensed Milk", "Coriander", "Corn Syrup", "Cornstarch", "Corona", "Cranberries", "Cranberry Juice", "Cranberry Liqueur", "Cranberry Vodka", "Cream of Coconut", "Cream Sherry", "Cream Soda", "Cream", "Creme De Almond", "Creme De Banane", "Creme De Cacao", "Creme De Cassis", "Creme De Noyaux", "Creme Fraiche", "Crown Royal", "Crystal Light", "Cucumber", "Cumin Powder", "Cumin Seed", "Curacao", "Cynar", "Daiquiri Mix", "Dark Chocolate", "Dark Creme De Cacao", "Dark Rum", "Dark Soy Sauce", "Demerara Sugar", "Dr. Pepper", "Drambuie", "Dried Oregano", "Dry Vermouth", "Dubonnet Blanc", "Dubonnet Rouge", "Egg White", "Egg Yolk", "Egg", "Eggnog", "Erin Cream", "Espresso", "Everclear", "Fanta", "Fennel Seeds", "Firewater", "Flaked Almonds", "Food Coloring", "Forbidden Fruit", "Frangelico", "Fresca", "Fresh Basil", "Fresh Lemon Juice", "Fruit Juice", "Fruit Punch", "Fruit", "Galliano", "Garlic Sauce", "Gatorade", "Ginger Ale", "Ginger Beer", "Ginger", "Glycerine", "Godiva Liqueur", "Gold rum", "Gold Tequila", "Goldschlager", "Grain Alcohol", "Grand Marnier", "Granulated Sugar", "Grape juice", "Grape soda", "Grapefruit Juice", "Grapes", "Green Chartreuse", "Green Creme de Menthe", "Green Ginger Wine", "Green Olives", "Grenadine", "Ground Ginger", "Guava juice", "Guinness stout", "Guinness", "Half-and-half", "Hawaiian punch", "Hazelnut liqueur", "Heavy cream", "Honey", "Hooch", "Hot Chocolate", "Hot Damn", "Hot Sauce", "Hpnotiq", "Ice-Cream", "Ice", "Iced tea", "Irish cream", "Irish Whiskey", "Jack Daniels", "Jello", "Jelly", "Jagermeister", "Jim Beam", "Johnnie Walker", "Kahlua", "Key Largo Schnapps", "Kirschwasser", "Kiwi liqueur", "Kiwi", "Kool-Aid", "Kummel", "Lager", "Lemon Juice", "Lemon Peel", "Lemon soda", "Lemon vodka", "Lemon-lime soda", "lemon-lime", "lemon", "Lemonade", "Licorice Root", "Light Cream", "Light Rum", "Lillet", "Lime juice cordial", "Lime Juice", "Lime liqueur", "Lime Peel", "Lime vodka", "Lime", "Limeade", "Madeira", "Malibu Rum", "Mandarin", "Mandarine napoleon", "Mango", "Maple syrup", "Maraschino cherry juice", "Maraschino Cherry", "Maraschino Liqueur", "Margarita mix", "Marjoram leaves", "Marshmallows", "Maui", "Melon Liqueur", "Melon Vodka", "Mezcal", "Midori Melon Liqueur", "Midori", "Milk", "Mint syrup", "Mint", "Mountain Dew", "Nutmeg", "Olive Oil", "Olive", "Onion", "Orange Bitters", "Orange Curacao", "Orange Juice", "Orange liqueur", "Orange Peel", "Orange rum", "Orange Soda", "Orange spiral", "Orange vodka", "Orange", "Oreo cookie", "Orgeat Syrup", "Ouzo", "Oyster Sauce", "Papaya juice", "Papaya", "Parfait amour", "Passion fruit juice", "Passion fruit syrup", "Passoa", "Peach brandy", "Peach juice", "Peach liqueur", "Peach Nectar", "Peach Schnapps", "Peach Vodka", "Peach", "Peachtree schnapps", "Peanut Oil", "Pepper", "Peppermint extract", "Peppermint Schnapps", "Pepsi Cola", "Pernod", "Peychaud bitters", "Pina colada mix", "Pineapple Juice", "Pineapple rum", "Pineapple vodka", "Pineapple-orange-banana juice", "Pineapple", "Pink lemonade", "Pisang Ambon", "Pisco", "Plain Chocolate", "Plain Flour", "Plums", "Port", "Powdered Sugar", "Purple passion", "Raisins", "Raspberry cordial", "Raspberry Jam", "Raspberry Juice", "Raspberry Liqueur", "Raspberry schnapps", "Raspberry syrup", "Raspberry Vodka", "Red Chile Flakes", "Red Chili Flakes", "Red Hot Chili Flakes", "Red Wine", "Rhubarb", "Ricard", "Rock Salt", "Root beer schnapps", "Root beer", "Roses sweetened lime juice", "Rosewater", "Rumple Minze", "Rye Whiskey", "Sake", "Salt", "Sambuca", "Sarsaparilla", "Schnapps", "Schweppes Lemon", "Schweppes Russchian", "Sherbet", "Sherry", "Sirup of roses", "Sloe Gin", "Soda Water", "Sour Apple Pucker", "Sour Mix", "Southern Comfort", "Soy Milk", "Soy Sauce", "Soya Milk", "Soya Sauce", "Spiced Rum", "Sprite", "Squeezed Orange", "Squirt", "Strawberries", "Strawberry juice", "Strawberry liqueur", "Strawberry Schnapps", "Strawberry syrup", "Sugar Syrup", "Sugar", "Sunny delight", "Surge", "Swedish punsch", "Sweet and Sour", "Sweet Cream", "Sweet Vermouth", "Tabasco Sauce", "Tang", "Tawny port", "Tea", "Tennessee whiskey", "Tequila rose", "Tia Maria", "Tomato Juice", "Tomato", "Tonic Water", "Triple Sec", "Tropicana", "Tuaca", "Vanilla extract", "Vanilla Ice-Cream", "Vanilla liqueur", "Vanilla schnapps", "Vanilla syrup", "Vanilla vodka", "Vanilla", "Vermouth", "Vinegar", "Water", "Watermelon schnapps", "Whipped Cream", "Whipping Cream", "White chocolate liqueur", "White Creme de Menthe", "White grape juice", "White port", "White Rum", "White Vinegar", "White Wine", "Wild Turkey", "Wildberry schnapps", "Wine", "Worcestershire Sauce", "Wormwood", "Yeast", "Yellow Chartreuse", "Yoghurt", "Yukon Jack", "Zima", "Caramel Sauce", "Chocolate Sauce", "Lillet Blanc", "Peach Bitters", "Mini-snickers bars", "Prosecco", "Salted Chocolate", "Martini Rosso", "Martini Bianco", "Martini Extra Dry", "Fresh Lime Juice", "Fresh Mint", "Rosemary", "Habanero Peppers", "Ilegal Joven mezcal", "Elderflower cordial", "Rosso Vermouth", "Creme de Violette", "Cocchi Americano", "White Vermouth", "Dry Curacao", "Nocino", "Averna", "Ramazzotti", "Fernet-Branca", "Allspice Dram", "Falernum", "Singani", "Arrack", "Blackstrap rum", "Ginger Syrup", "Honey syrup", "Blended Scotch", "Islay single malt Scotch", "151 proof rum", "7-up", "Absinthe", "Absolut citron", "Creme de Mure", "Olive Brine", "Pineapple Syrup", "St. Germain", "Lavender", "Whiskey", "Whisky"];


/*the autocomplete function takes two arguments: the text field element and an array of possible autocompleted values:*/

function autocomplete(inp, arr) {
    var currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);

        /*check if each item starts with the same letters as the text field value:*/
        for (i = 0; i < arr.length; i++) {
            let n = arr[i].toUpperCase().indexOf(val.toUpperCase());
            if (n >= 0) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].substr(0, n) + "<strong>" + arr[i].substr(n, val.length) + "</strong>" + arr[i].substr(n + val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists(); // close the list of autocompleted values
                });
                a.appendChild(b);

                if (a.childElementCount > 10) break; // limits the number of suggestions to the first 10
            }
        }
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
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

    /*a function to classify an item as "active":*/
    function addActive(x) {
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    /*a function to remove the "active" class from all autocomplete items:*/
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    /*close all autocomplete lists in the document, except the one passed as an argument:*/
    function closeAllLists(elmnt) {

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


/*initiate the autocomplete function on the "myInput" element, and pass along the ingredients array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), ingredientList);

$("#search").on("click", searchForDrinks); // the submit button will start the search query

$("#myInput").on("keydown", function (e) { // the enter button wills start the search query
    if (!$("#myInput").val()) return;
    if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        searchForDrinks(e);
    }
});

// query the database for drinks
function searchForDrinks(event) {
    event.preventDefault();

    $.ajax({
        url: APIURL + 'filter.php?i=' + $("#myInput").val(),
        type: "GET"
    }).then(populateDrinkList);
}

function populateDrinkList(response) {
    console.log(response);
    $("#results").empty(); // reset the results div
    $("#query").empty();

    let searchNode = $('<div><b>Ingredient: ' + $("#myInput").val() + '</b></div>');
    $("#query").append(searchNode); // list the input field's contents in the UI
    $("#myInput").val(''); // reset the input field after submit

    if (response.drinks == "None Found") { // the query failed to return any results
        let card = $('<div class="col m4 s6"><h5>No drinks found</h5></div>');
        $("#results").append(card);
        return;
    };

    for (i = 0; i < response.drinks.length; i++) {
        let card = $('<div class="col l4 m6 s12"></div>');
        let body = $('<div class="card">');
        let image = $('<div class="card-image"><img src="' + response.drinks[i].strDrinkThumb + '" class="responsive-img"></div>');
        let title = $('<span class="card-title activator" data-id="' + response.drinks[i].idDrink + '">' + response.drinks[i].strDrink + '</span>');
        // let content = $('<div class="card-content"></div>');
        let reveal = $('<div class="card-reveal"><span class="card-title grey-text text-darken-4">' + response.drinks[i].strDrink + '<i class="material-icons right">close</i></span><p id="card-reveal-' + response.drinks[i].idDrink + '"></p></div>');
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
    let drinkID = event.target.dataset.id;
    let node = $('#card-reveal-' + drinkID);
    if (node.text()) return; // don't repeat API alls for items that already have content in them

    $.ajax({
        url: APIURL + 'lookup.php?i=' + drinkID,
        type: "GET"
    }).then(function (response) {
        let ingredientList = "";
        for (i = 1; i < 16; i++) {
            let m = response.drinks[0]['strIngredient' + i];
            if (m === null) {
                ingredientList = ingredientList.slice(0, ingredientList.length - 2);
                ingredientList += '<br><br>';
                break;
            };
            ingredientList += m + ', ';
        }
        node.html('<b>Ingredients:</b> ' + ingredientList + '<b>Instructions:</b> ' + response.drinks[0].strInstructions);
        console.log(node);
        console.log(response.drinks[0].strInstructions);
    });

}

