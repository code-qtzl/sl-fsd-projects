const TestCaseGenerator = require('../test-cases/test-generator');
const requirements = require('../requirements');

class RTMGenerator {
  constructor() {
    this.testGen = new TestCaseGenerator();
  }

  generateRTM() {
    const testCases = this.testGen.generateAllTestCases();
    const rtm = [];

    // Map KYC test cases
    testCases.kyc.forEach(tc => {
      rtm.push({
        requirementId: tc.requirement,
        requirementDescription: this.getRequirementDescription(tc.requirement),
        testCaseId: tc.id,
        testCaseTitle: tc.title,
        status: 'NOT_EXECUTED',
        coverage: 'COVERED'
      });
    });

    // Map AML test cases
    testCases.aml.forEach(tc => {
      rtm.push({
        requirementId: tc.requirement,
        requirementDescription: this.getRequirementDescription(tc.requirement),
        testCaseId: tc.id,
        testCaseTitle: tc.title,
        status: 'NOT_EXECUTED',
        coverage: 'COVERED'
      });
    });

    return rtm;
  }

  getRequirementDescription(reqId) {
    const allReqs = { ...requirements.chatbot, ...requirements.nlp, ...requirements.integration, ...requirements.scalability, ...requirements.performance };
    return allReqs[reqId] || 'Requirement not found';
  }

  generateTestReport(testResults) {
    const rtm = this.generateRTM();
    
    return {
      summary: {
        totalRequirements: rtm.length,
        coveredRequirements: rtm.filter(r => r.coverage === 'COVERED').length,
        executedTests: testResults.filter(t => t.status === 'PASSED' || t.status === 'FAILED').length,
        passedTests: testResults.filter(t => t.status === 'PASSED').length
      },
      rtm: rtm,
      testResults: testResults,
      generatedAt: new Date().toISOString()
    };
  }
}

module.exports = RTMGenerator;
