// This example demonstrates how to calculate the gradient and integral of a function using numerical methods. The code sets up a graph on an HTML canvas, calculates the function values, gradient values, and integral values at a set of points, and then plots them on the graph. The function used in this example is a simple linear function, f(x) = 2x. The gradient is calculated using the forward method, which approximates the derivative by taking the difference between function values at two points. The integral is calculated using the forward method as well, which approximates the area under the curve by summing the areas of rectangles defined by the function values at discrete points. The resulting graph will show the original function in red, the gradient in blue, and the integral in green.
// Note: The Graph class and its methods (drawgrid, drawaxes, plot) are assumed to be defined elsewhere in the codebase, as they are not included in this snippet.
// Example 3.4: Calculating the gradient and integral of a function using numerical methods
// The code calculates the function values, gradient values, and integral values at a set of points, and then plots them on the canvas. The function is a simple linear function, f(x) = 2x. The gradient is calculated using the forward method, which approximates the derivative by taking the difference between function values at two points. The integral is calculated using the forward method as well, which approximates the area under the curve by summing the areas of rectangles defined by the function values at discrete points. The resulting graph will show the original function in red, the gradient in blue, and the integral in green.
// The code also includes comments to explain the steps and the calculations. The resulting plot will show the original function in red, the gradient in blue, and the integral in green. The gradients and integrals will be less accurate near the edges of the plot, where there are fewer points to calculate from.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 
		
numPoints=1001;
var numGrad=1;		
var xRange=6;
var xStep;
		
var graph = new Graph(context,-4,4,-10,10,275,210,450,350);			
graph.drawgrid(1,0.2,2,0.5);			
graph.drawaxes('x','y');
var xA = new Array();
var yA = new Array();
// calculate function
xStep = xRange/(numPoints-1);
for (var i=0; i<numPoints; i++){
	xA[i] = (i-numPoints/2)*xStep;
	yA[i] = f(xA[i]);						   
}
graph.plot(xA,yA,'#ff0000',false,true); // plot function
// calculate gradient function using forward method
var xAr = new Array();			
var gradA = new Array();
for (var j=0; j<numPoints-numGrad; j++){
	xAr[j] = xA[j];
	gradA[j] = grad(xA[j],xA[j+numGrad]);						   
}
graph.plot(xAr,gradA,'#0000ff',false,true); // plot gradient function
// calculate integral using forward method
var xAi = new Array();			
var integA = new Array();
xAi[0] = -3;
integA[0] = 9;
for (var k=1; k<numPoints; k++){
	xAi[k] = xA[k];
	integA[k] = integA[k-1] + f(xA[k-1])*(xA[k]-xA[k-1]);   
}
graph.plot(xAi,integA,'#00ff00',false,true); // plot integral			
		
function f(x){
	var y;
	y = 2*x;
	return y;
}
function grad(x1,x2){
	return (f(x1)-f(x2))/(x1-x2);
}
function integ(x1,x2){
	return (f(x1)-f(x2))/(x1-x2);
}		
