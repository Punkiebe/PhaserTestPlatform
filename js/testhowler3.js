
//var SoundBoxSprite = Class.create(Phaser.Sprite, {
//	initialize : function(game, x, y, key, frame) {
//		Phaser.Sprite.call(this, game, x, y, key, frame);
//	},
//	addSoundSource : function(source) {
//		this.soundSource = source;
//	}
//});

SoundBoxSprite2 = function(name, posX, posY, scaleX, scaleY) {
	Phaser.Sprite.call(this, game, posX, posY, 'pixelArea');
	this.scale.set(scaleX, scaleY);
	this.name = name;
	this.anchor.setTo(0.5, 0.5);
	this.addSoundSource = function(name, posX, posY, scaleX, scaleY) {
		this.soundSource = new Phaser.Sprite(game, posX, posY, 'pixelSource');
		this.soundSource.scale.set(scaleX, scaleY);
		this.soundSource.name = name;
		this.soundSource.anchor.setTo(0.5, 0.5);
	};
};

SoundBoxSprite2.prototype = Object.create(Phaser.Sprite.prototype);
SoundBoxSprite2.prototype.constructor = SoundBoxSprite2;

var testhowler3State = {
	preload: function () {
		game.load.image('volumeIcon', 'assets/img/testhowler/media-volume-2.png');
		game.load.image('pixelArea', 'assets/img/testhowler3/onewhitepixel.png');
		game.load.image('pixelSource', 'assets/img/testhowler3/oneredpixel.png');
		this.testNoiseSound = new Howl({
			src: ['assets/audio/testhowler/static_noise_from_tv_with_no_signal.mp3']
		});
	},
	create: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.setBounds(0, 0, 600, 3000); // Sets the size of our world
//		this.soundBox1 = new SoundBoxSprite(game, 50, 0, 'pixelArea');
		this.soundBox1 = new SoundBoxSprite2("area1", 75, 500, 50, 1000);
		this.soundBox1.addSoundSource("source1", 75, 990, 20, 20);
		this.soundBox2 = new SoundBoxSprite2("area2", 300, 300, 200, 200);
		this.soundBox2.addSoundSource("source2", 300, 390, 20, 20);
		this.soundBox3 = new SoundBoxSprite2("area3", 325, 1500, 50, 1000);
		this.soundBox3.addSoundSource("source3", 325, 1990, 20, 20);
		this.soundBox4 = new SoundBoxSprite2("area4", 250, 2500, 300, 1000);
		this.soundBox4.addSoundSource("source4", 250, 2990, 300, 20);

		this.areaBoxes = game.add.group();
		this.areaBoxes.enableBody = true;
		this.areaBoxes.add(this.soundBox1);
		this.areaBoxes.add(this.soundBox2);
		this.areaBoxes.add(this.soundBox3);
		this.areaBoxes.add(this.soundBox4);
		
		this.sourceBoxes = game.add.group();
		this.sourceBoxes.enableBody = true;
		this.sourceBoxes.add(this.soundBox1.soundSource);
		this.sourceBoxes.add(this.soundBox2.soundSource);
		this.sourceBoxes.add(this.soundBox3.soundSource);
		this.sourceBoxes.add(this.soundBox4.soundSource);

		this.volIcon = game.add.sprite(game.input.mousePointer.clientX, game.input.mousePointer.clientY, 'volumeIcon');
		this.volIcon.anchor.setTo(0.5, 0.5);
		this.volIcon.name = "icon";
		game.physics.arcade.enableBody(this.volIcon);
		//this.testNoiseSound.loop(true);
		//this.testNoiseSound.play();
	},
	update: function () {
		this.volIcon.x = game.input.mousePointer.x + game.camera.x;
		this.volIcon.y = game.input.mousePointer.y + game.camera.y;

		game.physics.arcade.overlap(this.volIcon, this.sourceBoxes, this.sourceHit, null, this);
		
		var overlap = game.physics.arcade.overlap(this.volIcon, this.areaBoxes, this.soundOverlap, null, this);

		if (!overlap) {
			this.testNoiseSound.stop();
			console.log("No overlap");
			this.soundId = null;
		}
		//console.log(">> z index : " + this.soundBox1.z + " - " + this.soundBox1.soundSource.z);
		//console.log(">> z renderid : " + this.soundBox1.renderOrderID + " - " + this.soundBox1.soundSource.renderOrderID);

		// move the world
		game.camera.y += 1;
	},
	render: function () {
		//	game.debug.geom(this.box1,'rgba(15,255,255,0.5)');
		//	game.debug.geom(this.box2,'rgba(15,255,255,0.5)');
		//	game.debug.geom(this.box3,'rgba(15,255,255,0.5)');
	},
	soundOverlap: function (icon, box) {
		console.log("overlap " + icon.name + " - " + box.name);
		if (!this.soundId) {
			this.soundId = this.testNoiseSound.play();
		} else {
			if (!this.testNoiseSound.playing(this.soundId)) {
				this.testNoiseSound.play(this.soundId);
			}
		}
		console.log("sound id : " + this.soundId + " - " + this.testNoiseSound.playing(this.soundId));
		
		this.updateSoundBalance(box.soundSource, icon, this.testNoiseSound);
		this.updateSoundDistance(box.soundSource, icon, this.testNoiseSound, box);
		
	},
	sourceHit: function(icon, source) {
		alert('got hit by ' + source.name);
	},
	updateSoundBalance: function (source, target, sound) {
		var posx = ((source.x - target.x) / game.world.width) * 2;
		var posy = ((source.y - target.y) / game.world.height) * 2;
		console.log("posx = " + posx + " - posy = " + posy)
		// Change the sound position
		sound.pos(posx, posy, -0.5, this.soundId);
		//console.log(sound.pos(this.soundId));
	},
	updateSoundDistance: function (source, target, sound, soundBox) {
		// console.log("volume : " + sound.volume() + " - id : " + this.soundId);
		//if (Phaser.Rectangle.intersects(soundBox, target.getBounds())) {
			// icon intersects with soundbox
			var distance = game.physics.arcade.distanceBetween(source, target);
			var soundMaxDistance = Math.sqrt(Math.pow(soundBox.height, 2) + Math.pow(soundBox.width, 2));
			console.log("Sound box max distance : " + soundMaxDistance);
			var vol = (soundMaxDistance - distance) / soundMaxDistance;
			sound.volume(vol, this.soundId);
	//		//sound.volume(0.0, this.soundId);
	//	}
		//console.log("New volume : " + sound.volume());
	}
};
