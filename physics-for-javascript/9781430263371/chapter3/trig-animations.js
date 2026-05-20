// trig-animations.js
// This file is part of the "Physics for JavaScript Games" project (http://physicsforjavascript.com/)
// Copyright (c) 2011-2024, Joseph L. Torres. All rights reserved. (http://bit.ly/PhysicsForJavaScriptCopyright)
// Code licensed under the BSD License (http://bit.ly/PhysicsForJavaScriptBSDLicense)
// Project home: http://physicsforjavascript.com/
// This file may be used for educational purposes, but not for commercial applications, without further permission.
// For updates, documentation, and more, visit http://physicsforjavascript.com/
// This file demonstrates how to animate a ball moving along a curve defined by a trigonometric function.
// Note: This code relies on the Graph and Ball classes, which should be defined in separate files (e.g., graph.js and ball.js).
// To run this code, include it in an HTML file that has two canvas elements with ids 'canvas' and 'canvas_bg'.
// The 'canvas_bg' will be used to draw the static graph, while 'canvas' will be used to animate the ball moving along the graph.
// The function f(x) can be modified to create different trigonometric animations. The example includes a Fourier series approximation of a square wave, but you can uncomment other lines to see different functions in action.
// For example, you can use a simple sine wave, a damped sine wave, or a combination of sine waves to create more complex animations. The moveBall function updates the position of the ball based on the values of xA and yA, which are calculated from the function f(x). The animation runs at 60 frames per second until it reaches the end of the xA array.
// Note: The fourierSum function calculates the Fourier series approximation of a square wave, which can be used to create interesting animations. You can adjust the number of terms (N) in the Fourier series to see how it affects the shape of the curve and the animation of the ball.
// For more information on Fourier series and how they work, you can refer to the following resources:
// - "Fourier Series" on Khan Academy: https://www.khanacademy.org/math/ap-calculus-bc/bc-series-new/bc-4-5/v/fourier-series
// - "Fourier Series" on Wikipedia: https://en.wikipedia.org/wiki/Fourier_series
// - "Fourier Series" on MathWorld: https://mathworld.wolfram.com/FourierSeries.html
// Feel free to experiment with different functions and parameters to create your own unique animations!
// For example, you can try using a combination of sine and cosine functions to create more complex animations, or you can use a damped sine wave to create an animation that gradually decreases in amplitude over time. The possibilities are endless, so have fun experimenting and creating your own unique animations!
// For more advanced animations, you can also consider using the requestAnimationFrame method instead of setInterval for smoother animations and better performance. The requestAnimationFrame method allows the browser to optimize the animation loop and can provide better results, especially on devices with varying refresh rates.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 
var canvas_bg = document.getElementById('canvas_bg');
var context_bg = canvas_bg.getContext('2d');

var ball;
var ball1;
var xA=new Array();
var yA=new Array();
var n=0;		
var xmin=0;
var xmax=1440;		
var ymin=-1;
var ymax=1;		
var xorig=50;
var yorig=200;
var xwidth=400;
var ywidth=300;		
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
	graph.drawgrid(180,45,0.5,0.1);				
	graph.drawaxes('x','y');	
	xscal=(xmax-xmin)/xwidth;
	yscal=(ymax-ymin)/ywidth;			
	for (var i=0; i<=200; i++){
		xA[i] = i*7.2;
		yA[i] = f(xA[i]);						   
	}
	graph.plot(xA,yA,'#ff0000',false,true);			
}

function f(x){
	var y;
	//y = Math.sin(x*Math.PI/180);
	//y = Math.sin(x*Math.PI/180)*Math.exp(-0.002*x);
	//y = Math.sin(x*Math.PI/180) + Math.sin(1.5*x*Math.PI/180);
	//y = 0.5*Math.sin(3*x*Math.PI/180) + 0.5*Math.sin(3.5*x*Math.PI/180);			
	//y = 0.2*Math.sin(x*Math.PI/180) + 0.4*Math.sin(2*x*Math.PI/180) + 0.6*Math.sin(3*x*Math.PI/180);
	//y = Math.sin(x*Math.PI/180) + Math.sin(3*x*Math.PI/180)/3;
	// y = Math.sin(x*Math.PI/180) + Math.sin(3*x*Math.PI/180)/3 + Math.sin(5*x*Math.PI/180)/5;
	//y = Math.sin(x*Math.PI/180) + Math.sin(3*x*Math.PI/180)/3 + Math.sin(5*x*Math.PI/180)/5 + Math.sin(7*x*Math.PI/180)/7;			
	y = fourierSum(10,x);
	//y = fourierSum(1000,x);
	return y;
}

function fourierSum(N,x){
	var fs=0;
	for (var nn=1; nn<=N; nn=nn+2){
		fs += Math.sin(nn*x*Math.PI/180)/nn;
	}
	return fs;
}		

function placeBall(){
	ball = new Ball(6,"#0000ff");
	ball.x = xA[0]/xscal+ xorig;
	ball.y = -yA[0]/yscal + yorig;
	ball.draw(context);	
	// place another ball instance
	ball1 = new Ball(6,"#0000ff");
	ball1.x = ball.x + 450;
	ball1.y = ball.y;	
	ball1.draw(context);		
}

function setupTimer(){
	idInterval = setInterval(moveBall, 1000/60);
}		

function moveBall(){
	ball.x = xA[n]/xscal + xorig;
	ball.y = -yA[n]/yscal + yorig;
	ball1.y = ball.y;
	context.clearRect(0, 0, canvas.width, canvas.height);  
	ball.draw(context);
	ball1.draw(context);	
	n++;
	if (n==xA.length){
		clearInterval(idInterval);				
	}
} 
 