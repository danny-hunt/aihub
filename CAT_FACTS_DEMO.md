# Cat Facts Demo - Danny's MCP Server Integration

This demo showcases how to use the **danny/cat-facts** MCP server through Dedalus Labs MCP gateway to fetch and display cat facts with AI-powered enhancements.

## 🐱 What is Danny's Cat Facts MCP Server?

Danny's Cat Facts MCP Server is a specialized Model Context Protocol (MCP) server that provides access to a curated collection of cat facts. It's hosted on Dedalus Labs' unified MCP gateway, allowing AI applications to easily access cat-related information through a simple API integration.

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (version 16 or higher)
2. **Dedalus Labs API Key** - Get yours from [Dedalus Labs Dashboard](https://www.dedaluslabs.ai/dashboard/servers)
3. **Access to danny/cat-facts MCP Server** - Available through Dedalus Labs MCP gateway

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /path/to/your/project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Dedalus Labs API key:
   ```env
   DEDALUS_API_KEY=your-actual-api-key-here
   DEDALUS_BASE_URL=https://api.dedaluslabs.ai
   ```

### Running the Cat Facts Demo

**Run the complete cat facts demo:**
```bash
node examples/cat-facts-demo.js
```

**Or run it with npm script (if added to package.json):**
```bash
npm run cat-facts-demo
```


## 🎯 Demo Features

The cat facts demo demonstrates several key features:

### 1. **Random Cat Facts**
- Fetches random cat facts from Danny's MCP server
- Displays facts with metadata (category, source, timestamp)

### 2. **Category-Based Facts**
- Retrieves cat facts from specific categories:
  - `general` - General cat information
  - `behavior` - Cat behavior and habits
  - `history` - Historical facts about cats
  - `science` - Scientific facts about cats
  - `funny` - Amusing cat facts

### 3. **AI-Powered Explanations**
- Uses AI to provide detailed explanations of cat facts
- Makes facts more engaging and educational

### 4. **Story Generation**
- Combines multiple cat facts to create engaging stories
- Demonstrates how MCP servers can work together with AI

### 5. **Interactive Quiz**
- Tests knowledge with cat facts quiz
- Shows practical application of the MCP server

## 📋 Example Usage

### Basic Cat Fact Retrieval

```javascript
import CatFactsDemo from './examples/cat-facts-demo.js';

const demo = new CatFactsDemo();
await demo.setupCatFactsTool();

// Get a random cat fact
const fact = await demo.getRandomCatFact();
console.log(fact.fact); // "Cats spend 70% of their lives sleeping."

// Get a fact from a specific category
const behaviorFact = await demo.getCatFactByCategory('behavior');
console.log(behaviorFact.fact); // "Cats knead with their paws when they're happy..."
```

### AI-Enhanced Cat Facts

```javascript
// Get AI explanation of a cat fact
const explanation = await demo.createCatFactExplainer();
console.log(explanation.explanation); // Detailed AI explanation

// Generate a story using cat facts
const story = await demo.generateCatStory();
console.log(story.story); // AI-generated story incorporating cat facts
```

## 🔧 Technical Details

### MCP Server Integration

The demo uses Dedalus Labs' MCP gateway to connect to the hosted Danny's cat facts server:

```javascript
// Use Dedalus Labs chat completion with MCP server integration
const response = await this.client.chat.create({
  messages: [
    {
      role: 'user',
      content: `Get a random cat fact${params.category ? ` about ${params.category}` : ''}. Return only the fact as a simple string.`
    }
  ],
  model: 'gpt-3.5-turbo',
  max_tokens: 100,
  temperature: 0.8,
  mcp_servers: ['danny/cat-facts'] // Use the hosted danny/cat-facts MCP server
});
```

The integration includes automatic fallback to local data if the hosted MCP server is unavailable, ensuring reliability.

### Available Categories

| Category | Description | Example Fact |
|----------|-------------|--------------|
| `general` | General cat information | "Cats spend 70% of their lives sleeping." |
| `behavior` | Cat behavior and habits | "Cats knead with their paws when they're happy." |
| `history` | Historical facts about cats | "Ancient Egyptians worshipped cats." |
| `science` | Scientific facts about cats | "Cats have over 30 muscles controlling their ears." |
| `funny` | Amusing cat facts | "A cat named Stubbs was mayor of Talkeetna, Alaska." |

## 🛠️ Customization

### Adding New Categories

To add new cat fact categories, modify the `catFacts` object in the demo:

```javascript
const catFacts = {
  // ... existing categories
  health: [
    "Cats can live up to 20 years or more.",
    "A cat's heart beats twice as fast as a human's."
  ],
  communication: [
    "Cats meow only to communicate with humans.",
    "Purring can indicate both happiness and pain."
  ]
};
```

### Extending the Demo

You can extend the demo by:

1. **Adding new tools** - Register additional MCP tools
2. **Creating new demos** - Build specialized applications
3. **Integrating with other MCP servers** - Combine multiple MCP servers
4. **Adding AI features** - Enhance with more AI capabilities

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   ```
   Error: Invalid API key
   ```
   **Solution:** Make sure your `DEDALUS_API_KEY` is set correctly in the `.env` file

2. **MCP Server Connection Error**
   ```
   Error: Failed to connect to MCP server
   ```
   **Solution:** The demo includes automatic fallback to local data. Verify you have access to the danny/cat-facts MCP server through Dedalus Labs, or the demo will use fallback data.

3. **Network Errors**
   ```
   Error: Network request failed
   ```
   **Solution:** Check your internet connection and firewall settings

### Getting Help

- 📖 [Dedalus Labs Documentation](https://docs.dedaluslabs.ai)
- 💬 [Discord Community](https://discord.gg/K3SjuFXZJw)
- 📧 [Support](mailto:support@dedaluslabs.ai)

## 🎉 What's Next?

After running this demo, you can:

1. **Explore other MCP servers** - Check out other available MCP servers
2. **Build your own MCP server** - Create custom MCP servers for your needs
3. **Integrate with your applications** - Use MCP servers in your own projects
4. **Contribute to the ecosystem** - Share your MCP servers with the community

## 📄 License

This demo is part of the Dedalus Labs demo project and follows the same MIT license.

---

**Made with ❤️ by the Dedalus Labs team and cat lovers everywhere! 🐱**