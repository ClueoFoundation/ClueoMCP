import { PersonalityConfig, ClueoApiResponse } from './types.js';
export declare class ClueoApiClient {
    private client;
    constructor(baseURL: string, apiKey?: string);
    injectPersonality(text: string, personalityConfig: PersonalityConfig, apiKey?: string): Promise<ClueoApiResponse<{
        enhancedText: string;
    }>>;
    enhancedInjectPersonality(text: string, personalityConfig: PersonalityConfig, options?: {
        context?: string;
        debug?: boolean;
        preview?: boolean;
    }, apiKey?: string): Promise<ClueoApiResponse<{
        enhancedText: string;
        reasoning?: string;
    }>>;
    simulateResponse(prompt: string, personalityConfig: PersonalityConfig, apiKey?: string): Promise<ClueoApiResponse<{
        response: string;
    }>>;
    enhancedSimulateResponse(prompt: string, personalityConfig: PersonalityConfig, options?: {
        context?: string;
        debug?: boolean;
    }, apiKey?: string): Promise<ClueoApiResponse<{
        response: string;
        reasoning?: string;
    }>>;
    validateApiKey(apiKey: string): Promise<ClueoApiResponse<{
        valid: boolean;
    }>>;
    getPersonalityOptions(apiKey?: string): Promise<ClueoApiResponse<any>>;
}
//# sourceMappingURL=clueo-api.d.ts.map