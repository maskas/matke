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
    private spacer = '?';
    private checkPause = 200;

    private keyUpEvent = 'keyup'
    private resizeEvent = 'resize'

    private chosenAnswer = '';


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
        if (newGuessTime - this.lastGuessTime <= this.checkPause) {
            // eliminate double clicks
            return;
        }
        this.lastGuessTime = newGuessTime;

        this.chosenAnswer = keyName;
        this.text.setText(this.challengeText());

        let correct = guess == this.answer;

        if (correct) {
            setTimeout(() => {
                this.emit('completed', { task: this} )
            }, this.checkPause)
        } else {
            setTimeout(() => {
                this.resetChosenAnswer(); 
                this.emit('failed', { task: this} )
            }, this.checkPause)
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

        this.resetChosenAnswer();

        this.text.setText(this.challengeText())
    }

    resetChosenAnswer() {
        this.chosenAnswer = this.fracRepeat(this.spacer, this.numDigits(this.answer))
        this.text.setText(this.challengeText());
    }

    challengeText(): string {
        return `${this.digitA} ${this.operand} ${this.digitB} = ${this.chosenAnswer}`
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

    fracRepeat(value: String, multiplier){
        if (multiplier < 0) multiplier = 0;
        return value.repeat(multiplier) + value.slice(0, ~~((multiplier - ~~multiplier) * value.length));
     }

     numDigits(x) {
        return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
      }
     
}
