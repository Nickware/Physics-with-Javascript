// This example demonstrates how to use the Graph class to plot a function and its values on a canvas. The code sets up a graph with specified dimensions and scales, draws a grid and axes, and then plots the points of a parabola (y = x^2) using both a set of discrete points and a continuous function. The discrete points are plotted in the default color, while the continuous function is plotted in red. The graph will show the relationship between x and y values for the parabola, allowing for visual analysis of the function's behavior.
// Example 3.2: Plotting a parabola using the Graph class
// The Graph class is assumed to be defined elsewhere in the codebase, as it is not included in this snippet. The Graph class provides methods for drawing grids, axes, and plotting functions on a canvas element.
// The code initializes a canvas and its drawing context, sets up the graph with specified dimensions and scales, and then plots the points of the parabola using both discrete points and a continuous function. The discrete points are plotted in the default color, while the continuous function is plotted in red. The resulting graph will show the relationship between x and y values for the parabola, allowing for visual analysis of the function's behavior.
// Note: The Graph class and its methods (drawgrid, drawaxes, plot) are assumed to be defined elsewhere in the codebase, as they are not included in this snippet.
// This example calculates the gradient function of a parabola using the forward and centered methods. The forward method is less accurate than the centered method, but it is easier to implement. The centered method is more accurate, but it requires more calculations.
// The code uses a Graph class to plot the function and its gradient. The Graph class is not included in this code snippet, but it is available in the book's source code. The Graph class provides methods for drawing grids, axes, and plotting functions.
// The code calculates the function values and the gradient values at a set of points, and then plots them on the canvas. The function is a simple parabola, f(x) = x^2, and the gradient is calculated using the formula (f(x1) - f(x2)) / (x1 - x2), where x1 and x2 are two points on the x-axis. The forward method uses points that are numGrad apart, while the centered method uses points that are numGrad apart on either side of the point of interest.
// The code also includes comments to explain the steps and the calculations. The resulting plot will show the parabola in red, the forward gradient in blue, and the centered gradient in green. The gradients will be less accurate near the edges of the plot, where there are fewer points to calculate the gradient from.
// Note: The Graph class and its methods (drawgrid, drawaxes, plot) are assumed to be defined elsewhere in the code
// base, as they are not included in this snippet.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

//var graph = new Graph(context,-4,4,-10,10,275,210,450,350);
//var graph = new Graph(context,-2.5,2.5,-10,10,275,210,450,350);			
//var graph = new Graph(context,-3,3,0,20,275,380,480,350);
var graph = new Graph(context,-3,3,0,1,275,380,480,350);			
graph.drawgrid(1,0.2,0.2,0.05);	
//graph.drawgrid(1,0.2,5,1);	
//graph.drawgrid(0.5,0.1,2,0.5);				
graph.drawaxes('x','y');

var xA = new Array();
var yA = new Array();
var y1A = new Array();
for (var i=0; i<=100; i++){
	//xA[i] = (i-50)*0.08;
	xA[i] = (i-50)*0.06;				
	//xA[i] = (i-50)*0.05;	
	yA[i] = f(xA[i]);						 				
	//y1A[i] = f(-xA[i]);				
}
graph.plot(xA,yA,'#ff0000',false,true);
//graph.plot(xA,y1A,'#0000ff',false,true);		
graph.plot(xA,y1A,'#0000ff',true,false);
			
function f(x){
	var y;
	y = Math.exp(-x*x);			
	//y = Math.exp(x);
	//y = -0.5*Math.pow(x,5) + 3*Math.pow(x,3) + x*x - 2*x - 3;
	//y = x*x*x + x*x - 2*x - 3;
	//y = x*x - 2*x - 3;
	//y = 2*x + 1;
	return y;
}