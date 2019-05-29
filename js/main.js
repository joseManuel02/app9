var audio;

//Hide Pause Initially
$('#pause').hide();

//initializer- play first song
iniAudio($('#playlist li:first-child'));

function iniAudio(element){
	var song=element.attr('song');
	var title=element.text();
	var cover=element.attr('cover');
	var artist=element.attr('artist');
	
	//Create a new audio object
	audio= new Audio('media/' + song);
	
	if(!audio.currentTime){
		$('#duration').html('0.00');
	}
	
	$('#audio-player .title').text(title);
	$('#audio-player .artist').text(artist);
	
	//insert cover image
	$('img.cover').attr('src','images/covers/' + cover);
	
	$('#playlist li').removeClass('active');
	element.addClass('active');
}


//Play button
$('#play').click(function (){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
});


//Pause Button
$('#pause').click(function (){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});

//Stop Buttton
$('#stop').click(function (){
	audio.pause();
	audio.currentTime=0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

//Next Buttton
$('#next').click(function (){
	audio.pause();
	var next=$('#playlist li.active').next();
	if(next.length==0){
		next=$('#playlist li:first-child');
	}
	initAudio (next);
	audio.play();
	showDuration();
});

//prev Button
$('#prev').click(function (){
	audio.pause ();
	var prev=$('#playlist li.active').prev();
	if(prev.length==0){
		prev=$('#playlist li:last-child');
	}
	iniAudio (prev);
	audio.play();
	showDuration();
});

//Playlist Song Click
$('#playlist li').click(function (){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});

//Volumen Control
$('#volume').change(function(){
	audio.volume = parseFloat(this.value/10);
});

//time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s=parseInt(audio.currentTime %60);
		var m=parseInt((audio.currentTime /60)%60);
		//Add 0 if seconds less than 10
		if (s<10){
			s='0' + s;
		}
		$('#duration').html(m + '.' + s);
		var value= 0;
		if(audio.currentTime > 0){
			value=Math.floor((100/audio.duration) * audio.currentTime);
		}
		$('#progress').css('width',value+'%');
	});
}
	

	
	
