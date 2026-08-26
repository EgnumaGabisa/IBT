
let person = {
    id: 1,
    name: "Abebe",
    age: 30,
    address: {
        city: "Addis",
        street: "HaileGebresillasie street"
    },
    skills: [
        {
            skillName: "Developer",
            yearsOfExperience: 5
        },
        {
            skillName: "Developer",
            yearsOfExperience: 5
        }
    ],
    walk() {
        console.log("I can walk");
    }
};

// --- TESTING THE OBJECT IN THE CONSOLE ---
console.log("Person Name:", person.name);
console.log("City:", person.address.city);
console.log("First Skill:", person.skills[0].skillName);

// Calling the method inside the object
person.walk();
