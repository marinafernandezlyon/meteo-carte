$("document").ready(function() {
 
 $("#add-city").click(function(event) {
   var cityName = $("#city").val();
   if(cityName.length < 3) {
     event.preventDefault();

     $(".alert-danger").html("Vous devez saisir au moins 3 caractères !");
     $(".alert-danger").fadeIn();
   }
 });
 

 var deleteCity = false;
 $(".delete").click(function(event) {
  
  if(deleteCity == false) {  
    event.preventDefault(); 
    deleteCity = true; 
    var link = $(this);
    link.parent().fadeOut( function() {
      
      link.find("span").trigger("click");
      
    });
  
  }  
 });
 
 
 $("#cityList").sortable();
 $("#cityList").on( "sortupdate", function( event, ui ) {
   console.log( $("#cityList").sortable("toArray") );
   var data = $("#cityList").sortable("toArray");
   $.get("/sort", { sortData: data });
 });
 
  
  var map = L.map('mapid');
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
 
  
  var lon;
  var lat;
  $("li").each(function(index) {
    
    if(index == 0){
      lon = $(this).data("lon");
      lat = $(this).data("lat");
    }
    
    var tempMin = $(this).find(".temp-min").text();
    var tempMax = $(this).find(".temp-max").text();
    L.marker([$(this).data("lat"), $(this).data("lon")]).addTo(map).bindPopup("temp min: "+tempMin+" | temp max: "+tempMax);
  });
    
  map.setView([lat, lon], 13)  
    
  
  $("li").click(function(){
    lat = $(this).data("lat");
    lon = $(this).data("lon");
    map.setView([lat, lon], 13);
    
  });
  
})



