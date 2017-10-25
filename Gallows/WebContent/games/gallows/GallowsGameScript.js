/**
 * 
 */

const KEYBOARD_CLASS = "js-keyboard";
const PICTURE_CLASS = "js-picture";

var password = "DUPA JAŚ KARUZELA";


var tmpPassword = "";

for(i = 0; i < password.length; i++) {
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
//alphabet = [...alphabet, ...alphabet]; dzika składnia :D
//35 letters

function prepareKeyboard() {

	
	//var sie bardzo rzadko uzywa: const albo let
	//let i var rozny scope: doczytac
	const keyboard = document.querySelector("." + KEYBOARD_CLASS);
	if(!keyboard) {
		return;
	}
	
	//this nie byłby tym obiektem ktorego sie spodziewam;D
	//var that = this; taki zapis zeby mozna bylo skorzystac z this wewnatrz funkcji
//	alphabet.forEach(function() {
//		
//	})
	
	//arrow function (przyjmuje 3 argumenty): można odwoływac sie do obiektu this 
	alphabet.forEach((alphabetElement) => {
		const button = document.createElement("div");
		button.textContent = alphabetElement;
		button.className = "letter"; // className to odpowiednik class w htmlu (bo class to slowko zarezerwowane)
		// button.classList.add()
		button.addEventListener("click", checkLetter);
		
		keyboard.appendChild(button);
	});

	
}

var number = 0;


function checkLetter(event) {

	const letter = event.target.textContent;
	
	
	if(password.includes(letter)) {
		
		for(let i = password.indexOf(letter); i != -1; i = password.indexOf(letter, i + 1)) {
			tmpPassword = tmpPassword.substring(0, i) + letter + tmpPassword.substring(i + 1, password.length);
		}

		printPassword();
	} else {
		number++;
		//string interpolation joł:D
		document.querySelector("." + PICTURE_CLASS).src = `img/gallow${number}.png`;
	}
}













