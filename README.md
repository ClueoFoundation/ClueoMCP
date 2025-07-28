# 🎭 Clueo MCP Server

**The AI Personality Layer for Model Context Protocol**

Transform any MCP-compatible AI with rich, consistent personalities powered by Clueo's Big Five personality engine.

## 🌟 What is Clueo MCP?

Clueo MCP Server brings AI personality injection to the Model Context Protocol ecosystem. Instead of generic AI responses, get personalities that are:

- **🎯 Consistent**: Same personality across all your AI tools
- **🔧 Customizable**: Big Five traits (1-10 scale) for precise control  
- **📚 Ready-to-use**: 8 curated personality presets
- **⚡ Fast**: Local MCP server, cloud personality engine
- **🔐 Secure**: Optional API key authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- An MCP-compatible client (Claude Desktop, VS Code, etc.)

### Installation

1. **Clone and setup:**
   ```bash
   git clone https://github.com/ClueoFoundation/ClueoMCP.git
   cd ClueoMCP
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env with your Clueo API key (optional for basic use)
   ```

3. **Build and start:**
   ```bash
   npm run build
   npm start
   ```

### Connect to Claude Desktop

Add to your Claude Desktop `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "clueo-personality": {
      "command": "node",
      "args": ["/path/to/clueomcp/dist/server.js"],
      "env": {
        "CLUEO_API_URL": "https://backend.clueoai.com"
      }
    }
  }
}
```

## 🎭 Personality Presets

Ready-to-use personalities for common scenarios:

| Preset | Description | Best For |
|--------|-------------|----------|
| **Professional** | Balanced, reliable, courteous | Business communications |
| **Creative** | Imaginative, open-minded | Brainstorming, content creation |
| **Empathetic** | Warm, understanding, supportive | Customer support |
| **Analytical** | Logical, detail-oriented | Technical documentation |
| **Enthusiastic** | Energetic, motivating | Team leadership |
| **Casual Friend** | Relaxed, conversational | Informal chats |
| **Luxury Brand** | Sophisticated, exclusive | Premium brand voice |
| **Startup Brand** | Bold, innovative | Tech startup communications |

## 🛠️ Available Tools

### `inject_personality`
Apply custom Big Five personality traits to text.

```json
{
  "text": "Hello, how can I help you today?",
  "personality": {
    "openness": 7,
    "conscientiousness": 8,
    "extraversion": 6,
    "agreeableness": 9,
    "neuroticism": 3
  }
}
```

### `inject_preset_personality`
Apply a predefined personality preset.

```json
{
  "text": "Hello, how can I help you today?",
  "presetId": "empathetic"
}
```

### `simulate_response`
Generate an AI response with specific personality traits.

```json
{
  "prompt": "The customer is frustrated with our service",
  "personality": {
    "openness": 6,
    "conscientiousness": 8,
    "extraversion": 5,
    "agreeableness": 9,
    "neuroticism": 2
  }
}
```

### `list_personality_presets`
Browse available personality presets.

```json
{
  "category": "professional",
  "search": "customer service"
}
```

## 📄 Resources

Access personality data directly:

- `clueo://personality/presets` - Complete presets library
- `clueo://personality/presets/{id}` - Specific preset details

## 🔧 Configuration

### Environment Variables

```bash
# Required
CLUEO_API_URL=https://backend.clueoai.com

# Optional
CLUEO_API_KEY=your_api_key_here
MCP_SERVER_NAME=clueo-personality
MCP_SERVER_VERSION=1.0.0
LOG_LEVEL=info
```

### Big Five Personality Dimensions

Each dimension accepts values from 1-10:

- **Openness** (1-10): Creativity, curiosity, openness to experience
- **Conscientiousness** (1-10): Organization, dependability, discipline  
- **Extraversion** (1-10): Sociability, assertiveness, energy level
- **Agreeableness** (1-10): Cooperation, trust, empathy
- **Neuroticism** (1-10): Emotional instability, anxiety, moodiness

## 🎯 Use Cases

### Customer Support
```bash
# Apply empathetic personality to support responses
inject_preset_personality "I understand your concern..." empathetic
```

### Brand Voice Consistency
```bash
# Maintain luxury brand voice across AI tools
inject_preset_personality "Introducing our new collection..." brand-luxury
```

### Content Creation
```bash
# Generate creative content with innovative personality
simulate_response "Write a product announcement" creative
```

### Technical Documentation
```bash
# Apply analytical personality for precise explanations  
inject_preset_personality "This API endpoint..." analytical
```

## 🚦 API Rate Limits

- **Free**: 100 calls/month
- **Dev+**: 5,000 calls/month ($25/month)
- **Operator**: 50,000 calls/month ($149/month)

[Get your API key →](https://clueoai.com/dashboard)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-personality`)
3. Commit your changes (`git commit -m 'Add amazing personality'`)
4. Push to the branch (`git push origin feature/amazing-personality`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

## 🔗 Links

- [Clueo API Documentation](https://docs.clueoai.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Desktop](https://claude.ai/desktop)
- [Get Support](https://github.com/ClueoFoundation/Personality-API/issues)

## 🌟 Why Clueo MCP?

> *"Finally, AI that doesn't sound like every other AI."*

Transform your AI interactions from generic to genuine. Whether you're building customer support bots, content creation tools, or brand-consistent AI agents, Clueo MCP makes every AI response feel authentically yours.

**Ready to give your AI some personality?** 🎭

---

Made with ❤️ by [Clueo Foundation](https://clueoai.com) 