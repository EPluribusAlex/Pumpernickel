let lastSerial = "0";

class Unit {
	static baseStats = {
		lineInfantry: {
			name: "Line Infantry",
			type: "infantry",
			size: 1000,
			fire: 15,
			shock: 12,
			cover: 0,
			defence: 4,
			range: 10,
			maneuver: 5,
			mobility: 20
		}
	}
	newSerial() {
		let val = parseInt(lastSerial, 16);
		val++;
		lastSerial = val.toString(16);
		return lastSerial;
	}
}

class LineInfantry extends Unit {
	constructor() {
		super();
		this.serial = super.newSerial();
		this.name = Unit.baseStats.lineInfantry.name;
		this.strength = Unit.baseStats.lineInfantry.size;
		this.morale = 100;
		this.fire = Unit.baseStats.lineInfantry.fire; 
	}
}

class Army {
	name;
	units = [];
	constructor(name, units) {
		this.name = name;
		for(let i = 0; i < units.lineInf; i++) {
			this.units.push(new LineInfantry());
		}
	}
	get troopTotal() {
		let total = 0;
		this.units.forEach(e => {
			total+= e.strength;
		});
		return total;
	}
}

function battle(defender, attacker) {
	const battlefield = {};
	battlefield.distance = 10;
	battlefield.width = 20;
	battlefield.defenders = {mainline: [], reserve: []};
	battlefield.attackers = {mainline: [], reserve: []};
	defender.units.forEach(e => {
		if(e.name === "Line Infantry") {
			if(battlefield.defenders.mainline.length < battlefield.width) {
				battlefield.defenders.mainline.push(e.serial);
			} else {
				battlefield.defenders.reserve.push(e.serial);
			}
		}
	});
	attacker.units.forEach(e => {
		if(e.name === "Line Infantry") {
			if(battlefield.attackers.mainline.length < battlefield.width) {
				battlefield.attackers.mainline.push(e.serial);
			} else {
				battlefield.attackers.reserve.push(e.serial);
			}
		}
	});
	function roll() { 
		return (Math.ceil(Math.random() * 6) - Math.ceil(Math.random() * 6));
	}
	let 
		attackRoll = roll(),
		defenceRoll = roll(),
		rollInterval = 0;
	console.log("combat rolls atk/dfn: " + attackRoll + "/" + defenceRoll);
	const sequence = setInterval(function() {
		if(battlefield.attackers.mainline.length === 0 && battlefield.defenders.mainline.length === 0) {
			console.log("Draw!");
			clearInterval(sequence);
		} else if(battlefield.attackers.mainline.length === 0) {
			console.log("Defender wins!");
			clearInterval(sequence);
		} else if(battlefield.defenders.mainline.length === 0) {
			console.log("Attacker wins!");
			clearInterval(sequence);
		} else {
			rollInterval++;
			if(rollInterval === 6) {
				rollInterval = 0;
				attackRoll = roll();
				defenceRoll = roll();
				console.log("combat rolls atk/dfn: " + attackRoll + "/" + defenceRoll);
			}
			for(let i = 0; i < battlefield.defenders.mainline; i++) {
				const fire = battlefield.defenders.mainline[i].fire + (battlefield.defenders.mainline[i].fire * attackRoll);
				battlefield.attackers.mainline[i].strength-= fire;
			}
		}
	}, 2000);
}

let 
	army1 = new Army("1st Battalion", {lineInf: 30}),
	army2 = new Army("1st Battalion", {lineInf: 30});

battle(army1, army2);