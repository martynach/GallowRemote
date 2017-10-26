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

    this.word = 'DUPA JAS KARUZELA';
    this.visibleWord = this.word.replace(/[^ ]/g, '_');
    this.misses = 0;

    if (!(this.keyboard && this.visibleWordContainer && this.picture)) {
      return;
    }

    this.setupKeyboard();
    this.updateVisibleWord();
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
      }
    } else {
      this.misses++;
      //string interpolation
      this.picture.src = `img/gallow${this.misses}.png`;
      
      let element = event.target;
      element.classList.add(KEYBOARD_RED_LETTER_CLASS);
      
      if(this.misses == 8) {
    	  this.gameLost();
      }
    }
  }


  gameLost() {
	  this.keyboard.innerHTML = "<h3>You lost! </h3> <h4>Try harder next time!</h4>";
	  let element = document.querySelector(VISIBLE_WORD_CLASS);
	  element.classList.add(BOARD_BEFORE_START_CLASS);
	  element.textContent = "START";

  }
  
  gameWon() {
	  this.keyboard.innerHTML = "<h3>Congratulations!</h3> <h4>You won!</h4>";
	  let element = document.querySelector(VISIBLE_WORD_CLASS);
	  element.classList.add(BOARD_BEFORE_START_CLASS);
	  element.textContent = "START";
  }
}

function startGame() {
	let element = document.querySelector(VISIBLE_WORD_CLASS);
	element.classList.remove(BOARD_BEFORE_START_CLASS);
	new GallowsGame();
}




