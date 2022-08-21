import Phaser from 'phaser'
import Task from './Object/Task';

export default class Levels
{
    private ding;
    private error;

    private task: Task | undefined;
    private container: Phaser.GameObjects.Container | undefined

    private completedEvent = 'completed'
    private failedEvent = 'failed'

    private scene: Phaser.Scene;

	constructor(scene: Phaser.Scene)
	{
        this.scene = scene;
        this.ding = scene.sound.add("ding", { loop: false, volume: 3 })
        this.error = scene.sound.add("error", { loop: false, volume: 0.2 })

        this.container = scene.add.container(0, 0, [])

        this.addNewTask();
    }

    onCompleted(event) {
        this.ding.play();

        if (!this.container) {
            return;
        }

        event.task.off(this.completedEvent, this.onCompleted)
        this.container.remove(event.task)
        event.task.destroy();

        this.addNewTask();
    }

    addNewTask() {
        if (!this.container) {
            return;
        }

        this.task = new Task(this.scene);
        this.task.on(this.completedEvent, this.onCompleted, this);
        this.task.on(this.failedEvent, this.onFail, this);
 
        this.container.add(this.task);
    }

    onFail(event) {
        this.error.play();
    }

}
