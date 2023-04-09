interface Person {
    name: string;
    age: number;
    gender: "male" | "female";
}
declare function filterByProperty(people: Person[], property: string, value: string | number): Person[];
declare const peopleArray: Person[];
