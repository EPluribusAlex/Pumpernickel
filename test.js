import { forces } from './controllers/index.js';

const Army = forces.Army;

let army1 = new Army("Killers", {lineInf: 10});
let army2 = new Army("hunters", {lineInf: 10});

console.log(army1.name, army2.name);