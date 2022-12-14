import Phaser from 'phaser'
import Levels from '../Levels';
import DigitKeyboard from '../Object/DigitKeyboard';

export default class ChallengeScene extends Phaser.Scene
{

	constructor()
	{
        let config = {
            key: 'challenge',
            active: true,
        }
		super(config)
	}

	preload()
    {
        this.load.audio("ding", ["ding.wav"]);
        this.load.audio("error", ["error.wav"]);

    }

    create()
    {
        let digitKeyboard = new DigitKeyboard(this);

        this.add.container(0, 0, [digitKeyboard]);
    }
}
