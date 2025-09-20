# Dedalus Labs Demo

This repository contains a comprehensive demo of [Dedalus Labs](https://dedaluslabs.ai), showcasing how to use their MCP (Model Context Protocol) gateway for AI applications.

## What is Dedalus Labs?

Dedalus Labs is building the MCP gateway for next-generation AI applications by unifying the fragmented AI agents ecosystem with a **single drop-in API endpoint**. They provide:

- 🚀 Unified API for multiple AI models
- 🔧 MCP (Model Context Protocol) integration
- 🛠️ Tool and function calling capabilities
- 📡 Streaming responses
- 🎯 Easy-to-use SDKs

## Quick Start

### 1. Installation

```bash
npm install
```

### 2. Configuration

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Then edit `.env` and add your Dedalus Labs API key:

```env
DEDALUS_API_KEY=your-actual-api-key-here
```

**Get your API key from:** [Dedalus Labs Dashboard](https://www.dedaluslabs.ai/dashboard/servers)

### 3. Run the Demo

```bash
# Basic demo
npm start

# Advanced demo with MCP integration
npm run demo

# Run specific examples
node examples/basic-usage.js
node examples/mcp-integration.js
```

## Demo Features

### 🎯 Basic Usage (`src/index.js`)

- Text completion with various models
- Chat conversations
- Model listing
- Error handling

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

## API Reference

### DedalusClient

```javascript
import { DedalusClient } from 'dedalus-labs';

const client = new DedalusClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.dedaluslabs.ai'
});

// Text completion
const response = await client.complete({
  prompt: 'Hello world',
  model: 'gpt-3.5-turbo',
  maxTokens: 100,
  temperature: 0.7
});

// Chat completion
const chatResponse = await client.chat({
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
  model: 'gpt-4',
  maxTokens: 200
});

// List available models
const models = await client.models.list();
```

### MCPServer

```javascript
import { MCPServer } from 'dedalus-labs-mcp';

const server = new MCPServer({
  name: 'my-server',
  version: '1.0.0'
});

// Register a tool
server.registerTool('my_tool', {
  description: 'My custom tool',
  parameters: {
    type: 'object',
    properties: {
      input: { type: 'string' }
    },
    required: ['input']
  }
}, async (params) => {
  return { result: `Processed: ${params.input}` };
});

// Execute a tool
const result = await server.executeTool('my_tool', { input: 'test' });
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DEDALUS_API_KEY` | Your Dedalus Labs API key | Required |
| `DEDALUS_BASE_URL` | API base URL | `https://api.dedaluslabs.ai` |
| `DEBUG` | Enable debug logging | `false` |

## Supported Models

Dedalus Labs supports various AI models including:

- GPT-3.5-turbo
- GPT-4
- Claude (Anthropic)
- And many more...

Check the [Model Providers documentation](https://docs.dedaluslabs.ai/providers) for the complete list.

## Error Handling

The demo includes comprehensive error handling for:

- Invalid API keys
- Network errors
- Model errors
- Rate limiting
- Tool execution errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Resources

- 📖 [Dedalus Labs Documentation](https://docs.dedaluslabs.ai)
- 🚀 [Quickstart Guide](https://docs.dedaluslabs.ai/quickstart)
- 💬 [Discord Community](https://discord.gg/K3SjuFXZJw)
- 📧 [Support](mailto:support@dedaluslabs.ai)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **API Key Error**: Make sure you've set the correct `DEDALUS_API_KEY` in your `.env` file
2. **Network Errors**: Check your internet connection and firewall settings
3. **Model Not Found**: Verify the model name is supported by checking the models list

### Getting Help

- Check the [FAQ](https://docs.dedaluslabs.ai/faq)
- Join the [Discord community](https://discord.gg/K3SjuFXZJw)
- Email [support@dedaluslabs.ai](mailto:support@dedaluslabs.ai)

---

Made with ❤️ by the Dedalus Labs team