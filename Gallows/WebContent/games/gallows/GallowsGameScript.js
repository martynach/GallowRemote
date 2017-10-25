const ALPHABET = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ'.split('');
const KEYBOARD_LETTER_CLASS = 'keyboard__letter';
const NOT_FOUND_INDEX = -1;

class GallowsGame {
  constructor() {
    this.keyboard = document.querySelector('.js-keyboard');
    this.visibleWordContainer = document.querySelector('.js-visible-word');
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
      button.addEventListener('click', () => this.checkLetter(alphabetElement));
      
      //inna opcja:
      //button.addEventListener("click", checkLetter);
      //wtedy funkcja checkLetter przyjmuje event:
      //function checkLetter(event) {
      //i w ten sposób trzeba by wydobyc literke:
      //const letter = event.target.textContent;
    		

      this.keyboard.appendChild(button);
    });
  }

  updateVisibleWord() {
    this.visibleWordContainer.textContent = this.visibleWord;
  }

  checkLetter(letter) {
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
    } else {
      this.misses++;
      //string interpolation
      this.picture.src = `img/gallow${this.misses}.png`;
    }
  }
}

new GallowsGame();




