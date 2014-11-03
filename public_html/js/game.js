/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var game = new Phaser.Game(600,480, Phaser.AUTO, 'gameDiv');

game.state.add('menu', menuState);
game.state.add('testhowler', testhowlerState);

game.state.start('menu');