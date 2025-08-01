#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { ClueoApiClient } from './clueo-api.js';
import { PERSONALITY_PRESETS, getPresetById, getPresetsByCategory, searchPresets } from './presets.js';
import { MemoryManager } from './memory-manager.js';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
// Server configuration
const SERVER_NAME = process.env.MCP_SERVER_NAME || 'clueo-personality';
const SERVER_VERSION = process.env.MCP_SERVER_VERSION || '1.0.0';
const CLUEO_API_URL = process.env.CLUEO_API_URL || 'https://backend.clueoai.com';
const CLUEO_API_KEY = process.env.CLUEO_API_KEY;
// Initialize Clueo API client and memory manager
const clueoClient = new ClueoApiClient(CLUEO_API_URL, CLUEO_API_KEY);
const memoryManager = new MemoryManager();
// Create MCP server
const server = new Server({
    name: SERVER_NAME,
    version: SERVER_VERSION,
}, {
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Helper function to validate personality config
function validatePersonalityConfig(config) {
    if (!config || typeof config !== 'object')
        return null;
    const { openness, conscientiousness, extraversion, agreeableness, neuroticism } = config;
    // Check if all required fields are present and are numbers between 1-10
    const fields = [openness, conscientiousness, extraversion, agreeableness, neuroticism];
    const isValid = fields.every(field => typeof field === 'number' && field >= 1 && field <= 10);
    if (!isValid)
        return null;
    return {
        openness,
        conscientiousness,
        extraversion,
        agreeableness,
        neuroticism,
        savedAt: new Date()
    };
}
// Define available tools
const tools = [
    {
        name: 'inject_personality',
        description: 'Inject personality traits into text using Clueo API',
        inputSchema: {
            type: 'object',
            properties: {
                text: {
                    type: 'string',
                    description: 'The text to enhance with personality'
                },
                personality: {
                    type: 'object',
                    properties: {
                        openness: { type: 'number', minimum: 1, maximum: 10 },
                        conscientiousness: { type: 'number', minimum: 1, maximum: 10 },
                        extraversion: { type: 'number', minimum: 1, maximum: 10 },
                        agreeableness: { type: 'number', minimum: 1, maximum: 10 },
                        neuroticism: { type: 'number', minimum: 1, maximum: 10 }
                    },
                    required: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'],
                    description: 'Big Five personality dimensions (1-10 scale)'
                },
                apiKey: {
                    type: 'string',
                    description: 'Optional Clueo API key for authentication'
                }
            },
            required: ['text', 'personality']
        }
    },
    {
        name: 'inject_preset_personality',
        description: 'Inject a predefined personality preset into text',
        inputSchema: {
            type: 'object',
            properties: {
                text: {
                    type: 'string',
                    description: 'The text to enhance with personality'
                },
                presetId: {
                    type: 'string',
                    description: 'ID of the personality preset to use',
                    enum: PERSONALITY_PRESETS.map(p => p.id)
                },
                apiKey: {
                    type: 'string',
                    description: 'Optional Clueo API key for authentication'
                }
            },
            required: ['text', 'presetId']
        }
    },
    {
        name: 'simulate_response',
        description: 'Simulate an AI response with specific personality traits',
        inputSchema: {
            type: 'object',
            properties: {
                prompt: {
                    type: 'string',
                    description: 'The prompt to respond to'
                },
                personality: {
                    type: 'object',
                    properties: {
                        openness: { type: 'number', minimum: 1, maximum: 10 },
                        conscientiousness: { type: 'number', minimum: 1, maximum: 10 },
                        extraversion: { type: 'number', minimum: 1, maximum: 10 },
                        agreeableness: { type: 'number', minimum: 1, maximum: 10 },
                        neuroticism: { type: 'number', minimum: 1, maximum: 10 }
                    },
                    required: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'],
                    description: 'Big Five personality dimensions (1-10 scale)'
                },
                apiKey: {
                    type: 'string',
                    description: 'Optional Clueo API key for authentication'
                }
            },
            required: ['prompt', 'personality']
        }
    },
    {
        name: 'list_personality_presets',
        description: 'List all available personality presets',
        inputSchema: {
            type: 'object',
            properties: {
                category: {
                    type: 'string',
                    enum: ['professional', 'creative', 'social', 'brand'],
                    description: 'Filter presets by category'
                },
                search: {
                    type: 'string',
                    description: 'Search presets by name, description, or tags'
                }
            }
        }
    },
    {
        name: 'get_memory_suggestions',
        description: 'Get personality suggestions based on context and usage history',
        inputSchema: {
            type: 'object',
            properties: {
                context: {
                    type: 'string',
                    description: 'The context for which to get personality suggestions (e.g., "customer_email", "technical_documentation")'
                },
                userId: {
                    type: 'string',
                    description: 'Optional user ID to get personalized suggestions'
                }
            },
            required: ['context']
        }
    },
    {
        name: 'save_project_personality',
        description: 'Save a default personality configuration for a specific project',
        inputSchema: {
            type: 'object',
            properties: {
                projectPath: {
                    type: 'string',
                    description: 'The file system path of the project'
                },
                projectName: {
                    type: 'string',
                    description: 'A human-readable name for the project'
                },
                personality: {
                    type: 'object',
                    properties: {
                        openness: { type: 'number', minimum: 1, maximum: 10 },
                        conscientiousness: { type: 'number', minimum: 1, maximum: 10 },
                        extraversion: { type: 'number', minimum: 1, maximum: 10 },
                        agreeableness: { type: 'number', minimum: 1, maximum: 10 },
                        neuroticism: { type: 'number', minimum: 1, maximum: 10 }
                    },
                    required: ['openness', 'conscientiousness', 'extraversion', 'agreeableness', 'neuroticism'],
                    description: 'Big Five personality dimensions (1-10 scale)'
                },
                userId: {
                    type: 'string',
                    description: 'Optional user ID'
                }
            },
            required: ['projectPath', 'projectName', 'personality']
        }
    },
    {
        name: 'get_usage_analytics',
        description: 'Get analytics about personality usage patterns',
        inputSchema: {
            type: 'object',
            properties: {
                userId: {
                    type: 'string',
                    description: 'Optional user ID to get personalized analytics'
                }
            }
        }
    }
];
// Define available resources
const resources = PERSONALITY_PRESETS.map(preset => ({
    uri: `clueo://personality/presets/${preset.id}`,
    mimeType: 'application/json',
    name: preset.name,
    description: preset.description
}));
// Add summary resource
resources.push({
    uri: 'clueo://personality/presets',
    mimeType: 'application/json',
    name: 'Personality Presets Library',
    description: 'Complete library of Clueo personality presets'
});
// Register handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
});
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return { resources };
});
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    if (uri === 'clueo://personality/presets') {
        return {
            contents: [
                {
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify({
                        presets: PERSONALITY_PRESETS,
                        categories: ['professional', 'creative', 'social', 'brand'],
                        total: PERSONALITY_PRESETS.length
                    }, null, 2)
                }
            ]
        };
    }
    if (uri.startsWith('clueo://personality/presets/')) {
        const presetId = uri.replace('clueo://personality/presets/', '');
        const preset = getPresetById(presetId);
        if (!preset) {
            throw new Error(`Personality preset not found: ${presetId}`);
        }
        return {
            contents: [
                {
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify(preset, null, 2)
                }
            ]
        };
    }
    throw new Error(`Unknown resource: ${uri}`);
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    try {
        switch (name) {
            case 'inject_personality': {
                const { text, personality, apiKey } = args;
                const personalityConfig = validatePersonalityConfig(personality);
                if (!personalityConfig) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: 'Error: Invalid personality configuration. All dimensions must be numbers between 1-10.'
                            }
                        ]
                    };
                }
                const result = await clueoClient.enhancedInjectPersonality(text, personalityConfig, {}, apiKey);
                // Record usage in memory
                await memoryManager.recordPersonalityUsage(personalityConfig, 'inject_personality', undefined, result.success);
                if (result.success) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: typeof result.data === "string" ? result.data : "No response"
                            }
                        ]
                    };
                }
                else {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Error: ${result.error}`
                            }
                        ]
                    };
                }
            }
            case 'inject_preset_personality': {
                const { text, presetId, apiKey } = args;
                const preset = getPresetById(presetId);
                if (!preset) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Error: Personality preset not found: ${presetId}`
                            }
                        ]
                    };
                }
                const result = await clueoClient.enhancedInjectPersonality(text, preset.config, {}, apiKey);
                // Record usage in memory
                await memoryManager.recordPersonalityUsage(preset.config, 'inject_preset_personality', presetId, result.success);
                if (result.success) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Applied "${preset.name}" personality:\n\n${typeof result.data === "string" ? result.data : "No response"}`
                            }
                        ]
                    };
                }
                else {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Error: ${result.error}`
                            }
                        ]
                    };
                }
            }
            case 'simulate_response': {
                const { prompt, personality, apiKey } = args;
                const personalityConfig = validatePersonalityConfig(personality);
                if (!personalityConfig) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: 'Error: Invalid personality configuration. All dimensions must be numbers between 1-10.'
                            }
                        ]
                    };
                }
                const result = await clueoClient.simulateResponse(prompt, personalityConfig, apiKey);
                // Record usage in memory
                await memoryManager.recordPersonalityUsage(personalityConfig, 'simulate_response', undefined, result.success);
                if (result.success) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: result.data?.response || 'No response generated'
                            }
                        ]
                    };
                }
                else {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `Error: ${result.error}`
                            }
                        ]
                    };
                }
            }
            case 'list_personality_presets': {
                const { category, search } = args;
                let filteredPresets = PERSONALITY_PRESETS;
                if (category) {
                    filteredPresets = getPresetsByCategory(category);
                }
                if (search) {
                    filteredPresets = searchPresets(search);
                }
                const presetList = filteredPresets.map(preset => `**${preset.name}** (${preset.id})\n` +
                    `Category: ${preset.category}\n` +
                    `Description: ${preset.description}\n` +
                    `Tags: ${preset.tags.join(', ')}\n` +
                    `Personality: O:${preset.config.openness} C:${preset.config.conscientiousness} E:${preset.config.extraversion} A:${preset.config.agreeableness} N:${preset.config.neuroticism}`).join('\n\n');
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Found ${filteredPresets.length} personality presets:\n\n${presetList}`
                        }
                    ]
                };
            }
            case 'get_memory_suggestions': {
                const { context, userId } = args;
                const suggestions = await memoryManager.getPersonalitySuggestions(context, userId);
                if (suggestions.length === 0) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: `No personality suggestions found for context "${context}". Try using the personality injection tools first to build up usage history.`
                            }
                        ]
                    };
                }
                const suggestionList = suggestions.map((config, index) => `**Suggestion ${index + 1}:**\n` +
                    `Openness: ${config.openness}, Conscientiousness: ${config.conscientiousness}, ` +
                    `Extraversion: ${config.extraversion}, Agreeableness: ${config.agreeableness}, ` +
                    `Neuroticism: ${config.neuroticism}`).join('\n\n');
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Top personality suggestions for context "${context}":\n\n${suggestionList}`
                        }
                    ]
                };
            }
            case 'save_project_personality': {
                const { projectPath, projectName, personality, userId } = args;
                const personalityConfig = validatePersonalityConfig(personality);
                if (!personalityConfig) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: 'Error: Invalid personality configuration. All dimensions must be numbers between 1-10.'
                            }
                        ]
                    };
                }
                await memoryManager.saveProjectSetting(projectPath, projectName, personalityConfig, userId);
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Successfully saved personality configuration for project "${projectName}" at path "${projectPath}".`
                        }
                    ]
                };
            }
            case 'get_usage_analytics': {
                const { userId } = args;
                const stats = await memoryManager.getUsageStats(userId);
                const topPersonalitiesText = stats.topPersonalities.map((item, index) => `${index + 1}. Used ${item.count} times - O:${item.config.openness} C:${item.config.conscientiousness} E:${item.config.extraversion} A:${item.config.agreeableness} N:${item.config.neuroticism}`).join('\n');
                const topContextsText = stats.topContexts.map((item, index) => `${index + 1}. ${item.context} (${item.count} uses)`).join('\n');
                return {
                    content: [
                        {
                            type: 'text',
                            text: `**Usage Analytics:**\n\n` +
                                `Total personality injections: ${stats.totalUsages}\n` +
                                `Success rate: ${(stats.successRate * 100).toFixed(1)}%\n\n` +
                                `**Top Personalities:**\n${topPersonalitiesText || 'No usage data yet'}\n\n` +
                                `**Top Contexts:**\n${topContextsText || 'No usage data yet'}`
                        }
                    ]
                };
            }
            default:
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: Unknown tool: ${name}`
                        }
                    ]
                };
        }
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Error: ${error instanceof Error ? error.message : String(error)}`
                }
            ]
        };
    }
});
// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`🎭 OpenClueo MCP Server ${SERVER_VERSION} started`);
    console.error(`🔗 Connected to: ${CLUEO_API_URL}`);
    console.error(`📚 Loaded ${PERSONALITY_PRESETS.length} personality presets`);
    console.error(`🛠️  Available tools: ${tools.length}`);
    console.error(`📄 Available resources: ${resources.length}`);
}
// Handle process termination
process.on('SIGINT', async () => {
    console.error('\n🛑 Shutting down OpenClueo MCP Server...');
    await server.close();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.error('\n🛑 Shutting down OpenClueo MCP Server...');
    await server.close();
    process.exit(0);
});
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch((error) => {
        console.error('❌ Fatal error:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=server.js.map