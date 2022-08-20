import Phaser from 'phaser'
import Challenge from './scenes/ChallengeScene'

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
	scene: [Challenge]
}

let game;

window.addEventListener('resize', function (event) {
	game.scale.resize(window.innerWidth / 10, window.innerHeight / 10);
	window.scrollTo(0, 0);
	setTimeout(() => {
		game.scale.resize(window.innerWidth, window.innerHeight);
	}, 500)
}, false);

// window.addEventListener('load', function (event) {
// 	window.scrollTo(0, 0);
// 	game.scale.resize(window.innerWidth / 10, window.innerHeight / 10);
// 	setTimeout(() => {
// 		game.scale.resize(window.innerWidth, window.innerHeight);
// 	}, 500)
// }, false);

game = new Phaser.Game(config);


export default game
