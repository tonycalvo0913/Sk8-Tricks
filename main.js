//API Key from Airtable 
//var api_key = 'keyB7EQxA9Lt2lvXE'
//This is the url from the Airtable Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201?api_key=keyB7EQxA9Lt2lvXE';

var listView = function(id, trickname, difficulty, category) {
    return `<div class="col-sm-3">
        <div class="card-body">
          <h2><a href="?id=${id}">${trickname}</a></h2>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${category}</small>
          </div>
        </div>
    </div>`;
  }
// This is where we get the JSON data from Airtable!

$.getJSON( airtable_list_url, function( data ) {
  var html = [];
  html.push(`<div class="row">`);
  // 2. Iterates over every record and uses the list template
  $.each( data.records, function( index, val ) {
    // console.log(val.fields)
    var id = val.id;
    var fields = val.fields;
    var trickname = fields["TrickName"];
    var imageUrl = fields["Image"] ? fields["Image"][0].url : '';
  });
  $(".list-view").append(items.join(''));
});

