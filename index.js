//onload function
function list(){

	//refresh list every 5 minutes
	setInterval(function(){
        window.location.reload();
    }, 300000); 

    //get data in json format
	$.get('http://ott-api.iskon.hr/proxy/ontv-now/', function(data){

		//list of objects 
		var listOfObjects = [];
		var objects = {};

		//this part could be in index.css, but for now it's easier to leave it here (styles for appended divisions)
		var styleForBackground = "background-image:url('slike/bckg.png'); background-size:100% 100%;";
		var styleForImages = "width:148px; height:83px; top:0%; left:0%; margin-top:5%; margin-left:3%; position:absolute;";
		var styleForRight = "width:40%; height:83px; color:#505050; text-align:justify; padding:0px; top:0%; right:0%; margin-top:5%; margin-right:3%; position:absolute; font-size:5%; font-weight:100; line-height:150%;";
		var styleForLine = "width:100%;  border-top:1px solid #383838;";
		var styleForProgram = "width:20%; height:30px; top:120px; left:0%; margin-left:3%; position:absolute; background-image:url('slike/channel_title_bckg.png'); background-size:100% 30px; color:white; font-size:80%; font-weight:80; text-align:center; word-wrap:normal; white-space:nowrap;";
		var styleForTitle = "width:30%; height:20px; top:120px; left:30%; position:absolute; color:white; font-size:85%; font-weight:80;";
		var styleForTime = "width:30%; height:20px; top:120px; right:0%; margin-right:3%; position:absolute; color:white; font-size:85%; font-weight:80;";
		var styleForBar = "width:67%; height:5px; top:144px; left:30%; position:absolute; background-image:url('slike/ontv_pb_bckg.png'); background-size:100% 6px;";
		
		//get time -> in hours and minutes
		var timeNow = new Date();
		var timeNowHours = timeNow.getHours();
		var timeNowMinutes = timeNow.getMinutes() + parseInt(timeNowHours*60);

		//fill object with data
		objects = data.list;

		//fill list of objects with data
		for (var j in objects){
			listOfObjects.push(objects[j]); 
		}

		//for loop -> list of objects
		for (var i in listOfObjects){

			//list of shows and variable for division placing
			var listOfShows = [];
			var topPixel = 150*i;

			//fill list of shows with data
			for (var k in listOfObjects[i].shows){
				listOfShows.push(listOfObjects[i].shows[k]);
			}

			//calculate time for progress bar
			var timeShowStartH = listOfShows[0].startDate.substring(11,13);
			var timeShowStartM = parseInt(listOfShows[0].startDate.substring(14,16)) + parseInt(timeShowStartH*60);
			var timeDuration = parseInt(listOfShows[0].duration);
			var timeProgressBar = parseInt((parseInt(timeNowMinutes - timeShowStartM)/timeDuration)*100);
			
			//create new division for every program with id= repeat"i"
			$('#tvList').append('<div id="repeat'+i+'" style="width:100%; height:170px; left:0% top:'+topPixel+'px; position:relative; '+styleForBackground+'"></div>');
			
			//this part could be all in one row -> it's easier to read and make changes in this way
			//for every program show: image of show, name of program, title of show, start and end time of show, progress bar and details of next two shows
			$('#repeat'+i).append('<img src="'+listOfObjects[i].ontv_img+'" style="'+styleForImages+'"><br>');
			$('#repeat'+i).append('<div style="'+styleForRight+'"><p style="margin:0px; padding:0px;">Slijedi:</p><div style="'+styleForLine+'"></div><p style="margin:0px; padding:0px; padding-top:8px; white-space:nowrap; width:100%; overflow:hidden; text-overflow:ellipsis;">'+listOfShows[1].title+'</p><p style="margin:0px; padding:0px; white-space:nowrap; width:100%; overflow:hidden; text-overflow:ellipsis;">'+listOfShows[1].startDate.substring(11)+' - '+listOfShows[1].endDate.substring(11)+'<br>'+listOfShows[2].title+'<br>'+listOfShows[2].startDate.substring(11)+' - '+listOfShows[2].endDate.substring(11)+'</p></div>');
			$('#repeat'+i).append('<div style="'+styleForProgram+'"><p style="margin-top:5px; margin-bottom:5px; margin-left:auto; margin-right:auto; padding:0px; width:100%; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; position:absolute;">'+listOfObjects[i].title+'</p></div>');
			$('#repeat'+i).append('<div style="'+styleForTitle+'"><p style="margin:0px; padding:0px; width:100%; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">'+listOfShows[0].title+'</p></div>');
			$('#repeat'+i).append('<div style="'+styleForTime+'">'+listOfShows[0].startDate.substring(11)+' - '+listOfShows[0].endDate.substring(11)+'</div>');
			$('#repeat'+i).append('<div style="'+styleForBar+'"><img src="slike/ontv_pb_fill.png" style="width:'+timeProgressBar+'%; height:5px; top:0px; left:0px; position:absolute;"></div>');
		}
	});
}

