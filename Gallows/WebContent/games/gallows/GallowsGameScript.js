//import GallowsGameTimer from './GallowsGameTimer.js';

const WORDS_TO_GUESS = 'BEZ PRACY NIE MA KOŁACZY, DUPA JAŚ KARUZELA, KTO TY JESTEŚ POLAK MAŁY, MURZYNEK BAMBO W AFRYCE MIESZKA, MIEJ SERCE PATRZ W SERCE'.split(',');	


const ALPHABET = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ'.split('');
const BOARD_BEFORE_START_CLASS = 'board-before-start';
const KEYBOARD_LETTER_CLASS = 'keyboard__letter';
const KEYBOARD_RED_LETTER_CLASS = 'keyboard__red-letter';
const KEYBOARD_GREEN_LETTER_CLASS = 'keyboard__green-letter';

const NOT_FOUND_INDEX = -1;
const VISIBLE_WORD_CLASS = '.js-visible-word';

class GallowsGame {
  constructor() {
    this.keyboard = document.querySelector('.js-keyboard');
    this.keyboard.innerHTML = "";
    this.visibleWordContainer = document.querySelector(VISIBLE_WORD_CLASS);
    this.picture = document.querySelector('.js-picture');
    this.picture.src = 'img/gallow0.png';

    this.word = this.getWordToGuess();

    this.visibleWord = this.word.replace(/[^ ]/g, '_');
    this.misses = 0;

    if (!(this.keyboard && this.visibleWordContainer && this.picture)) {
      return;
    }

    this.setupKeyboard();
    this.updateVisibleWord();
  }
  
  getWordToGuess() {
		let number = Math.floor(Math.random() * WORDS_TO_GUESS.length);
		return WORDS_TO_GUESS[number];
  }

  setupKeyboard() {
	
//		ALPHABET.forEach(function() {
		//this nie byłby tym obiektem ktorego sie spodziewam;D
		//var that = this; taki zapis zeby mozna bylo skorzystac z this wewnatrz funkcji		
//		})
		
		//arrow function (przyjmuje 3 argumenty): można odwoływac sie do obiektu this
    ALPHABET.forEach(alphabetElement => {
      const button = document.createElement('div');
      button.textContent = alphabetElement;
      button.className = KEYBOARD_LETTER_CLASS;// className to odpowiednik class w htmlu (bo class to slowko zarezerwowane)
		// button.classList.add()
    //  button.addEventListener('click', () => this.checkLetter(alphabetElement));
      
      //inna opcja:
      //button.addEventListener("click", checkLetter);
      //wtedy funkcja checkLetter przyjmuje event:
      //function checkLetter(event) {
      //i w ten sposób trzeba by wydobyc literke:
      //const letter = event.target.textContent;
      //to powyższe byloby prawda gdyby checkLetter było funkcja a nie metoda
      //w przypadku metody: this.checkLetter.bind(this)
      //jednak z tej opcji korzystam bo musze miec dostep do calego diva aby pozmieniac kolorki? dodac klase?
      
      button.addEventListener('click', this.checkLetter.bind(this));
    		

      this.keyboard.appendChild(button);
    });
  }

  updateVisibleWord() {
    this.visibleWordContainer.textContent = this.visibleWord;
  }

  
  checkLetter(event) {
	  
	let letter = event.target.textContent;
    const word = this.word;
    if(!this.visibleWord.includes(letter)) {
	    if (word.includes(letter)) {
	    	//var sie bardzo rzadko uzywa: const albo let
	    	//let i var rozny scope: doczytac
	      for (
	        let i = word.indexOf(letter);
	        i != NOT_FOUND_INDEX;
	        i = word.indexOf(letter, i + 1)
	      ) {
	        this.visibleWord =
	          this.visibleWord.substring(0, i) +
	          letter +
	          this.visibleWord.substring(i + 1, word.length);
	      }
	
	      this.updateVisibleWord();
	      let element = event.target;
	      element.classList.add(KEYBOARD_GREEN_LETTER_CLASS);
	      if(this.visibleWord == this.word) {
	    	  this.gameWon();
	    	  timer.endTimer();
	      }
	    } else {
	      this.misses++;
	      //string interpolation
	      this.picture.src = `img/gallow${this.misses}.png`;
	      
	      let element = event.target;
	      element.classList.add(KEYBOARD_RED_LETTER_CLASS);
	      
	      if(this.misses == 8) {
	    	  this.gameLost("Pomyliłeś/aś się aż 8 razy i wykonano na Tobie egzekucję...");
	    	  timer.endTimer();
	      }
	    }
    }
  }


  gameLost(reason) {
	  this.picture.src = 'img/gallow8.png';
	  let message = "<h4>Powieszony!!! </h4>";
	  message += "<h5>" + reason + "</h5>";
	  
	  scoreManager.takeLive();
	  if(scoreManager.getLives() > 0) {
		  if(scoreManager.getLives() == 1) {
			  message += "<p>Nie martw się, pozostało Ci jeszcze " + scoreManager.getLives() + " życie.";
		  } else {
			  message += "<p>Nie martw się, pozostały Ci jeszcze " + scoreManager.getLives() + " życia.";
		  }
		  message += "<br />";
		  message += '<div onclick="startNewRound();" class="continue-button" ><h3>KONTYNUUJ</h3></div>';

	  } else {
		  message += "<br />";
		  message += "<h2>KONIEC GRY</h2>";
		  
		  preparePageForNewGame();
	  } 
	  
	  this.keyboard.innerHTML = message


  }
  
  gameWon() {
	  let message = '<h4>Gratulacje!</h4>';
	  message += '<p>Tym razem udało Ci się uniknąć śmierci...</p>';
	  message += '<br />';
	  message += '<div onclick="startNewRound();" class="continue-button" ><h3>KONTYNUUJ</h3></div>';
	  
	  this.keyboard.innerHTML = message;
	  let element = document.querySelector(VISIBLE_WORD_CLASS);
//	  element.classList.add(BOARD_BEFORE_START_CLASS);
//	  element.textContent = "Kontynuuj";
	  
	  let score = 3 + Math.floor(timer.getSecondsLeft() / 6);
	  scoreManager.addUsersScore(score);
	  scoreManager.displayScore();	  
  }
  
  endGame() {
	  this.keyboard.innerHTML = "";
	  this.picture.src = 'img/gallow0.png';
  }
}


//**************************************************************************************************
//should be in another file but it needs to be served by server not from disc in order import to work
class GallowsGameTimer {
	
	constructor(minutes, seconds) {
		this.timerContainer = document.querySelector(".js-timer");
		this.minutes = minutes;
		this.seconds = seconds;
		this.flag = true;
		this.startTimer();

	}
	
	startTimer() {
		if(!this.flag) {
			return;
		}
		
		this.displayTime();
		
		if(this.seconds == 0) {
			this.seconds = 59;
			if(this.minutes == 0) {
				this.endTimer();
				game.gameLost("Zakończył się limit czasu i wykonano przedwczesną egzekucję...");
			} else {
				this.minutes--;
			}		
		} else {
			this.seconds--;
		}
		
			setTimeout(this.startTimer.bind(this), 1000);	
	}
	
	
	displayTime() {
		let displayMinutes;
		if(this.minutes < 10) {
			displayMinutes = "0" + this.minutes;
		} else {
			displayMinutes = this.minutes;
		}
		
		let displaySeconds;
		if(this.seconds < 10) {
			displaySeconds = "0" + this.seconds;
		} else {
			displaySeconds = this.seconds;
		}
		
		let display = '<p style="font-size: 20px">Do końca gry pozostało:</p>';
		//display += "<br />";
		display += '<p>' + displayMinutes + ":" + displaySeconds + '</p>';
		this.timerContainer.innerHTML = display;
	}
	
	endTimer() {
		this.flag = false;
		this.timerContainer.innerHTML = "";
	}
	
	getSecondsLeft() {
		return this.minutes * 60 + this.seconds;
	}
}

//*****************************************************
class ScoreManager {
	constructor(userScore, scoresPerLevel, level, lives) {
		this.score = userScore;
		this.scoresPerLevel = scoresPerLevel;
		this.level = level;
		this.lives = lives;
		
		this.leftScores = this.scoresPerLevel - (this.score % (this.scoresPerLevel * this.level));
		this.scoreContainer = document.querySelector(".js-score");
		this.nextLevel = false;
	}
	
	getScoreSummary() {
		let summary = "<p>Twoje punkty: <b>" + this.score + "</b></p>";
		
		summary += "<p>Osiągnięty poziom: " + this.level + "</b></p>";
		
		summary += "<p>Pozostałe życia: <b>" + this.lives + "</b><p>";
		
		summary += "<p>Pozostało do kolejnego poziomu: <b>" + this.leftScores + "<b></p>";
		
		return summary;
	}
	
	displayScore() {

		
		this.scoreContainer.innerHTML = this.getScoreSummary();
	}
	
	hideScore() {
		this.scoreContainer.innerHTML = "";
	}
	
	addUsersScore(score) {
		this.score += score;
		this.updateLevel();
		
		this.leftScores = this.scoresPerLevel - (this.score % (this.scoresPerLevel * this.level));
		
	}
	
	updateLevel() {
		this.level = Math.floor(this.score / this.scoresPerLevel);
	}
	
	takeLive() {
		this.lives--;
	}
	
	getLives() {
		return this.lives;
	}
}

/*GLOBAL VARIABLES*/
let game;
let timer;
let scoreManager;

function preparePageForNewGame() {
	  let element = document.querySelector(VISIBLE_WORD_CLASS);
	  element.classList.add(BOARD_BEFORE_START_CLASS);
	  element.textContent = "START";
	  
	  game.endGame();
	    
	  timer.endTimer();
	  
	  scoreManager.hideScore();
}

function startGame() {
	let element = document.querySelector(VISIBLE_WORD_CLASS);
	element.classList.remove(BOARD_BEFORE_START_CLASS);
	scoreManager = new ScoreManager(0, 10, 1, 3);
	startNewRound();

}

function startNewRound() {
	game = new GallowsGame();
	timer = new GallowsGameTimer(2, 0);
	scoreManager.displayScore();
}

function newGameButtonClicked() {
	let newgame = confirm("Czy na pewno chcesz rozpocząć nową grę?")
	if(newgame) {
		preparePageForNewGame();
	}
}

