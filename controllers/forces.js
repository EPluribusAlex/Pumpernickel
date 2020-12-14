let lastSerial = "0";

class Unit {
	static baseStats = {
		lineInf: {
			name: "Line Infantry",
			size: 1000,
			fire: 20
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
}

export { Unit, Army };