import { settings } from './index.js';

const tInterval = settings.tInterval;

const combatRoll = function() {
	return (Math.floor(Math.random() * 6 + 1) - Math.floor(Math.random() * 6 + 1));
}

const combat = function(attacker, defender) {
	let 
		atkStr = attacker.troopTotal, 
		dfnStr = defender.troopTotal, 
		tick = 0, 
		atkRoll = combatRoll(),
		dfnRoll = combatRoll();

	console.log(attacker.name + " with " + atkStr + " is attacking " + defender.name + " with " + dfnStr + "!");
	console.log("initial rolls " + atkRoll + "/" + dfnRoll)

	const combatRound = () => {
		tick++;
		console.log("Round " + tick);

		const damage = (army, num, roll) => {
			const 
				fire = army.fireTotal,
				str = num / army.troopTotal,
				bonus = roll / 6;
			return (Math.ceil((fire + (fire * bonus)) * str));
		}

		if(tick % 5 === 0) {
			atkRoll = combatRoll();
			dfnRoll = combatRoll();
			console.log("new combat rolls of " + atkRoll + "/" + dfnRoll);
		}

		if(atkStr > 0 && dfnStr > 0) {
			dfnStr-= damage(attacker, atkStr, atkRoll);
			atkStr-= damage(defender, dfnStr, dfnRoll);
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