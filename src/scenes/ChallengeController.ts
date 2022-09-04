import Phaser from 'phaser'
import Close from '../Object/Close';
import Levels from '../Levels';
import DigitKeyboard from '../Object/DigitKeyboard';

export default class ChallengeController extends Phaser.Scene
{
    private levels: Levels | undefined;
    private level;

    constructor(config: string | Phaser.Types.Scenes.SettingsConfig)
    {
        super(config);
    }

    init(data)
    {
        this.level = data.level;
    }

    preload()
    {
        this.load.audio("ding", ["ding.wav"]);
        this.load.audio("error", ["error.wav"]);
    }

    create()
    {
        let digitKeyboard = new DigitKeyboard(this);

        this.add.existing(digitKeyboard);

        let close = new Close(this);
        this.add.existing(close);

        this.levels = new Levels(this, this.min(), this.max());
    }

    min() {
        switch(this.level) {
            case '1':
                return 0;
                break;
            case '2':
                return 5;
                break;
            case '3':
                return 10;
                break;
            default:
                return 0;
        }
    }

    max() {
        switch(this.level) {
            case '1':
                return 5;
                break;
            case '2':
                return 9;
                break;
            case '3':
                return 19;
                break;
            default:
                return 0;
        }
    }
}
