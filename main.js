// Helper for getting the `index.html?ID=` part form the URL
var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Airtable API Key, unique per user
var api_key = 'keyB7EQxA9Lt2lvXEkeyB7EQxA9Lt2lvXE'

//This is the url from the Airtable Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201?api_key=keyB7EQxA9Lt2lvXE';

var listView = function(id, trickname, difficulty, category, tips, tricktype) {
    return `<div class="col-sm-6">
    <div class="card mb-4 box-shadow">
          <h2><a href="?id=${id}">${trickname}</a></h2>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${category}</small>
            <small class="text-muted">${difficulty}</small>
            <small class="text-muted">${tips}</small>
            <small class="text-muted">${tricktype}</small>
          </div>
        </div>
    </div>`;
  }
// Get and display the data for all items
 var getDataForList = function() {  
  // This is where we get the JSON data from Airtable!
  $.getJSON( airtable_list_url, function( data ) {
    //console.log(data.records);
    var html = [];
    html.push(`<div class="row">`);
    // 2. Iterates over every record and uses the list template
    $.each( data.records, function( index, val ) {
     //console.log(val.fields)
        var id = val.id;
        var fields = val.fields;
        var trickname = fields["TrickName"];
        var category= fields["Category"];
        var difficulty = fields["Difficulty"];
        var tricktype = fields["TrickType"];
        var tips = fields["Tips"];
        var itemHTML = listView(id, trickname, difficulty, category, tricktype, );
        html.push(itemHTML);
    });
    html.push(`</div>`);
  // 3. Adds HTML for every item to our page
  $(".list-view").append(html.join(""));
});
}

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, trickname, pictureUrl, difficulty, category, tips, instructions) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${pictureUrl}">
      <div class="card-body">
        <h2><a href="?id=${id}">${trickname}</a></h2>
        <p class="card-text">${category}</p>
        <p class="card-text">${tips}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${difficulty}</small>
          <small class="text-muted">${instructions}</small>
        </div>
        <hr />
      </div>
    </div>
  </div>`;
}

// Get and display the data for one item based on on the ID
var getDataForId = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201/${id}?api_key=keyB7EQxA9Lt2lvXE`, function( record ) {
    //console.log(data);
    var html = [];
    html.push(`<div class="row">`);
      //console.log(val)
      var id = record.id;
      var fields = record.fields;
      var trickname = fields["TrickName"];
      var pictureUrl = fields["Image"] ? fields["Image"][0].url : '';
      var difficulty = fields["Difficulty"];
      var category = fields["Category"];
      var  instructions = fields["Instructions"];
      var tips= fields["Tips"];
      var itemHTML = detailView(id, trickname, pictureUrl, instructions, difficulty, category, tips);
      html.push(itemHTML);
    html.push(`</div>`);
    $(".detail-view").append(html.join(""));
  });
}

// Do we have an ID in the URL?
var id = getParameterByName("id");

// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}

