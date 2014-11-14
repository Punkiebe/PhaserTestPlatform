/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testhowler3State = {
	preload: function() {
		game.load.image('volumeIcon', 'assets/img/testhowler/media-volume-2.png');
		this.testNoiseSound = new Howl({
			urls: ['assets/audio/testhowler/static_noise_from_tv_with_no_signal.mp3']
		});
	},
	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0,0, 600, 2000); // Sets the size of our world
		this.box1 = new Phaser.Rectangle(50, 0, 50, 1000);
		this.box2 = new Phaser.Rectangle(200, 200, 200, 200);
		this.box3 = new Phaser.Rectangle(300, 1000, 50, 1000);
	},
	update: function() {
		game.camera.y += 1;
	},
	render: function() {
		game.debug.geom(this.box1,'rgba(15,255,255,0.5)');
		game.debug.geom(this.box2,'rgba(15,255,255,0.5)');
		game.debug.geom(this.box3,'rgba(15,255,255,0.5)');
	}
};
