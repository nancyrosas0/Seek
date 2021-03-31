$(document).ready(function () {
  console.log("ready!");

  function isEventsPage() {
    console.log(window.location);

    if (window.location.href.includes("events")) {
      console.log("on events page");
      if (localStorage.getItem("homepage-city") != null) {
        var hpCity = localStorage.getItem("homepage-city");
        localStorage.removeItem("homepage-city");
        hpCity = JSON.parse(hpCity);
        apiCall(hpCity);
        getWeather(hpCity);
      }
    }
  }
  isEventsPage();

  // add on click event for event button search

  $("#submit-hp").on("click", function (e) {
    e.preventDefault();
    if ($("#events").val() == "") {
      swal("Please enter a valid city before proceeding");
      return false;
    }

    localStorage.setItem(
      "homepage-city",
      JSON.stringify($("#events").val().trim().toLowerCase())
    );

    window.location.href = "events.html";
  });

  $("#submit").on("click", function () {
    var city = $("#events1").val();
    //   $("#submit").load("events.html");
    $("#cards").empty();

    apiCall(city);
  });

  function apiCall(city) {
    console.log(city);
    $.ajax({
      type: "GET",
      url:
        "https://app.ticketmaster.com/discovery/v2/events.json?city=" +
        city +
        "&size=20&sort=date,name,asc&apikey=hTQelPqAC1V3ziATGBzhiGUioXfc5fbi",
      async: true,
      dataType: "json",
      success: function (json) {
        console.log(json);
        if (json.page.totalElements == 0) {
          swal("Please enter a valid city before proceeding");
          return;
        }

        // for loop through 5 events per time
        var events = json._embedded.events;
        for (var i = 0; i < events.length; i++) {
          console.log(i);
          // create cards dynamically
          var cards = $(`
            <div class="columns">
            <div class="column is-full">
              <div class="card">
              
              <section class="test1">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="${json._embedded.events[i].images[4].url}"
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">
                        ${json._embedded.events[i].name}   
                        ${getTwitter(json, i)}
                    
                        ${getFacebook(json, i)}
                      </p>
                      <p class="subtitle-1 is-6">
                      ${getHomepage(json, i)}
                      </p>
                      <br>
                      <div class="content">
                      ${json._embedded.events[i].name}.
                      <br />
                    </div>
                  </div>

                    </section>
    
                    <section class="test2">
                    <p>
                      <strong>Date & Time</strong>
                      
                      <br>
                      ${json._embedded.events[i].dates.start.localDate} at
                      ${json._embedded.events[i].dates.start.localTime}
                      <br>
                      
                      <strong>Location</strong>
                      
                      <br>
                      ${json._embedded.events[i]._embedded.venues[0].name} 
                      <br>
                      <br>
                      <a href="${json._embedded.events[i].url}"
                        ><strong>Click Here to Buy Tickets</strong></a
                      >
                      </p>
                    </section>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
            `);
          // append cards to div
          $("#cards").append(cards);
        }
      },
      error: function (xhr, status, err) {
        // in case of error load message
        console.log("An error has ocurred");
      },
    });
  }
});

function getTwitter(json, i) {
  if (
    json?._embedded.events[i]?._embedded?.attractions?.[0]?.externalLinks
      ?.twitter?.[0]?.url
  ) {
    return `<a
    href="${json._embedded.events[i]._embedded.attractions[0].externalLinks.twitter[0].url}"
    > <i class="fab fa-twitter fa-xs"></i> 
  </a>`;
  }
  return ``;
}

function getHomepage(json, i) {
  if (
    json?._embedded.events[i]?._embedded.attractions?.[0]?.externalLinks
      ?.homepage?.[0]?.url
  ) {
    return `<a> <i>${json._embedded.events[i]._embedded.attractions[0].externalLinks.homepage[0].url} </i>
  </a>`;
  }
  return ``;
}

function getFacebook(json, i) {
  if (
    json?._embedded.events[i]?._embedded?.attractions?.[0]?.externalLinks
      ?.facebook?.[0]?.url
  ) {
    return `<a
    href="${json._embedded.events[i]._embedded.attractions[0].externalLinks.facebook[0].url}"
    ><i class="fab fa-facebook fa-xs"></i>
  </a>`;
  }
  return ``;
}
