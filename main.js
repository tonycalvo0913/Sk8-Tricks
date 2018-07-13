//This is the url from the Airtable Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appG4GemUBkB0ygAy/Table%201?api_key=keyB7EQxA9Lt2lvXE';

//This is where we get JSON data from Airtable
$.getJSON( airtable_list_url , function( data ){
    console.log( data )
    var item = [];
    $.each( data, function( key, val ){
        console.log(val.fields)
        items.push(`<h2>${val.fields['Name']}</h2>`);
    });
    $(".list-view").append(items.join(''));
});
