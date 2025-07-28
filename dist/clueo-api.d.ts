import { PersonalityConfig, ClueoApiResponse, ApiKeyInfo } from './types.js';
export declare class ClueoApiClient {
    private client;
    private apiKey?;
    constructor(baseURL: string, apiKey?: string);
    /**
     * Inject personality into a text prompt
     */
    injectPersonality(text: string, personalityConfig: PersonalityConfig, apiKey?: string): Promise<ClueoApiResponse<{
        enhancedText: string;
    }>>;
    /**
     * Get enhanced personality injection (if available)
     */
    enhancedInjectPersonality(text: string, personalityConfig: PersonalityConfig, options?: {
        context?: string;
        tone?: string;
        style?: string;
    }, apiKey?: string): Promise<ClueoApiResponse<{
        enhancedText: string;
        reasoning?: string;
    }>>;
    /**
     * Simulate a response with personality (if available)
     */
    simulateResponse(prompt: string, personalityConfig: PersonalityConfig, apiKey?: string): Promise<ClueoApiResponse<{
        response: string;
    }>>;
    /**
     * Validate an API key and get its info
     */
    validateApiKey(apiKey: string): Promise<ClueoApiResponse<ApiKeyInfo>>;
    /**
     * Health check for the Clueo API
     */
    healthCheck(): Promise<ClueoApiResponse<{
        status: string;
    }>>;
}
//# sourceMappingURL=clueo-api.d.ts.map