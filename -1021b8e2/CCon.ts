import { faker } from "@faker-js/faker";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  age?: number;
  address?: string;
}

const getRandomUserDetails = (selectedProperties: String[]) => {
  const userDetails = selectedProperties.reduce((acc: User, curr: String) => {
    switch (curr) {
      case "firstName":
        acc.firstName = faker.name.firstName();
        break;
      case "lastName":
        acc.lastName = faker.name.lastName();
        break;
      case "email":
        acc.email = faker.internet.email();
        break;
      case "avatar":
        acc.avatar = faker.image.avatar();
        break;
      case "age":
        acc.age = faker.datatype.number({ min: 18, max: 100 });
        break;
      case "address":
        (acc.address = faker.address.country() + ", " + faker.address.state()),
          +", " + faker.address.street();
        break;
    }

    return acc;
  }, {});

  return userDetails;
};

export default getRandomUserDetails;
