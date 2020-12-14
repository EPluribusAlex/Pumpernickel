import { Army, combat } from './controllers/index.js';

let army1 = new Army("Killers", {lineInf: 10});
let army2 = new Army("Hunters", {lineInf: 10});

combat(army1, army2);