/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var game = new Phaser.Game(600,480, Phaser.CANVAS, 'gameDiv');

game.state.add('menu', menuState);
game.state.add('testhowler', testhowlerState);
game.state.add('testhowler2', testhowler2State);
game.state.add('testhowler3', testhowler3State);
game.state.add('testhowler4', testhowler4State);

game.state.start('menu');