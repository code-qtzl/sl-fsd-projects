// KYC and AML Platform Requirements
const requirements = {
  chatbot: {
    REQ_CB_001: "Chatbot must handle customer identity verification queries",
    REQ_CB_002: "Support multi-language customer interactions",
    REQ_CB_003: "Provide real-time KYC status updates",
    REQ_CB_004: "Escalate complex queries to human agents"
  },
  nlp: {
    REQ_NLP_001: "Extract customer information from documents",
    REQ_NLP_002: "Detect suspicious transaction patterns",
    REQ_NLP_003: "Classify risk levels based on customer data",
    REQ_NLP_004: "Process unstructured customer communications"
  },
  integration: {
    REQ_INT_001: "Integrate with core banking systems",
    REQ_INT_002: "Connect to external KYC databases",
    REQ_INT_003: "Interface with regulatory reporting systems",
    REQ_INT_004: "Support REST API for third-party services"
  },
  scalability: {
    REQ_SC_001: "Handle 10,000+ concurrent KYC requests",
    REQ_SC_002: "Process 1M+ transactions daily for AML screening",
    REQ_SC_003: "Auto-scale based on transaction volume",
    REQ_SC_004: "Maintain 99.9% system availability"
  },
  performance: {
    REQ_PERF_001: "KYC verification response time < 30 seconds",
    REQ_PERF_002: "AML screening latency < 5 seconds",
    REQ_PERF_003: "System response time < 2 seconds",
    REQ_PERF_004: "Support 500 TPS (Transactions Per Second)"
  }
};

module.exports = requirements;
