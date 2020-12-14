import { Army, combat } from './controllers/index.js';

let army1 = new Army("Killers", { lineInf: 10 });
let army2 = new Army("Hunters", { lineInf: 10 });

const battleResult = (attacker, defender) => {
	army1 = attacker;
	army2 = defender;
	console.log(army1.units);
	console.log(army2.units);
};

combat(army1, army2, battleResult);