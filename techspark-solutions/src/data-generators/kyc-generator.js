const { faker } = require('@faker-js/faker');

class KYCDataGenerator {
  generateCustomer() {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
      ssn: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country()
      },
      documents: {
        passport: faker.string.uuid(),
        drivingLicense: faker.string.uuid(),
        utilityBill: faker.string.uuid()
      },
      riskLevel: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
      kycStatus: faker.helpers.arrayElement(['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW']),
      createdAt: faker.date.recent()
    };
  }

  generateBatch(count = 100) {
    return Array.from({ length: count }, () => this.generateCustomer());
  }
}

module.exports = KYCDataGenerator;
