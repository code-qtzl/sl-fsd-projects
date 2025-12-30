const AMLDataGenerator = require('../src/data-generators/aml-generator');

describe('AML Data Generator Tests', () => {
  let amlGen;

  beforeEach(() => {
    amlGen = new AMLDataGenerator();
  });

  test('should generate valid transaction data', () => {
    const transaction = amlGen.generateTransaction();
    
    expect(transaction).toHaveProperty('id');
    expect(transaction).toHaveProperty('amount');
    expect(transaction).toHaveProperty('fromAccount');
    expect(transaction).toHaveProperty('toAccount');
    expect(transaction.status).toMatch(/^(CLEARED|FLAGGED|BLOCKED|UNDER_INVESTIGATION)$/);
    expect(transaction.riskScore).toBeGreaterThanOrEqual(0);
    expect(transaction.riskScore).toBeLessThanOrEqual(100);
  });

  test('should generate suspicious entity data', () => {
    const entity = amlGen.generateSuspiciousEntity();
    
    expect(entity).toHaveProperty('id');
    expect(entity).toHaveProperty('name');
    expect(entity.type).toMatch(/^(INDIVIDUAL|ORGANIZATION)$/);
    expect(entity.watchlistType).toMatch(/^(PEP|SANCTIONS|ADVERSE_MEDIA)$/);
  });

  test('should generate batch data with transactions and entities', () => {
    const batch = amlGen.generateBatch(50);
    
    expect(batch.transactions).toHaveLength(50);
    expect(batch.suspiciousEntities).toHaveLength(20);
  });
});
