/**
 * 
 */
"use strict";

const monsters = {
	"boss": {
		"name": "Boss",
		"actions": [
			{
				"name": "Nothing Special",
				"initiative": 36,
				"description": "Move +0<hr/>Attack +0",
				"reset": false
			},
			{
				"name": "Accelerated Power",
				"initiative": 11,
				"description": "Special 2",
				"reset": false
			},
			{
				"name": "Accelerated Power",
				"initiative": 17,
				"description": "Special 2",
				"reset": true
			},
			{
				"name": "Accelerated Power",
				"initiative": 14,
				"description": "Special 2",
				"reset": false
			},
			{
				"name": "Lingering Strength",
				"initiative": 85,
				"description": "Special 1",
				"reset": true
			},
			{
				"name": "Lingering Strength",
				"initiative": 79,
				"description": "Special 1",
				"reset": false
			},
			{
				"name": "Lingering Strength",
				"initiative": 73,
				"description": "Special 1",
				"reset": false
			},
			{
				"name": "Twin Missiles",
				"initiative": 54,
				"description": "Move -1<hr/>Attack -1<br/>Range 3<br/>Target 2",
				"reset": false
			}
			
		]	
	},
	"living_corpse": {
		"name": "Living Corpse",
		"actions": [
			{
				"name": "Nothing Special",
				"initiative": 68,
				"description": "Move +0<hr/>Attack +0",
				"reset": true
			},
			{
				"name": "Nothing Special",
				"initiative": 68,
				"description": "Move +0<hr/>Attack +0",
				"reset": true
			},
			{
				"name": "Rotting Embrace",
				"initiative": 21,
				"description": "Move +1<hr/>Muddle ?<br/>Immobilize <br/>Target one adjacent enemy<br/>Leaf: The target also suffers 2 damage",
				"reset": false
			},
			{
				"name": "Nasty Assault",
				"initiative": 47,
				"description": "Move +1<hr/>Attack -1",
				"reset": false
			},
			{
				"name": "Calculated Strike",
				"initiative": 81,
				"description": "Move -1<hr/>Attack +1",
				"reset": false
			},
			{
				"name": "Reckless Charge",
				"initiative": 91,
				"description": "Move +2<br/>If this movement is performed, the Living Corpse suffers 1 damage.",
				"reset": false
			},
			{
				"name": "Release Gas",
				"initiative": 71,
				"description": "Move +0<hr/>Attack +1<hr/>Poison: Target all adjacent enemies<hr/>Infuse Leaf",
				"reset": false
			},
			{
				"name": "Violent Slam",
				"initiative": 32,
				"description": "Attack +2<br/>Push 1<br/>If this attack is performed, the Living Corpse suffers 1 damage.",
				"reset": false
			}
		]	
	},
	"zealot": {
		"name": "Zealot",
		"actions": [
			{
				"name": "Vile Scourge",
				"initiative": 77,
				"description": "Move -1<hr/>[SEE CARD] Attack -1 (Area)<br/>Poison<br/>Air: +1 Attack",
				"reset": false
			},
			{
				"name": "Calculated Strike",
				"initiative": 65,
				"description": "Move -1<hr/>Attack +1",
				"reset": false
			},
			{
				"name": "Hex Whip",
				"initiative": 19,
				"description": "Move +1<br/>Jump<hr/>Attack -1<br/>Curse</br>Infuse Air",
				"reset": false
			},
			{
				"name": "Drain Life",
				"initiative": 27,
				"description": "Move +0<hr/>Attack -1<br/>Range 2<br/>Heal X - Self<br/>X is damage suffered by arget</br>Infuse Moon",
				"reset": true
			},
			{
				"name": "Boil Blood",
				"initiative": 46,
				"description": "Attack -1<br/>Range 2<br/>Target 2</br/>Muddle<br/>Fire: +2 Range",
				"reset": false
			},
			{
				"name": "Unholy Flame",
				"initiative": 82,
				"description": "Attack +1<br/>Range 3<br/>Infuse Fire",
				"reset": true
			},
			{
				"name": "Nothing Special",
				"initiative": 50,
				"description": "Move +0<br/>Attack +0",
				"reset": false
			},
			{
				"name": "Nasty Assault",
				"initiative": 35,
				"description": "Move +1<br/>Attack -1",
				"reset": false
			}
			
		]	
	}
};

function monsterCheckbox(monsterId) {
	let checkbox = '<div class="form-ext-control form-ext-checkbox">';
	checkbox += '<input id="select-' + monsterId + '" class="form-ext-input" type="checkbox">';
    checkbox += '<label class="form-ext-label" for="select-' + monsterId + '">' 
			+ monsters[monsterId].name + '</label>';
    checkbox += '</div>';
	console.log(checkbox);
	
	return checkbox;
}

function selectMonsters(selectedMonsterIds) {
	let checkboxes = '<div class="row">';
	Object.keys(monsters).forEach(monsterId => {
		checkboxes += monsterCheckbox(monsterId);
	});
	checkboxes += "</div>";
	$("#select-monster").html(checkboxes);
	// Listeners
	Object.keys(monsters).forEach(monsterId => {
		$('#select-' + monsterId).click(function(){
			if($(this).is(':checked')){
				selectedMonsterIds[monsterId] = 0;
				console.log('#select-' + monsterId + ' checked');
			} else {
				delete selectedMonsterIds[monsterId];
				console.log('#select-' + monsterId + ' unchecked');
			}
			showSelectedMonsters(selectedMonsterIds);
		});
	});
}

function showSelectedMonsters(selectedMonsterIds) {
	console.log(selectedMonsterIds);
	let selectedMonsterTable = '<div class="row">';
	let cardCount = 0;
	Object.keys(selectedMonsterIds).forEach(monsterId => {
		console.log(monsterId);
		selectedMonsterTable += buildMonsterCard(monsterId);
		cardCount += 1;
	});
	if (cardCount === 0) {
		// Placeholder: empty card
		console.log("No monster!")
		selectedMonsterTable += '<div class="card" style="min-width: 300px; min-height:500px;">';
		selectedMonsterTable += '<div class="contents"><p>Monster here</p></div>'
		selectedMonsterTable += '</div>';
	}
	selectedMonsterTable += "</tr></table></div>";
	console.log(selectedMonsterTable);
	$('#selected-monsters').html(selectedMonsterTable);
	enableNewTurnButton(selectedMonsterIds);
}

function buildMonsterCard(monsterId) {
	let monsterCard = '<div class="card" style="min-width: 300px; min-height:500px;">';
    // Content
	monsterCard += '<div class="contents">';
	monsterCard += '<p class="title mt-2 mb-0">';
	monsterCard += monsters[monsterId].name;
	monsterCard += '</p>';
	monsterCard += '<div id="action-' + monsterId + '">Action here</div>';
	monsterCard += '</div>'; // Content
	
	monsterCard += '</div>'; // Card
	return monsterCard;
}

function enableNewTurnButton(selectedMonsterIds) {
	if (jQuery.isEmptyObject(selectedMonsterIds)) {
		$("#button-newTurn").addClass("btn--disabled");
		console.log("Button disabled");
	} else {
		$("#button-newTurn").removeClass("btn--disabled");
		console.log("Button enabled");
	}
}

function newTurn(selectedMonsterIds) {
	$("#new-turn").html('<button id="button-newTurn" class="btn btn-info">New turn</button>');
	enableNewTurnButton(selectedMonsterIds);
	$("#button-newTurn").click(function() {
		console.log("button-newTurn clicked");
		Object.keys(selectedMonsterIds).forEach(monsterId => {
			newTurnForMonster(monsterId);
		});
	});
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	let currentIndex = array.length,  randomIndex;
	// While there remain elements to shuffle.
	while (currentIndex > 0) {
	  // Pick a remaining element.
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
  }

function shuffleMonsterDeck(monster) {
	console.log('Shuffling deck for ' + monster.name)
	// Reset the array
	monster.deck = Array.apply(null, {length: Object.keys(monster.actions).length}).map(Number.call, Number);
	// Shuffle
	shuffle(monster.deck);
	monster.played = []
}

function newTurnForMonster(monsterId) {
	let monster = monsters[monsterId];
	console.log("New turn for " + monster.name);
	// Check 'deck' existence
	if (!('deck' in monster)) {
		shuffleMonsterDeck(monster)
	}
	if (monster.played.length != 0) {
		let lastInplayed = monster.played.pop();
		if (monster.actions[lastInplayed].reset) {
			shuffleMonsterDeck(monster);
		} else {
			// Not really needed to push it back actually since it won't be used again
			monster.played.push(lastInplayed); 
		}
	}
	console.log(monster.deck + "/" + monster.played);
	// Draw a card from the shuffled deck and append it to the played
	let actionIndex = monster.deck.pop();
	monster.played.push(actionIndex);
	console.log(monster.deck + "/" + monster.played);
	// Display the element for the action
	renderAction("action-" + monsterId, monster.actions[actionIndex]);
	// return the initiative
	let result = {};
	result[monster.name] = monster.actions[actionIndex].initiative;
	return result;
}

function renderAction(eltId, action) {
	console.log("Rendering " + eltId);
	let contents = "";
	contents += "<p><b>Name:</b> ";
	contents += action.name + "</p>";
	contents += "<p><b>Initiative:<b/> ";
	contents += action.initiative + "</p>";
	contents += "<p><b>Actions:</b><br/>";
	contents += action.description + "</p>";
	if (action.reset) {
		contents += "<p/><p>Reset</p>";
	}
	$('#' + eltId).html(contents);
}

$( document ).ready(function() {
    console.log( "ready!" );
    let selectedMonsterIds = {};
	newTurn(selectedMonsterIds);
    selectMonsters(selectedMonsterIds);
	showSelectedMonsters(selectedMonsterIds);
});
