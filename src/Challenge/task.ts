import Phaser from 'phaser'

export default class Task extends Phaser.GameObjects.Container
{
    private text: Phaser.GameObjects.Text
    private digitA: integer
    private digitB: integer
    private answer: integer
    private min: integer
    private max: integer

	constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[])
	{
		super(scene, x, y)

        this.min = 0;
        this.max = 5;

        this.text = scene.add.text(100, 100, this.challengeText(), { color: 'white' })
            .setOrigin(0.5, 0.5)


        this.refresh();


        this.add(this.text)


        // document.addEventListener('keypress', (event) => {
        //     var name = event.key;
        //     var code = event.code;
        //     // Alert the key name and key code on keydown
        //     alert(`Key pressed ${name} \r\n Key code value: ${code}`);
        //   }, false);

          document.addEventListener('keypress', this.onKeyPress.bind(this), false);

    }

    onKeyPress(event) {
        let name = event.key;
        let code = event.code;

        this.check(name);
    }

    check(keyName: string) {
        let guess = parseInt(keyName);
        if (guess == this.answer) {
            this.refresh();
        } else {
            console.log(guess)
            console.log(this.answer)
        }
    }

    refresh() {
        console.log('refresh');
        this.digitA = this.randomDigit()
        this.digitB = this.randomDigit()
        this.answer = this.digitA + this.digitB;

        this.text.setText(this.challengeText())
    }

    challengeText(): string {
        return `${this.digitA} + ${this.digitB}`
    }

    randomDigit(): integer {
        let diff = this.max - this.min
        return Math.round(Math.random() * diff) + this.min
    }
}
