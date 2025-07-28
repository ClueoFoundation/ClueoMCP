import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
export class MemoryManager {
    memoryDir;
    sessionId;
    cache = new Map();
    constructor(memoryDir = './memory') {
        this.memoryDir = memoryDir;
        this.sessionId = uuidv4();
        this.ensureMemoryDir();
    }
    async ensureMemoryDir() {
        try {
            await fs.mkdir(this.memoryDir, { recursive: true });
        }
        catch (error) {
            console.error('Failed to create memory directory:', error);
        }
    }
    getFilePath(type) {
        return path.join(this.memoryDir, `${type}.json`);
    }
    // Generic memory operations
    async save(entry) {
        try {
            const filePath = this.getFilePath(entry.type);
            const existing = await this.load(entry.type);
            existing.push(entry);
            // Keep only last 1000 entries per type
            const trimmed = existing.slice(-1000);
            await fs.writeFile(filePath, JSON.stringify(trimmed, null, 2));
            // Update cache
            this.cache.set(entry.type, trimmed);
        }
        catch (error) {
            console.error(`Failed to save memory entry of type ${entry.type}:`, error);
        }
    }
    async load(type) {
        try {
            // Check cache first
            if (this.cache.has(type)) {
                return this.cache.get(type);
            }
            const filePath = this.getFilePath(type);
            const data = await fs.readFile(filePath, 'utf-8');
            const entries = JSON.parse(data);
            // Convert timestamp strings back to Date objects
            const processedEntries = entries.map((entry) => ({
                ...entry,
                timestamp: new Date(entry.timestamp)
            }));
            this.cache.set(type, processedEntries);
            return processedEntries;
        }
        catch (error) {
            // File doesn't exist or other error - return empty array
            return [];
        }
    }
    // Personality usage tracking
    async recordPersonalityUsage(personalityConfig, context, presetId, success = true, userId) {
        const entry = {
            id: uuidv4(),
            timestamp: new Date(),
            userId,
            sessionId: this.sessionId,
            type: 'personality_usage',
            data: {
                personalityConfig,
                presetId,
                context,
                success
            }
        };
        await this.save(entry);
    }
    // Get personality suggestions based on context
    async getPersonalitySuggestions(context, userId) {
        const usages = await this.load('personality_usage');
        // Filter by context and user (if provided)
        const relevantUsages = usages.filter(usage => usage.data.context === context &&
            (userId ? usage.userId === userId : true) &&
            usage.data.success);
        // Count frequency of personality configs
        const personalityFreq = new Map();
        relevantUsages.forEach(usage => {
            const configKey = JSON.stringify(usage.data.personalityConfig);
            const existing = personalityFreq.get(configKey);
            if (existing) {
                existing.count++;
            }
            else {
                personalityFreq.set(configKey, { config: usage.data.personalityConfig, count: 1 });
            }
        });
        // Return top 3 most used personalities for this context
        return Array.from(personalityFreq.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 3)
            .map(item => item.config);
    }
    // Record conversation
    async recordConversation(messages, personality, outcome = 'success', userId) {
        const entry = {
            id: uuidv4(),
            timestamp: new Date(),
            userId,
            sessionId: this.sessionId,
            type: 'conversation',
            data: {
                messages,
                personality,
                outcome
            }
        };
        await this.save(entry);
    }
    // Get recent conversations
    async getRecentConversations(limit = 10, userId) {
        const conversations = await this.load('conversation');
        return conversations
            .filter(conv => userId ? conv.userId === userId : true)
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limit);
    }
    // Project settings
    async saveProjectSetting(projectPath, projectName, defaultPersonality, userId) {
        const entry = {
            id: uuidv4(),
            timestamp: new Date(),
            userId,
            sessionId: this.sessionId,
            type: 'project_setting',
            data: {
                projectPath,
                projectName,
                defaultPersonality
            }
        };
        await this.save(entry);
    }
    async getProjectSetting(projectPath, userId) {
        const settings = await this.load('project_setting');
        const projectSetting = settings
            .filter(setting => setting.data.projectPath === projectPath &&
            (userId ? setting.userId === userId : true))
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
        return projectSetting || null;
    }
    // Analytics and insights
    async getUsageStats(userId) {
        const usages = await this.load('personality_usage');
        const userUsages = usages.filter(usage => userId ? usage.userId === userId : true);
        // Count personalities
        const personalityCount = new Map();
        const contextCount = new Map();
        let successCount = 0;
        userUsages.forEach(usage => {
            const configKey = JSON.stringify(usage.data.personalityConfig);
            personalityCount.set(configKey, usage.data.personalityConfig);
            const contextCount_current = contextCount.get(usage.data.context) || 0;
            contextCount.set(usage.data.context, contextCount_current + 1);
            if (usage.data.success)
                successCount++;
        });
        const topPersonalities = Array.from(personalityCount.entries())
            .map(([key, config]) => ({
            config,
            count: userUsages.filter(u => JSON.stringify(u.data.personalityConfig) === key).length
        }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        const topContexts = Array.from(contextCount.entries())
            .map(([context, count]) => ({ context, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        return {
            totalUsages: userUsages.length,
            topPersonalities,
            topContexts,
            successRate: userUsages.length > 0 ? successCount / userUsages.length : 0
        };
    }
    // Clear old memories (older than specified days)
    async cleanup(olderThanDays = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);
        const types = ['personality_usage', 'preference', 'conversation', 'project_setting'];
        for (const type of types) {
            const entries = await this.load(type);
            const filtered = entries.filter(entry => entry.timestamp > cutoffDate);
            if (filtered.length !== entries.length) {
                const filePath = this.getFilePath(type);
                await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
                this.cache.set(type, filtered);
            }
        }
    }
}
//# sourceMappingURL=memory-manager.js.map