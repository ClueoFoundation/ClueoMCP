import axios from 'axios';
export class ClueoApiClient {
    client;
    apiKey;
    constructor(baseURL, apiKey) {
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
            }
        });
    }
    /**
     * Inject personality into a text prompt
     */
    async injectPersonality(text, personalityConfig, apiKey) {
        try {
            const response = await this.client.post('/api/v1/personality/inject', {
                text,
                personality: {
                    openness: personalityConfig.openness,
                    conscientiousness: personalityConfig.conscientiousness,
                    extraversion: personalityConfig.extraversion,
                    agreeableness: personalityConfig.agreeableness,
                    neuroticism: personalityConfig.neuroticism
                }
            }, {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: response.data,
                message: 'Personality injected successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to inject personality'
            };
        }
    }
    /**
     * Get enhanced personality injection (if available)
     */
    async enhancedInjectPersonality(text, personalityConfig, options, apiKey) {
        try {
            const response = await this.client.post('/api/v1/personality/enhanced-inject', {
                text,
                personality: {
                    openness: personalityConfig.openness,
                    conscientiousness: personalityConfig.conscientiousness,
                    extraversion: personalityConfig.extraversion,
                    agreeableness: personalityConfig.agreeableness,
                    neuroticism: personalityConfig.neuroticism
                },
                ...options
            }, {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: response.data,
                message: 'Enhanced personality injected successfully'
            };
        }
        catch (error) {
            // Fallback to basic injection if enhanced is not available
            if (error.response?.status === 404) {
                console.log('Enhanced injection not available, falling back to basic injection');
                return this.injectPersonality(text, personalityConfig, apiKey);
            }
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to inject personality'
            };
        }
    }
    /**
     * Simulate a response with personality (if available)
     */
    async simulateResponse(prompt, personalityConfig, apiKey) {
        try {
            const response = await this.client.post('/simulate', {
                prompt,
                personality: {
                    openness: personalityConfig.openness,
                    conscientiousness: personalityConfig.conscientiousness,
                    extraversion: personalityConfig.extraversion,
                    agreeableness: personalityConfig.agreeableness,
                    neuroticism: personalityConfig.neuroticism
                }
            }, {
                headers: {
                    ...(apiKey && { 'Authorization': `Bearer ${apiKey}` })
                }
            });
            return {
                success: true,
                data: { response: response.data.response || response.data.enhancedText },
                message: 'Response simulated successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to simulate response'
            };
        }
    }
    /**
     * Validate an API key and get its info
     */
    async validateApiKey(apiKey) {
        try {
            const response = await this.client.get('/api/user/api-keys', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            // Extract first API key info from response
            const apiKeys = response.data.data?.apiKeys || response.data.apiKeys || [];
            if (apiKeys.length === 0) {
                return {
                    success: false,
                    error: 'No API keys found for this user'
                };
            }
            return {
                success: true,
                data: apiKeys[0], // Return first API key info
                message: 'API key validated successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to validate API key'
            };
        }
    }
    /**
     * Health check for the Clueo API
     */
    async healthCheck() {
        try {
            const response = await this.client.get('/health');
            return {
                success: true,
                data: { status: 'healthy' },
                message: 'Clueo API is healthy'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Clueo API health check failed'
            };
        }
    }
}
//# sourceMappingURL=clueo-api.js.map