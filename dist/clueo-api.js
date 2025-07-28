import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export class ClueoApiClient {
    client;
    constructor(baseURL, apiKey) {
        this.client = axios.create({
            baseURL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                ...(apiKey && { 'X-API-Key': apiKey })
            }
        });
    }
    async injectPersonality(text, personalityConfig, apiKey) {
        try {
            const response = await this.client.post('/api/v1/personality/inject', {
                prompt: text,
                openness: personalityConfig.openness,
                conscientiousness: personalityConfig.conscientiousness,
                extraversion: personalityConfig.extraversion,
                agreeableness: personalityConfig.agreeableness,
                neuroticism: personalityConfig.neuroticism
            }, {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: { enhancedText: response.data.enhancedText || response.data },
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
    async enhancedInjectPersonality(text, personalityConfig, options, apiKey) {
        try {
            const response = await this.client.post('/api/enhanced/inject', {
                prompt: text,
                openness: personalityConfig.openness,
                conscientiousness: personalityConfig.conscientiousness,
                extraversion: personalityConfig.extraversion,
                agreeableness: personalityConfig.agreeableness,
                neuroticism: personalityConfig.neuroticism,
                context: options?.context || 'general',
                debug: options?.debug || false,
                preview: options?.preview || false,
                track_costs: true
            }, {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: {
                    enhancedText: response.data.enhancedText || response.data,
                    reasoning: response.data.reasoning
                },
                message: 'Enhanced personality injection successful'
            };
        }
        catch (error) {
            if (error.response?.status === 404) {
                return this.injectPersonality(text, personalityConfig, apiKey);
            }
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to enhance personality'
            };
        }
    }
    async simulateResponse(prompt, personalityConfig, apiKey) {
        try {
            const response = await this.client.post('/simulate', {
                prompt: prompt,
                openness: personalityConfig.openness,
                conscientiousness: personalityConfig.conscientiousness,
                extraversion: personalityConfig.extraversion,
                agreeableness: personalityConfig.agreeableness,
                neuroticism: personalityConfig.neuroticism
            }, {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: { response: response.data.response || response.data },
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
    async enhancedSimulateResponse(prompt, personalityConfig, options, apiKey) {
        try {
            const response = await this.client.post('/api/enhanced/simulate', {
                prompt: prompt,
                openness: personalityConfig.openness,
                conscientiousness: personalityConfig.conscientiousness,
                extraversion: personalityConfig.extraversion,
                agreeableness: personalityConfig.agreeableness,
                neuroticism: personalityConfig.neuroticism,
                context: options?.context || 'general',
                debug: options?.debug || false
            }, {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: {
                    response: response.data.response || response.data,
                    reasoning: response.data.reasoning
                },
                message: 'Enhanced response simulation successful'
            };
        }
        catch (error) {
            if (error.response?.status === 404) {
                return this.simulateResponse(prompt, personalityConfig, apiKey);
            }
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to enhance simulation'
            };
        }
    }
    async validateApiKey(apiKey) {
        try {
            const response = await this.client.get('/api/v1/health', {
                headers: {
                    'X-API-Key': apiKey
                }
            });
            return {
                success: true,
                data: { valid: response.status === 200 },
                message: 'API key validated successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                data: { valid: false },
                error: error.response?.data?.message || error.message || 'API key validation failed'
            };
        }
    }
    async getPersonalityOptions(apiKey) {
        try {
            const response = await this.client.get('/api/v1/personality/options', {
                headers: {
                    ...(apiKey && { 'X-API-Key': apiKey })
                }
            });
            return {
                success: true,
                data: response.data,
                message: 'Personality options retrieved successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || error.message || 'Failed to get personality options'
            };
        }
    }
}
//# sourceMappingURL=clueo-api.js.map