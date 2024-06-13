import { faker } from "@faker-js/faker";
import { Profile } from "@prisma/client";
import { encryptPassword } from "./validations";
import { client } from "./prismaClient";

import { historyTypes } from "./Types";

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
    return `0${randomNumber}:${Math.floor(Math.random() * 6)}${Math.floor(
      Math.random() * 10
    )}`;
  }

  return `${randomNumber}:${Math.floor(Math.random() * 6)}${Math.floor(
    Math.random() * 10
  )}`;
};
export function convertToStandardTime(time24hr: string) {
  const [hours, minutes] = time24hr.split(":");

  const hoursNum = parseInt(hours, 10);

  const period = hoursNum >= 12 ? "PM" : "AM";

  const hours12hr = hoursNum % 12 || 12;

  const standardTime = `${hours12hr}:${minutes} ${period}`;

  return standardTime;
}

const randomizeItem = (itemArray: string[]) => {
  return itemArray[Math.floor(Math.random() * itemArray.length)];
};
const randomDOB = () => {
  const getDOB = faker.date.birthdate({ min: 0, max: 6, mode: "age" });

  const year = getDOB.getFullYear();
  const month = String(getDOB.getMonth() + 1).padStart(2, "0"); // Ensure two digits for month
  const day = String(getDOB.getDate()).padStart(2, "0"); // Ensure two digits for day

  return `${year}-${month}-${day}`;
};
const createShortHandDate = (date: string) => {
  const dateParts = date.split("-");
  return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
};

const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
};

export const randomizeDate = () => {
  const getRandomDate = faker.date.recent({ days: 10 });

  if (getRandomDate.getMonth() + 1 < 10 && getRandomDate.getDate() < 10) {
    return `${getRandomDate.getFullYear()}-0${
      getRandomDate.getMonth() + 1
    }-0${getRandomDate.getDate()}`;
  } else if (getRandomDate.getDate() < 10) {
    return `${getRandomDate.getFullYear()}-${
      getRandomDate.getMonth() + 1
    }-0${getRandomDate.getDate()}`;
  } else if (getRandomDate.getMonth() < 10) {
    return `${getRandomDate.getFullYear()}-0${
      getRandomDate.getMonth() + 1
    }-${getRandomDate.getDate()}`;
  } else {
    return `${getRandomDate.getFullYear()}-${
      getRandomDate.getMonth() + 1
    }-${getRandomDate.getDate()}`;
  }
};
let users: Profile[];
const clearDb = async () => {
  await client.illnessHistory.deleteMany();
  await client.diapersHistory.deleteMany();
  await client.mealHistory.deleteMany();
  await client.breastFeedingHistory.deleteMany();
  await client.bottleFeedingHistory.deleteMany();
  await client.napHistory.deleteMany();
  await client.child.deleteMany();
  await client.profile.deleteMany();
  await client.activeHomepageComponent.deleteMany();
};

const seedInfo = async () => {
  const andrei = await client.profile.create({
    data: {
      username: `andrei.obushnyi`,
      password: await encryptPassword(`ILoveBears85`),
      caregiver: `Anna`,
      email: `andrei.obushnyi@gmail.com`,
    },
  });
  const jon = await client.profile.create({
    data: {
      username: `jon.higger`,
      password: await encryptPassword(`ILoveDogs87`),
      caregiver: `Mark`,
      email: `jon.higger@gmail.com`,
    },
  });
  const rob = await client.profile.create({
    data: {
      username: `robharmony`,
      password: await encryptPassword(`Inhumane#1`),
      caregiver: `Debbie`,
      email: `robharmony@gmail.com`,
    },
  });

  const yalana = await client.profile.create({
    data: {
      username: `yalana.rashton`,
      password: await encryptPassword(`Saints1`),
      caregiver: `Brittany`,
      email: `yalana.rashton@gmail.com`,
    },
  });
  const recruiter = await client.profile.create({
    data: {
      username: `recruiter`,
      password: await encryptPassword(`HireHim#1`),
      caregiver: `Granny`,
      email: `recruiter@gmail.com`,
    },
  });

  users = [andrei, jon, rob, yalana, recruiter];
  const usersId: string[] = users.map((user) => user.username);
  users.forEach((user) => user);

  const childIds: number[] = [];
  type ComponentArray<T> = T[];

  const components: ComponentArray<historyTypes> = [];
  for (let i = 0; i < 15; i++) {
    const personType = faker.person.sexType();
    const randomProfileId = usersId[Math.floor(Math.random() * usersId.length)];
    const child = await client.child.create({
      data: {
        gender: personType,
        name: `${
          personType === `female`
            ? faker.person.firstName("female")
            : faker.person.firstName("male")
        }`,
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
    const napHistory = await client.napHistory.create({
      data: {
        time: convertToStandardTime(setRandomTime()),
        date: formatDate(createShortHandDate(randomizeDate())),
        lengthOfTime: `${Math.floor(Math.random() * 171 + 10)}`,
        childId: randomChildId,
      },
    });
    components.push(napHistory);
  }

  for (let i = 0; i < 100; i++) {
    const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
    const bottleFeedingHistory = await client.bottleFeedingHistory.create({
      data: {
        time: convertToStandardTime(setRandomTime()),
        date: formatDate(createShortHandDate(randomizeDate())),
        bottleQuantity: `${Math.floor(Math.random() * 6 + 4)} ${randomizeItem(
          unitOfMeasurement
        )}`,
        bottleQuantityLeft: `${Math.floor(
          Math.random() * 3 + 1
        )} ${randomizeItem(unitOfMeasurement)}`,

        childId: randomChildId,
      },
    });
    components.push(bottleFeedingHistory);
  }

  for (let i = 0; i < 100; i++) {
    const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
    const breastFeedingHistory = await client.breastFeedingHistory.create({
      data: {
        time: convertToStandardTime(setRandomTime()),
        date: formatDate(createShortHandDate(randomizeDate())),
        feedingTimeLength: `${Math.floor(Math.random() * 31 + 10)}`,
        childId: randomChildId,
      },
    });
    components.push(breastFeedingHistory);
  }

  for (let i = 0; i < 100; i++) {
    const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
    const mealHistory = await client.mealHistory.create({
      data: {
        time: convertToStandardTime(setRandomTime()),
        date: formatDate(createShortHandDate(randomizeDate())),
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
    const diapersHistory = await client.diapersHistory.create({
      data: {
        time: convertToStandardTime(setRandomTime()),
        date: formatDate(createShortHandDate(randomizeDate())),
        diaperType: diaper,
        consistency:
          diaper.toLowerCase() === "poop" ? randomizeItem(poopType) : "Wet",

        childId: randomChildId,
      },
    });
    components.push(diapersHistory);
  }
  for (let i = 0; i < 100; i++) {
    const randomChildId = childIds[Math.floor(Math.random() * childIds.length)];
    const illnessHistory = await client.illnessHistory.create({
      data: {
        time: convertToStandardTime(setRandomTime()),
        date: formatDate(createShortHandDate(randomizeDate())),
        symptoms: randomizeItem(symptoms),
        medicationType: randomizeItem(medicine),
        dosage: `${randomizeMedicineOz()} ${randomizeItem(unitOfMeasurement)}`,
        childId: randomChildId,
      },
    });
    components.push(illnessHistory);
  }
  const activeHomepageComponent = await client.activeHomepageComponent.create({
    data: {
      id: 1,
      page: "feeding",
    },
  });
  activeHomepageComponent;
  components.forEach((component) => component);
};

Promise.resolve()
  .then(() => console.log("Clearing Database"))
  .then(clearDb)
  .then(() => {
    console.log("seeding");
  })
  .then(seedInfo)
  .then(() => console.log("Database Seeded 🌴"))
  .catch(console.error);
