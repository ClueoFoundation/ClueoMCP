import axios from 'axios';

async function testRealClueoAPI() {
  try {
    console.log('🧪 Testing REAL Clueo API...\n');
    
    const response = await axios.post('https://backend.clueoai.com/api/enhanced/inject', {
      prompt: 'Hello, how can I help you today?',
      openness: 7,
      conscientiousness: 8,
      extraversion: 6,
      agreeableness: 9,
      neuroticism: 3,
      context: 'general',
      debug: false,
      preview: false,
      track_costs: true
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'ck_2e975e206f416f7a5e10105436441e48d74b813'
      }
    });

    console.log('✅ SUCCESS! API Response:');
    console.log('Status:', response.status);
    console.log('Response structure:');
    console.log(JSON.stringify(response.data, null, 2));
    
    console.log('\n🔍 Analyzing response.data.data.injected_prompt:');
    console.log('Type:', typeof response.data?.data?.injected_prompt);
    console.log('Value:', response.data?.data?.injected_prompt);
    
  } catch (error) {
    console.log('❌ API Error:');
    console.log('Status:', error.response?.status);
    console.log('Error data:', JSON.stringify(error.response?.data, null, 2));
  }
}

testRealClueoAPI();
