import { forces, combat } from './controllers/index.js';

const Army = forces.Army;

let army1 = new Army("Killers", {lineInf: 1});
let army2 = new Army("Hunters", {lineInf: 1});

combat(army1, army2);