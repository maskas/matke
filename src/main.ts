import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import Challenge from './scenes/ChallengeScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	// scene: [HelloWorldScene, Challenge]
	scene: [Challenge]
}

export default new Phaser.Game(config)
