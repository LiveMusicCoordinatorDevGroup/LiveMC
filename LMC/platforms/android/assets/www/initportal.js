//initalizes main account page reads stored password and username from file and
// verifies account existance in the backend. if account does not exist then
// puts up a page needs verification alternate

var contactinfo;
var bio;
var availableconnects = new Array();
var requests = new Array();
var requeststo = new Array();
var active;
var name;

var tokens = new Array(3);

var inflate = function(e){
	if(e.enable != '1'){
      $('#innards').remove();
    $('#deny').show();
    $('#deny').css('color', 'white');
}
else{
 document.getElementById('bannertext').innerHTML= "<br>" + e.name + "<br>";
 var output = document.getElementById("pagespace");
 var tes = e.name;
 //<td id="contactinfo"></td><td id="setvisibility"></td><td id="pagedescription"></td><td id="internalrequests"></td><td id="externalrequests">
//create onclick listeners for td to fill in result space
$('#contactinfo').click( function(x){
  output.innerHTML=  e.contactinfo;
});	
$('#setvisibility').click( function(x){
  if(e.active == 'false'){
      output.innerHTML = tes  + " is currently disabled would you like to set your account to active? <br> <button id='atog'>toggle </button>";
  }
  else{
    output.innerHTML = tes + " is currently active and visible to other users would you like to deactivate your visibility? <br> <button id='atog'>toggle </button>";
  }

});
$('#pagedescription').click( function(x){
     output.innerHTML=  e.bio;
});	
$('#internalrequests').click( function(x){
       var markup = "<br> <button  id='req'>REQUESTS</button> <button id='actchoices'>ACTIVE PROFILES</button> <br> <br>"; 
       output.innerHTML = markup;
     // $("#space").append("<ul id='profiles' data-role='listview' data-inset='true' data-divider-theme='d'> </ul>'");
      // $("#profiles").listview("refresh");
       var url = "http://127.0.0.1/accountrequests.php?callback=?";
       $.getJSON(url, { usrid : tokens[0], type : tokens[2]}, function(k){
      
      $('#actchoices').click(function(){ 
          $('li').remove();
        for( var i = 0; i < k.available.length; i++){
          var block = "";
        for(var j = 0; j < k.available[i].length; j++){
         
            block = block + k.available[i][j] + "  <br>"
      }
      block = "<li data-role='list-divider'>" + block + "</li>"; 
     // alert(block);
        $('#lis').append(block).listview("refresh");
      }
    });

      $('#req').click(function(){
        $('li').remove();
        for( var i = 0; i < k.requests.length; i++){
        
        $('#lis').append( "<li data-role='list-divider'>" + k.requests[i] + "</li>").listview("refresh");
      }

      });



       });
      // populate with php file request for specific table
      // alternatively create side tab that shows all active selections
      //list views
});	
$('#externalrequests').click( function(x){

    //populate with all opposite entries that have requested this account all active accounts->requested_id->name = e.name
});

}

	}

var addr = window.location.href;
var look = window.location.search.substring(1);
var vars = look.split('&');
for(var i = 0; i < vars.length; i++){
   var pair = vars[i].split("=");
    tokens[i] = pair[1];
}

if(tokens[2] == "band"){
var url = 'http://127.0.0.1/bandrecord.php?callback=?&username=' + tokens[0] + "&password=" + tokens[1];
	$.getJSON(url, inflate);
}
else{
   var url = 'http://127.0.0.1/venuerecord.php?callback=?&username=' + tokens[0] + "&password=" + tokens[1];
	$.getJSON(url, inflate);
}


