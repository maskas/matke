import Phaser from 'phaser'
import Challenge from './scenes/ChallengeScene'
import LevelSelect from './scenes/LevelSelect'
import ChallengeController from './scenes/ChallengeController';
import EventDispatcher from './System/EventDispatcher';


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	// scene: [LevelSelect, ChallengeController]
	// scene: [Challenge]
}

let game: Phaser.Game;


window.addEventListener('resize', function (event) {
	game.scale.resize(window.innerWidth / 10, window.innerHeight / 10);
	window.scrollTo(0, 0);
	setTimeout(() => {
		fixLayout()		
	}, 500)
}, false);

function fixLayout() {
	game.scale.resize(window.innerWidth, window.innerHeight);
}

game = new Phaser.Game(config);

game.scene.add('level_select', LevelSelect, true);

EventDispatcher.getInstance().on('level_selected', (event) => {
	game.scene.remove('level_select');
	game.scene.add('challenge_controller', ChallengeController, true);

	console.log(event.level);
})

EventDispatcher.getInstance().on('level_completed', (event) => {
	displayLevels();
})

EventDispatcher.getInstance().on('level_closed', (event) => {
	displayLevels();
})

function displayLevels() {
	game.scene.remove('challenge_controller');
	game.scene.add('level_select', LevelSelect, true);
}

export default game
