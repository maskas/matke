import Phaser from 'phaser'

export default class ChallengeScene extends Phaser.Scene
{
	constructor()
	{
		super('challenge')
	}

	preload()
    {
        this.load.image('clove', 'clove.png')
    }

    create()
    {
        this.add.image(400, 300, 'clove')
    }
}
