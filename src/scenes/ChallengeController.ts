import Phaser from 'phaser'
import Close from '../Object/Close';
import Levels from '../Levels';
import DigitKeyboard from '../Object/DigitKeyboard';

export default class ChallengeController extends Phaser.Scene
{
    private levels: Levels | undefined;

    constructor()
    {
        let config = {
            
        }
        super(config)
    }

    preload()
    {
        this.load.audio("ding", ["ding.wav"]);
        this.load.audio("error", ["error.wav"]);
        // this.load.image('close', 'close.png')
    }

    create()
    {
        let digitKeyboard = new DigitKeyboard(this);

        this.add.existing(digitKeyboard);

        let close = new Close(this);
        this.add.existing(close);
        // let image = this.add.image(30, 30, 'close');
        // image.scale = 0.08;

        this.levels = new Levels(this);
    }
}
