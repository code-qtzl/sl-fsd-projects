const { faker } = require('@faker-js/faker');

class AMLDataGenerator {
  generateTransaction() {
    const amount = faker.number.float({ min: 100, max: 1000000, fractionDigits: 2 });
    return {
      id: faker.string.uuid(),
      fromAccount: faker.finance.accountNumber(),
      toAccount: faker.finance.accountNumber(),
      amount: amount,
      currency: faker.finance.currencyCode(),
      transactionType: faker.helpers.arrayElement(['WIRE', 'ACH', 'CASH', 'CHECK', 'CARD']),
      description: faker.finance.transactionDescription(),
      timestamp: faker.date.recent(),
      location: {
        country: faker.location.country(),
        city: faker.location.city()
      },
      suspiciousFlags: this.generateSuspiciousFlags(amount),
      riskScore: faker.number.int({ min: 0, max: 100 }),
      status: faker.helpers.arrayElement(['CLEARED', 'FLAGGED', 'BLOCKED', 'UNDER_INVESTIGATION'])
    };
  }

  generateSuspiciousFlags(amount) {
    const flags = [];
    if (amount > 10000) flags.push('HIGH_AMOUNT');
    if (faker.datatype.boolean()) flags.push('UNUSUAL_PATTERN');
    if (faker.datatype.boolean()) flags.push('CROSS_BORDER');
    return flags;
  }

  generateSuspiciousEntity() {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      type: faker.helpers.arrayElement(['INDIVIDUAL', 'ORGANIZATION']),
      watchlistType: faker.helpers.arrayElement(['PEP', 'SANCTIONS', 'ADVERSE_MEDIA']),
      country: faker.location.country(),
      addedDate: faker.date.past(),
      riskLevel: faker.helpers.arrayElement(['HIGH', 'MEDIUM', 'LOW'])
    };
  }

  generateBatch(count = 100) {
    return {
      transactions: Array.from({ length: count }, () => this.generateTransaction()),
      suspiciousEntities: Array.from({ length: 20 }, () => this.generateSuspiciousEntity())
    };
  }
}

module.exports = AMLDataGenerator;
