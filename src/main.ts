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

let game = new Phaser.Game(config);

window.addEventListener('resize', function (event) {
	game.scale.resize(window.innerWidth, window.innerHeight);
}, false);

export default game
