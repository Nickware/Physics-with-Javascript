// Example of using the Vector2D class
// Note: this code assumes that the Vector2D class has been defined as in the previous examples
// Create two vectors
// The Vector2D class should have methods for length, lengthSquared, angleBetween, and dotProduct
// The angleBetween method should be a static method that takes two vectors as arguments and returns the angle between them in radians
// The dotProduct method should be an instance method that takes another vector as an argument and returns the dot product of the two vectors
// The length method should return the magnitude of the vector, and the lengthSquared method should return the magnitude squared of the vector
// The console.log statements will output the results of the various vector operations
// The expected output should be:
// 1.414213562373095
var vec1 = new Vector2D(1,1);
var vec2 = new Vector2D(1,0);			
console.log(vec1.length()); // magnitude of vec1 
console.log(vec1.lengthSquared()); // magnitude squared of vec1			
console.log(Vector2D.angleBetween(vec1,vec2)*180/Math.PI); // static method that returns the angle between two vectors
console.log(vec1.dotProduct(vec2)); // returns dot product of vec1 with vec2	
