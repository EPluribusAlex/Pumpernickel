import { Army, combat } from './controllers/armies/index.js';

let army1 = new Army("Killers", { lineInf: 15 });
let army2 = new Army("Hunters", { lineInf: 15 });

const combatWidth = 10;

const battleResult = (attacker, defender) => {
	army1 = attacker;
	army2 = defender;
};

combat(army1, army2, combatWidth, battleResult);