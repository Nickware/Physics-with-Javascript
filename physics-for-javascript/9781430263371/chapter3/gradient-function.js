// This example calculates the gradient function of a parabola using the forward and centered methods. The forward method is less accurate than the centered method, but it is easier to implement. The centered method is more accurate, but it requires more calculations.
// The code uses a Graph class to plot the function and its gradient. The Graph class is not included in this code snippet, but it is available in the book's source code. The Graph class provides methods for drawing grids, axes, and plotting functions.
// The code calculates the function values and the gradient values at a set of points, and then plots them on the canvas. The function is a simple parabola, f(x) = x^2, and the gradient is calculated using the formula (f(x1) - f(x2)) / (x1 - x2), where x1 and x2 are two points on the x-axis. The forward method uses points that are numGrad apart, while the centered method uses points that are numGrad apart on either side of the point of interest.
// The code also includes comments to explain the steps and the calculations. The resulting plot will show the parabola in red, the forward gradient in blue, and the centered gradient in green. The gradients will be less accurate near the edges of the plot, where there are fewer points to calculate the gradient from.
// Note: The Graph class and its methods (drawgrid, drawaxes, plot) are assumed to be defined elsewhere in the codebase, as they are not included in this snippet.
// Example 3.3: Gradient function of a parabola using the forward and centered methods
// The forward method is less accurate than the centered method, but it is easier to implement. The centered method is more accurate, but it requires more calculations.
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d'); 

var numPoints=1001;
var numGrad=50;		
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
// calculate gradient function using the forward method
var xAr = new Array();			
var gradA = new Array();
for (var j=0; j<numPoints-numGrad; j++){
	xAr[j] = xA[j];
	gradA[j] = grad(xA[j],xA[j+numGrad]);						   
}
graph.plot(xAr,gradA,'#0000ff',false,true); // plot gradient function
// calculate gradient function using the centered method
var xArc = new Array();			
var gradAc = new Array();
for (var k=numGrad; k<numPoints-numGrad; k++){
	xArc[k-numGrad] = xA[k];
	gradAc[k-numGrad] = grad(xA[k-numGrad],xA[k+numGrad]);
}
graph.plot(xArc,gradAc,'#00ff00',false,true); // plot gradient function				

function f(x){
	var y;
	y = x*x;
	return y;
}

function grad(x1,x2){
	return (f(x1)-f(x2))/(x1-x2);
}			
