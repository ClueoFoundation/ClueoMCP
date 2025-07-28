import axios from 'axios';

async function testClueoAPI() {
  const client = axios.create({
    baseURL: 'https://backend.clueoai.com',
    headers: { 
      'Content-Type': 'application/json',
      'X-API-Key': 'ck_2e975e206f416f7a5e10105436441e48d74b813' // From your screenshot
    }
  });

  try {
    console.log('🧪 Testing Clueo API Response Structure...\n');
    
    const response = await client.post('/api/v1/personality/inject', {
      prompt: 'Hello, how can I help you today?',
      openness: 5,
      conscientiousness: 5, 
      extraversion: 6,
      agreeableness: 9,
      neuroticism: 3
    });

    console.log('=== FULL RESPONSE ===');
    console.log(JSON.stringify(response.data, null, 2));
    
    console.log('\n=== RESPONSE STRUCTURE ===');
    console.log('response.data type:', typeof response.data);
    console.log('response.data keys:', Object.keys(response.data));
    
    if (response.data.data) {
      console.log('response.data.data type:', typeof response.data.data);
      console.log('response.data.data keys:', Object.keys(response.data.data));
      
      if (response.data.data.injected_prompt) {
        console.log('injected_prompt type:', typeof response.data.data.injected_prompt);
        console.log('injected_prompt value:', response.data.data.injected_prompt);
      }
    }
    
  } catch (error) {
    console.log('❌ API Error:');
    console.log('Status:', error.response?.status);
    console.log('Data:', JSON.stringify(error.response?.data, null, 2));
  }
}

testClueoAPI();
