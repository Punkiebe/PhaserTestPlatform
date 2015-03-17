/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

SoundBoxSprite = function (name, posX, posY, scaleX, scaleY) {
	Phaser.Sprite.call(this, game, posX, posY, 'pixelArea');
	this.scale.set(scaleX, scaleY);
	this.name = name;
	this.anchor.setTo(0.5, 0.5);
	this.addSoundSource = function (name, posX, posY, scaleX, scaleY) {
		this.soundSource = new Phaser.Sprite(game, posX, posY, 'pixelSource');
		this.soundSource.scale.set(scaleX, scaleY);
		this.soundSource.name = name;
		this.soundSource.anchor.setTo(0.5, 0.5);
	};
};

SoundBoxSprite.prototype = Object.create(Phaser.Sprite.prototype);
SoundBoxSprite.prototype.constructor = SoundBoxSprite;

var testhowler4State = {
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
		game.world.setBounds(0, 0, 600, 1600); // Sets the size of our world
		this.soundBox1 = new SoundBoxSprite("area1", 100, 500, 200, 500);
		this.soundBox1.addSoundSource("source1", 100, 740, 200, 20);
		this.soundBox2 = new SoundBoxSprite("area2", 500, 500, 200, 500);
		this.soundBox2.addSoundSource("source2", 500, 740, 200, 20);
		this.soundBox3 = new SoundBoxSprite("area3", 300, 1000, 400, 500);
		this.soundBox3.addSoundSource("source3", 300, 1240, 400, 20);

		this.areaBoxes = game.add.group();
		this.areaBoxes.enableBody = true;
		this.areaBoxes.add(this.soundBox1);
		this.areaBoxes.add(this.soundBox2);
		this.areaBoxes.add(this.soundBox3);

		this.sourceBoxes = game.add.group();
		this.sourceBoxes.enableBody = true;
		this.sourceBoxes.add(this.soundBox1.soundSource);
		this.sourceBoxes.add(this.soundBox2.soundSource);
		this.sourceBoxes.add(this.soundBox3.soundSource);
		
		this.endBar = game.add.sprite(0, 1300, 'pixelSource');
		this.endBar.scale.setTo(600, 20);
		game.physics.arcade.enableBody(this.endBar);

		this.volIcon = game.add.sprite(game.input.mousePointer.clientX, game.input.mousePointer.clientY, 'volumeIcon');
		this.volIcon.anchor.setTo(0.5, 0.5);
		this.volIcon.name = "icon";
		game.physics.arcade.enableBody(this.volIcon);
	},
	update: function () {
		this.volIcon.x = game.input.mousePointer.x + game.camera.x;
		this.volIcon.y = game.input.mousePointer.y + game.camera.y;

		game.physics.arcade.overlap(this.volIcon, this.sourceBoxes, this.sourceHit, null, this);
		game.physics.arcade.overlap(this.volIcon, this.endBar, this.endGame, null, this);

		var overlap = game.physics.arcade.overlap(this.volIcon, this.areaBoxes, this.soundOverlap, null, this);

		if (!overlap) {
			this.testNoiseSound.stop();
			console.log("No overlap");
			this.soundId = null;
		}
		game.camera.y += 2;
	},
	render: function () {
		//	render phase
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
	sourceHit: function (icon, source) {
		alert('got hit by ' + source.name);
	},
	endGame: function (icon, source) {
		alert('Won!!  ' + source.name);
	},
	updateSoundBalance: function (source, target, sound) {
		var posx = ((source.x - target.x) / game.world.width) * 2;
		var posy = ((source.y - target.y) / game.world.height) * 2;
		console.log("posx = " + posx + " - posy = " + posy);
		// Change the sound position
		sound.pos(posx, posy, -0.5, this.soundId);
	},
	updateSoundDistance: function (source, target, sound, soundBox) {
		var distance = game.physics.arcade.distanceBetween(source, target);
		var soundMaxDistance = Math.sqrt(Math.pow(soundBox.height, 2) + Math.pow(soundBox.width, 2));
		console.log("Sound box max distance : " + soundMaxDistance);
		var vol = (soundMaxDistance - distance) / soundMaxDistance;
		sound.volume(vol, this.soundId);
	}
};
