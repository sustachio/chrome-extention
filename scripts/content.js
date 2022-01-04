console.log("Chrome plus has loaded!");

// pull html from a webpage as a string in (html)

let paragraphs = $("p");
chrome.runtime.onMessage.addListener(gotMessage);
clearPage($("body"));
main()

function gotMessage(msg, sender, sendResponce) {
	console.log(msg)

	for (let i = 0; i < paragraphs.length; i++) {
		paragraphs[i].innerHTML = msg.txt
	}
}


function clearPage(parent) {
    parent.empty();
	if (!(parent.firstChild)) {
		console.log("page wiped");
	}
}
// problem: i cant get the modules data outside of the getJSON
function loadmodules(course_id) {
	$.getJSON(
		`/api/v1/courses/${course_id}/modules?include=items`,
		function( modules_data ) {
			console.log(modules_data)
		}
	)
}


function loadCourses(courses) {
	console.log("Courses:")
	console.log(courses)
	for (let i = 0; i < courses.length; i++) {
		//load a course (class)
		course = $("body").append($("<h3></h3>").text(courses[i].name));
		$.getJSON(
			"/api/v1/courses/${course_id}/modules?include=items",
			loadmodules
		)
	}
}

function main() {
	$.getJSON(
		"/api/v1/users/self/favorites/courses",
		loadCourses
	)
}

/*
// styles for the dropdown
$("head").append("<style>.dropdown-content-chromev2 { display: none; position: absolute; width: 50%; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; background-color: white; color: black; } .dropdown-chromev2:hover .dropdown-content-chromev2 { display: block; } .drop-link-chromev2:hover .dropdown-content-chromev2 { display: block; }.dropdown-chromev2:hover .drop-link-chromev2 { color: #3e8e41; }</style>");

var links = $("a");
var html = "<h1>no</h1>";
var loaded = [];


// run for every link
links.each(function() {

	// the div that has everything (dropdown) + class for the link
	$(this).wrap('<div class="dropdown-chromev2"></div>');
	$(this).addClass("drop-link-chromev2");

	// the dropdown content div
	$(this).parent().append('<div class="dropdown-content-chromev2"></div>');

	// hide the content
	$(this).siblings().next().hide();
});

// Load + display link page content
$(".dropdown-chromev2").hover(onHover, offHover)

function onHover() {
	// get the url that the link leds to
	let href = $(this).children().first().attr("href");

	// see if the link has already been loaded
	if (!(loaded.some(x => x.url === href))) {
		console.log("Fetching data...");
		$.ajax({
   			url: href,
   			type: 'GET',
   		success: function(data){
			html = data;
			console.log('Data success!');
		}, 
		error: function(xhr, status, error) {
			var err = eval("(" + xhr.responseText + ")");
			html = '<h1></h1><br><h3>Debug:</h3><br><small>' + err.Message + '</small>';
			console.log("Data fetch failed: " + err.Message)
		}
	});
		loaded.push({
			url: href,
			content: html
		});
	// if the link has been loaded
	} else {
		html = loaded.find(x => x.url === href).content;
	}

	console.log(href);
	console.log($(this).children().first().attr("href"));
	console.log(loaded);
	// sets the dropdown's content to the page
	$(this).children().last().html(html);
	$(this).children().last().show();
};

function offHover() {
	$(this).children().last().hide();
};


*/

/*
Starting html:

<a href="123.org">Click Me!</a>



Desired result:

<div class="dropdown">
	<a class="drop-link" href="123.org">Click Me!</a>
	<div class="dropdown-content">
		(content of 123.org)
	</div>
</div>


css:

.dropdown-content {
	display: none;
	position: absolute;
	min-width: 50%;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	z-index: 1;
}

.dropdown:hover .dropdown-content {display: block;}
.drop-link:hover .dropdown-content {display: block;}
.dropdown:hover .drop-link {background-color: #3e8e41;}
*/