// trig-functions.js
// Trigonometric functions
// This program plots the sine function. To plot the cosine function, change the line in the function f(x) to
// y = Math.cos(x*Math.PI/180);
// To plot the tangent function, change the line in the function f(x) to
// y = Math.tan(x*Math.PI/180);
// Note that the tangent function has vertical asymptotes at odd multiples of 90 degrees, so the graphing parameters have been changed to show a smaller range of y values. You can change the graphing parameters back to the original values to see the tangent function plotted with a larger range of y values, but the graph will be very distorted because of the vertical asymptotes.
// Copyright 2010 by Michael McMillan. All rights reserved. No warranty or guarentee is implied or expressly granted. For educational purposes only.
// Note that the graphing parameters have been changed to show a smaller range of y values for the tangent function. You can change the graphing parameters back to the original values to see the tangent function plotted with a larger range of y values, but the graph will be very distorted because of the vertical asymptotes.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var graph = new Graph(context,-720,720,-1,1,275,200,480,320);
//var graph = new Graph(context,-720,720,-10,10,275,200,480,320);	// for tan		
graph.drawgrid(180,45,0.5,0.1);			
//graph.drawgrid(180,45,5,1); // for tan		
graph.drawaxes('x','y');

var xA = new Array();
var yA = new Array();
var y1A = new Array();
for (var i=0; i<=200; i++){
	xA[i] = (i-100)*7.2;
	yA[i] = f(xA[i]);			
}
graph.plot(xA,yA,'#ff0000',false,true);
//console.log(Math.atan(1)*180/Math.PI);
//console.log(Math.atan2(-2,-2)*180/Math.PI);		
			
function f(x){
	var y;
	y = Math.sin(x*Math.PI/180);
//	y = Math.cos(x*Math.PI/180);
//	y = Math.cos((x-90)*Math.PI/180);			
//	y = Math.tan(x*Math.PI/180);
	return y;
}