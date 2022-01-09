console.log("Chrome plus has loaded!");

// pull html from a webpage as a string in (html)

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(msg, sender, sendResponce) {
  console.log(msg);

  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].innerHTML = msg.txt;
  }
}

function loadCourses() {
  //using lodeded corses becasue some of the module fetches take longer to load than others and the modules may get mixed up
  var loadedCourses = [];

  $.getJSON("/api/v1/users/self/favorites/courses", function (courses) {
    console.log(courses);
    $.each(courses, function (i, course) {
      var onCourse = i;
      let courseTitle = $(`<h3>${course.name}</h3>`);
      loadedCourses.push(courseTitle);



      //do this
      $.getJSON(`/api/v1/courses/${course.id}?include=course_image`, function (course) {
        console.log(course.image_download_url)
      })



      //load modules
      $.getJSON(
        `/api/v1/courses/${course.id}/modules?include=items`,
        function (modules) {
          list = $("<ul></ul>");

          //load a module group
          $.each(modules, function (i, module) {
            var item = $(`<li class="module-group">${module.name}</li>`);

            items = module.items;
            itemsList = $("<ul></ul>");

            //load the pages in the module
            $.each(items, function (i, item) {
              let htmlItem = $(`<li class="module-item">${item.title}</li>`);

              //store the url to the page
              htmlItem.data("url", item.url);
              htmlItem.data("type", item.type)
              itemsList.append(htmlItem);

              //when you click on any module-item
              htmlItem.click(function () {
                var item = this
                var url = $(item).data("url");

                //load page content into #page
                $.getJSON(
                  url,
                  function (page) {
                    var pageHTML = '';

                    //get content of page depending on what type it is
                    let type = $(item).data("type")
                    switch (type) {
                      case "Assignment":
                        pageHTML = page.description
                      case 'Page':
                        pageHTML = page.body
                    }
                    
                    pageHTML += type
                    console.log(pageHTML)
                    console.log(page)

                    console.log(pageHTML);
                    $("#page").html(pageHTML);
                  }
                );
              });
            });
            item.append(itemsList);
            list.append(item);
            courseTitle.append(list);
            $("#courses").append(loadedCourses[onCourse]);
          });
        }
      );
    });
  });
}

function loadPages() {
  $(".module-item").click(function () {
    var url = this.data("url");
    console.log(url);
  });
}

//load corses:
var html = `
	<div class="container">
		<div id="courses"></div>
		<div id="page"></div>
	</div>`;

$("body").empty();
$("body").append(html);
loadCourses();
loadPages();

/*
						//load a page
						$.getJSON(
							item.url,
							function (body) {
								itemsList.append(body.normalize())
						})
						*/
