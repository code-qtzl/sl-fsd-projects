const KYCDataGenerator = require('./kyc-generator');
const AMLDataGenerator = require('./aml-generator');
const XLSX = require('xlsx');
const fs = require('fs');

const kycGen = new KYCDataGenerator();
const amlGen = new AMLDataGenerator();

// Generate data
const kycData = kycGen.generateBatch(50);
const amlData = amlGen.generateBatch(100);

// Save JSON files
fs.writeFileSync('./data/kyc-test-data.json', JSON.stringify(kycData, null, 2));
fs.writeFileSync('./data/aml-test-data.json', JSON.stringify(amlData, null, 2));

// Create Excel workbook
const workbook = XLSX.utils.book_new();

// Add KYC data sheet
const kycWorksheet = XLSX.utils.json_to_sheet(kycData.map(customer => ({
  ID: customer.id,
  FirstName: customer.firstName,
  LastName: customer.lastName,
  Email: customer.email,
  Phone: customer.phone,
  DateOfBirth: customer.dateOfBirth,
  SSN: customer.ssn,
  Street: customer.address.street,
  City: customer.address.city,
  State: customer.address.state,
  ZipCode: customer.address.zipCode,
  Country: customer.address.country,
  RiskLevel: customer.riskLevel,
  KYCStatus: customer.kycStatus,
  CreatedAt: customer.createdAt
})));
XLSX.utils.book_append_sheet(workbook, kycWorksheet, 'KYC Data');

// Add AML transactions sheet
const transactionWorksheet = XLSX.utils.json_to_sheet(amlData.transactions.map(tx => ({
  ID: tx.id,
  FromAccount: tx.fromAccount,
  ToAccount: tx.toAccount,
  Amount: tx.amount,
  Currency: tx.currency,
  TransactionType: tx.transactionType,
  Description: tx.description,
  Timestamp: tx.timestamp,
  LocationCountry: tx.location.country,
  LocationCity: tx.location.city,
  SuspiciousFlags: tx.suspiciousFlags.join(', '),
  RiskScore: tx.riskScore,
  Status: tx.status
})));
XLSX.utils.book_append_sheet(workbook, transactionWorksheet, 'AML Transactions');

// Add suspicious entities sheet
const entitiesWorksheet = XLSX.utils.json_to_sheet(amlData.suspiciousEntities.map(entity => ({
  ID: entity.id,
  Name: entity.name,
  Type: entity.type,
  WatchlistType: entity.watchlistType,
  Country: entity.country,
  AddedDate: entity.addedDate,
  RiskLevel: entity.riskLevel
})));
XLSX.utils.book_append_sheet(workbook, entitiesWorksheet, 'Suspicious Entities');

// Write Excel file
XLSX.writeFile(workbook, './data/kyc-aml-data.xlsx');

console.log('Test data generated successfully!');
console.log('Files created:');
console.log('- ./data/kyc-test-data.json');
console.log('- ./data/aml-test-data.json');
console.log('- ./data/kyc-aml-data.xlsx');
