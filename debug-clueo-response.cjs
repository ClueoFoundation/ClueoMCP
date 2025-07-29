const axios = require('axios');

async function testClueoAPI() {
  console.log('🧪 TESTING ACTUAL CLUEO API RESPONSE...\n');
  
  // Test 1: Enhanced Inject (what MCP uses for personality injection)
  try {
    console.log('=== TEST 1: ENHANCED INJECT ===');
    const injectResponse = await axios.post('https://backend.clueoai.com/api/enhanced/inject', {
      prompt: "Hello world, this is a test.",
      openness: 8,
      conscientiousness: 5,
      extraversion: 7,
      agreeableness: 6,
      neuroticism: 3,
      context: 'general',
      debug: false,
      preview: false,
      track_costs: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.CLUEO_API_KEY || 'test_key'
      },
      timeout: 30000
    });

    console.log('✅ INJECT SUCCESS!');
    console.log('Status:', injectResponse.status);
    console.log('Full Response:');
    console.log(JSON.stringify(injectResponse.data, null, 2));
    
    console.log('\n🔍 FIELD ANALYSIS:');
    console.log('response.data:', typeof injectResponse.data);
    console.log('response.data.success:', injectResponse.data?.success);
    console.log('response.data.data:', typeof injectResponse.data?.data);
    console.log('response.data.data.injected_prompt:', injectResponse.data?.data?.injected_prompt);
    console.log('response.data.injected_prompt:', injectResponse.data?.injected_prompt);

  } catch (error) {
    console.log('❌ INJECT ERROR:', error.response?.status, error.response?.data || error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
  console.log('🎯 CONCLUSION: Check the field names above to see what Clueo actually returns!');
}

// Set a valid API key for testing
process.env.CLUEO_API_KEY = 'ck_test_b9f8e7d6c5a4b3a2b1a0c9d8e7f6g5h4'; // Replace with real key

testClueoAPI().catch(console.error);
