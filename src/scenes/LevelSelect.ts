import Phaser from 'phaser'
import GameLevel from '../Object/GameLevel';

export default class LevelSelect extends Phaser.Scene
{
    private levels: Array<GameLevel> = [];

    constructor()
    {
        let config = {
            key: 'level_select',
            active: true,
        }
        super(config)
    }

    preload()
    {
		this.load.spritesheet('levelselecticons', 'levelselecticons.png', { frameWidth: 96, frameHeight: 96, endFrame: 6});
    }

    create()
    {
        for (let i=0; i<3; i++) {
            let gameLevel = new GameLevel(this, 200 + (i+1) * 100, 300, (i+1).toString());
            this.add.existing(gameLevel);
            this.levels.push(gameLevel);
        }
        // this.add.container(0, 0, [digitKeyboard]);

        // this.levels = new Levels(this);

        this.resize();
        this.scale.on('resize', this.resize, this);
    }

    resize() {
        let itemWidth = 150;
        for (let i=0; i<this.levels.length; i++) {
            this.levels[i].setX(window.innerWidth / 2 + ((i - (this.levels.length - 1) / 2) * itemWidth));
            this.levels[i].setY(window.innerHeight / 2);
        }
        
    }
}





// // -------------------------------------
// // START THE GAME
// // -------------------------------------
// var CANVAS_WIDTH = 800;
// var CANVAS_HEIGHT = 600;

// var PLAYER_DATA:any = null; // just declare as global variable for now


// import Phaser from 'phaser'

// export default class LevelSelect extends Phaser.Scene
// {
//     private holdicons:Array<Phaser.GameObjects.Group> = [];

//     constructor()
//     {
//         let config = {
//             key: 'challenge',
//             active: true,
//         }
//         super(config)
//     }

//     preload()
//     {
// 		console.log('reploaded');
// 		this.load.spritesheet('levelselecticons', 'levelselecticons.png', { frameWidth: 96, frameHeight: 96, endFrame: 6});
//     }

//     create()
//     {
// 		// this.add.bitmapText(256, 24, 'font72', 'Select a level!', 48);

// 		this.initProgressData();
// 		this.createLevelIcons();
// 		this.animateLevelIcons();
//         // let digitKeyboard = new DigitKeyboard(this);

//         // this.add.container(0, 0, [digitKeyboard]);

//         // this.levels = new Levels(this);
//     }

// 	initProgressData() {

// 		// array might be undefined at first time start up
// 		if (!PLAYER_DATA) {
// 			// retrieve from local storage (to view in Chrome, Ctrl+Shift+J -> Resources -> Local Storage)
// 			var str = window.localStorage.getItem('mygame_progress') || '';
			
// 			// error checking, localstorage might not exist yet at first time start up
// 			try {
// 				PLAYER_DATA = JSON.parse(str);
// 			} catch(e){
// 				PLAYER_DATA = []; //error in the above string(in this case,yes)!
// 			};
// 			// error checking just to be sure, if localstorage contains something else then a JSON array (hackers?)
// 			if (Object.prototype.toString.call( PLAYER_DATA ) !== '[object Array]' ) {
// 				PLAYER_DATA = [];
// 			};
// 		};
// 	}

// 	createLevelIcons() {
// 		var levelnr = 0;

// 		for (var y=0; y < 3; y++) {
// 			for (var x=0; x < 4; x++) {
// 				// next level
// 				levelnr = levelnr + 1;
				
// 				// check if array not yet initialised
// 				if (typeof PLAYER_DATA[levelnr-1] !== 'number') {
// 					// value is null or undefined, i.e. array not defined or too short between app upgrades with more levels
// 					if (levelnr == 1) {
// 						PLAYER_DATA[levelnr-1] = 0; // level 1 should never be locked
// 					} else {
// 						PLAYER_DATA[levelnr-1] = -1;
// 					};
// 				};

// 				// player progress info for this level
// 				var playdata = PLAYER_DATA[levelnr-1];

// 				// decide which icon
// 				var isLocked = true; // locked
// 				var stars = 0; // no stars
				
// 				// check if level is unlocked
// 				if (playdata > -1) {
// 					isLocked = false; // unlocked
// 					if (playdata < 4) {stars = playdata;}; // 0..3 stars
// 				};

// 				// calculate position on screen
// 				var xpos = 160 + (x*128);
// 				var ypos = 120 + (y*128);
				
// 				// create icon
// 				this.holdicons[levelnr-1] = this.createLevelIcon(xpos, ypos, levelnr, isLocked, stars);
// 				var backicon = this.holdicons[levelnr-1].children[0];

// 				// keep level nr, used in onclick method
// 				// backicon.health = levelnr;

// 				// input handler
// 				// backicon.inputEnabled = true;
// 				// backicon.events.onInputDown.add(this.onSpriteDown, this);
// 			};
// 		};
// 	}

// 	// -------------------------------------
// 	// Add level icon buttons
// 	// -------------------------------------
// 	createLevelIcon(xpos, ypos, levelnr, isLocked, stars) {

// 		// create new group
// 		var IconGroup = this.add.group();
// 		IconGroup.setX(xpos);
// 		IconGroup.setY(ypos);

// 		// // keep original position, for restoring after certain tweens
// 		// // IconGroup.xOrg = xpos;
// 		// // IconGroup.yOrg = ypos;

// 		// // determine background frame
// 		var frame = 0;
// 		if (isLocked == false) {frame = 1};
		
// 		// add background
// 		var icon1 = this.add.sprite(0, 0, 'levelselecticons', frame);
// 		IconGroup.add(icon1);

// 		// add stars, if needed
// 		if (isLocked == false) {
// 			// var txt = this.add.bitmapText(24, 16, 'font72', ''+levelnr, 48);
// 			var icon2 = this.add.sprite(0, 0, 'levelselecticons', (2+stars));
			
// 			// IconGroup.add(txt);
// 			IconGroup.add(icon2);
// 		};
		
// 		return IconGroup;
// 	}

// 	onSpriteDown(sprite, pointer) {

// 		// // retrieve the iconlevel
// 		// var levelnr = sprite.health;

// 		// if (PLAYER_DATA[levelnr-1] < 0) {
// 		// 	// indicate it's locked by shaking left/right
// 		// 	var IconGroup = this.holdicons[levelnr-1];
// 		// 	var xpos = IconGroup.xOrg;

// 		// 	var tween = this.add.tween(IconGroup)
// 		// 		.to({ x: xpos+6 }, 20, Phaser.Easing.Linear.None)
// 		// 		.to({ x: xpos-5 }, 20, Phaser.Easing.Linear.None)
// 		// 		.to({ x: xpos+4 }, 20, Phaser.Easing.Linear.None)
// 		// 		.to({ x: xpos-3 }, 20, Phaser.Easing.Linear.None)
// 		// 		.to({ x: xpos+2 }, 20, Phaser.Easing.Linear.None)
// 		// 		.to({ x: xpos }, 20, Phaser.Easing.Linear.None)
// 		// 		.start();
// 		// } else {
// 		// 	// simulate button press animation to indicate selection
// 		// 	var IconGroup = this.holdicons[levelnr-1];
// 		// 	var tween = this.add.tween(IconGroup.scale)
// 		// 		.to({ x: 0.9, y: 0.9}, 100, Phaser.Easing.Linear.None)
// 		// 		.to({ x: 1.0, y: 1.0}, 100, Phaser.Easing.Linear.None)
// 		// 		.start();
				
// 		// 	// it's a little tricky to pass selected levelnr to callback function, but this works:
// 		// 	tween._lastChild.onComplete.add(function(){this.onLevelSelected(sprite.health);}, this);
// 		// };
// 	}

// 	animateLevelIcons() {

// 		// slide all icons into screen
// 		for (var i=0; i < this.holdicons.length; i++) {
// 			// get variables
// 			var IconGroup = this.holdicons[i];
// 			IconGroup.setY(IconGroup.children[0]?.getY() + 600);
// 			var y = IconGroup.children[0]?.getY();

// 			// tween animation
			
// 			// this.add.tween(IconGroup).to( {y: y-600}, 500, Phaser.Easing.Back.Out, true, (i*40));
// 		};
// 	}

// 	onLevelSelected(levelnr) {
// 		// // pass levelnr variable to 'Game' state
// 		// this.state.states['game']._levelNumber = levelnr;
		
// 		// this.state.start('game');
// 	}
// }
