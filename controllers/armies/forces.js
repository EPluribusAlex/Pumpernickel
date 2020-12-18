let lastSerial = "0";

class Unit {
	static baseStats = {
		lineInf: {
			name: "Line Infantry",
			size: 1000,
			morale: 90,
			fire: 50
		}
	}
	generateSerial() {
		let val = parseInt(lastSerial, 16);
		val++;
		lastSerial = val.toString(16);
		return lastSerial;
	}
}

class LineInf extends Unit {
	constructor() {
		super();
		this.stats = Unit.baseStats.lineInf;
		this.serial = super.generateSerial();
		this.name = this.stats.name;
		this.strength = this.stats.size;
		this.morale = this.stats.morale;
		this.fire = this.stats.fire;
	}
}

class Army {
	name;
	units = [];

	constructor(name, units) {
		this.name = name;
		for(let i = 0; i < units.lineInf; i++) {
			this.units.push(new LineInf());
		}
	}

	get troopTotal() {
		let total = 0;
		this.units.forEach(e => {
			total+= e.strength;
		});
		return total;
	}

	get moraleTotal() {
		let total = 0;
		this.units.forEach(e => {
			total+= e.morale;
		});
		return total;
	}

	maxFire(combatWidth) {
		let 
			total = 0,
			armyWidth = 0;
		for(let i = 0; i < combatWidth; i++) {
			if(!this.units[i]) {
				break;
			}
			armyWidth++;
			total+= this.units[i].fire;
		}
		return total;
	}
}

export { Army };