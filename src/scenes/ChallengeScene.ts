import Phaser from 'phaser'
import DigitKeyboard from '~/Object/DigitKeyboard';
import Task from '~/Object/Task'

export default class ChallengeScene extends Phaser.Scene
{
    private task: Task | undefined;
    private container: Phaser.GameObjects.Container | undefined

    private completedEvent = 'completed'
    private failedEvent = 'failed'

    private ding;
    private error;

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
        this.ding = this.sound.add("ding", { loop: false, volume: 3 })
        this.error = this.sound.add("error", { loop: false, volume: 0.2 })


        let digitKeyboard = new DigitKeyboard(this);

        this.task = new Task(this);
        this.task.on(this.completedEvent, this.onCompleted, this);
        this.task.on(this.failedEvent, this.onFail, this);

        this.container = this.add.container(0, 0, [this.task, digitKeyboard])
    }

    onCompleted(event) {
        this.ding.play();

        if (!this.container) {
            return;
        }

        event.task.off(this.completedEvent, this.onCompleted)
        this.container.remove(event.task)
        event.task.destroy();

        this.task = new Task(this);
        this.task.on(this.completedEvent, this.onCompleted, this);
        this.task.on(this.failedEvent, this.onFail, this);
 
        this.container.add(this.task);
    }

    onFail(event) {
        this.error.play();
    }

    
}
