# Dedalus Labs Demo

A comprehensive demonstration of [Dedalus Labs](https://dedaluslabs.ai) MCP (Model Context Protocol) gateway integration for AI applications.

## Overview

This project showcases how to integrate with Dedalus Labs' unified AI gateway, which provides a single API endpoint for accessing multiple AI models and services. The demo includes both basic usage patterns and advanced MCP server integration for building sophisticated AI agents.

## Features

- 🤖 **Multi-Model AI Access** - Unified interface for GPT, Claude, and other AI models
- 🔧 **MCP Integration** - Model Context Protocol server implementation
- 🛠️ **Tool Registration** - Custom tool creation and execution
- 📡 **Streaming Support** - Real-time response streaming
- 💬 **Chat & Completion** - Both conversational and text completion APIs
- 🛡️ **Error Handling** - Comprehensive error management and retry logic

## Quick Start

### Prerequisites

- Node.js 18+
- Dedalus Labs API key ([Get one here](https://www.dedaluslabs.ai/dashboard/servers))

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dedalus-labs-demo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Configuration

Edit your `.env` file:

```env
DEDALUS_API_KEY=your-actual-api-key-here
DEDALUS_BASE_URL=https://api.dedaluslabs.ai
```

### Running the Demos

```bash
# Basic demo - Text completion and chat
npm start

# Advanced demo - MCP integration and tools
npm run demo

# Cat Facts demo with Danny's MCP server
npm run cat-facts

# Run specific examples
node examples/basic-usage.js
node examples/mcp-integration.js
node examples/cat-facts-demo.js
```

## Project Structure

```
├── src/
│   ├── index.js          # Basic usage demo
│   └── demo.js           # Advanced MCP demo
├── examples/
│   ├── basic-usage.js    # Simple API examples
│   └── mcp-integration.js # MCP server examples
├── package.json
└── README.md
```

## Usage Examples

### 🔧 Advanced Features (`src/demo.js`)

- MCP server integration
- Tool registration and execution
- AI agent with tool usage
- Streaming responses
- Comprehensive error handling

### 📚 Examples

#### Basic Usage Examples (`examples/basic-usage.js`)

- Simple text completion
- Chat conversations
- Code generation
- Text analysis
- Creative writing

#### MCP Integration Examples (`examples/mcp-integration.js`)

- Tool registration and usage
- Data processing tools
- AI agent with tool capabilities
- Multi-step workflows
- Error handling patterns

#### Cat Facts Demo (`examples/cat-facts-demo.js`)

- Danny's Cat Facts MCP server integration
- Random cat fact retrieval
- Category-based fact filtering
- AI-powered fact explanations
- Story generation using cat facts
- Interactive quiz functionality

## API Reference

### DedalusClient

```javascript
import { DedalusClient } from "dedalus-labs";

const client = new DedalusClient({
  apiKey: process.env.DEDALUS_API_KEY,
  baseUrl: "https://api.dedaluslabs.ai",
});

const response = await client.complete({
  prompt: "Explain quantum computing in simple terms",
  model: "gpt-3.5-turbo",
  maxTokens: 200,
  temperature: 0.7,
});

console.log(response.text);
```

### Chat Conversations

```javascript
const chatResponse = await client.chat({
  messages: [
    { role: "user", content: "What is machine learning?" },
    { role: "assistant", content: "Machine learning is..." },
    { role: "user", content: "How does it differ from AI?" },
  ],
  model: "gpt-4",
  maxTokens: 300,
});

console.log(chatResponse.message);
```

### MCP Server with Custom Tools

```javascript
import { MCPServer } from "dedalus-labs-mcp";

const server = new MCPServer({
  name: "my-ai-server",
  version: "1.0.0",
});

// Register a custom tool
server.registerTool(
  "weather",
  {
    description: "Get current weather information",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string", description: "City name" },
      },
      required: ["location"],
    },
  },
  async (params) => {
    // Your tool implementation
    return { location: params.location, temp: "22°C", condition: "Sunny" };
  }
);

// Execute the tool
const result = await server.executeTool("weather", { location: "San Francisco" });
```

### Streaming Responses

```javascript
const stream = await client.completeStream({
  prompt: "Write a creative story about space exploration",
  model: "gpt-3.5-turbo",
  maxTokens: 500,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text || "");
}
```

## Available Scripts

- `npm start` - Run basic demo
- `npm run demo` - Run advanced MCP demo
- `npm run dev` - Run in development mode with auto-reload

## Environment Variables

| Variable           | Description               | Required | Default                      |
| ------------------ | ------------------------- | -------- | ---------------------------- |
| `DEDALUS_API_KEY`  | Your Dedalus Labs API key | Yes      | -                            |
| `DEDALUS_BASE_URL` | API base URL              | No       | `https://api.dedaluslabs.ai` |
| `DEBUG`            | Enable debug logging      | No       | `false`                      |

## Supported Models

Dedalus Labs supports various AI models including:

- **OpenAI**: GPT-3.5-turbo, GPT-4, GPT-4-turbo
- **Anthropic**: Claude-3, Claude-3.5-sonnet
- **Google**: Gemini Pro, Gemini Ultra
- **Meta**: Llama models
- **And more...**

Check the [Dedalus Labs documentation](https://docs.dedaluslabs.ai/providers) for the complete list.

## Error Handling

The demo includes comprehensive error handling for:

- Invalid API keys
- Network connectivity issues
- Model availability errors
- Rate limiting
- Tool execution failures
- Malformed requests

## Examples Directory

The `examples/` directory contains detailed usage patterns:

- **`basic-usage.js`** - Simple API calls, chat conversations, code generation
- **`mcp-integration.js`** - Tool registration, AI agents, multi-step workflows

Run individual examples:

```bash
node examples/basic-usage.js
node examples/mcp-integration.js
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Resources

- 📖 [Dedalus Labs Documentation](https://docs.dedaluslabs.ai)
- 🚀 [Quickstart Guide](https://docs.dedaluslabs.ai/quickstart)
- 💬 [Discord Community](https://discord.gg/K3SjuFXZJw)
- 📧 [Support](mailto:support@dedaluslabs.ai)
- 🔧 [MCP Protocol Specification](https://modelcontextprotocol.io)

## Troubleshooting

### Common Issues

**API Key Error**

```
Error: Invalid API key
```

- Verify your `DEDALUS_API_KEY` is set correctly in `.env`
- Check that the key is active in your [Dedalus Labs dashboard](https://www.dedaluslabs.ai/dashboard/servers)

**Model Not Found**

```
Error: Model 'gpt-5' not found
```

- Check available models with `client.models.list()`
- Verify model names in the [supported models documentation](https://docs.dedaluslabs.ai/providers)

**Network Errors**

```
Error: Network request failed
```

- Check your internet connection
- Verify firewall settings
- Try increasing timeout values

### Getting Help

- Check the [FAQ](https://docs.dedaluslabs.ai/faq)
- Join the [Discord community](https://discord.gg/K3SjuFXZJw)
- Email [support@dedaluslabs.ai](mailto:support@dedaluslabs.ai)

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the Dedalus Labs team
