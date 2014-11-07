/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testhowler2State = {
	preload: function () {
		game.load.image('volumeIcon', 'assets/img/testhowler/media-volume-2.png');
		this.testNoiseSound = new Howl({
			urls: ['assets/audio/testhowler/static_noise_from_tv_with_no_signal.mp3']
		});
	},
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.soundBox = new Phaser.Rectangle(50, 0, 500, 480);
		this.soundRec = new Phaser.Rectangle(280, 50, 20, 20);
		this.volIcon = game.add.sprite(game.input.mousePointer.clientX, game.input.mousePointer.clientY, 'volumeIcon');
		this.volIcon.anchor.setTo(0.5, 0.5);
		console.log(">> base volume = " + Howler.volume() + " - sound volume : " + this.testNoiseSound.volume());
		this.testNoiseSound.loop(true);
		this.testNoiseSound.play();
	},
	update: function () {
		this.volIcon.x = game.input.mousePointer.x;
		this.volIcon.y = game.input.mousePointer.y;
		this.updateSoundBalance(this.soundRec, this.volIcon, this.testNoiseSound);
		this.updateSoundDistance(this.soundRec, this.volIcon, this.testNoiseSound, this.soundBox);
	},
	render: function() {
		game.debug.geom(this.soundBox,'rgba(15,255,255,0.5)');
		game.debug.geom(this.soundRec,'rgba(0,255,0,0.5)');
		game.debug.inputInfo(32, 20);
		game.debug.spriteInfo(this.volIcon, 32, 110);
		game.debug.spriteBounds(this.volIcon);
	},
	updateSoundBalance: function(source, target, sound) {
		var posx = ((source.x - target.x) / game.world.width) * 2;
		var posy = ((source.y - target.y) / game.world.height) * 2;
		// Change the sound position
		sound.pos3d(posx, posy, -0.5);
		console.log(sound.pos3d());
	},
	updateSoundDistance: function(source, target, sound, soundBox) {
		console.log("volume : " + sound.volume());
		if (Phaser.Rectangle.intersects(soundBox, target.getBounds())) {
			// icon intersects with soundbox
			var distance = game.physics.arcade.distanceBetween(source, target);
			var soundMaxDistance = Math.sqrt(Math.pow(soundBox.height, 2) + Math.pow(soundBox.width, 2));
			console.log("Sound box max distance : " + soundMaxDistance);
			var vol = (soundMaxDistance - distance) / soundMaxDistance;
			sound.volume(vol);
		} else {
			sound.volume(0.0);
		}
		console.log("New volume : " + sound.volume());
	}
};
