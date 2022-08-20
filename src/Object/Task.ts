import Phaser from 'phaser'

export default class Task extends Phaser.GameObjects.Container
{
    private text: Phaser.GameObjects.Text
    private digitA = 0
    private digitB = 0
    private answer = 0
    private min: integer
    private max: integer

    private ding;
    private error;

	constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[])
	{
		super(scene, x, y)

        this.min = 0;
        this.max = 4;

        this.text = scene.add.text(
            scene.game.canvas.width/2,
            scene.game.canvas.height/2,
            this.challengeText(),
            {
                color: 'white',
                fontSize: '60px',
                fontFamily: 'Fantasy',
            }
        )
        
        this.text.setOrigin(0.5, 0.5)


        this.refresh();


        this.add(this.text)

        this.ding = this.scene.sound.add("ding", { loop: false })
        this.error = this.scene.sound.add("error", { loop: false, volume: 0.05 })

        window.addEventListener('resize', this.onResize.bind(this), false);

        // document.addEventListener('keypress', (event) => {
        //     var name = event.key;
        //     var code = event.code;
        //     // Alert the key name and key code on keydown
        //     alert(`Key pressed ${name} \r\n Key code value: ${code}`);
        //   }, false);

          document.addEventListener('keyup', this.onKeyPress.bind(this), false);

    }

    onResize() {
        this.text.setX(this.scene.game.canvas.width/2)
        this.text.setY(this.scene.game.canvas.height/2);
    }

    onKeyPress(event) {
        let name = event.key;
        let code = event.code;

        this.check(name);
    }

    check(keyName: string) {
        let guess = parseInt(keyName);
        if (guess == this.answer) {
            this.ding.play()
            this.refresh()
        } else {
            this.error.play()
            console.log(guess)
            console.log(this.answer)
        }
    }

    refresh() {
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
