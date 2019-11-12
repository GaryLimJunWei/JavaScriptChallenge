//Challenge 1 : Your age in Days

function ageInDays() {
    var birthYear = prompt('Enter your birth Year!');
    if (birthYear <= 0 || birthYear == null) {
        birthYear = prompt('Enter a year to continue!');
    }
    else {
        var ageInDays = (2019 - birthYear) * 365;
        var h1 = document.createElement('h1');
        var textAnswer = document.createTextNode('You are ' + ageInDays + ' days old');
        h1.setAttribute('id', 'ageInDays');
        h1.appendChild(textAnswer);
        document.getElementById("flex-box-result").appendChild(h1);
    }


}

function reset() {
    document.getElementById('ageInDays').remove();
}

function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

// This function will be called when user click on one of the pictures (Challenge 3)
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;

    // The id is set in HTML, and it is easier to identify by the ID (rock,paper,scissors)
    humanChoice = yourChoice.id;

    // The bot choice will randomly get a number from that function
    botChoice = numberToChoice(randToRpsInt());
    console.log("Computer choice : ", botChoice);

    // The results will be passed to the function <--- decideWinner
    results = decideWinner(humanChoice, botChoice);
    console.log(results);

    // This finalMessage function will be passed with the winning result to be displayed LATER
    message = finalMessage(results);
    console.log(message);

    // This function will get the user choice, bot choice and the message (with the results)
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

// This function to randomly choose 1 number
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

// With the number 0,1,2 it will decide which to choose
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}


function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'scissors': 0, 'paper': 0.5 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' };
    }
    else if (yourScore === 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' };
    }
    else {
        return { 'message': 'You won!', 'color': 'green' };
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //Removing the image after user click 
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}


// Challenge 4 change the color of all the button

var all_button = document.getElementsByTagName('button');

// Storing a copy of the orignal default colors of all buttons inside an array (For the Reset)
var copyAllButtons = [];
for (let i = 0; i < all_button.length; i++) {
    copyAllButtons.push(all_button[i].classList[1]);
}


function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    }
    else if (buttonThingy.value === 'green') {
        buttonsGreen();
    }
    else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    }
    else if (buttonThingy.value === 'random') {
        randomColors();
    }

}

function buttonsRed() {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add('btn-success');
    }
}

// Using a loop to add back to color base on the array number position on the storage array.
function buttonColorReset() {
    for (let i = 0; i < all_button.length; i++) {
        all_button[i].classList.remove(all_button[i].classList[i]);
        all_button[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']

    for (let i = 0; i < all_button.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_button[i].classList.remove(all_button[i].classList[1]);
        all_button[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5 blackJack

// This is an object that holds the dealer and user score and the box.
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand' : false,
    'turnsOver' : false,

};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
//document.querySelector('#blackjack-stand-button').addEventListener('click',);

function blackjackHit() {
    if(blackjackGame['isStand'] === false)
    {
        let card = randomCard();
        console.log(card);
        showCard(YOU, card);
        updateScore(card, YOU);
        showScore(YOU);
    }
    
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        //Taking the image and set it into the YOU object DIV part with the ID , your-box
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true)
    {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
    
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
    
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
    
        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
    

}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // If adding 11 keeps me below 21, add 11, Otherwise, add 1.
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
// By using the async function so the browser will not freeze when the await works.
async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true)
    {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    

        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);

}

//compute winnder and return who just won
//update the wins,draws and losses
function computeWinner() {
    let winner;


    if (YOU['score'] <= 21) {
        //condition: higher score than dealer or when dealer busts when you're 21
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    }
    // condition when user busts but dealer doesn't
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

        // condition : when you and the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true)
    {
        if (winner === YOU) {
            message = 'You won!';
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            messageColor = 'green';
            winSound.play();
    
        }
        else if (winner === DEALER) {
            message = 'You lost!!';
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            messageColor = 'red';
            lossSound.play();
    
        }
        else {
            message = 'You drew!';
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            messageColor = 'black';
    
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

    


}








