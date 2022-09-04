import Phaser from 'phaser'
import Challenge from './scenes/ChallengeScene'
import LevelSelect from './scenes/LevelSelect'
import ChallengeController from './scenes/ChallengeController';
import EventDispatcher from './System/EventDispatcher';


const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: '#000',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		},
	},
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [LevelSelect, ChallengeController]
	// scene: [LevelSelect]
	// scene: [Challenge]
}

let game: Phaser.Game;


// window.addEventListener('resize', function (event) {
// 	game.scale.resize(window.innerWidth / 10, window.innerHeight / 10);
// 	window.scrollTo(0, 0);
// 	setTimeout(() => {
// 		fixLayout()		
// 	}, 500)
// }, false);

// function fixLayout() {
// 	game.scale.resize(window.innerWidth, window.innerHeight);
// }

game = new Phaser.Game(config);

export default game
