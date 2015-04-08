
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
		game.load.image('pixelPlayer', 'assets/img/testhowler3/onegreenpixel.png');
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

		/*var text = game.add.text(game.camera.view.centerX, game.camera.view.centerY, "Click to start.", {font: "40px Arial", fill: "#ff00FF", align: "center"});
		text.anchor.setTo(0.5, 0.5);*/

        this.player = game.add.sprite(300, 50, 'pixelPlayer');
        this.player.anchor.setTo(0.5,0.5);
        this.player.scale.setTo(40, 40);
        game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.inputEnabled = true;
        this.player.input.enableDrag(true, true);
        this.player.input.consumePointerEvent = true;
        //this.player.input.onDown.add(this.playerClicked, this);

        this.player.events.onInputDown.add(this.playerClickedOn, this);
        this.player.events.onInputUp.add(this.playerClickedOff, this);
        this.playerfollow = false;

	/*	this.volIcon = game.add.sprite(game.input.mousePointer.clientX, game.input.mousePointer.clientY, 'volumeIcon');
		this.volIcon.anchor.setTo(0.5, 0.5);
		this.volIcon.name = "icon";
		game.physics.arcade.enableBody(this.volIcon);*/
		this.paused = false;
	},
	update: function () {
		/*this.volIcon.x = game.input.mousePointer.x + game.camera.x;
		this.volIcon.y = game.input.mousePointer.y + game.camera.y;*/
        var endOverlap = false;
		endOverlap = game.physics.arcade.overlap(this.player, this.sourceBoxes, this.sourceHit, null, this);
        if (!endOverlap) {
		  endOverlap = game.physics.arcade.overlap(this.player, this.endBar, this.endGame, null, this);
        }

		var overlap = game.physics.arcade.overlap(this.player, this.areaBoxes, this.soundOverlap, null, this);

		if (!overlap) {
			this.testNoiseSound.stop();
			console.log("No overlap");
			this.soundId = null;
		}
		if (!endOverlap || !this.paused) {
			game.camera.y += 1;
		}

        if (this.playerfollow) {
            this.player.x = game.input.mousePointer.x + game.camera.x;
            this.player.y = game.input.mousePointer.y + game.camera.y;
        } else if (!this.player.inCamera) {
            // player no longer in camera move inside camera
            console.log("OUT OF CAMERA, MOVE!!");
            this.player.y = game.camera.y + 40;
        }
	},
	render: function () {
		//	render phase
        game.debug.spriteInfo(this.player, 10, 10);
	},
    playerClickedOn: function() {
        console.log("mouse down on player");
        this.playerfollow = true;
    }, playerClickedOff: function() {
        console.log("mouse up on player");
        this.playerfollow = false;
    },
	soundOverlap: function (icon, box) {
		console.log("overlap " + icon.name + " - " + box.name);
		if (!this.soundId) {
			this.soundId = this.testNoiseSound.play();
		} else {
			if (!this.testNoiseSound.playing(this.soundId) && !this.paused) {
                console.log("start play ");
				this.testNoiseSound.play(this.soundId);
			}
		}

        if (!this.paused) {
            this.updateSoundBalance(box.soundSource, icon, this.testNoiseSound);
            this.updateSoundDistance(box.soundSource, icon, this.testNoiseSound, box);
        }
	},
	sourceHit: function (icon, source) {
        if (!this.paused)  {
            var text = "Lost!! Got hit by " + source.name;
            var style = {font: "50px Arial", fill: "#ff00FF", align: "center"};
            console.info("source HIT log");
            var t = game.add.text(game.camera.view.centerX, game.camera.view.centerY, text, style);
            t.anchor.setTo(0.5, 0.5);
            game.time.events.add(1000, this.returnToMenu, this);
            this.testNoiseSound.stop();
            this.paused = true;
        }
	},
	endGame: function (icon, source) {
		var text = "Won!!";
		var style = {font: "50px Arial", fill: "#ff00FF", align: "center"};

		var t = game.add.text(game.camera.view.centerX, game.camera.view.centerY, text, style);
		t.anchor.setTo(0.5, 0.5);
		game.time.events.add(1000, this.returnToMenu, this);
		this.paused = true;
	},
	returnToMenu: function () {
        this.testNoiseSound.stop();
		game.state.start('menu');
	},
	updateSoundBalance: function (source, target, sound) {
		var posx = ((source.x - target.x) / game.world.width) * 2;
		var posy = ((source.y - target.y) / game.world.height) * 2;
		// Change the sound position
		sound.pos(posx, posy, -0.5, this.soundId);
	},
	updateSoundDistance: function (source, target, sound, soundBox) {
		var distance = game.physics.arcade.distanceBetween(source, target);
		var soundMaxDistance = Math.sqrt(Math.pow(soundBox.height, 2) + Math.pow(soundBox.width, 2));
		var vol = (soundMaxDistance - distance) / soundMaxDistance;
		sound.volume(vol, this.soundId);
	}
};
