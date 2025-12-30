const requirements = require('../requirements');

class TestCaseGenerator {
  generateKYCTestCases() {
    return [
      {
        id: 'TC_KYC_001',
        requirement: 'REQ_CB_001',
        title: 'Verify customer identity through chatbot',
        steps: ['Submit customer ID', 'Upload documents', 'Verify information'],
        expected: 'KYC status updated to APPROVED',
        priority: 'HIGH'
      },
      {
        id: 'TC_KYC_002',
        requirement: 'REQ_NLP_001',
        title: 'Extract customer data from documents',
        steps: ['Upload passport image', 'Process with NLP'],
        expected: 'Customer data extracted accurately',
        priority: 'HIGH'
      },
      {
        id: 'TC_KYC_003',
        requirement: 'REQ_PERF_001',
        title: 'KYC verification performance test',
        steps: ['Submit KYC request', 'Measure response time'],
        expected: 'Response time < 30 seconds',
        priority: 'MEDIUM'
      }
    ];
  }

  generateAMLTestCases() {
    return [
      {
        id: 'TC_AML_001',
        requirement: 'REQ_NLP_002',
        title: 'Detect suspicious transaction patterns',
        steps: ['Process transaction batch', 'Apply ML algorithms'],
        expected: 'Suspicious transactions flagged',
        priority: 'HIGH'
      },
      {
        id: 'TC_AML_002',
        requirement: 'REQ_PERF_002',
        title: 'AML screening performance test',
        steps: ['Submit transaction for screening', 'Measure latency'],
        expected: 'Screening latency < 5 seconds',
        priority: 'HIGH'
      },
      {
        id: 'TC_AML_003',
        requirement: 'REQ_SC_002',
        title: 'High volume transaction processing',
        steps: ['Submit 1M+ transactions', 'Monitor system performance'],
        expected: 'All transactions processed successfully',
        priority: 'MEDIUM'
      }
    ];
  }

  generateAllTestCases() {
    return {
      kyc: this.generateKYCTestCases(),
      aml: this.generateAMLTestCases()
    };
  }
}

module.exports = TestCaseGenerator;
