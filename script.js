var drinksCard = $(".drinksCard")
var yesBtn = $(".yes")
var noBtn = $(".no")
var buttonsDiv = $(".yesOrNo")

// hiding the drinks card at the page load

drinksCard.hide()


// logic for yes or no on landing page
buttonsDiv.on("click", (event) => {
    console.log(event.target);

})

var drinkList = ["Vodka", "not Vodka", "kjsdgs", "shdfhsjgf"]

{/* <div class="opt1">
<label for="country">Country</label>
<select id="country" name="country">
    <option value="australia">Australia</option>
    <option value="canada">Canada</option>
    <option value="usa">USA</option>
</select>
</div> */}


for (var i = 0; i < 4; i++) {
    var wrapper = $("<div>")
    wrapper.attr("class", "opt1")
    var label = $("<label>")
    label.attr("for", "drinks")
    label.text("Drinks")
    var select = $("<select>")
    select.attr("id", "drink" + i)
    select.attr("name", "drinks")
    wrapper.append(label, select)
    for (var j = 0; j < drinkList.length; j++) {
        var option = $("<option>")
        option.attr("value", drinkList[j])
        option.text(drinkList[j])
        select.append(option)
    }
    $(".form").append(wrapper)


}