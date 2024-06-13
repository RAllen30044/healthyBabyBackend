"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeDate = exports.convertToStandardTime = void 0;
const faker_1 = require("@faker-js/faker");
const validations_1 = require("./validations");
const prismaClient_1 = require("./prismaClient");
const food = [
    "Pizza",
    "Mac and Cheese",
    "Cheeseburger",
    "Fries",
    "PB and J",
    "Turkey Sandwich",
    "Mixed Fruit",
];
const drink = ["Milk", "Water", "Apple juice", "Soda"];
const diaperConsistency = ["Wet", "Poop"];
const poopType = ["Solid", "Soft", "pebbles"];
const symptoms = ["runny nose", "cough", "nausea", "soft stool", "fever"];
const medicine = ["Tylenol", "NyQuil", "Motrin"];
const unitOfMeasurement = ["mL", "oz"];
const randomizeMedicineOz = () => {
    return `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 9)}`;
};
const setRandomTime = () => {
    const randomNumber = Math.floor(Math.random() * 24);
    if (randomNumber < 10) {
        return `0${randomNumber}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`;
    }
    return `${randomNumber}:${Math.floor(Math.random() * 6)}${Math.floor(Math.random() * 10)}`;
};
function convertToStandardTime(time24hr) {
    const [hours, minutes] = time24hr.split(":");
    const hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? "PM" : "AM";
    const hours12hr = hoursNum % 12 || 12;
    const standardTime = `${hours12hr}:${minutes} ${period}`;
    return standardTime;
}
exports.convertToStandardTime = convertToStandardTime;
const randomizeItem = (itemArray) => {
    return itemArray[Math.floor(Math.random() * itemArray.length)];
};
const randomDOB = () => {
    const getDOB = faker_1.faker.date.birthdate({ min: 0, max: 6, mode: "age" });
    const year = getDOB.getFullYear();
    const month = String(getDOB.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month
    const day = String(getDOB.getDate()).padStart(2, "0"); // Ensure two digits for day
    return `${year}-${month}-${day}`;
};
const createShortHandDate = (date) => {
    const dateParts = date.split("-");
    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
};
const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
};
const randomizeDate = () => {
    const getRandomDate = faker_1.faker.date.recent({ days: 10 });
    if (getRandomDate.getMonth() + 1 < 10 && getRandomDate.getDate() < 10) {
        return `${getRandomDate.getFullYear()}-0${getRandomDate.getMonth() + 1}-0${getRandomDate.getDate()}`;
    }
    else if (getRandomDate.getDate() < 10) {
        return `${getRandomDate.getFullYear()}-${getRandomDate.getMonth() + 1}-0${getRandomDate.getDate()}`;
    }
    else if (getRandomDate.getMonth() < 10) {
        return `${getRandomDate.getFullYear()}-0${getRandomDate.getMonth() + 1}-${getRandomDate.getDate()}`;
    }
    else {
        return `${getRandomDate.getFullYear()}-${getRandomDate.getMonth() + 1}-${getRandomDate.getDate()}`;
    }
};
exports.randomizeDate = randomizeDate;
let users;
const clearDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.client.illnessHistory.deleteMany();
    yield prismaClient_1.client.diapersHistory.deleteMany();
    yield prismaClient_1.client.mealHistory.deleteMany();
    yield prismaClient_1.client.breastFeedingHistory.deleteMany();
    yield prismaClient_1.client.bottleFeedingHistory.deleteMany();
    yield prismaClient_1.client.napHistory.deleteMany();
    yield prismaClient_1.client.child.deleteMany();
    yield prismaClient_1.client.profile.deleteMany();
    yield prismaClient_1.client.activeHomepageComponent.deleteMany();
});
const seedInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const andrei = yield prismaClient_1.client.profile.create({
        data: {
            username: `andrei.obushnyi`,
            password: yield (0, validations_1.encryptPassword)(`ILoveBears85`),
            caregiver: `Anna`,
            email: `andrei.obushnyi@gmail.com`,
        },
    });
    const jon = yield prismaClient_1.client.profile.create({
        data: {
            username: `jon.higger`,
            password: yield (0, validations_1.encryptPassword)(`ILoveDogs87`),
            caregiver: `Mark`,
            email: `jon.higger@gmail.com`,
        },
    });
    const rob = yield prismaClient_1.client.profile.create({
        data: {
            username: `robharmony`,
            password: yield (0, validations_1.encryptPassword)(`Inhumane#1`),
            caregiver: `Debbie`,
            email: `robharmony@gmail.com`,
        },
    });
    const yalana = yield prismaClient_1.client.profile.create({
        data: {
            username: `yalana.rashton`,
            password: yield (0, validations_1.encryptPassword)(`Saints1`),
            caregiver: `Brittany`,
            email: `yalana.rashton@gmail.com`,
        },
    });
    const recruiter = yield prismaClient_1.client.profile.create({
        data: {
            username: `recruiter`,
            password: yield (0, validations_1.encryptPassword)(`HireHim#1`),
            caregiver: `Granny`,
            email: `recruiter@gmail.com`,
        },
    });
    users = [andrei, jon, rob, yalana, recruiter];
    const usersId = users.map((user) => user.username);
    users.forEach((user) => user);
    const childIds = [];
    const components = [];
    for (let i = 0; i < 15; i++) {
        const personType = faker_1.faker.person.sexType();
        const randomProfileId = usersId[Math.floor(Math.random() * usersId.length)];
        const child = yield prismaClient_1.client.child.create({
            data: {
                gender: personType,
                name: `${personType === `female`
                    ? faker_1.faker.person.firstName("female")
                    : faker_1.faker.person.firstName("male")}`,
                DOB: randomDOB(),
                weight: `${Math.floor(Math.random() * 46 + 10)}`,
                height: `${Math.floor(Math.random() * 39 + 17)}`,
                headSize: `${Math.floor(Math.random() * 6 + 17)}`,
                profileUsername: randomProfileId,
            },
        });
        childIds.push(child.id);
        components.push(child);
    }
    for (let i = 0; i < 100; i++) {
        const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
        const napHistory = yield prismaClient_1.client.napHistory.create({
            data: {
                time: convertToStandardTime(setRandomTime()),
                date: formatDate(createShortHandDate((0, exports.randomizeDate)())),
                lengthOfTime: `${Math.floor(Math.random() * 171 + 10)}`,
                childId: randomChildId,
            },
        });
        components.push(napHistory);
    }
    for (let i = 0; i < 100; i++) {
        const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
        const bottleFeedingHistory = yield prismaClient_1.client.bottleFeedingHistory.create({
            data: {
                time: convertToStandardTime(setRandomTime()),
                date: formatDate(createShortHandDate((0, exports.randomizeDate)())),
                bottleQuantity: `${Math.floor(Math.random() * 6 + 4)} ${randomizeItem(unitOfMeasurement)}`,
                bottleQuantityLeft: `${Math.floor(Math.random() * 3 + 1)} ${randomizeItem(unitOfMeasurement)}`,
                childId: randomChildId,
            },
        });
        components.push(bottleFeedingHistory);
    }
    for (let i = 0; i < 100; i++) {
        const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
        const breastFeedingHistory = yield prismaClient_1.client.breastFeedingHistory.create({
            data: {
                time: convertToStandardTime(setRandomTime()),
                date: formatDate(createShortHandDate((0, exports.randomizeDate)())),
                feedingTimeLength: `${Math.floor(Math.random() * 31 + 10)}`,
                childId: randomChildId,
            },
        });
        components.push(breastFeedingHistory);
    }
    for (let i = 0; i < 100; i++) {
        const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
        const mealHistory = yield prismaClient_1.client.mealHistory.create({
            data: {
                time: convertToStandardTime(setRandomTime()),
                date: formatDate(createShortHandDate((0, exports.randomizeDate)())),
                drinkType: randomizeItem(drink),
                foodType: randomizeItem(food),
                childId: randomChildId,
            },
        });
        components.push(mealHistory);
    }
    for (let i = 0; i < 100; i++) {
        const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
        const diaper = randomizeItem(diaperConsistency);
        const diapersHistory = yield prismaClient_1.client.diapersHistory.create({
            data: {
                time: convertToStandardTime(setRandomTime()),
                date: formatDate(createShortHandDate((0, exports.randomizeDate)())),
                diaperType: diaper,
                consistency: diaper.toLowerCase() === "poop" ? randomizeItem(poopType) : "Wet",
                childId: randomChildId,
            },
        });
        components.push(diapersHistory);
    }
    for (let i = 0; i < 100; i++) {
        const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
        const illnessHistory = yield prismaClient_1.client.illnessHistory.create({
            data: {
                time: convertToStandardTime(setRandomTime()),
                date: formatDate(createShortHandDate((0, exports.randomizeDate)())),
                symptoms: randomizeItem(symptoms),
                medicationType: randomizeItem(medicine),
                dosage: `${randomizeMedicineOz()} ${randomizeItem(unitOfMeasurement)}`,
                childId: randomChildId,
            },
        });
        components.push(illnessHistory);
    }
    const activeHomepageComponent = yield prismaClient_1.client.activeHomepageComponent.create({
        data: {
            id: 1,
            page: "feeding",
        },
    });
    activeHomepageComponent;
    components.forEach((component) => component);
});
Promise.resolve()
    .then(() => console.log("Clearing Database"))
    .then(clearDb)
    .then(() => {
    console.log("seeding");
})
    .then(seedInfo)
    .then(() => console.log("Database Seeded 🌴"))
    .catch(console.error);
