# 🎭 Clueo MCP Server
**The Universal AI Personality Layer for Model Context Protocol**

*Patent-pending technology that transforms any AI into a consistent, branded personality across all platforms.*

[![npm version](https://badge.fury.io/js/clueo-mcp.svg)](https://badge.fury.io/js/clueo-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Transform any MCP-compatible AI with rich, consistent personalities powered by Clueo's scientifically-backed Big Five personality engine. **The first universal AI personality protocol** that works across Claude Desktop, Cursor, Windsurf, VS Code, and any MCP-compatible platform.

## ⚡ Quick Start

```bash
# Install from npm
npm install -g clueo-mcp

# Add to your IDE (Claude Desktop example)
{
  "mcpServers": {
    "clueo-ai-personality": {
      "command": "clueo-mcp",
      "env": {
        "CLUEO_API_URL": "https://backend.clueoai.com",
        "CLUEO_API_KEY": "your_api_key_here"
      }
    }
  }
}

# Start using personalities instantly!
inject_preset_personality "Hello, how can I help?" "professional"
inject_personality "Write an email" {"openness": 8, "conscientiousness": 9}
```

## 🌟 What Makes Clueo MCP Revolutionary?

### **🎯 Universal AI Personality Protocol**
The **first standardized method** for applying consistent personality traits across ALL AI platforms:
- **Cross-Platform**: Same personality in Claude, ChatGPT, Cursor, Windsurf, VS Code
- **Real-Time**: Personality applied before AI processing, not after
- **Scientific**: Big Five psychological model with numerical precision (1-10 scale)
- **Consistent**: Identical personality behavior across all your AI tools

### **🏢 Enterprise Brand Personality**
**Patent-pending technology** for organization-wide AI brand consistency:
- **Brand Compliance**: Ensure all company AI interactions match your brand voice
- **Department Variations**: Customer service (empathetic), Sales (enthusiastic), Engineering (analytical)
- **Context Awareness**: Automatically adapts personality based on communication context
- **Analytics**: Track brand personality performance and ROI across your organization

### **🧠 Adaptive Memory System**
AI that learns YOUR personality preferences:
- **Smart Suggestions**: "You often use empathetic + professional for customer emails"
- **Project Memory**: Save default personalities for specific projects
- **Usage Analytics**: Understand your personality patterns and success rates
- **Context Learning**: System improves recommendations based on your patterns

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- An MCP-compatible client (Claude Desktop, Cursor, Windsurf, VS Code, etc.)
- [Get your API key](https://api.clueoai.com/) (optional for basic use)

### **Option 1: NPM Install (Recommended)**

```bash
# Install globally
npm install -g clueo-mcp

# Verify installation
clueo-mcp --version
```

### **Option 2: From Source**

```bash
git clone https://github.com/ClueoFoundation/ClueoMCP.git
cd ClueoMCP
npm install
npm run build
```

## 🔌 IDE Integration

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "clueo-ai-personality": {
      "command": "clueo-mcp",
      "env": {
        "CLUEO_API_URL": "https://backend.clueoai.com",
        "CLUEO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor IDE

1. **Settings** → **Features** → **Model Context Protocol**
2. **Add Server**:
   - **Name**: `clueo-ai-personality`
   - **Command**: `clueo-mcp`
   - **Environment**: `CLUEO_API_URL=https://backend.clueoai.com`

### Windsurf IDE

1. **Settings** → **Advanced** → **Cascade**
2. **Add custom server**:

```json
{
  "mcpServers": {
    "clueo-ai-personality": {
      "command": "clueo-mcp",
      "env": {
        "CLUEO_API_URL": "https://backend.clueoai.com",
        "CLUEO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### VS Code (with MCP extension)

Install the MCP extension, then add the Clueo server to your workspace settings.

## 🎭 Personality Presets

**8 scientifically-crafted personalities** for common scenarios:

| Preset | Personality Traits | Best For |
|--------|-------------------|----------|
| **Professional** | Balanced (6,8,6,7,3) | Business communications, formal emails |
| **Creative** | High Openness (9,6,7,6,4) | Brainstorming, content creation, marketing |
| **Empathetic** | High Agreeableness (7,7,6,9,3) | Customer support, counseling, HR |
| **Analytical** | High Conscientiousness (8,9,5,6,2) | Technical docs, research, analysis |
| **Enthusiastic** | High Extraversion (8,7,9,7,2) | Sales, presentations, team motivation |
| **Casual Friend** | Balanced & Relaxed (7,5,7,8,3) | Informal chats, internal communication |
| **Luxury Brand** | Sophisticated (6,9,6,6,2) | Premium brand voice, high-end clients |
| **Startup Brand** | Bold & Innovative (9,8,8,6,3) | Tech startups, innovation messaging |

*Values shown as (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)*

## 🛠️ Core Tools

### `inject_personality`
Apply custom Big Five personality traits to any text:

```json
{
  "text": "Hello, how can I help you today?",
  "personality": {
    "openness": 7,        // Creativity, curiosity (1-10)
    "conscientiousness": 8, // Organization, discipline (1-10)
    "extraversion": 6,     // Sociability, energy (1-10)
    "agreeableness": 9,    // Cooperation, empathy (1-10)
    "neuroticism": 3       // Emotional stability (1-10, lower = more stable)
  },
  "apiKey": "your_api_key"
}
```

### `inject_preset_personality`
Apply predefined personality presets:

```json
{
  "text": "Thanks for your feedback on our product",
  "presetId": "empathetic",
  "apiKey": "your_api_key"
}
```

### `simulate_response`
Generate AI responses with specific personality:

```json
{
  "prompt": "A customer is frustrated with delayed shipping",
  "personality": {
    "openness": 6,
    "conscientiousness": 9,
    "extraversion": 5,
    "agreeableness": 10,
    "neuroticism": 2
  },
  "apiKey": "your_api_key"
}
```

## 🧠 Advanced Memory Features

### Smart Personality Suggestions
```bash
get_memory_suggestions {"context": "customer_email"}
# Returns: "You typically use empathetic + professional for customer emails"
```

### Project-Level Personality
```bash
save_project_personality {
  "projectPath": "/work/customer-portal",
  "projectName": "Customer Support Portal",
  "personality": {"openness": 7, "conscientiousness": 9, "extraversion": 6, "agreeableness": 8, "neuroticism": 3}
}
```

### Usage Analytics
```bash
get_usage_analytics {"userId": "optional"}
# Returns: Most used personalities, success rates, recommendations
```

## 🏢 Enterprise Features

### **Brand Personality Management**
- **Organization-wide consistency**: Ensure all AI interactions match your brand
- **Department variations**: Different personalities for different teams
- **Compliance monitoring**: Track adherence to brand guidelines
- **Role-based access**: Control who can modify brand personalities

### **Advanced Analytics**
- **Brand performance metrics**: Track personality effectiveness
- **Department usage patterns**: See how different teams use AI personalities
- **ROI measurement**: Understand the business impact of consistent AI branding
- **Compliance reporting**: Generate reports for brand guideline adherence

### **Enterprise API Endpoints**
```bash
# Apply company brand personality
inject_brand_personality {"organizationId": "company_uuid", "text": "Customer response"}

# Validate brand compliance
validate_brand_compliance {"organizationId": "company_uuid", "text": "Generated response"}

# Deploy organization-wide personality
deploy_brand_personality {"organizationId": "company_uuid", "brandPersonality": {...}}
```

## 🔧 Configuration

### Environment Variables

```bash
# Required
CLUEO_API_URL=https://backend.clueoai.com

# Optional (get at https://api.clueoai.com/)
CLUEO_API_KEY=your_api_key_here

# Server Configuration
MCP_SERVER_NAME=clueo-ai-personality
MCP_SERVER_VERSION=1.2.19
LOG_LEVEL=info
```

### Big Five Personality Science

Each dimension uses a **1-10 scale** based on established psychological research:

- **Openness** (1-10): Creativity, curiosity, openness to new experiences
- **Conscientiousness** (1-10): Organization, dependability, self-discipline  
- **Extraversion** (1-10): Sociability, assertiveness, energy level
- **Agreeableness** (1-10): Cooperation, trust, empathy towards others
- **Neuroticism** (1-10): Emotional instability, anxiety (lower = more stable)

## 🎯 Use Cases

### **Personal AI Enhancement**
- **Consistent personality** across all your AI tools
- **Context-aware suggestions** based on your work patterns
- **Project-specific personalities** for different types of work
- **Learning from your preferences** to improve over time

### **Enterprise Brand Management**
- **Customer Service**: Ensure empathetic, helpful responses across all channels
- **Sales Team**: Maintain enthusiastic, professional communication
- **Technical Support**: Provide analytical, precise assistance
- **Marketing**: Consistent brand voice in all AI-generated content

### **Developer Integration**
- **API-first design**: Integrate personality into any application
- **Cross-platform compatibility**: Works with any MCP-compatible AI
- **Real-time processing**: Personality applied before AI generation
- **Scalable architecture**: From personal use to enterprise deployment

## 📊 API Rate Limits & Pricing

| Plan | Monthly API Calls | Price | Best For |
|------|------------------|-------|----------|
| **Free** | 100 calls | $0 | Personal exploration |
| **Dev+** | 5,000 calls | $25 | Individual developers |
| **Operator** | 50,000 calls | $149 | Small teams |
| **Enterprise** | Custom | Contact | Large organizations |

[Get your API key →](https://api.clueoai.com/)

## 🤝 Contributing

We welcome contributions to the open source Clueo MCP Server!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-personality`)
3. Commit your changes (`git commit -m 'Add amazing personality feature'`)
4. Push to the branch (`git push origin feature/amazing-personality`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

**Note**: The core personality injection technology is patent-pending. This open source implementation provides basic functionality, while advanced enterprise features require a commercial license.

## 🔗 Links

- **[Clueo API Documentation](https://docs.clueoai.com)**
- **[Get API Key](https://api.clueoai.com/)**
- **[Model Context Protocol](https://modelcontextprotocol.io)**
- **[Enterprise Licensing](mailto:enterprise@clueoai.com)**
- **[Support & Issues](https://github.com/ClueoFoundation/ClueoMCP/issues)**

## 🌟 Why Clueo MCP Changes Everything

### **Before Clueo MCP:**
- ❌ Generic, inconsistent AI responses across platforms
- ❌ No brand personality control for organizations  
- ❌ Manual personality prompting for every interaction
- ❌ No learning or memory of personality preferences

### **With Clueo MCP:**
- ✅ **Universal personality protocol** across ALL AI platforms
- ✅ **Scientific Big Five model** with precise numerical control
- ✅ **Enterprise brand consistency** with compliance monitoring
- ✅ **Adaptive memory system** that learns your preferences
- ✅ **Real-time personality injection** before AI processing
- ✅ **Patent-protected innovation** with open source accessibility

## 🚀 What's Next?

Clueo MCP represents the **first step toward universal AI personality standardization**. As the ecosystem grows, we're building:

- **Personality Marketplace**: Buy, sell, and share personality presets
- **Industry-Specific Templates**: Healthcare AI, Legal AI, Financial AI personalities
- **Advanced Analytics**: Deep insights into AI personality performance
- **Multi-Modal Support**: Personality for voice, video, and other AI modalities

**Join the AI personality revolution.** 🎭✨

---

**Ready to give your AI a consistent, memorable personality across every platform?**

**[Get Started Now →](https://api.clueoai.com/)**

Made with ❤️ by [Clueo Foundation](https://clueoai.com)
