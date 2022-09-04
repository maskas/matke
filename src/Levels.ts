import Phaser from 'phaser'
import Task from './Object/Task';
import EventDispatcher from './System/EventDispatcher';

export default class Levels
{
    private ding;
    private error;

    private task: Task | undefined;
    private container: Phaser.GameObjects.Container | undefined

    private completedEvent = 'completed'
    private failedEvent = 'failed'

    private scene: Phaser.Scene;

    private failedAttempts = 0;
    private max = 5;
    private min = 0;

	constructor(scene: Phaser.Scene, min: number, max: number)
	{
        this.min = min;
        this.max = max;

        this.scene = scene;
        this.ding = scene.sound.add("ding", { loop: false, volume: 3 })
        this.error = scene.sound.add("error", { loop: false, volume: 0.2 })

        this.container = scene.add.container(0, 0, [])

        this.addNewTask();
    }

    onCompleted(event) {
        this.ding.play();

        // EventDispatcher.getInstance().emit('level_completed');

        this.refreshTask(event.task);
    }

    refreshTask(task) {
        if (!this.container) {
            return;
        }

        task.off(this.completedEvent, this.onCompleted)
        this.container.remove(task)
        task.destroy();

        this.failedAttempts = 0;

        this.addNewTask();
    }

    addNewTask() {
        if (!this.container) {
            return;
        }

        this.task = new Task(this.scene, this.min, this.max);
        this.task.on(this.completedEvent, this.onCompleted, this);
        this.task.on(this.failedEvent, this.onFail, this);
 
        this.container.add(this.task);
    }

    onFail(event) {
        this.failedAttempts++;
        if (this.failedAttempts > 3) {
            // this.refreshTask(event.task)
        }
        this.error.play();
    }

    calcMax() {
        // console.log(`Strugle ${this.struggle}. Max = ${this.max}`);
        // if (this.struggle > 3) {
        //     this.max = Math.max(this.max - 1, 3);
        //     this.struggle = 0;
        // } else {
        //     if (this.struggle <= -3) {
        //         this.max = Math.min(this.max + 1, 9);
        //         this.struggle = 0;
        //     }
        // }
    }

}
