/*
This file is part of www.thetitanteam.com
This script is responsible for dealing with timely updates that happen in the front-end. In other words, it is responsible for what the user sees.
*/
function updateMainTime() {
	if(timeformat == "24") {
		document.getElementById("current-time").innerHTML = time();
	}
	if(timeformat == "12") {
		if(hours > 12) {
			document.getElementById("current-time").innerHTML = (hours - 12) + ":" + minTwoDigits(minutes) + ":" + minTwoDigits(seconds) + " PM";
		}
		else {
			document.getElementById("current-time").innerHTML = time() + " AM";
		}
	}
}

function schoolEndsIn(){
	var Today = new Date();
	var seconds = SecDiff(Today)
	var days = Math.floor(seconds / (3600*24));
	seconds  -= days*3600*24;
	var hrs   = Math.floor(seconds / 3600);
	seconds  -= hrs*3600;
	var mnts = Math.floor(seconds / 60);
	seconds  -= mnts*60;
	document.getElementById("school-time-left").innerHTML = days+" days, "+minTwoDigits(hrs)+":"+minTwoDigits(mnts)+":"+minTwoDigits(seconds);
}
function updateTimeElapsed(){
	/* 
	Information about time in seconds:
	28200: 7:50 AM (The time when school starts)
	54300: 3:05 PM (The time when school ends)
	------Two Hour Delay------
	35400: 9:50 AM (School start time for two hour delay schedule)
	School still ends at the same time
	*/
	if(twohour == true) { //if current schedule is on two hour delay
		if((absoluteTime < 35400) || (absoluteTime > 54300)) {
			document.getElementById("time-elapsed").innerHTML = "It is outside of school hours";
		}
		else {
			var totalSeconds = (hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds) - 35399; //The total amount of time in seconds that has passed MINUS the 7 hours 50 minutes you were not at school.
			secondselapsed = totalSeconds;
			hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			minutes = Math.floor(totalSeconds / 60);
			seconds = Math.floor(totalSeconds % 60);
			document.getElementById("time-elapsed").innerHTML = hours + ":" + minTwoDigits(minutes) + ":" + minTwoDigits(seconds);
		}
	}
	else {
		if((absoluteTime < 28200) || (absoluteTime > 54300)) {
			document.getElementById("time-elapsed").innerHTML = "It is outside of school hours";
		}
		else {
			var totalSeconds = (hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds) - 28199; //The total amount of time in seconds that has passed MINUS the 7 hours 50 minutes you were not at school.
			secondselapsed = totalSeconds;
			hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			minutes = Math.floor(totalSeconds / 60);
			seconds = Math.floor(totalSeconds % 60);
			document.getElementById("time-elapsed").innerHTML = hours + ":" + minTwoDigits(minutes) + ":" + minTwoDigits(seconds);
		}
	}
}

function updateTimeLeft() {
	if((absoluteTime < 28200) || (absoluteTime > 54300)) {
		document.getElementById("time-left").innerHTML = "It is outside of school hours";
	}
	else {
		var totalSecondsLeft = 26099 - secondselapsed;
		hoursleft = Math.floor(totalSecondsLeft / 3600);
		totalSecondsLeft %= 3600;
		minutesleft = Math.floor(totalSecondsLeft / 60);
		secondsleft = Math.floor(totalSecondsLeft % 60);
		document.getElementById("time-left").innerHTML = hoursleft + ":" + minTwoDigits(minutesleft) + ":" + minTwoDigits(secondsleft);
	}
}

function setTimeLeftInPeriod() {
	var totalSecondsLeft = getTimeLeftInPeriod();
	console.log(totalSecondsLeft);
	hoursleft = Math.floor(totalSecondsLeft / 3600);
	totalSecondsLeft %= 3600;
	minutesleft = Math.floor(totalSecondsLeft / 60);
	secondsleft = Math.floor(totalSecondsLeft % 60);
	document.getElementById("current-period-left").innerHTML = hoursleft + ":" + minTwoDigits(minutesleft) + ":" + minTwoDigits(secondsleft);
	document.title = "Left in period:" + hoursleft + ":" + minTwoDigits(minutesleft) + ":" + minTwoDigits(secondsleft);
}

function updateSubscribers() {
	if (document.hasFocus()) {
		loadChannelPew("UC-lHJZR3Gqxm24_Vd_AJ5Yw");
		loadChannelT("UCq-Fj5jknLsUf-MWSy4_brA");
		difference = tseries - pewdiepie;
		document.getElementById("subgap").innerHTML = (tseries - pewdiepie);
	}
}


var chanName = "";
var pewdiepie, tseries, difference
function loadChannelPew(name) {
	var url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+name+'&key=AIzaSyB8jNJIocdReo7iT6H8muynGz49TYMKwm0'
	
	$.getJSON(url, function(data) {
		$('#odometer').html(data.items[0].statistics.subscriberCount);
		$(pewdiepie = parseInt(data.items[0].statistics.subscriberCount));
	});
}

function loadChannelT(name) {
	var url = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+name+'&key=AIzaSyB8jNJIocdReo7iT6H8muynGz49TYMKwm0'
	
	$.getJSON(url, function(data) {
		$('#tseries').html(data.items[0].statistics.subscriberCount);
		$(tseries = parseInt(data.items[0].statistics.subscriberCount));
	});
}

function openNav() { 
	if(document.getElementById("sidebarnav").style.width == "250px") {
		closeNav();
	} else {
		document.getElementById("sidebarnav").style.width = "250px"; 
		document.getElementById("main").style.marginLeft = "250px"; 
	}
} 
function closeNav() { 
	document.getElementById("sidebarnav").style.width = "0"; 
	document.getElementById("main").style.marginLeft = "0";
}

function openNavs() {
	document.getElementById("myNav").style.width = "100%";
}

function closeNavs() {
	document.getElementById("myNav").style.width = "0%";
}

function customize() {
	if(timebox.checked){
		timer.style.display = "block";
		document.cookie = "timer=show;expires=Thu, 18 Dec 2290 12:00:00 UTC";
	}
	else if (timebox.checked == false){
		timer.style.display = "none";
		document.cookie = "timer=hide;expires=Thu, 18 Dec 2290 12:00:00 UTC";
	}
	//==========================
	if(subs.checked){
		subscriberbox.style.display = "block";
		document.cookie = "subs=show;expires=Thu, 18 Dec 2290 12:00:00 UTC";
	}
	else if (subs.checked == false){
		subscriberbox.style.display = "none";
		document.cookie = "subs=hide;expires=Thu, 18 Dec 2290 12:00:00 UTC";
	}
	//==========================
	if(homework.checked){
		homeworkbox.style.display = "block";
		document.cookie = "homework=show;expires=Thu, 18 Dec 2290 12:00:00 UTC";
	}
	else if (homework.checked == false){
		homeworkbox.style.display = "none";
		document.cookie = "homework=hide;expires=Thu, 18 Dec 2290 12:00:00 UTC";
	}
}