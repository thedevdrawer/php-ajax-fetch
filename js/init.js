// jQuery AJAX call for autocomplete
$(document).ready(function () {
	$("#ajaxcountry").on("keyup", function () { // when keyup
		$.ajax({ // ajax call starts
			type: "POST", // POST method
			url: "/src/functions.php", // the file to call
			data: "search=" + $(this).val(), // value of the input
			success: function (response) { // data is returned from the php page
				$(".country-list").html(""); // remove all child nodes of the div
				$(".country-list").show(); // show the div
				$.each(JSON.parse(response), function (i, item) { // loop though the response
					$(".country-list").append("<li>" + item + "</li>"); // append the response to the div
				});
			},
		});
	});
	$(".country-list").on("click", "li", function () { // when a list item is clicked
		var val = $(this).text(); // get the text of the clicked item
		selectCountry(val) // call the function to select the item
	});
});

// vanilla JS for autocomplete
window.addEventListener("load", function(e) { // when the page loads
    document.querySelector("#vanillacountry").addEventListener("keyup", function (e) { // when keyup
        fetch("/src/functions.php", { // fetch the file
            method: "POST", // POST method
            headers: { "Content-Type": "application/x-www-form-urlencoded" }, // set the content type
            body: "search=" + this.value // value of the input
        }).then(function (response) { // when the response is returned
            return response.text(); // return the response
        }).then(function (response) { // when the response is returned
            var countryList = document.querySelector(".country-list"); // get the country list
            countryList.innerHTML = ""; // remove all child nodes of the div
            countryList.style.display = "block"; // show the div
            JSON.parse(response).forEach(function (item) { // loop though the response
                var li = document.createElement("li"); // create a list item
                li.innerHTML = item; // set the text of the list item
                countryList.appendChild(li); // append the list item to the div
            });
        });
    });
});

document.querySelector(".country-list").addEventListener("click", function (e) { // when a list item is clicked
    if (e.target.tagName === "LI") { // if the clicked item is a list item
        selectCountry(e.target.innerHTML); // call the function to select the item
    }
})

function selectCountry(val) { // function to select the item
    $("#ajaxcountry").val(val); // set the value of the input to the value of the clicked item
    document.querySelector("#vanillacountry").value = val; // set the value of the input to the value of the clicked item
    $(".country-list").hide(); // hide the div
}