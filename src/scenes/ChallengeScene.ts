import Phaser from 'phaser'
import DigitKeyboard from '~/Object/DigitKeyboard';
import Task from '~/Object/Task'

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
        // this.load.image('clove', 'clove.png')
    }

    create()
    {

        // this.add.image(400, 300, 'clove')


        // var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" }

        // //  The Text is positioned at 0, 100
        // let text = this.add.text(0, 0, "phaser 2.4 text bounds", style);
        // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    
        // //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        // // text.setTextBounds(0, 100, 800, 100);

        let task = new Task(this);
        let digitKeyboard = new DigitKeyboard(this);
        this.add.container(0, 0, [task, digitKeyboard])
    }
}
