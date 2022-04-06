// Create an object:
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 49,
  eyeColor: "blue"
};

// Display some data from the object:
document.getElementById("demo").innerHTML =
person.firstName + " is " + person.age + " years old.";

function createPerson(firstName, lastName) {
    let person = Object.create(behavior);
    person.firstName = firstName;
    person.lastName = lastName;
	 span_obj = document.createElement("span");
    return person;
}

let john = createPerson('John', 'Doe'),
    jane = createPerson('Jane', 'Doe');

console.log(john.getFullName());
console.log(jane.getFullName());