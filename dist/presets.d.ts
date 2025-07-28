import { PersonalityPreset } from './types.js';
export declare const PERSONALITY_PRESETS: PersonalityPreset[];
export declare function getPresetById(id: string): PersonalityPreset | undefined;
export declare function getPresetsByCategory(category: PersonalityPreset['category']): PersonalityPreset[];
export declare function searchPresets(query: string): PersonalityPreset[];
//# sourceMappingURL=presets.d.ts.map