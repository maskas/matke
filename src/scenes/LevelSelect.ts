import Phaser from 'phaser'
import EventDispatcher from '../System/EventDispatcher';
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

    init() {
        this.events.on('shutdown', this.unbind, this)

        EventDispatcher.getInstance().on('level_selected', this.onLevelSelected, this)
        this.scale.on('resize', this.resize, this);
    }

    unbind() {
        console.log('shutdown');
        EventDispatcher.getInstance().off('level_selected', this.onLevelSelected, this);
        this.scale.off('resize', this.resize, this);
    }

    preload()
    {
        this.load.spritesheet('levelselecticons', 'levelselecticons.png', { frameWidth: 96, frameHeight: 96, endFrame: 6});


    }

    create()
    {
        this.levels = [];
        for (let i=0; i<6; i++) {
            let gameLevel = new GameLevel(this, 200 + (i+1) * 100, 300, (i+1).toString());
            this.add.existing(gameLevel);
            this.levels.push(gameLevel);
        }

        this.resize();



    }

    start() {
        console.log('start');
    }

    // stop(key: string) {
    //     console.log('stop');
    // }

    // shutdown(data?: object): void {

    // }

    onLevelSelected(event) {
        console.log(`On level selected ${event.level}`);
        this.scene.start('challenge_controller', {level: event.level});
    }

    resize() {
        console.log(`resize innerWidth: ${window.innerWidth}, ${this.levels.length}`);
        let itemWidth = 150;
        for (let i=0; i<this.levels.length; i++) {
            this.levels[i].setX(window.innerWidth / 2 + ((i - (this.levels.length - 1) / 2) * itemWidth));
            this.levels[i].setY(window.innerHeight / 2);
        }
        
    }
}
