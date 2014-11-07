/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var menuState = {
	 preload: function() {
		 game.load.image('testhowlerbutton', 'assets/img/menu/buttonHowler.png');
		 game.load.image('testhowler2button', 'assets/img/menu/buttonHowler2.png');
		 game.load.image('closebutton', 'assets/img/menu/close.png');
		 game.physics.startSystem(Phaser.Physics.ARCADE);
	 },
	 create: function() {
		 game.stage.backgroundColor = '#3498db';
		 this.testhowlerButton = game.add.button(50,50, 'testhowlerbutton', this.startTestHowler, this);
		 this.testhowlerButton.input.useHandCursor = true;
		 this.testhowlerButton2 = game.add.button(50,150, 'testhowler2button', this.startTestHowler2, this);
		 this.testhowlerButton2.input.useHandCursor = true;
	 },
	 startTestHowler: function() {
		 game.state.start('testhowler');
	 },
	 startTestHowler2: function() {
		 game.state.start('testhowler2');
	 }
	 
 };

