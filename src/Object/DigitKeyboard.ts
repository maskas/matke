import Phaser from 'phaser'

export default class DigitKeyboard extends Phaser.GameObjects.Container
{
    private fontSize = 30;
    private buttons:Array<Phaser.GameObjects.Text> = [];

	constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[])
	{
		super(scene, x, y)
        for (let i=0; i<=9; i++) {
            let text = scene.add.text(
                -200,
                -200,
                i.toString(),
                {
                    color: '#9c9',
                    fontSize: '60px',
                    fontFamily: 'sans-serif',
                }
            )
            
            text.setOrigin(0.5, 0.5)
            text.setPadding(5, 5)
            text.setInteractive({ cursor: 'pointer' })
            text.on('pointerover', (event) => {
                text.setColor('#bfb')
                text.setStroke('#fff', 4);
            });
            text.on('pointerout', (event) => {
                text.setColor('#9c9');
                text.setStroke('#fff', 0);
            });

            text.on('pointerup', (event) => {
                document.dispatchEvent(new KeyboardEvent('keyup', {
                    key: `${i}`,
                    keyCode: 96 + i,
                    code: `${i}`,
                    which: 96 + i,
                    shiftKey: false,
                    ctrlKey: false,
                    metaKey: false
                }));
                console.log(i);
            })
    
            this.add(text)
            this.buttons.push(text);
        }
        this.recalculate();


        window.addEventListener('resize', this.recalculate.bind(this), false);
    }


    recalculate() {
        const maxWidth = 800;
        const desiredWidth = Math.min(this.scene.game.canvas.width - 40, maxWidth)
        const buttonCount = this.buttons.length;
        let spacing = desiredWidth / buttonCount;

        for(let i=0; i<buttonCount; i++) {
            this.buttons[i].setX(this.scene.game.canvas.width/2 + spacing * (i - 4.5));
            this.buttons[i].setY(this.scene.game.canvas.height - this.fontSize - 100);
        }
    }
}
