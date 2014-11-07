/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var testhowlerState = {
	preload: function () {
		game.load.image('playbutton', 'assets/img/testhowler/playButton.png');
		game.load.image('personCenter', 'assets/img/testhowler/User-green-icon.png');
		game.load.image('volumeIcon', 'assets/img/testhowler/media-volume-2.png');
		this.testPianoSound = new Howl({
			urls: ['assets/audio/testhowler/classical_piano_music_track_mary_.mp3']
		});
		this.testNoiseSound = new Howl({
			urls: ['assets/audio/testhowler/static_noise_from_tv_with_no_signal.mp3']
		});
	},
	create: function () {
		this.backToMenu = game.add.button(game.world.width, 0, 'closebutton', this.backToMenu, this);
		this.backToMenu.anchor.setTo(1, 0);
		this.person = game.add.sprite(game.world.centerX, game.world.centerY, 'personCenter');
		this.person.anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.person);
		this.person.collideWorldBounds = true;
		this.person.inputEnabled = true;
		this.person.input.enableDrag();
		this.person.events.onDragStart.add(this.startDrag, this);
		this.person.events.onDragStop.add(this.stopDrag, this);
		this.playbutton = game.add.button(50, 50, 'playbutton', this.playSound, this);
		this.volIcon = game.add.sprite(game.input.mousePointer.clientX, game.input.mousePointer.clientY, 'volumeIcon');
		this.volIcon.anchor.setTo(0.5, 0.5);
		console.log(">> base volume = " + Howler.volume() + " - sound volume : " + this.testNoiseSound.volume());
	},
	update: function () {
		this.volIcon.x = game.input.mousePointer.x;
		this.volIcon.y = game.input.mousePointer.y;
		this.updateSoundBalance(this.person, this.volIcon, this.testNoiseSound);
		this.updateSoundDistance(this.person, this.volIcon, this.testNoiseSound);
	},
	playSound: function () {
		this.testNoiseSound.play();
	},
	updateSoundBalance: function(source, target, sound) {
		var posx = ((source.x - target.x) / game.world.width) * 2;
		var posy = ((source.y - target.y) / game.world.height) * 2;
		// Change the sound position
		sound.pos3d(posx, posy, -0.5);
		console.log(sound.pos3d());
	},
	updateSoundDistance: function(source, target, sound, soundMaxRadius) {
		console.log("volume : " + sound.volume());
		var distance = game.physics.arcade.distanceBetween(source, target);
		
		if (!soundMaxRadius) {
			soundMaxRadius = Math.sqrt(Math.pow(game.world.height, 2) + Math.pow(game.world.width, 2));
			console.log("max radius wasn't given, calculated our own : " + soundMaxRadius);
		}
		
		if (distance >= soundMaxRadius) {
			sound.volume(0.0);
			return;
		}
		
		var vol = (soundMaxRadius - distance) / soundMaxRadius;
		sound.volume(vol);
		console.log("New volume : " + sound.volume());
	},
	startDrag: function() {
		this.person.body.moves = false;
	},
	stopDrag: function() {
		this.person.body.moves = true;
	},
	backToMenu: function() {
		game.state.start("menu");
	}
};
