"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const getDOB = faker_1.faker.date.birthdate({ min: 0, max: 6, mode: "age" });
console.log(getDOB.getMonth(), getDOB.getFullYear(), getDOB.getDate());
