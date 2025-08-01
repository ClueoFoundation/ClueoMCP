// OpenClueo MCP Server Types

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
// Memory System Types
export interface MemoryEntry {
  id: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  type: 'personality_usage' | 'preference' | 'conversation' | 'project_setting';
  data: any;
}

export interface PersonalityUsage extends MemoryEntry {
  type: 'personality_usage';
  data: {
    personalityConfig: PersonalityConfig;
    presetId?: string;
    context: string;
    success: boolean;
  };
}

export interface UserPreference extends MemoryEntry {
  type: 'preference';
  data: {
    preferredPersonalities: string[];
    contextMappings: { [context: string]: PersonalityConfig };
    frequency: { [presetId: string]: number };
  };
}

export interface ConversationMemory extends MemoryEntry {
  type: 'conversation';
  data: {
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: Date;
    }>;
    personality?: PersonalityConfig;
    outcome: 'success' | 'failed' | 'partial';
  };
}

export interface ProjectSetting extends MemoryEntry {
  type: 'project_setting';
  data: {
    projectPath: string;
    projectName: string;
    defaultPersonality: PersonalityConfig;
    teamSettings?: {
      sharedPersonalities: PersonalityConfig[];
      guidelines: string;
    };
  };
}
