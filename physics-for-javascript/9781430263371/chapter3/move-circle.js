// Move a ball along the curve defined by the function f(x) = -sqrt(1-x^2).
// The curve is plotted on a background canvas and the ball is drawn on a foreground canvas.
// The ball moves along the curve by updating its position at regular intervals using setInterval.
// The code defines a Graph class for plotting the curve and a Ball class for representing the moving ball.
// The function f(x) is defined as -sqrt(1-x^2), which represents the lower half of a circle with radius 1 centered at the origin.
// The code initializes the graph and the ball, and then starts the animation by calling setupTimer, which uses setInterval to call moveBall at a rate of 60 frames per second.
// The moveBall function updates the position of the ball based on the precomputed x and y values of the curve, clears the foreground canvas, and redraws the ball at its new position. The animation continues until the ball has moved through all the precomputed points on the curve, at which point the interval is cleared to stop the animation.
// Note: The Graph and Ball classes are assumed to be defined elsewhere in the codebase, as they are not included in this snippet. They are responsible for drawing the graph and the ball on the respective canvases.
// The code also includes a function plotGraph that sets up the background canvas with the graph of the function, and a function placeBall that initializes the ball's position on the curve before starting the animation.
// Overall, this code demonstrates how to animate a ball moving along a curve defined by a mathematical function using HTML5 canvas and JavaScript.
// The code is structured to separate the concerns of plotting the graph and animating the ball, making it easier to manage and understand the different components of the animation.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 
var canvas_bg = document.getElementById('canvas_bg');
var context_bg = canvas_bg.getContext('2d');

var ball;
var xA=new Array();
var yA=new Array();
var n=0;		
var xmin=-2;
var xmax=2;		
var ymin=-2;
var ymax=2;		
var xorig=275;
var yorig=210;
var xwidth=350;
var ywidth=350;		
var xscal;
var yscal;
var idInterval;

window.onload = init; 
 
function init(){
	plotGraph();
	placeBall();
	setupTimer();
} 
 
function plotGraph(){
	var graph = new Graph(context_bg,xmin,xmax,ymin,ymax,xorig,yorig,xwidth,ywidth);			
	graph.drawgrid(1,0.2,1,0.2);			
	graph.drawaxes('x','y');	
	xscal=(xmax-xmin)/xwidth;
	yscal=(ymax-ymin)/ywidth;			
	for (var i=0; i<=1000; i++){
		//	xA[i] = (i-500)*0.02; // goes outside range for which function is defined
		xA[i] = (i-500)*0.002;				
		yA[i] = f(xA[i]);							   
	}
	graph.plot(xA,yA,'#ff0000',false,true);			
}

function f(x){
	var y;
	y = -Math.sqrt(1-x*x);
	return y;
}

function placeBall(){
	ball = new Ball(6,"#0000ff");
	ball.x = xA[0]/xscal+ xorig;
	ball.y = -yA[0]/yscal + yorig;
	ball.draw(context);			
}

function setupTimer(){
	idInterval = setInterval(moveBall, 1000/60);
}		

function moveBall(){
	ball.x = xA[n]/xscal + xorig;
	ball.y = -yA[n]/yscal + yorig;
	context.clearRect(0, 0, canvas.width, canvas.height);  
	ball.draw(context);
	n++;
	if (n==xA.length){
		clearInterval(idInterval);				
	}
} 
 