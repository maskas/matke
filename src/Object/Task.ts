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
    private keyUpListener
    private resizeListener

    private keyUpEvent = 'keyup'
    private resizeEvent = 'resize'


	constructor(scene: Phaser.Scene, min, max)
	{
		super(scene)

        this.min = min;
        this.max = max;

        console.log(`Min: ${this.min}, Max: ${this.max}`)
        this.text = scene.add.text(
            100,
            100,
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
    
        this.resizeListener = this.fixLayout.bind(this);
        this.scene.scale.on(this.resizeEvent, this.resizeListener, this);

        this.keyUpListener = this.onKeyPress.bind(this);
        document.addEventListener(this.keyUpEvent, this.keyUpListener, false);
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
        if (newGuessTime - this.lastGuessTime <= 300) {
            // eliminate double clicks
            return;
        }
        this.lastGuessTime = newGuessTime;


        let correct = guess == this.answer;

        if (correct) {
            this.emit('completed', { task: this} )
        } else {
            this.emit('failed', { task: this} )
        }
    }

    refresh() {
        this.operand = Math.random() > 0.5 ? '+' : '-'


        switch(this.operand) {
            case '+':
                this.answer = this.randomDigit(this.min, this.max)
                this.digitA = this.randomDigit(0, this.answer)
                this.digitB = this.answer - this.digitA;
                this.answer = this.digitA + this.digitB;
                break;
            case '-':   
                this.digitA = this.randomDigit(this.min, this.max)
                this.digitB = this.randomDigit(2, this.digitA - 2)
                this.answer = this.digitA - this.digitB
                break;
        }

        this.text.setText(this.challengeText())
    }

    challengeText(): string {
        return `${this.digitA} ${this.operand} ${this.digitB} =`
    }

    randomDigit(min, max): integer {
        console.log("min " + min);
        let diff = max - min
        return Math.round(Math.random() * diff) + min
    }

    destroy() {
        document.removeEventListener(this.keyUpEvent, this.keyUpListener);
        this.scene.scale.off(this.resizeEvent,this.resizeListener, this);
        super.destroy();
    }
}
