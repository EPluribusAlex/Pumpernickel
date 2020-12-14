import { settings } from './index.js';

const tInterval = settings.tInterval;

const combatRoll = function() {
	return (Math.floor(Math.random() * 6 + 1) - Math.floor(Math.random() * 6 + 1));
}

const combat = function(attacker, defender) {
	let 
		atkStr = 0,
		atkFire = 0, 
		dfnStr = 0,
		dfnFire = 0, 
		tick = 0, 
		atkRoll = combatRoll(),
		dfnRoll = combatRoll();

	attacker.units.forEach(e => {
		atkStr+= e.strength;
		atkFire+= e.fire;
	});

	defender.units.forEach(e => {
		dfnStr+= e.strength;
		dfnFire+= e.fire;
	});

	console.log(attacker.name + " with " + atkStr + " is attacking " + defender.name + " with " + dfnStr + "!");
	console.log("initial rolls " + atkRoll + "/" + dfnRoll)

	const combatRound = () => {
		tick++;

		if(tick % 5 === 0) {
			atkRoll = combatRoll();
			dfnRoll = combatRoll();
			console.log("new combat rolls of " + atkRoll + "/" + dfnRoll);
		}

		if(atkStr > 0 && dfnStr > 0) {
			dfnStr-= atkFire + Math.ceil(atkFire * atkRoll / 6);
			atkStr-= dfnFire + Math.ceil(dfnFire * dfnRoll / 6);
			if(atkStr < 0) {atkStr = 0}
			if(dfnStr < 0) {dfnStr = 0}
			console.log(atkStr + " attacker/" + dfnStr + " defender");
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

	const end = () => {
		clearInterval(begin);
		console.log(atkStr + " surviving attackers", dfnStr + " surviving defenders");
	}

	const begin = setInterval(combatRound, tInterval);
}

export { combat };