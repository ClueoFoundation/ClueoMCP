"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClueoApiClient = void 0;
var axios_1 = require("axios");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var ClueoApiClient = /** @class */ (function () {
    function ClueoApiClient(baseURL, apiKey) {
        this.client = axios_1.default.create({
            baseURL: baseURL,
            timeout: 30000,
            headers: __assign({ 'Content-Type': 'application/json' }, (apiKey && { 'X-API-Key': apiKey }))
        });
    }
    ClueoApiClient.prototype.injectPersonality = function (text, personalityConfig, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('/api/v1/personality/inject', {
                                prompt: text,
                                openness: personalityConfig.openness,
                                conscientiousness: personalityConfig.conscientiousness,
                                extraversion: personalityConfig.extraversion,
                                agreeableness: personalityConfig.agreeableness,
                                neuroticism: personalityConfig.neuroticism
                            }, {
                                headers: __assign({}, (apiKey && { 'X-API-Key': apiKey }))
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: { enhancedText: response.data.enhancedText || response.data },
                                message: 'Personality injected successfully'
                            }];
                    case 2:
                        error_1 = _c.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error_1.message || 'Failed to inject personality'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClueoApiClient.prototype.enhancedInjectPersonality = function (text, personalityConfig, options, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('/api/enhanced/inject', {
                                prompt: text,
                                openness: personalityConfig.openness,
                                conscientiousness: personalityConfig.conscientiousness,
                                extraversion: personalityConfig.extraversion,
                                agreeableness: personalityConfig.agreeableness,
                                neuroticism: personalityConfig.neuroticism,
                                context: (options === null || options === void 0 ? void 0 : options.context) || 'general',
                                debug: (options === null || options === void 0 ? void 0 : options.debug) || false,
                                preview: (options === null || options === void 0 ? void 0 : options.preview) || false,
                                track_costs: true
                            }, {
                                headers: __assign({}, (apiKey && { 'X-API-Key': apiKey }))
                            })];
                    case 1:
                        response = _d.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    enhancedText: response.data.enhancedText || response.data,
                                    reasoning: response.data.reasoning
                                },
                                message: 'Enhanced personality injection successful'
                            }];
                    case 2:
                        error_2 = _d.sent();
                        if (((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                            return [2 /*return*/, this.injectPersonality(text, personalityConfig, apiKey)];
                        }
                        return [2 /*return*/, {
                                success: false,
                                error: ((_c = (_b = error_2.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error_2.message || 'Failed to enhance personality'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClueoApiClient.prototype.simulateResponse = function (prompt, personalityConfig, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('/simulate', {
                                prompt: prompt,
                                openness: personalityConfig.openness,
                                conscientiousness: personalityConfig.conscientiousness,
                                extraversion: personalityConfig.extraversion,
                                agreeableness: personalityConfig.agreeableness,
                                neuroticism: personalityConfig.neuroticism
                            }, {
                                headers: __assign({}, (apiKey && { 'X-API-Key': apiKey }))
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: { response: response.data.response || response.data },
                                message: 'Response simulated successfully'
                            }];
                    case 2:
                        error_3 = _c.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: ((_b = (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error_3.message || 'Failed to simulate response'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClueoApiClient.prototype.enhancedSimulateResponse = function (prompt, personalityConfig, options, apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.post('/api/enhanced/simulate', {
                                prompt: prompt,
                                openness: personalityConfig.openness,
                                conscientiousness: personalityConfig.conscientiousness,
                                extraversion: personalityConfig.extraversion,
                                agreeableness: personalityConfig.agreeableness,
                                neuroticism: personalityConfig.neuroticism,
                                context: (options === null || options === void 0 ? void 0 : options.context) || 'general',
                                debug: (options === null || options === void 0 ? void 0 : options.debug) || false
                            }, {
                                headers: __assign({}, (apiKey && { 'X-API-Key': apiKey }))
                            })];
                    case 1:
                        response = _d.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: {
                                    response: response.data.response || response.data,
                                    reasoning: response.data.reasoning
                                },
                                message: 'Enhanced response simulation successful'
                            }];
                    case 2:
                        error_4 = _d.sent();
                        if (((_a = error_4.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                            return [2 /*return*/, this.simulateResponse(prompt, personalityConfig, apiKey)];
                        }
                        return [2 /*return*/, {
                                success: false,
                                error: ((_c = (_b = error_4.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || error_4.message || 'Failed to enhance simulation'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClueoApiClient.prototype.validateApiKey = function (apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get('/api/v1/health', {
                                headers: {
                                    'X-API-Key': apiKey
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: { valid: response.status === 200 },
                                message: 'API key validated successfully'
                            }];
                    case 2:
                        error_5 = _c.sent();
                        return [2 /*return*/, {
                                success: false,
                                data: { valid: false },
                                error: ((_b = (_a = error_5.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error_5.message || 'API key validation failed'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClueoApiClient.prototype.getPersonalityOptions = function (apiKey) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_6;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.get('/api/v1/personality/options', {
                                headers: __assign({}, (apiKey && { 'X-API-Key': apiKey }))
                            })];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: response.data,
                                message: 'Personality options retrieved successfully'
                            }];
                    case 2:
                        error_6 = _c.sent();
                        return [2 /*return*/, {
                                success: false,
                                error: ((_b = (_a = error_6.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error_6.message || 'Failed to get personality options'
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ClueoApiClient;
}());
exports.ClueoApiClient = ClueoApiClient;
