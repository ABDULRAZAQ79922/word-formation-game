

document.addEventListener('DOMContentLoaded', () => {
    const myLettersContainer = document.getElementById('myRandomLetters');
    const myWordInput = document.getElementById('myWordInput');
    const mySubmitButton = document.getElementById('mySubmitButton');
    const myWordsList = document.getElementById('myWordsList');
    const myTimer = document.getElementById('myTimer');

    const myFourLetterWords = ['GAME', 'PLAY', 'WORD', 'TEST', 'CODE'];
    const myMaxWords = 4;
    let mySelectedWord = '';
    let myFormedWords = [];
    let myTimeRemaining = 60;

    function mySelectRandomWord() {
        mySelectedWord = myFourLetterWords[Math.floor(Math.random() * myFourLetterWords.length)];
        myLettersContainer.textContent = mySelectedWord.split('').join(' ');
    }

    function myCheckWordValidity(word) {
        const mySortedWord = word.split('').sort().join('');
        const mySortedSelectedWord = mySelectedWord.split('').sort().join('');
        return mySortedWord === mySortedSelectedWord && !myFormedWords.includes(word.toUpperCase());
    }

    function myUpdateTimer() {
        myTimeRemaining--;
        myTimer.textContent = myTimeRemaining;

        if (myTimeRemaining === 0) {
            clearInterval(myTimerInterval);
            mySubmitButton.disabled = true;
            myWordInput.disabled = true;
            alert('Time is up! Game over.');
        }
    }

    mySubmitButton.addEventListener('click', () => {
        const myEnteredWord = myWordInput.value.trim().toUpperCase();

        if (myEnteredWord && myCheckWordValidity(myEnteredWord)) {
            const myWordListItem = document.createElement('li');
            myWordListItem.textContent = myEnteredWord;
            myWordsList.appendChild(myWordListItem);
            myFormedWords.push(myEnteredWord);
            myWordInput.value = '';

            if (myFormedWords.length === myMaxWords) {
                clearInterval(myTimerInterval);
                mySubmitButton.disabled = true;
                myWordInput.disabled = true;
                alert('Congratulations! You have formed all the words.');
            }
        } else {
            alert('Invalid word or already formed!');
        }
    });

    mySelectRandomWord();
    const myTimerInterval = setInterval(myUpdateTimer, 1000);
});
