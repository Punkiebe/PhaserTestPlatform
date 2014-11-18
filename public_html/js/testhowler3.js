/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testhowler3State = {
	preload: function() {
		game.load.image('volumeIcon', 'assets/img/testhowler/media-volume-2.png');
		game.load.image('pixel', 'assets/img/testhowler3/onewhitepixel.png');
		this.testNoiseSound = new Howl({
			urls: ['assets/audio/testhowler/static_noise_from_tv_with_no_signal.mp3']
		});
	},
	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0,0, 600, 2000); // Sets the size of our world
		this.box1 = game.add.sprite(50, 0, 'pixel');
		this.box1.scale.set(50, 1000);
		this.box2 = game.add.sprite(200, 200, 'pixel');
		this.box2.scale.set(200, 200);
		this.box3 = game.add.sprite(300, 1000, 'pixel');
		this.box3.scale.set(50, 1000);
		//this.box1 = new Phaser.Rectangle(50, 0, 50, 1000);
		//this.box2 = new Phaser.Rectangle(200, 200, 200, 200);
		//this.box3 = new Phaser.Rectangle(300, 1000, 50, 1000);
		
		this.boxes = game.add.group();
		this.boxes.enableBody = true;
		this.boxes.add(this.box1);
		this.boxes.add(this.box2);
		this.boxes.add(this.box3);
		
		this.volIcon = game.add.sprite(game.input.mousePointer.clientX, game.input.mousePointer.clientY, 'volumeIcon');
		this.volIcon.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enableBody(this.volIcon);
		this.testNoiseSound.loop(true);
		this.testNoiseSound.play();
	},
	update: function() {
		this.volIcon.x = game.input.mousePointer.x + game.camera.x;
		this.volIcon.y = game.input.mousePointer.y + game.camera.y;
		
		game.physics.arcade.overlap(this.volIcon, this.boxes, this.soundOverlap, null, this);
		
		// move the world
		game.camera.y += 1;
	},
	render: function() {
	//	game.debug.geom(this.box1,'rgba(15,255,255,0.5)');
	//	game.debug.geom(this.box2,'rgba(15,255,255,0.5)');
	//	game.debug.geom(this.box3,'rgba(15,255,255,0.5)');
	},
	soundOverlap: function() {
		console.log("overlap");
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
