// game-screen
var gameReadyScreen = document.getElementById("game-readyscreen");
var timer = 3;

function gameReady() {
	setTimeout(readyCountdown,1000);
	setTimeout(readyCountdown,2000);
	setTimeout(readyCountdown,3000);
	setTimeout(readyCountdown,4000);
	setTimeout(readyCountdown,4500);
}

function readyCountdown() {
	switch(timer) {
		case 0:
			gameReadyScreen.innerHTML = "GO!";
			break;
		case -1:
			gameReadyScreen.style.display = "none";
			timer = 3;
			break;
		default:
			gameReadyScreen.innerHTML = timer;
			break;
	}
	timer = timer - 1;
}

// Cards functionality
cards.init({table:'#card-table', type:STANDARD});

var teams = [
	['user1', 'user2'],
	['user3', 'user4'],
	['user5', 'user6'],
	['user7', 'user8']
];

var diamonds1 = new cards.Deck({faceUp:true, x:100, y:300});
var clubs1 = new cards.Deck({faceUp:true, x:500, y:300});
var hearts1 = new cards.Deck({faceUp:true, x:100, y:425});
var spades1 = new cards.Deck({faceUp:true, x:500, y:425});

var diamonds = [
	diamonds1
];
var clubs = [
	clubs1
];
var hearts = [
	hearts1
];
var spades = [
	spades1
];

if ((teams.length) > 1) {
	var diamonds2 = new cards.Deck({faceUp:true, x:200, y:300});
	var clubs2 = new cards.Deck({faceUp:true, x:600, y:300});
	var hearts2 = new cards.Deck({faceUp:true, x:200, y:425});
	var spades2 = new cards.Deck({faceUp:true, x:600, y:425});
	diamonds.push(diamonds2);
	clubs.push(clubs2);
	hearts.push(hearts2);
	spades.push(spades2);
}
if ((teams.length) > 2) {
	var diamonds3 = new cards.Deck({faceUp:true, x:300, y:300});
	var clubs3 = new cards.Deck({faceUp:true, x:700, y:300});
	var hearts3 = new cards.Deck({faceUp:true, x:300, y:425});
	var spades3 = new cards.Deck({faceUp:true, x:700, y:425});
	diamonds.push(diamonds3);
	clubs.push(clubs3);
	hearts.push(hearts3);
	spades.push(spades3);
}
if ((teams.length) > 3) {
	var diamonds4 = new cards.Deck({faceUp:true, x:400, y:300});
	var clubs4 = new cards.Deck({faceUp:true, x:800, y:300});
	var hearts4 = new cards.Deck({faceUp:true, x:400, y:425});
	var spades4 = new cards.Deck({faceUp:true, x:800, y:425});
	diamonds.push(diamonds4);
	clubs.push(clubs4);
	hearts.push(hearts4);
	spades.push(spades4);
}

var deck = new cards.Deck({faceUp:false, x: 900,y: 800});
deck.addCards(cards.all);
deck.render({immediate:true});

// https://www.w3schools.com/HTML/tryit.asp?filename=tryhtml5_draganddrop2
// https://www.w3schools.com/Tags/ref_eventattributes.asp "Drag Events"
// note: div class="card" style="background-position:___" indicates card value on img/cards.png
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

var cardsList = document.getElementsByClassName("card");
for (c = 0; c < cardsList.length; c++) {
	console.log(cardsList[c]);
	cardsList[c].setAttribute("draggable","true");
	cardsList[c].setAttribute("ondragstart","drag(event);");
	cardsList[c].setAttribute("ondrop","drop(event);");
	cardsList[c].setAttribute("ondragover","allowDrop(event);");
}

var stack1 = new cards.Stack({faceUp:false, x:400, y:600});
var stack2 = new cards.Stack({faceUp:false, x:500, y:600});
var stack3 = new cards.Stack({faceUp:false, x:600, y:600});
var stack4 = new cards.Stack({faceUp:false, x:700, y:600});
var stack5 = new cards.Stack({faceUp:false, x:800, y:600});
var stacks = [stack1,stack2,stack3,stack4,stack5];
var mainhand = new cards.Hand({faceUp:true, x:175, y:800});
var deckflip = new cards.Hand({faceUp:true, x:1000, y:800});
var discard = new cards.Deck({faceUp:true, x:1000, y:750});

for (d = 0; d < stacks.length; d++) {
	deck.deal(1, [stacks[d]], 50, function() {});
}
for (d = 1; d < stacks.length; d++) {
	deck.deal(1, [stacks[d]], 50, function() {});
}
for (d = 2; d < stacks.length; d++) {
	deck.deal(1, [stacks[d]], 50, function() {});
}
for (d = 3; d < stacks.length; d++) {
	deck.deal(1, [stacks[d]], 50, function() {});
}
deck.deal(1, [stack5], 50, function() {
	stack1[0].showCard();
	stack2[1].showCard();
	stack3[2].showCard();
	stack4[3].showCard();
	stack5[4].showCard();
});

deck.deal(13, [mainhand], 50, function() {
	mainhand.render();
});

deck.click(function(card){
	if (card === deck.topCard()) {
		while (deckflip.length) {
			discard.addCard(deckflip[0]);
		}
		deck.deal(3, [deckflip], 50, function() {
			deckflip.render();
		})
		discard.render();
	}
});

stack1.click(function(card){
	var k;
	for (k = 0; k < stack1.length; k++) {
		if (card == stack1[k]) {
			break;
		}
	}
	if (k == (stack1.length - 1)) {
		if (card.faceUp) {
			if (checkMiddle(card)) {}
			else checkStacks(card);
		}
		else {
			card.showCard();
		}
	}
});
stack2.click(function(card){
	var k;
	for (k = 0; k < stack2.length; k++) {
		if (card == stack2[k]) {
			break;
		}
	}
	if (k == (stack2.length - 1)) {
		if (card.faceUp) {
			if (checkMiddle(card)) {}
			else checkStacks(card);
		}
		else {
			card.showCard();
		}
	}
});
stack3.click(function(card){
	var k;
	for (k = 0; k < stack3.length; k++) {
		if (card == stack3[k]) {
			break;
		}
	}
	if (k == (stack3.length - 1)) {
		if (card.faceUp) {
			if (checkMiddle(card)) {}
			else checkStacks(card);
		}
		else {
			card.showCard();
		}
	}
});
stack4.click(function(card){
	var k;
	for (k = 0; k < stack4.length; k++) {
		if (card == stack4[k]) {
			break;
		}
	}
	if (k == (stack4.length - 1)) {
		if (card.faceUp) {
			if (checkMiddle(card)) {}
			else checkStacks(card);
		}
		else {
			card.showCard();
		}
	}
});
stack5.click(function(card){
	var k;
	for (k = 0; k < stack5.length; k++) {
		if (card == stack5[k]) {
			break;
		}
	}
	if (k == (stack5.length - 1)) {
		if (card.faceUp) {
			if (checkMiddle(card)) {}
			else checkStacks(card);
		}
		else {
			card.showCard();
		}
	}
});

// mainhand.mousedown(function(card, context){
// 	console.log("mousedowned");
// 	var i;
// 	for (i = 0; i < mainhand.length; i++) {
// 		if (card == mainhand[i]) {
// 			break;
// 		}
// 	}
// 	if ((i == 0) || (i == (mainhand.length - 1))) {
// 		while (card.faceUp == true) {
// 			card.moveTo(context.clientX, context.clientY);
// 		}
// 		mainhand.render();
// 		if (!(mainhand.length)) {
// 			endRound();
// 		}
// 		return;
// 	}
// 	console.log("invalid");
// });

// mainhand.mouseup(function(card, context){
// 	console.log("mouseupped");
// });

var pickedUp = false;
var cardOriginalX;
var cardOriginalY;

// function moveLoop(card, context) { // context only gives position of mouse event, need an updating mouse position
// 	console.log("moving");
// 	setTimeout(function() {
// 		card.moveTo(context.clientX, context.clientY);
// 		if (pickedUp) {
// 			moveLoop(card, context);
// 		}
// 	}, 1000);
// }

// mainhand.click(function(card, context){ // currently using ctrlKey, but would prefer to rightclick
// 	console.log(card);
// 	console.log(context);
// 	var i;
// 	for (i = 0; i < mainhand.length; i++) {
// 		if (card == mainhand[i]) {
// 			break;
// 		}
// 	}
// 	if (context.ctrlKey) {
// 		if ((i == 0) || (i == (mainhand.length - 1))) {
// 			if (checkMiddle(card)) {}
// 			else checkStacks(card);
// 			mainhand.render();
// 			if (!(mainhand.length)) {
// 				endRound();
// 			}
// 			return;
// 		}
// 	}
// 	else {
// 		if (!pickedUp) {
// 			cardOriginalX = Math.round(card.targetLeft + 34.5);
// 			cardOriginalY = Math.round(card.targetTop + 47);
// 			console.log(cardOriginalX + "  " + cardOriginalY);
// 			pickedUp = true;
// 			moveLoop(card, context);
// 		}
// 		else if (pickedUp) {
// 			card.moveTo(cardOriginalX, cardOriginalY);
// 			pickedUp = false;
// 		}
// 		return;
// 	}
// 	console.log("invalid");
// });

deckflip.click(function(card){ // currently using ctrlKey, but would prefer to rightclick
	if (card == deckflip[(deckflip.length - 1)]) {
		if (checkMiddle(card)) {}
		else checkStacks(card);
		if (!(deckflip.length)) {
			if (discard.length >= 3) {
				deckflip.addCard(discard[(discard.length-3)]);
				deckflip.addCard(discard[(discard.length-2)]);
				deckflip.addCard(discard[(discard.length-1)]);
			}
			else {
				while (discard.length) {
					deckflip.addCard(discard[0]);
				}
			}
			discard.render();
			deckflip.render();
		}
		return;
	}
	console.log("invalid");
});

deckflip.mousedown(function(card){
	
});

discard.click(function(){
	if (!(deck.length)) {
		while (deckflip.length) {
			discard.addCard(deckflip[0]);
		}
		for (w = 0; w < discard.length; w++) {
			discard[w].hideCard();
		}
		while (discard.length) {
			deck.addCard(discard[(discard.length - 1)]);
		}
		deck.render();
		discard.render();
		deckflip.render();
	}
});

function checkMiddle(card) {
	switch(card.suit) {
		case 'd':
			for (n = 0; n < diamonds.length; n++) {
				if ((card.rank == 1) && (diamonds[n].length == 0)) {
					diamonds[n].addCard(card);
					diamonds[n].render();
					return true;
				}
				else if (diamonds[n].length > 0) {
					if (card.rank == (diamonds[n].topCard().rank + 1)) {
						diamonds[n].addCard(card);
						diamonds[n].render();
						return true;
					}
				}
			}
			break;
		case 'c':
			for (n = 0; n < clubs.length; n++) {
				if ((card.rank == 1) && (clubs[n].length == 0)) {
					clubs[n].addCard(card);
					clubs[n].render();
					return true;
				}
				else if (clubs[n].length > 0) {
					if (card.rank == (clubs[n].topCard().rank + 1)) {
						clubs[n].addCard(card);
						clubs[n].render();
						return true;
					}
				}
			}
			break;
		case 'h':
			for (n = 0; n < hearts.length; n++) {
				if ((card.rank == 1) && (hearts[n].length == 0)) {
					hearts[n].addCard(card);
					hearts[n].render();
					return true;
				}
				else if (hearts[n].length > 0) {
					if (card.rank == (hearts[n].topCard().rank + 1)) {
						hearts[n].addCard(card);
						hearts[n].render();
						return true;
					}
				}
			}
			break;
		case 's':
			for (n = 0; n < spades.length; n++) {
				if ((card.rank == 1) && (spades[n].length == 0)) {
					spades[n].addCard(card);
					spades[n].render();
					return true;
				}
				else if (spades[n].length > 0) {
					if (card.rank == (spades[n].topCard().rank + 1)) {
						spades[n].addCard(card);
						spades[n].render();
						return true;
					}
				}
			}
			break;
		default:
			break;
	}
}

function checkStacks(card) {
	for (u = 0; u < stacks.length; u++) {
		if (stacks[u].length == 0) {
			stacks[u].addCard(card);
			stacks[u].render();
			return;
		}
	}

	var cardColor;
	if ((card.suit == 'd') || (card.suit == 'h')) {
		cardColor = 'red';
	}
	else cardColor = 'black';

	var stackCard = stack1[(stack1.length - 1)];
	var stackColor;
	if ((stackCard.suit == 'd') || (stackCard.suit == 'h')) {
		stackColor = 'red';
	}
	else stackColor = 'black';
	if ((stackCard.rank == (card.rank + 1)) && (stackColor != cardColor)) {
		stack1.addCard(card);
		stack1.render();
		return;
	}

	stackCard = stack2[(stack2.length - 1)];
	if ((stackCard.suit == 'd') || (stackCard.suit == 'h')) {
		stackColor = 'red';
	}
	else stackColor = 'black';
	if ((stackCard.rank == (card.rank + 1)) && (stackColor != cardColor)) {
		stack2.addCard(card);
		stack2.render();
		return;
	}

	stackCard = stack3[(stack3.length - 1)];
	if ((stackCard.suit == 'd') || (stackCard.suit == 'h')) {
		stackColor = 'red';
	}
	else stackColor = 'black';
	if ((stackCard.rank == (card.rank + 1)) && (stackColor != cardColor)) {
		stack3.addCard(card);
		stack3.render();
		return;
	}

	stackCard = stack4[(stack4.length - 1)];
	if ((stackCard.suit == 'd') || (stackCard.suit == 'h')) {
		stackColor = 'red';
	}
	else stackColor = 'black';
	if ((stackCard.rank == (card.rank + 1)) && (stackColor != cardColor)) {
		stack4.addCard(card);
		stack4.render();
		return;
	}

	stackCard = stack5[(stack5.length - 1)];
	if ((stackCard.suit == 'd') || (stackCard.suit == 'h')) {
		stackColor = 'red';
	}
	else stackColor = 'black';
	if ((stackCard.rank == (card.rank + 1)) && (stackColor != cardColor)) {
		stack5.addCard(card);
		stack5.render();
		return;
	}
}

function endRound() {
	console.log("round ended");
}

// TO DO
// allow click any face-up card on stack, move all cards beneath with it
// automate if no more face-up cards on stack then flip next card
// figure out click drag-and-drop cards
// figure out right click