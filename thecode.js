function main() {
	var day = 86400;
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
		if((absoluteTime < 28200) || (absoluteTime > 54300)) {
			document.getElementById("time-elapsed").innerHTML = "It is outside of school hours";
		}
		else{
			var totalSeconds = (hoursToSeconds(hours) + minutesToSeconds(minutes) + seconds) - 28199;
			secondselapsed = totalSeconds;
			hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			minutes = Math.floor(totalSeconds / 60);
			seconds = Math.floor(totalSeconds % 60);
			document.getElementById("time-elapsed").innerHTML = hours + ":" + minTwoDigits(minutes) + ":" + minTwoDigits(seconds);
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
		if (secondselapsed < 3000) {
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
		if (secondselapsed > 23100 && secondselapsed < 22200) {
			document.getElementById("current-class").innerHTML = "Passing Period";
		}
		if (secondselapsed > 22201 + 300 && secondselapsed < 24900 + 300) {
			document.getElementById("current-class").innerHTML = "Period 9 (Exploratory)";
		}
	}
	function getTimeLeftInPeriod() {
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
		if (secondselapsed > 23100 && secondselapsed < 22200) {
			return 22200 - secondselapsed; //passing period
		}
		if (secondselapsed > 22201 + 300 && secondselapsed < 24900 + 300) {
			return 24900 + 300 - secondselapsed; //period 9
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
	}
}
function time() {
	var date = new Date();
	var split = String(date).split(" ");
	var time = split[4];
	return time;
}
