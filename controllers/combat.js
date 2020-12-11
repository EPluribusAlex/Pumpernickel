import { settings } from './index.js';

const tInterval = settings.tInterval;

const combatRoll = function() {
	return (Math.ceil(Math.random() * 6) - Math.ceil(Math.random() * 6));
}