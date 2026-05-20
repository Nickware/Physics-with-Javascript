// This example demonstrates how to move a circle along a parametric curve defined by the equations x = sin(t) and y = cos(t). The code sets up a canvas and its drawing context, defines the parameters for the graph, and then uses a timer to update the position of the circle at regular intervals. The circle is drawn at the new position on each update, creating the effect of movement along the curve. The curve itself is also plotted on the background canvas for reference. The resulting animation will show a circle moving along a circular path defined by the sine and cosine functions.
// Note: The Graph class and its methods (drawgrid, drawaxes, plot) are assumed to be defined elsewhere in the codebase, as they are not included in this snippet.
// Example 3.5: Moving a circle along a parametric curve defined by x = sin(t) and y = cos(t)
// The code sets up a canvas and its drawing context, defines the parameters for the graph, and then uses a timer to update the position of the circle at regular intervals. The circle is drawn at the new position on each update, creating the effect of movement along the curve. The curve itself is also plotted on the background canvas for reference. The resulting animation will show a circle moving along a circular path defined by the sine and cosine functions.
// The code also includes comments to explain the steps and the calculations. The resulting animation will show a circle moving along a circular path defined by the sine and cosine functions. The curve is plotted in red on the background canvas, while the circle is drawn in blue on the foreground canvas. The movement of the circle will be smooth and continuous, following the path of the curve as defined by the parametric equations.
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
		var t=0.01*i;
		xA[i] = Math.sin(t);
		yA[i] = Math.cos(t);							   
	}
	graph.plot(xA,yA,'#ff0000',false,true);			
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
 