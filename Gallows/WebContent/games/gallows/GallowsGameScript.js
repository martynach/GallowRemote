/**
 * 
 */



var password = "DUPA JAS KARUZELA";
//password = password.toUpperCase();

var length = password.length;

var tmpPassword = "";

for(i = 0; i < length; i++) {
	if(password.charAt(i) == " ") {
		tmpPassword += " ";
	} else {
		tmpPassword += "_";
	}
}

function printPassword() {
	document.getElementById("board").innerHTML = tmpPassword;
}

window.onload = startGame;

function startGame() {
	printPassword();
	prepareKeyboard();
}


var alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż", "Ź"];
//35 letters

function prepareKeyboard() {
	
	var keyboard = "";
	
	for(i = 0; i < 35; i++) {
		
		var divId = "id" + i;
		keyboard += '<div class="letter" id="' + divId + '" onclick="checkLetter(' + i + '>' + alphabet[i] + '</div>';
		if((i + 1) % 7 == 0) {
			keyboard += '<div style="clear:both;"> </div>';
		}
	}
	
	document.getElementById("keyboard").innerHTML = keyboard;
	
}

function checkLetter