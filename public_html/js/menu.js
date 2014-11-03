/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 var menuState = {
	 preload: function() {
		 game.load.image('testhowlerbutton', 'assets/img/menu/buttonHowler.png');
	 },
	 create: function() {
		 game.stage.backgroundColor = '#3498db';
		 this.testhowlerButton = game.add.button(50,50, 'testhowlerbutton', this.startTestHowler, this);
		 this.testhowlerButton.input.useHandCursor = true;
	 },
	 startTestHowler: function() {
		 game.state.start('testhowler');
	 }
 };

