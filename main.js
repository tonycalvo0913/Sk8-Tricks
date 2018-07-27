//API Key from Airtable 
//var api_key = 'keyB7EQxA9Lt2lvXE'
//This is the url from the Airtable Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201?api_key=keyB7EQxA9Lt2lvXE';

var cardTemplate = function(name, address, picture) {
    return `
      <div class="card col-sm-4">
        <img src="${picture}" class="card-img-top"alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${address}</p>
          <a href="#" class="btn btn-primary">See Details</a>
        </div>
      </div>`;
    }
    
// This is where we get the JSON data from Airtable!

$.getJSON( airtable_list_url, function( data ) {
  var items = [];
  $.each( data.records, function( key, val ) {
    console.log(val.fields)
    items.push(`<h2>${val.fields['Trick Name']}</h2>`);
  });
  $(".list-view").append(items.join(''));
});

