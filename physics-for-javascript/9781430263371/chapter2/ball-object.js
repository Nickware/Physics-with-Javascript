// Ball Object
// This code defines a Ball object that can be drawn on an HTML5 canvas.
// The Ball object has properties for position, radius, color, and methods for drawing itself.
// The Ball object can be used in simulations or games where a ball needs to be represented visually.
// The Ball object can be extended with additional properties and methods as needed.
// The Ball object is defined using a constructor function and prototype methods.
// The Ball object can be instantiated with a specific radius and color, and its position can be set using the x and y properties.
// The Ball object can be drawn on the canvas using the draw method, which takes a canvas context as an argument.
// Constructor function for the Ball object

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var ball = new Ball(50,'#0000ff');
ball.x = 100;
ball.y = 100;
ball.draw(context);
