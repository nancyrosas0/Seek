var searchBtn = $(".searchBtn");
var searchInput = $(".storageInput");
var cityNameEl = $(".cityName");


searchBtn.on("click", function(e) {
    e.preventDefault();
    if (searchInput.val() === "") {
      alert("Please input City name");
      return;
    }