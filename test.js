import { Army, combat } from './controllers/armies/index.js';

let army1 = new Army("Killers", { lineInf: 5 });
let army2 = new Army("Hunters", { lineInf: 5 });

const combatWidth = 10;

const battleResult = (attacker, defender) => {
	army1 = attacker;
	army2 = defender;
	console.log(army1, army2);
};

combat(army1, army2, combatWidth, battleResult);