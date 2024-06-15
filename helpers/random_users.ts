function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const firstNamesMale = ['Bob', 'Charlie', 'David', 'Frank', 'Hank', 'Jack'];
const firstNamesFemale = ['Alice', 'Eve', 'Grace', 'Ivy'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
const genders = ['male', 'female'];
const images = [
  'https://randomuser.me/api/portraits/men/4.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/37.jpg',
  'https://randomuser.me/api/portraits/men/73.jpg',
  'https://randomuser.me/api/portraits/men/55.jpg',
  'https://cdnstorage.sendbig.com/unreal/female.webp',
  'https://randomuser.me/api/portraits/women/94.jpg',
  'https://randomuser.me/api/portraits/women/86.jpg',
  'https://randomuser.me/api/portraits/women/16.jpg'
];

function generateRandomUser() {
  const gender = genders[Math.floor(Math.random() * genders.length)];
  const firstName = gender === 'male' ? firstNamesMale[getRandomInt(0, firstNamesMale.length - 1)] : firstNamesFemale[getRandomInt(0, firstNamesFemale.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  const age = getRandomInt(18, 65);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
  const imageUrl = images[Math.floor(Math.random() * images.length)];

  return {
    firstName,
    lastName,
    age,
    email,
    gender,
    imageUrl
  };
}

export const randomUsers = Array.from({ length: 10 }, generateRandomUser);
