import axios, { AxiosInstance } from 'axios';
import { PersonalityConfig, ClueoApiResponse } from './types.js';
import dotenv from 'dotenv';

dotenv.config();

export class ClueoApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, apiKey?: string) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey && { 'X-API-Key': apiKey })
      }
    });
  }

  async injectPersonality(
    text: string, 
    personalityConfig: PersonalityConfig,
    apiKey?: string
  ): Promise<ClueoApiResponse<{ enhancedText: string }>> {
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
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to inject personality'
      };
    }
  }

  async enhancedInjectPersonality(
    text: string,
    personalityConfig: PersonalityConfig,
    options?: {
      context?: string;
      debug?: boolean;
      preview?: boolean;
    },
    apiKey?: string
  ): Promise<ClueoApiResponse<{ enhancedText: string; reasoning?: string }>> {
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
    } catch (error: any) {
      if (error.response?.status === 404) {
        return this.injectPersonality(text, personalityConfig, apiKey);
      }
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to enhance personality'
      };
    }
  }

  async simulateResponse(
    prompt: string,
    personalityConfig: PersonalityConfig,
    apiKey?: string
  ): Promise<ClueoApiResponse<{ response: string }>> {
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
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to simulate response'
      };
    }
  }

  async enhancedSimulateResponse(
    prompt: string,
    personalityConfig: PersonalityConfig,
    options?: {
      context?: string;
      debug?: boolean;
    },
    apiKey?: string
  ): Promise<ClueoApiResponse<{ response: string; reasoning?: string }>> {
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
    } catch (error: any) {
      if (error.response?.status === 404) {
        return this.simulateResponse(prompt, personalityConfig, apiKey);
      }
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to enhance simulation'
      };
    }
  }

  async validateApiKey(apiKey: string): Promise<ClueoApiResponse<{ valid: boolean }>> {
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
    } catch (error: any) {
      return {
        success: false,
        data: { valid: false },
        error: error.response?.data?.message || error.message || 'API key validation failed'
      };
    }
  }

  async getPersonalityOptions(apiKey?: string): Promise<ClueoApiResponse<any>> {
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
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get personality options'
      };
    }
  }
}
