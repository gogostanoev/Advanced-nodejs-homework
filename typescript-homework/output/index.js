// Exercise: Filter an array of objects
// Create interface Person that will have the following properties
;
function filterByProperty(people, property, value) {
    return people.filter(function (person) { return person[property] === value; });
}
;
var peopleArray = [
    { name: "John Doe", age: 30, gender: "male" },
    { name: "Jesse Pinkman", age: 23, gender: "male" },
    { name: "Caroline Grennell", age: 30, gender: "female" },
    { name: "Rosa Parks", age: 45, gender: "female" }
];
console.log(filterByProperty(peopleArray, "gender", "male"));
console.log(filterByProperty(peopleArray, "age", 30));
