import Phaser from 'phaser'
import EventDispatcher from '../System/EventDispatcher';

export default class GameLevel extends Phaser.GameObjects.Container
{
    private button;
    private textSymbol;

	constructor(scene: Phaser.Scene, x: number, y: number, level: string)
	{
        super(scene, x, y);
        
        // let image = scene.add.image(x, y, 'clove');
        
        this.button = scene.add.sprite(x, y, 'levelselecticons', 1)

        this.textSymbol = scene.add.text(
            0,
            0,
            level,
            {
                color: '#fff',
                fontSize: '60px',
                fontFamily: 'sans-serif',
            }
        )
        
        this.textSymbol.setOrigin(0.5, 0.5)
        this.button.setInteractive({ cursor: 'pointer' })
        this.button.on('pointerover', (event) => {
            this.button.tint = Math.random() * 0xffffff;
            this.button.setRotation(0.05);
            this.textSymbol.setRotation(0.05);
            this.textSymbol.setColor('#fff')
            // textSymbol.setStroke('#006', 2);
        });
        this.button.on('pointerout', (event) => {
            this.button.clearTint();
            this.button.setRotation(0);
            this.textSymbol.setRotation(0);
            this.textSymbol.setColor('#fff');
            // textSymbol.setStroke('#fff', 2);
        });

        this.button.on('pointerup', (event) => {
            EventDispatcher.getInstance().emit("level_selected", { level: level } )
        })

        this.add(this.textSymbol)
    }

    setX(value?: number): this{
        super.setX(value);
        this.button.setX(value);
        return this;
    }

    setY(value?: number): this{
        super.setY(value);
        this.button.setY(value);
        return this;
    }
}
