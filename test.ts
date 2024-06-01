import { faker } from "@faker-js/faker";

const getDOB = faker.date.birthdate({ min: 0, max: 6, mode: "age" });
console.log(getDOB.getMonth(), getDOB.getFullYear(), getDOB.getDate());
