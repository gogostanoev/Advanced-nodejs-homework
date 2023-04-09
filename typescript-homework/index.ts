// Exercise: Filter an array of objects
// Create interface Person that will have the following properties

// name which is string, age which is number and gender which is 'male' or 'female'.
// Create a function named filterByProperty. The function should accept three parameters

// people => which is array of Person objects
// property => which is string
// value => which is string
// So if we invoke the function filterByProperty as filterByProperty(peopleArray, "gender", "male") it should return the objects of the peopleArray that its gender is male

// So if we invoke the function filterByProperty as filterByProperty(peopleArray, "age", 30) it should return the objects of the peopleArray that its age is 30.




interface Person {
    name: string;
    age: number;
    gender: "male" | "female";
};


function filterByProperty (
    people: Person[],
    property: string,
    value: string | number

): Person[] {
    return people.filter((person) => person[property] === value);
};


const peopleArray: Person[] = [
    {name: "John Doe", age: 30, gender: "male"},
    {name: "Jesse Pinkman", age: 23, gender: "male"},
    {name: "Caroline Grennell", age: 30, gender: "female"},
    {name: "Rosa Parks", age: 45, gender: "female"}
];


console.log(filterByProperty(peopleArray, "gender", "male"));

console.log(filterByProperty(peopleArray, "age", 30));