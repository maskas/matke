import Phaser from 'phaser'
import EventDispatcher from '../System/EventDispatcher';

export default class Close extends Phaser.GameObjects.Container
{
    private fontSize = 30;
    private button;
    private textSymbol;

	constructor(scene: Phaser.Scene)
	{
        super(scene);
        
        // let image = scene.add.image(x, y, 'clove');
    

        this.textSymbol = scene.add.text(
            20,
            20,
            'x',
            {
                color: '#fff',
                fontSize: '40px',
                fontFamily: 'sans-serif',
            }
        )
        
        this.textSymbol.setOrigin(0.5, 0.5)
        this.textSymbol.setInteractive({ cursor: 'pointer' })
        this.textSymbol.on('pointerover', (event) => {
            // this.textSymbol.setRotation(0.3);
            this.textSymbol.setColor('#f00')
            // textSymbol.setStroke('#006', 2);
        });
        this.textSymbol.on('pointerout', (event) => {
            // this.textSymbol.setRotation(0);
            this.textSymbol.setColor('#fff');
            // textSymbol.setStroke('#fff', 2);
        });

        this.textSymbol.on('pointerup', (event) => {
            EventDispatcher.getInstance().emit("level_closed")
            //test
        })

        this.add(this.textSymbol)

        
    }
}
