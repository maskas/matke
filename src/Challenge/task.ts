import Phaser from 'phaser'

export default class Task extends Phaser.GameObjects.Container
{
    private text: Phaser.GameObjects.Text
    private digitA: integer
    private digitB: integer
    private min: integer
    private max: integer

	constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[])
	{
		super(scene, x, y)

        this.min = 0;
        this.max = 5;
        this.digitA = this.randomDigit()
        this.digitB = this.randomDigit()

		this.text = scene.add.text(100, 100, this.challengeText(), { color: 'white' })
			.setOrigin(0.5, 0.5)

		this.add(this.text)
	}

    challengeText(): string {
        return `${this.digitA} + ${this.digitB}`
    }

    randomDigit(): integer {
        let diff = this.max - this.min
        return Math.round(Math.random() * diff) + this.min
    }
}
