/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var menuState = {
	 preload: function() {
		 game.load.image('testhowlerbutton', 'assets/img/menu/buttonHowler.png');
		 game.load.image('testhowler2button', 'assets/img/menu/buttonHowler2.png');
		 game.load.image('testhowler3button', 'assets/img/menu/buttonHowler3.png');
		 game.load.image('testhowler4button', 'assets/img/menu/buttonHowler4.png');
		 game.load.image('closebutton', 'assets/img/menu/close.png');
		 game.physics.startSystem(Phaser.Physics.ARCADE);
	 },
	 create: function() {
		 game.stage.backgroundColor = '#3498db';
		 this.testhowlerButton = game.add.button(50,50, 'testhowlerbutton', this.startTestHowler, this);
		 this.testhowlerButton.input.useHandCursor = true;
		 this.testhowlerButton2 = game.add.button(50,150, 'testhowler2button', this.startTestHowler2, this);
		 this.testhowlerButton2.input.useHandCursor = true;
		 this.testhowlerButton3 = game.add.button(50,250, 'testhowler3button', this.startTestHowler3, this);
		 this.testhowlerButton3.input.useHandCursor = true;
		 this.testhowlerButton4 = game.add.button(50,350, 'testhowler4button', this.startTestHowler4, this);
		 this.testhowlerButton4.input.useHandCursor = true;
	 },
	 startTestHowler: function() {
		 game.state.clearCurrentState();
		 game.state.start('testhowler');
	 },
	 startTestHowler2: function() {
		 game.state.start('testhowler2');
	 },
	 startTestHowler3: function() {
		 game.state.start('testhowler3');
	 },
	 startTestHowler4: function() {
		 game.state.start('testhowler4');
	 }
 };

