const RTMGenerator = require('../src/reports/rtm-generator');

describe('RTM Generator Tests', () => {
  let rtmGen;

  beforeEach(() => {
    rtmGen = new RTMGenerator();
  });

  test('should generate RTM with proper mapping', () => {
    const rtm = rtmGen.generateRTM();
    
    expect(rtm.length).toBeGreaterThan(0);
    expect(rtm[0]).toHaveProperty('requirementId');
    expect(rtm[0]).toHaveProperty('testCaseId');
    expect(rtm[0]).toHaveProperty('coverage');
  });

  test('should generate test report with summary', () => {
    const mockResults = [
      { id: 'TC_KYC_001', status: 'PASSED' },
      { id: 'TC_AML_001', status: 'FAILED' }
    ];
    
    const report = rtmGen.generateTestReport(mockResults);
    
    expect(report).toHaveProperty('summary');
    expect(report).toHaveProperty('rtm');
    expect(report).toHaveProperty('testResults');
    expect(report.summary.executedTests).toBe(2);
    expect(report.summary.passedTests).toBe(1);
  });
});
