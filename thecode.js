/*
thetitanteam.com - Information about your school day
By Jaeheon Shim
Javascript
*/
function main() {
	var day = 86400;
	var twohour = true;
	var splittime, hours, minutes, seconds, hourselapsed, minuteselapsed, secondselapsed, absoluteTime, timeformat;
	setInterval(updates, 1000);

	function hoursToSeconds(x) {
		return x * 3600;
	}

	function minutesToSeconds(x) {
		return x * 60;
	}

	function preferredTime() {
		timeformat = document.getElementById("preferredtime").value;
	}

	function updates() {
		preferredTime();
		updateMainTime();
		updateTimeLeft();
		updateTimeElapsed();
		getPeriod();
		setTimeLeftInPeriod();
		splittime = time().split(":");
		hours = parseInt(splittime[0]);
		minutes = parseInt(splittime[1]);
		seconds = parseInt(splittime[2]);
		absoluteTime = hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds;
	}

	function minTwoDigits(n) {
		return (n < 9 ? '0' : '') + n;
	}

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

function getPeriod() {
	/* 
	Timetable for Titan team
	Period 1: 7:50 AM - 8:40 AM
	Period 2: 8:45 AM - 9:30 AM
	Period 3: 9:35 AM - 10:20 AM
	Period 4: 10:25 AM - 11:10 AM
	Period 5: 11:15 AM - 11:45 AM
	Period 6: 11:50 AM - 12:35 PM
	Period 7: 12:40 PM - 1:25 PM
	Period 8: 1:30 PM - 2:15 PM
	Period 9: 2:20 PM - 3:05 PM

	=============================

	TWO HOUR DELAY SCHEDULE:
	Period 1: 9:50 AM - 10:25 AM
	Period 2: 10:30 AM - 11:00 AM
	Period 3: 11:05 AM - 11:35 AM
	Period 5: 11:40 AM - 12:10 PM
	Period 6: 12:15 PM - 12:45 PM
	Period 7: 12:50 PM - 1:20 PM
	Period 4: 1:25 PM - 1:55 PM
	Period 8: 2:00 PM - 2:30 PM
	Period 9: 2:35 PM - 3:05 PM
	*/
	console.log(secondselapsed);
	if(twohour == false) {
		if (secondselapsed < 3000) {
			//period 1 is 5 minutes longer than the other periods to allow for the morning announcements.
			document.getElementById("current-class").innerHTML = "Period 1";
		}
		if (secondselapsed > 3000 && secondselapsed < 3300) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 3300 && secondselapsed < 6000) {
			document.getElementById("current-class").innerHTML = "Period 2";
		}
		if (secondselapsed > 6000 && secondselapsed < 6300) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 6300 && secondselapsed < 9000) {
			document.getElementById("current-class").innerHTML = "Period 3";
		}
		if (secondselapsed > 9000 && secondselapsed < 9300) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 9300 && secondselapsed < 12000) {
			document.getElementById("current-class").innerHTML = "Period 4";
		}
		if (secondselapsed > 12000 && secondselapsed < 12300) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 12300 && secondselapsed < 14100) {
			document.getElementById("current-class").innerHTML = "Period 5 (Lunch)";
		}
		if (secondselapsed > 14100 && secondselapsed < 14400) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 14400 && secondselapsed < 17100) {
			document.getElementById("current-class").innerHTML = "Period 6";
		}
		if (secondselapsed > 17100 && secondselapsed < 17400) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 17400 && secondselapsed < 20100) {
			document.getElementById("current-class").innerHTML = "Period 7";
		}
		if (secondselapsed > 20100 && secondselapsed < 20400) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 20400 && secondselapsed < 23100) {
			document.getElementById("current-class").innerHTML = "Period 8 (Exploratory)";
		}
		if (secondselapsed > 23100 && secondselapsed < 23400) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 23400 && secondselapsed < 26100) {
			document.getElementById("current-class").innerHTML = "Period 9 (Exploratory)";
		}
	}
	else {
		if (secondselapsed < 2100) {
			document.getElementById("current-class").innerHTML = "Period 1";
		}
		if (secondselapsed > 2100 && secondselapsed < 2400) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 2400 && secondselapsed < 4200) {
			document.getElementById("current-class").innerHTML = "Period 2";
		}
		if (secondselapsed > 4200 && secondselapsed < 4500) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 4500 && secondselapsed < 6300) {
			document.getElementById("current-class").innerHTML = "Period 3";
		}
		if (secondselapsed > 6300 && secondselapsed < 6600) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 6600 && secondselapsed < 8400) {
			document.getElementById("current-class").innerHTML = "Period 5 (Lunch)";
		}
		if (secondselapsed > 8400 && secondselapsed < 8700) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 8700 && secondselapsed < 10500) {
			document.getElementById("current-class").innerHTML = "Period 6";
		}
		if (secondselapsed > 10500 && secondselapsed < 10800) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 10800 && secondselapsed < 12600) {
			document.getElementById("current-class").innerHTML = "Period 7";
		}
		if (secondselapsed > 12600 && secondselapsed < 12900) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 12900 && secondselapsed < 14700) {
			document.getElementById("current-class").innerHTML = "Period 4";
		}
		if (secondselapsed > 14700 && secondselapsed < 15000) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 15000 && secondselapsed < 16800) {
			document.getElementById("current-class").innerHTML = "Period 8 (Exploratory)";
		}
		if (secondselapsed > 16800 && secondselapsed < 17100) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 17100 && secondselapsed < 18900) {
			document.getElementById("current-class").innerHTML = "Period 9 (Exploratory)";
		}
	}
}

function getTimeLeftInPeriod() {
	if(twohour == false) {
	if (secondselapsed < 3000) {
			return 3000 - secondselapsed; //Period 1
		}
		if (secondselapsed > 3000 && secondselapsed < 3300) {
			return 3300 - secondselapsed; //passing period
		}
		if (secondselapsed > 3300 && secondselapsed < 6000) {
			return 6000 - secondselapsed; //period 2
		}
		if (secondselapsed > 6000 && secondselapsed < 6300) {
			return 6300 - secondselapsed; //passing period
		}
		if (secondselapsed > 6300 && secondselapsed < 9000) {
			return 9000 - secondselapsed; //period 3
		}
		if (secondselapsed > 9000 && secondselapsed < 9300) {
			return 9300 - secondselapsed; //passing period
		}
		if (secondselapsed > 9300 && secondselapsed < 12000) {
			return 12000 - secondselapsed; //period 4
		}
		if (secondselapsed > 12000 && secondselapsed < 12300) {
			return 12300 - secondselapsed; //passing period
		}
		if (secondselapsed > 12300 && secondselapsed < 14100) {
			return 14100 - secondselapsed; //period 5
		}
		if (secondselapsed > 14100 && secondselapsed < 14400) {
			return 14400 - secondselapsed; //passing period
		}
		if (secondselapsed > 14400 && secondselapsed < 17100) {
			return 17100 - secondselapsed; //period 6
		}
		if (secondselapsed > 17100 && secondselapsed < 17400) {
			return 17400 - secondselapsed; //passing period
		}
		if (secondselapsed > 17400 && secondselapsed < 20100) {
			return 20100 - secondselapsed; //period 7
		}
		if (secondselapsed > 20100 && secondselapsed < 20400) {
			return 20400 - secondselapsed; //passing period
		}
		if (secondselapsed > 20400 && secondselapsed < 23100) {
			return 23100 - secondselapsed; //period 8
		}
		if (secondselapsed > 23100 && secondselapsed < 23400) {
			return 23400 - secondselapsed; //passing period
		}
		if (secondselapsed > 23400 && secondselapsed < 26100) {
			return 26100 - secondselapsed; //period 9
		}
	}
	else{
		//two hour delay
		if (secondselapsed < 2100) {
			return 2100 - secondselapsed;
		}
		if (secondselapsed > 2100 && secondselapsed < 2400) {
			return 2400 - secondselapsed;
		}
		if (secondselapsed > 2400 && secondselapsed < 4200) {
			return 4200 - secondselapsed;
		}
		if (secondselapsed > 4200 && secondselapsed < 4500) {
			return 4500 - secondselapsed;
		}
		if (secondselapsed > 4500 && secondselapsed < 6300) {
			return 6300 - secondselapsed;
		}
		if (secondselapsed > 6300 && secondselapsed < 6600) {
			return 6600 - secondselapsed;
		}
		if (secondselapsed > 6600 && secondselapsed < 8400) {
			return 8400 - secondselapsed;
		}
		if (secondselapsed > 8400 && secondselapsed < 8700) {
			return 8700 - secondselapsed;
		}
		if (secondselapsed > 8700 && secondselapsed < 10500) {
			return 10500 - secondselapsed;
		}
		if (secondselapsed > 10500 && secondselapsed < 10800) {
			return 10800 - secondselapsed;
		}
		if (secondselapsed > 10800 && secondselapsed < 12600) {
			return 12600 - secondselapsed;
		}
		if (secondselapsed > 12600 && secondselapsed < 12900) {
			return 12900 - secondselapsed;
		}
		if (secondselapsed > 12900 && secondselapsed < 14700) {
			return 14700 - secondselapsed;
		}
		if (secondselapsed > 14700 && secondselapsed < 15000) {
			return 15000 - secondselapsed;
		}
		if (secondselapsed > 15000 && secondselapsed < 16800) {
			return 16800 - secondselapsed;
		}
		if (secondselapsed > 16800 && secondselapsed < 17100) {
			return 17100 - secondselapsed;
		}
		if (secondselapsed > 17100 && secondselapsed < 18900) {
			return 18900 - secondselapsed;
		}
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
	function time() {
		var date = new Date();
		var split = String(date).split(" ");
		var time = split[4];
		return time;
	}
}
