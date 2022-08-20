import Phaser, { Time } from 'phaser'

export default class Task extends Phaser.GameObjects.Container
{
    private lastGuessTime = Date.now();
    private text: Phaser.GameObjects.Text
    private digitA = 0
    private digitB = 0
    private answer = 0
    private min: integer
    private max: integer
    private operand = '-'

    private ding;
    private error;

	constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[])
	{
		super(scene, x, y)

        this.min = 0;
        this.max = 4;

        this.text = scene.add.text(
            -10000,
            -10000,
            this.challengeText(),
            {
                color: 'white',
                fontSize: '100px',
                fontFamily: 'Fantasy',
            }
        )
        this.fixLayout();
        
        this.text.setOrigin(0.5, 0.5)


        this.refresh()


        this.add(this.text)

        this.ding = this.scene.sound.add("ding", { loop: false, volume: 3 })
        this.error = this.scene.sound.add("error", { loop: false, volume: 0.2 })

        window.addEventListener('resize', this.fixLayout.bind(this), false);

        // document.addEventListener('keypress', (event) => {
        //     var name = event.key;
        //     var code = event.code;
        //     // Alert the key name and key code on keydown
        //     alert(`Key pressed ${name} \r\n Key code value: ${code}`);
        //   }, false);

          document.addEventListener('keyup', this.onKeyPress.bind(this), false);

    }

    fixLayout() {
        this.text.setX(this.calcX())
        this.text.setY(this.calcY())
    }

    calcX() {
        return this.scene.game.canvas.width/2
    }
    
    calcY() {
        return (this.scene.game.canvas.height - 100) / 2
    }

    onKeyPress(event) {
        let name = event.key;
        let code = event.code;

        this.check(name);
    }

    check(keyName: string) {
        let guess = parseInt(keyName);

        if (isNaN(guess)) {
            return;
        }

        let newGuessTime = Date.now();
        if (newGuessTime - this.lastGuessTime <= 500) {
            return;
        } else {
            console.log(newGuessTime - this.lastGuessTime);
        }
        this.lastGuessTime = newGuessTime;


        let correct = guess == this.answer;

        if (correct) {
            this.ding.play()
            this.refresh()
        } else {
            this.error.play()
        }
    }

    refresh() {
        this.operand = Math.random() > 0.5 ? '+' : '-'
        this.digitA = this.randomDigit()
        this.digitB = this.randomDigit()
        this.answer = this.digitA + this.digitB;

        if (this.operand == '-') {
            this.digitB = Math.round(Math.random() * this.digitA)
            this.answer = this.digitA - this.digitB;
        }

        

        this.text.setText(this.challengeText())
    }

    challengeText(): string {
        return `${this.digitA} ${this.operand} ${this.digitB}`
    }

    randomDigit(): integer {
        let diff = this.max - this.min
        return Math.round(Math.random() * diff) + this.min
    }
}
