const KYCDataGenerator = require('../src/data-generators/kyc-generator');

describe('KYC Data Generator Tests', () => {
  let kycGen;

  beforeEach(() => {
    kycGen = new KYCDataGenerator();
  });

  test('should generate valid customer data', () => {
    const customer = kycGen.generateCustomer();
    
    expect(customer).toHaveProperty('id');
    expect(customer).toHaveProperty('firstName');
    expect(customer).toHaveProperty('lastName');
    expect(customer).toHaveProperty('email');
    expect(customer.riskLevel).toMatch(/^(LOW|MEDIUM|HIGH)$/);
    expect(customer.kycStatus).toMatch(/^(PENDING|APPROVED|REJECTED|UNDER_REVIEW)$/);
  });

  test('should generate batch of customers', () => {
    const customers = kycGen.generateBatch(10);
    
    expect(customers).toHaveLength(10);
    expect(customers[0]).toHaveProperty('id');
  });
});
