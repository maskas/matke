import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import Challenge from './scenes/ChallengeScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	// render: {
	// 	transparent: true,
	// },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 }
		}
	},
	scene: [Challenge]
}

export default new Phaser.Game(config)
