//API Key from Airtable 
//var api_key = 'keyB7EQxA9Lt2lvXE'
//This is the url from the Airtable Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201?api_key=keyB7EQxA9Lt2lvXE';

var listView = function(id, trickname, image, category) {
    return `<div class="col-sm-3">
      <div class="card mb-4 box-shadow">
        <a href="?id=${id}"><img class="card-img-top" src="${image}"></a>
        <div class="card-body">
          <h2><a href="?id=${id}">${trickname}</a></h2>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${category}</small>
          </div>
        </div>
      </div>
    </div>`;
  }
// This is where we get the JSON data from Airtable!

$.getJSON( airtable_list_url, function( data ) {
  var items = [];
  $.each( data.records, function( key, val ) {
    console.log(val.fields)
    items.push(`<h2>${val.fields['TrickName']}</h2>`);
  });
  $(".list-view").append(items.join(''));
});

