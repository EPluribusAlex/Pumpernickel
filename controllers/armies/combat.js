import { settings } from './index.js';

const tInterval = settings.tInterval;

// Simulate probability distribution of 2D6 with range from -5 to 5.
const combatRoll = function() {
	return (Math.floor(Math.random() * 6 + 1) - Math.floor(Math.random() * 6 + 1));
}

const combat = function(attacker, defender, combatWidth, callback) {
	let 
		atkStr = attacker.troopTotal, 
		dfnStr = defender.troopTotal, 
		tick = 0, 
		atkRoll,
		dfnRoll;

	console.log(attacker.name + " with " + atkStr + " is attacking " + defender.name + " with " + dfnStr + "!");

	// will iterate until battle is over
	const combatRound = () => {
		tick++;
		console.log("Round " + tick);

		// calculate damage inflicted based on numbers and combat roll
		const damage = (army, num, roll) => {
			const 
				armyWidth = num / 1000,
				fire = army.fireTotal(combatWidth),
				strPercent = (num > (armyWidth * 1000)) ? 1 : num / (armyWidth * 1000),
				bonus = roll / 6;
			console.log("Combat width " + combatWidth + " allows " + Math.ceil((fire + fire * bonus) * strPercent) + " damage.");
			return Math.ceil((fire + fire * bonus) * strPercent);
		};

		// re-roll combat dice after every 5th day
		if((tick - 1) % 5 === 0) {
			atkRoll = combatRoll();
			dfnRoll = combatRoll();
			console.log("new combat rolls of " + atkRoll + "/" + dfnRoll);
		}

		// check for end condition and apply new losses to each side
		if(atkStr > 0 && dfnStr > 0) {
			dfnStr-= damage(attacker, atkStr, atkRoll);
			atkStr-= damage(defender, dfnStr, dfnRoll);
			if(atkStr < 0) { atkStr = 0 }
			if(dfnStr < 0) { dfnStr = 0 }
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

	// end combat loop and return results so they can be applied to the original army objects
	const end = () => {
		clearInterval(begin);
		console.log(atkStr + " surviving attackers", dfnStr + " surviving defenders");

		let 
			atkLosses = attacker.troopTotal - atkStr,
			dfnLosses = defender.troopTotal - dfnStr;

		if(atkLosses === attacker.troopTotal) {
			atkLosses = 0;
			attacker.units = [];
		}

		if(dfnLosses === defender.troopTotal) {
			dfnLosses = 0;
			defender.units = [];
		}

		while(atkLosses > 0) {
			if(attacker.units[0].strength < atkLosses) {
				atkLosses-= attacker.units[0].strength;
				attacker.units.splice(0, 1);
			} else {
				attacker.units[0].strength-= atkLosses;
				atkLosses = 0;
			}
		}

		while(dfnLosses > 0) {
			if(defender.units[0].strength < dfnLosses) {
				dfnLosses-= defender.units[0].strength;
				defender.units.splice(0, 1);
			} else {
				defender.units[0].strength-= dfnLosses;
				dfnLosses = 0;
			}
		}

		callback(attacker, defender);
	}

	const begin = setInterval(combatRound, tInterval);
};

export { combat };