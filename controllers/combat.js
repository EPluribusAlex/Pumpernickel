import { settings } from './index.js';

const tInterval = settings.tInterval;

const combatRoll = function() {
	return (Math.ceil(Math.random() * 6) - Math.ceil(Math.random() * 6));
}

const combat = function(attacker, defender) {
	console.log(attacker.name + " is attacking " + defender.name + "!");

	const begin = setInterval(combatRound, tInterval);

	const end = () => {
		clearInterval(begin);
		console.log(atkStr + " surviving attackers", dfnStr + " surviving defenders");
	}

	let 
		atkStr = 0, 
		dfnStr = 0;

	attacker.units.forEach(e => {
		atkStr+= e.strength;
	});

	defender.units.forEach(e => {
		dfnStr+= e.strength;
	});

	function combatRound() {
		if(atkStr > 0 && dfnStr > 0) {
			atkStr-= Math.ceil(Math.random() * 100);
			dfnStr-= Math.ceil(Math.random() * 100);
			console.log(atkStr + " attacker", dfnStr + " defender");
		} else if(atkStr > 0) {
			console.log("Attacker wins!");
			end();
		} else if(dfnStr > 0) {
			console.log("Defender wins!");
			end();
		} else {
			console.log("Draw!");
			end();
		}
	}
}

export { combat };