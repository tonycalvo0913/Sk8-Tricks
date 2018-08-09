//API Key from Airtable 
//var api_key = 'keyB7EQxA9Lt2lvXE'
//This is the url from the Airtable Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201?api_key=keyB7EQxA9Lt2lvXE';

var listView = function(id, trickname, difficulty, category) {
    return `<div class="col-sm-3">
    <div class="card mb-4 box-shadow">
          <h2><a href="?id=${id}">${trickname}</a></h2>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${category}</small>
            <small class="text-muted">${difficulty}</small>
          </div>
        </div>
    </div>`;
  }
// Get and display the data for all items
 var getDataForList = function() {  
  // This is where we get the JSON data from Airtable!
  $.getJSON( airtable_list_url, function( data ) {
    console.log(data.records);
    var html = [];
    html.push(`<div class="row">`);
    // 2. Iterates over every record and uses the list template
    $.each( data.records, function( index, val ) {
     console.log(val.fields)
        var id = val.id;
        var fields = val.fields;
        var trickname = fields["TrickName"];
        var category= fields["Category"];
        var difficulty = fields["Difficulty"];
        var itemHTML = listView(id, trickname, difficulty, category);
        html.push(itemHTML);
    });
    html.push(`</div>`);
	// 3. Adds HTML for every item to our page
  $(".list-view").append(html.join(""));
});
}

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, trickname, imageUrl, difficulty, category, tips, instructions) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${imageUrl}">
      <div class="card-body">
        <h2>${trickname}</h2>
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