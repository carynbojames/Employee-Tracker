// Test Concepts ---
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 50,
    eyeColor: "blue",
  };
  
  console.log(person);
  
  const keys = Object.keys(person);
  console.log(keys);
  
  const values = Object.values(person);
  console.log(values);
  
  console.log("Object.entries", Object.entries(person)); // returns arrays of arrays