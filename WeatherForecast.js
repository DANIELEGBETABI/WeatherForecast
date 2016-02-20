	
var map;


			function generatemap(lat,lon)
			{
				    
if(map!=null)
									
{
		map_destroy(map);
}

				var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
				var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
				var position       = new OpenLayers.LonLat(lon,lat).transform( fromProjection, toProjection);
				map = new OpenLayers.Map("Mapthing");									
				// Create OSM overlays
				var mapnik = new OpenLayers.Layer.OSM();

				var layer_precipitation = new OpenLayers.Layer.XYZ(
				"precipitation",
				"http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
					{
						isBaseLayer: false,
						opacity: 0.5,
						sphericalMercator: true
					}
				);
				
				var layer_cloud = new OpenLayers.Layer.XYZ(
					"clouds",
					"http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
					{
						isBaseLayer: false,
						opacity: 0.5,
						sphericalMercator: true
					}
					
				);
				
				
				map.addLayers([mapnik,layer_precipitation,layer_cloud]);
				
				map.setCenter(position,9);
			
			
				
			}
			

			
			
	function get_icon_url(weathericon)
		{
			switch (weathericon)
				{
					case 'clear-day':
							var imgsrc = 'img/clear.png';
							var alt = "Clear" ;
							break;
					case 'clear-night':
							var imgsrc = 'img/clear_night.png';
							var alt = "Clear";
							break;
					case 'rain':
							var imgsrc = 'img/rain.png';
							var alt = "Rain" ;
							break;
					case 'snow':
							var imgsrc = 'img/snow.png';
							var alt = "Snow" ;
							break;
					case 'sleet':
							var imgsrc = 'img/sleet.png';
							var alt = "Sleet" ;
							break;
					case 'wing':
							var imgsrc = 'img/wind.png';
							var alt = "Wind" ;
							break;
					case 'fog':
							var imgsrc = 'img/fog.png';
							var alt = "Fog" ;
							break;
					case 'cloudy':
							var imgsrc = 'img/cloudy.png';
							var alt = "Cloudy" ;
							break;
					case 'partly-cloudy-day':
							var imgsrc = 'img/cloud_day.png';
							var alt = "Partly-Cloudy" ;
							break;						
					case 'partly-cloudy-night':
							var imgsrc = 'img/cloud_night.png';
							var alt = "Partly-Cloudy" ;
							break;				
				}
			return imgsrc;
		}
		function get_alt_text(weathericon)
		{
			switch (weathericon)
				{
					case 'clear-day':
							var alt = "Clear" ;
							break;
					case 'clear-night':
							var alt = "Clear";
							break;
					case 'rain':
							var alt = "Rain" ;
							break;
					case 'snow':
							var alt = "Snow" ;
							break;
					case 'sleet':
							var alt = "Sleet" ;
							break;
					case 'wing':
							var alt = "Wind" ;
							break;
					case 'fog':
							var alt = "Fog" ;
							break;
					case 'cloudy':
							var alt = "Cloudy" ;
							break;
					case 'partly-cloudy-day':
							var alt = "Partly-Cloudy" ;
							break;						
					case 'partly-cloudy-night':
							var alt = "Partly-Cloudy" ;
							break;				
				}
			return alt;
		}
		
		function convert_time(sunriseunixtime,returnedtimezone)
		{
									
									var sunrise = moment.unix(sunriseunixtime);
									var formattedsunriseTime = sunrise.tz(returnedtimezone).format('hh:mm A');
									return formattedsunriseTime;
		}
		function clearfields()
			{			
				$("#resultcontainer").addClass('hidden');
				$("#errorblock").addClass('hidden');			
	
				return;
			}
			

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '140958359594371',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   
   
function map_destroy(oldmap)
{
oldmap.destroy();

}


			
function Next7HoursDataGeneration (data,City,returnedtimezone,windspeedunit,visiblityunit,PressureUnit)
{
	
	
	var DayArray = [ "Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday", "Friday" , "Saturday"];
	var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var DataDaily = data.daily.data;
    for (i=1;i<=7;i++)
	{
		var tab3data = "";

	    var UnixDate = (DataDaily[i].time)*1000;
		var DayOfWeek = DayArray[ moment(UnixDate).day()];
		var Month = MonthArray[moment(UnixDate).get('month')]; 
		var Date = moment(UnixDate).get('date');
		var MonthDate = Month + " " + Date;
		var IconUrl = get_icon_url(data.daily.icon);
		var MinTemp = Math.round(DataDaily[i].temperatureMin) + "&deg";
		var MaxTemp = Math.round(DataDaily[i].temperatureMax) + "&deg";

		tab3data = tab3data + "<div class='bold-modal' data-target=\"#Next7DaysModal" +i+"\" data-toggle='modal'><DataDaily>"+DayOfWeek+"</DataDaily></div>";
		tab3data = tab3data + "<div class='bold-modal' data-target=\"#Next7DaysModal" +i+"\" data-toggle='modal'><DataDaily>"+MonthDate+"</DataDaily></div>";
		tab3data = tab3data + "<img class='bold-modal' data-target=\"#Next7DaysModal" +i+"\" style='max-width:70px;' data-toggle='modal' src=" +IconUrl+" ></DataDaily></img>"; 
		tab3data = tab3data + "<div class='bold-modal-minmaxtemp col-xs-offset col-xs-12' data-target=\"#Next7DaysModal" +i+"\" data-toggle='modal' > <DataDaily>Min Temp </DataDaily></div>";
		tab3data = tab3data + "<div class='bold-modal temp-big' data-target=\"#Next7DaysModal" +i+"\" ' data-toggle='modal'><DataDaily>"+MinTemp+"</DataDaily></div>";
		tab3data = tab3data + "<div class='bold-modal-minmaxtemp col-xs-offset col-xs-12' data-target=\"#Next7DaysModal" +i+"\" data-toggle='modal' > <DataDaily>Max Temp </DataDaily></div>";
		tab3data = tab3data + "<div class='bold-modal temp-big' data-target=\"#Next7DaysModal" +i+"\" ' data-toggle='modal'><DataDaily>"+MaxTemp+"</DataDaily></div>";
		var id = "Next7Days" + i ; 
  		document.getElementById(id).innerHTML=tab3data;
		
		//Modal stuff
		var summary = DataDaily[i].summary;
		
		var tab3modal= "";
		var ModalTitle = "Weather in " + City + " on " + MonthDate;
		var FormattedSunriseTime = convert_time(DataDaily[i].sunriseTime,returnedtimezone) ;
		var FormattedSunsetTime = convert_time(DataDaily[i].sunsetTime,returnedtimezone);
		var Humidity = ((DataDaily[i].humidity)==undefined)? "N.A" : + (DataDaily[i].humidity)*100 + "%";
		var WindSpeed = ((DataDaily[i].windSpeed)==undefined)? "N.A" : + (DataDaily[i].windSpeed) + windspeedunit;
		var Visibility = ((DataDaily[i].visibility)==undefined)? "N.A" : + (DataDaily[i].visibility) + visiblityunit;
		var Pressure = ((DataDaily[i].pressure)==undefined)? "N.A" : + (DataDaily[i].pressure) + PressureUnit;
		var ModalBody = "";
		
		ModalBody = ModalBody + " <div class='row'>";
		ModalBody = ModalBody + " 	<div class='text-center col-md-12 modal-icon-padding '><img style='max-width:170px;max-height:170px;' src="+ IconUrl + "></img>";
		ModalBody = ModalBody + " </div></div>";
		ModalBody = ModalBody + " <div class='row'>";	
		ModalBody = ModalBody + " 	<div class=' col-md-12 modal-body-day-summary modal-icon-padding'>" + DayOfWeek + ": " + "<span style='color:orange'>" + summary +"</span>";		
		ModalBody = ModalBody + " </div></div><div></div>";
		ModalBody = ModalBody + " <div class='row' style='padding-bottom:15px;'>";			
		ModalBody = ModalBody + " 	<div class='col-md-4'> <p class='bold-modal'>Sunrise Time</p><p>" + FormattedSunriseTime + "</p>";		
		ModalBody = ModalBody + " 	</div>";		
		ModalBody = ModalBody + " 	<div class='col-md-4'>";
		ModalBody = ModalBody + " 		<p class='bold-modal'> Sunset Time </p> <p>" + FormattedSunsetTime + "</p>";		
		ModalBody = ModalBody + " 	</div>";				
		ModalBody = ModalBody + " 	<div class='col-md-4'>";
		ModalBody = ModalBody + " 		<p class='bold-modal'>Humdity</p><p>" + Humidity+ "</p>";
		ModalBody = ModalBody + " </div></div>";	 
		ModalBody = ModalBody + " <div class='row' >";			 
		ModalBody = ModalBody + " 	<div class='col-md-4'>";
		ModalBody = ModalBody + " 		<p class='bold-modal'>Wind Speed</p><p>" + WindSpeed+"</p>";
		ModalBody = ModalBody + " 	</div>";
		ModalBody = ModalBody + " 	<div class='col-md-4'>"; 
		ModalBody = ModalBody + " 		<p class='bold-modal'>Visibility</p><p>" + Visibility + "</p>";
		ModalBody = ModalBody + " 	</div>";
		ModalBody = ModalBody + " 	<div class='col-md-4'>"; 
		ModalBody = ModalBody + " 		<p class='bold-modal'>Pressure </p><p>" + Pressure +"</p>";
		ModalBody = ModalBody + " </div></div>";
		
		tab3modal = tab3modal +	"<div class='modal-dialog'> ";
		tab3modal = tab3modal +	"<div class='modal-content'>"; 
		tab3modal = tab3modal +	"<div class='modal-header'>"; 
		tab3modal = tab3modal +	"<button type='button' class='close' data-dismiss='modal'> \&times </button>"; 
		tab3modal = tab3modal +	"<h4 class='modal-title modal-title-mine'>" + ModalTitle +  "</h4>";  
		tab3modal = tab3modal +	"</div>";
		tab3modal = tab3modal +	"<div class='modal-body'> <div >" + ModalBody + "</div> ";
		tab3modal = tab3modal +	"<div class='modal-footer'> ";
		tab3modal = tab3modal +	"<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
		tab3modal = tab3modal +	"</div>";
		tab3modal = tab3modal +	"</div>";
		var idModal = "Next7DaysModal" + i ;
		document.getElementById(idModal).innerHTML=tab3modal; 
    }

}
function generatetab2data(data,temperatureunit,returnedtimezone,windspeedunit,visiblityunit,PressureUnit)
{
document.getElementById("Mytemp").innerHTML=" Temp (" + temperatureunit+")";
									var tab2data="<tr> <td></td>  <td></td>  <td></td> <td></td> <td></td> </tr>";
									var hourlydata = data.hourly.data;
									var i;									
									for (i=1;i<=25;i++)
									{
										var Time =  convert_time(hourlydata[i].time,returnedtimezone); 
										var ImgUrl =  get_icon_url(hourlydata[i].icon); 
										var ImgAlt = get_alt_text(hourlydata[i].icon);		
										var CloudCover = ((hourlydata[i].cloudCover)==undefined)? "N.A" : + Math.round((hourlydata[i].cloudCover)* 100) + "%";									
										var Temperature =  ((hourlydata[i].temperature)==undefined)? "N.A" : + (hourlydata[i].temperature).toFixed(2);																
										tab2data = tab2data + "<tr class='accordion-toggle' >" ;
										tab2data = tab2data + "<td>" + Time+ "</td><td><img src="+ImgUrl+ " alt="+ImgAlt + " style='max-width: 55px;padding-bottom:15px;max-height: 65px;' ></td><td>" + CloudCover + "</td><td>" + Temperature + "</td>";
										tab2data = tab2data + "<td><a class='glyphicon glyphicon-plus' data-toggle='collapse' aria-expanded='false'  data-target=\"#target_no_"+ i +"\">  </td>";
										tab2data = tab2data + "</tr>";
										
										var WindSpeed = ((hourlydata[i].windSpeed)==undefined)? "N.A" : + (hourlydata[i].windSpeed) + windspeedunit;
										var Humidity = ((hourlydata[i].humidity)==undefined)? "N.A" : + Math.round((hourlydata[i].humidity)*100) + "%";
										var Visibility = ((hourlydata[i].visibility)==undefined)? "N.A" : + (hourlydata[i].visibility) + visiblityunit;
										var Pressure = ((hourlydata[i].pressure)==undefined)? "N.A" : + (hourlydata[i].pressure) + PressureUnit;
		
										
										tab2data = tab2data + "<tr class='collapse out active' id=target_no_"+i+">";
										tab2data = tab2data + "<td colspan=5 class='hiddenRow'> ";
										tab2data = tab2data + "<div class='table-scrollable-container'><table class='table table-scrollable'><thead >";										
										tab2data = tab2data + "<tr ><th class='col-md-2' >Wind</th>";
										tab2data = tab2data + "<th class='col-md-2' >Humidity</th>";
										tab2data = tab2data + "<th class='col-md-2' >Visiblity</th>";
										tab2data = tab2data + "<th class='col-md-2' >Pressure</th></tr></thead>";										
										tab2data = tab2data + "<tbody ><tr class='active'><td>" + WindSpeed + "</td><td>"+Humidity+ "</td><td>" + Visibility + "</td><td>" + Pressure + "</td></tr></tbody>";
										tab2data = tab2data + "</table></div>";
										tab2data = tab2data + "</div>";
										tab2data = tab2data + "</td></tr>";										
									}									
									document.getElementById("Next24HoursTableContents").innerHTML=tab2data;
									}
