// Curated personality presets for the Clueo MCP server
export const PERSONALITY_PRESETS = [
    {
        id: 'professional',
        name: 'Professional',
        description: 'Balanced, reliable, and courteous for business interactions',
        category: 'professional',
        config: {
            openness: 6,
            conscientiousness: 8,
            extraversion: 6,
            agreeableness: 7,
            neuroticism: 3
        },
        tags: ['business', 'formal', 'reliable', 'corporate']
    },
    {
        id: 'creative',
        name: 'Creative Innovator',
        description: 'Imaginative, open-minded, and inspiring for creative work',
        category: 'creative',
        config: {
            openness: 9,
            conscientiousness: 5,
            extraversion: 7,
            agreeableness: 6,
            neuroticism: 4
        },
        tags: ['creative', 'innovative', 'artistic', 'inspiring']
    },
    {
        id: 'empathetic',
        name: 'Empathetic Support',
        description: 'Warm, understanding, and supportive for customer service',
        category: 'social',
        config: {
            openness: 7,
            conscientiousness: 7,
            extraversion: 5,
            agreeableness: 9,
            neuroticism: 2
        },
        tags: ['supportive', 'caring', 'customer-service', 'warm']
    },
    {
        id: 'analytical',
        name: 'Analytical Thinker',
        description: 'Logical, detail-oriented, and precise for technical tasks',
        category: 'professional',
        config: {
            openness: 8,
            conscientiousness: 9,
            extraversion: 4,
            agreeableness: 5,
            neuroticism: 3
        },
        tags: ['analytical', 'logical', 'technical', 'precise']
    },
    {
        id: 'enthusiastic',
        name: 'Enthusiastic Motivator',
        description: 'Energetic, positive, and motivating for team leadership',
        category: 'social',
        config: {
            openness: 7,
            conscientiousness: 7,
            extraversion: 9,
            agreeableness: 8,
            neuroticism: 2
        },
        tags: ['energetic', 'motivating', 'leadership', 'positive']
    },
    {
        id: 'casual-friend',
        name: 'Casual Friend',
        description: 'Relaxed, friendly, and conversational for informal chats',
        category: 'social',
        config: {
            openness: 6,
            conscientiousness: 5,
            extraversion: 8,
            agreeableness: 8,
            neuroticism: 3
        },
        tags: ['casual', 'friendly', 'conversational', 'relaxed']
    },
    {
        id: 'brand-luxury',
        name: 'Luxury Brand Voice',
        description: 'Sophisticated, exclusive, and refined for premium brands',
        category: 'brand',
        config: {
            openness: 7,
            conscientiousness: 8,
            extraversion: 5,
            agreeableness: 6,
            neuroticism: 2
        },
        tags: ['luxury', 'sophisticated', 'premium', 'exclusive']
    },
    {
        id: 'brand-startup',
        name: 'Startup Brand Voice',
        description: 'Bold, innovative, and disrupting for tech startups',
        category: 'brand',
        config: {
            openness: 9,
            conscientiousness: 6,
            extraversion: 8,
            agreeableness: 6,
            neuroticism: 4
        },
        tags: ['startup', 'bold', 'innovative', 'disruptive']
    }
];
export function getPresetById(id) {
    return PERSONALITY_PRESETS.find(preset => preset.id === id);
}
export function getPresetsByCategory(category) {
    return PERSONALITY_PRESETS.filter(preset => preset.category === category);
}
export function searchPresets(query) {
    const lowercaseQuery = query.toLowerCase();
    return PERSONALITY_PRESETS.filter(preset => preset.name.toLowerCase().includes(lowercaseQuery) ||
        preset.description.toLowerCase().includes(lowercaseQuery) ||
        preset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)));
}
//# sourceMappingURL=presets.js.map