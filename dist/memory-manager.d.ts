import { MemoryEntry, ConversationMemory, ProjectSetting, PersonalityConfig } from './types.js';
export declare class MemoryManager {
    private memoryDir;
    private sessionId;
    private cache;
    constructor(memoryDir?: string);
    private ensureMemoryDir;
    private getFilePath;
    save<T extends MemoryEntry>(entry: T): Promise<void>;
    load(type: string): Promise<MemoryEntry[]>;
    recordPersonalityUsage(personalityConfig: PersonalityConfig, context: string, presetId?: string, success?: boolean, userId?: string): Promise<void>;
    getPersonalitySuggestions(context: string, userId?: string): Promise<PersonalityConfig[]>;
    recordConversation(messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: Date;
    }>, personality?: PersonalityConfig, outcome?: 'success' | 'failed' | 'partial', userId?: string): Promise<void>;
    getRecentConversations(limit?: number, userId?: string): Promise<ConversationMemory[]>;
    saveProjectSetting(projectPath: string, projectName: string, defaultPersonality: PersonalityConfig, userId?: string): Promise<void>;
    getProjectSetting(projectPath: string, userId?: string): Promise<ProjectSetting | null>;
    getUsageStats(userId?: string): Promise<{
        totalUsages: number;
        topPersonalities: Array<{
            config: PersonalityConfig;
            count: number;
        }>;
        topContexts: Array<{
            context: string;
            count: number;
        }>;
        successRate: number;
    }>;
    cleanup(olderThanDays?: number): Promise<void>;
}
//# sourceMappingURL=memory-manager.d.ts.map