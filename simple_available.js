/*jslint browser: true, devel: true, plusplus: true, white: true */

$(function() {
	var url = window.location.href,
		name = url.substr(url.indexOf("wiki/") + "wiki/".length),
		apiUrl = "https://simple.wikipedia.org/w/api.php?action=query&titles=" + encodeURIComponent(name) + "&format=json";

	if (name.indexOf(":") != -1) {
		// Either a special or non-info page
		return;
	}

	$.ajax({
		url: apiUrl,
		type: "GET",
		success: function(result) {
			if (!result.query.pages.hasOwnProperty('-1')) {
				// The API did not return that the page had an index of -1 (non-existant)
				// Show the user that the page is available
				$('#firstHeading.firstHeading').after('<a href="https://simple.wikipedia.org/wiki/' + name + '"><em>(simple available)</em></a>');
			}
		},
		error: function(xhr, status, error) {
			console.log("Error using API: " + error);
		}
	});
});
