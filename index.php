<?php 
	//Get variables from form
	$StreetAddress = $_GET['StreetAddress'];
	$City = $_GET['City'];
	$State = $_GET['State'];
	$Degree = $_GET['Degree'];

	//Get the URL for google maps
	//var_dump ($StreetAddress);
	$StreetAddress = urlencode($StreetAddress);
	//var_dump ($StreetAddress);
	$City =   urlencode($City);
	$State =   urlencode($State);
	$String =  $StreetAddress . "," .$City ."," .$State;
	$googleapikey= "AIzaSyA4HHT24SgpTljU1ksbqlUkkheRT7Va8nw";
	$Fullurl = "https://maps.googleapis.com/maps/api/geocode/xml?address=".$String."&key=".$googleapikey;
	//echo $Fullurl;
	// Create SimpleXML object from XML Content and get latitude longitude
	$responsexml = file_get_contents($Fullurl);
	$responsexml = simplexml_load_string($responsexml);
$geocode_status = $responsexml->status;
if ($geocode_status=='OK') {
	$latitude = $responsexml->result->geometry->location->lat;
	$longitude = $responsexml->result->geometry->location->lng;

	//var_dump ($latitude) ;
	//var_dump ($longitude);
	//Check for no latitude longitude returned, then the link to api will be bad
	if (($latitude=="") || ($longitude==""))
	{
		

	}
	
	//get url for forecast.io using the latitude longitude
	$myapikey= "e89030c48810a558fe2cbf8a28e169a4" ;
	$forecastiourl = "https://api.forecast.io/forecast/".$myapikey."/" . $latitude. "," . $longitude ."?units=" . $Degree ."&exclude=flags";
	//echo $forecastiourl;
	//Json decode to get the contents 
	$weather=file_get_contents($forecastiourl);
	if ($weather == false)
	{
		//do_alert("Cannot derive weather data from forecast.io for the given address.!");
	}
	$weatherop = json_decode($weather);
	echo json_encode($weatherop);


		//Set default timezone_abbreviations_list	
	$timezonereturned = $weatherop->timezone;			
	date_default_timezone_set($timezonereturned);
}
?>