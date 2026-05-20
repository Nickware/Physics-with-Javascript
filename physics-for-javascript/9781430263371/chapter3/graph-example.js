// This example demonstrates how to use the Graph class to plot a function and its values on a canvas. The code sets up a graph with specified dimensions and scales, draws a grid and axes, and then plots the points of a parabola (y = x^2) using both a set of discrete points and a continuous function. The discrete points are plotted in the default color, while the continuous function is plotted in red. The graph will show the relationship between x and y values for the parabola, allowing for visual analysis of the function's behavior.
// Example 3.2: Plotting a parabola using the Graph class
// The Graph class is assumed to be defined elsewhere in the codebase, as it is not included in this snippet. The Graph class provides methods for drawing grids, axes, and plotting functions on a canvas element.
// The code initializes a canvas and its drawing context, sets up the graph with specified dimensions and scales, and then plots the points of the parabola using both discrete points and a continuous function. The discrete points are plotted in the default color, while the continuous function is plotted in red. The resulting graph will show the relationship between x and y values for the parabola, allowing for visual analysis of the function's behavior.
// Note: The Graph class and its methods (drawgrid, drawaxes, plot) are assumed to be defined elsewhere in the codebase, as they are not included in this snippet.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var graph = new Graph(context,-4,4,0,20,275,380,450,350);			
graph.drawgrid(1,0.2,5,1);			
graph.drawaxes('x','y');			
//graph.drawaxes();	// use default axis labels
	
var xvals = new Array(-4,-3,-2,-1,0,1,2,3,4);
var yvals = new Array(16,9,4,1,0,1,4,9,16);
graph.plot(xvals, yvals);
			
var xA = new Array();
var yA = new Array();
for (var i=0; i<=100; i++){
	xA[i] = (i-50)*0.08;
	yA[i] = xA[i]*xA[i];						   
}
graph.plot(xA, yA, "#ff0000", false, true);