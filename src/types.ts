// Clueo MCP Server Types

export interface PersonalityConfig {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  savedAt?: Date;
}

export interface PersonalityPreset {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'creative' | 'social' | 'brand';
  config: PersonalityConfig;
  tags: string[];
}

export interface ClueoApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiKeyInfo {
  id: string;
  keyId: string;
  name: string;
  plan: 'free' | 'dev+' | 'operator';
  monthlyLimit: number;
  currentMonthUsage: number;
  remainingUsage: number;
  personalityConfig?: PersonalityConfig;
}

export interface McpServerConfig {
  name: string;
  version: string;
  port?: number;
  clueoApiUrl: string;
  clueoApiKey?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
} 