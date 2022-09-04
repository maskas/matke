import Phaser from 'phaser'
import Challenge from './scenes/ChallengeScene'
import LevelSelect from './scenes/LevelSelect'
import SelectLevel from './scenes/SelectLevel';
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
	scene: []
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

// let levelSelect = new LevelSelect(game);

// game.scene.add('Boot', levelSelect, true);
game.scene.add('level_select', LevelSelect, true);

EventDispatcher.getInstance().on('level_selected', (event) => {
	game.scene.remove('level_select');
	game.scene.add('challenge', SelectLevel, true);


	console.log(event.level);
})


export default game
