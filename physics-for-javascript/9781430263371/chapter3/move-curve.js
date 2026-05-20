// Move a ball along the curve defined by the function f(x) = -sqrt(1-x^2).
// This is the lower half of a circle with radius 1 centered at the origin. The
// curve is plotted on a background canvas, and the ball moves along the curve
// on a foreground canvas. The ball's position is updated 60 times per second.
// The code uses a Graph class to plot the curve and a Ball class to represent the moving ball.
// The code assumes that the Graph and Ball classes are defined elsewhere, and that there are two canvas elements in the HTML with ids 'canvas' and 'canvas_bg'.
// The code initializes the graph and the ball, and sets up a timer to move the ball along the curve. The ball's position is calculated based on the precomputed x and y coordinates of the curve, which are stored in arrays xA and yA. The ball's position is updated in the moveBall function, which is called repeatedly by the timer until it reaches the end of the curve.
// The code also includes a function f(x) that defines the curve, and a function plotGraph that sets up the graph and computes the coordinates of the curve. The placeBall function initializes the ball's position, and the setupTimer function starts the animation. The moveBall function updates the ball's position and redraws it on the canvas.
// Note: The code assumes that the Graph and Ball classes are defined elsewhere, and that there are two canvas elements in the HTML with ids 'canvas' and 'canvas_bg'.
// The code initializes the graph and the ball, and sets up a timer to move the ball along the curve. The ball's position is calculated based on the precomputed x and y coordinates of the curve, which are stored in arrays xA and yA. The ball's position is updated in the moveBall function, which is called repeatedly by the timer until it reaches the end of the curve.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 
var canvas_bg = document.getElementById('canvas_bg');
var context_bg = canvas_bg.getContext('2d');

var ball;
var xA=new Array();
var yA=new Array();
var n=0;		
var xmin=-10;
var xmax=10;		
var ymin=-50;
var ymax=50;		
var xorig=275;
var yorig=210;
var xwidth=450;
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
	graph.drawgrid(2,0.4,10,2);			
	graph.drawaxes('x','y');	
	xscal=(xmax-xmin)/xwidth;
	yscal=(ymax-ymin)/ywidth;			
	for (var i=0; i<=1000; i++){
		xA[i] = (i-500)*0.02;
		yA[i] = f(xA[i]);						   
	}
	graph.plot(xA,yA,'#ff0000',false,true);			
}

function f(x){
	var y;
	//	y = 0.2*(x+3.6)*(x+2.5)*(x+1)*(x-0.5)*(x-2)*(x-3.5);
	y = (x+3.6)*(x+2.5)*(x+1)*(x-0.5)*(x-2)*(x-3.5)*Math.exp(-x*x/4);
	//	y = 0.5*x*(x+3.6)*(x+2.5)*(x+1)*(x-0.5)*(x-2)*(x-3.5)*Math.exp(-x*x/4);
	//	y = -0.1*x*x*(x+3.6)*(x+2.5)*(x+1)*(x-0.5)*(x-2)*(x-3.5)*Math.exp(-x*x/4);
	//y = Math.pow(x,5) - Math.pow(x,3) + 5*x*x - 2*x - 3;
	//y = Math.pow(x,5) - Math.pow(x,4) + x*x - 2*x - 3;
	//y = Math.log(x);
	//y = 40*Math.exp(-x*x);
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
 