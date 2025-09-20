#!/usr/bin/env node

import { DedalusClient } from 'dedalus-labs';
import { MCPServer } from 'dedalus-labs-mcp';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Advanced Dedalus Labs Demo with MCP Server Integration
 * 
 * This demo shows how to use Dedalus Labs with MCP (Model Context Protocol)
 * for more sophisticated AI agent interactions.
 */

class AdvancedDedalusDemo {
  constructor() {
    this.client = new DedalusClient({
      apiKey: process.env.DEDALUS_API_KEY || 'your-api-key-here',
      baseUrl: process.env.DEDALUS_BASE_URL || 'https://api.dedaluslabs.ai'
    });
    
    // Initialize MCP server
    this.mcpServer = new MCPServer({
      name: 'dedalus-demo-server',
      version: '1.0.0'
    });
  }

  /**
   * Demonstrate MCP tool integration
   */
  async demonstrateMCPTools() {
    console.log('🔧 Demonstrating MCP Tools Integration\n');
    
    // Register some example tools
    this.mcpServer.registerTool('get_weather', {
      description: 'Get current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name' }
        },
        required: ['location']
      }
    }, async (params) => {
      // Simulate weather API call
      return {
        location: params.location,
        temperature: '22°C',
        condition: 'Sunny',
        humidity: '65%'
      };
    });

    this.mcpServer.registerTool('calculate', {
      description: 'Perform mathematical calculations',
      parameters: {
        type: 'object',
        properties: {
          expression: { type: 'string', description: 'Mathematical expression to evaluate' }
        },
        required: ['expression']
      }
    }, async (params) => {
      try {
        // Simple evaluation (in production, use a proper math parser)
        const result = eval(params.expression);
        return { expression: params.expression, result };
      } catch (error) {
        return { error: 'Invalid mathematical expression' };
      }
    });

    console.log('✅ MCP Tools registered successfully');
    
    // Test tool execution
    console.log('\n🧪 Testing MCP Tools:');
    
    const weatherResult = await this.mcpServer.executeTool('get_weather', { location: 'San Francisco' });
    console.log('Weather Tool Result:', weatherResult);
    
    const calcResult = await this.mcpServer.executeTool('calculate', { expression: '2 + 2 * 3' });
    console.log('Calculator Tool Result:', calcResult);
  }

  /**
   * Demonstrate AI agent with tool usage
   */
  async demonstrateAIAgent() {
    console.log('\n🤖 Demonstrating AI Agent with Tool Usage\n');
    
    const agentPrompt = `
    You are an AI assistant with access to tools. 
    Please help me with the following tasks:
    1. Get the weather for New York
    2. Calculate 15 * 8 + 42
    3. Explain what you found
    `;

    try {
      // Simulate agent reasoning and tool usage
      console.log('Agent thinking... 🤔');
      
      // Step 1: Get weather
      const weather = await this.mcpServer.executeTool('get_weather', { location: 'New York' });
      console.log('Agent used weather tool:', weather);
      
      // Step 2: Calculate
      const calculation = await this.mcpServer.executeTool('calculate', { expression: '15 * 8 + 42' });
      console.log('Agent used calculator tool:', calculation);
      
      // Step 3: Generate response
      const response = await this.client.complete({
        prompt: `Based on the tool results:
        Weather: ${JSON.stringify(weather)}
        Calculation: ${JSON.stringify(calculation)}
        
        Please provide a helpful summary of these results.`,
        model: 'gpt-3.5-turbo',
        maxTokens: 200
      });
      
      console.log('\nAgent Response:');
      console.log(response.text);
      
    } catch (error) {
      console.error('❌ Agent demonstration failed:', error.message);
    }
  }

  /**
   * Demonstrate streaming responses
   */
  async demonstrateStreaming() {
    console.log('\n📡 Demonstrating Streaming Responses\n');
    
    try {
      const stream = await this.client.completeStream({
        prompt: 'Write a short story about a robot learning to paint.',
        model: 'gpt-3.5-turbo',
        maxTokens: 300
      });

      console.log('Streaming response:');
      console.log('─'.repeat(50));
      
      for await (const chunk of stream) {
        process.stdout.write(chunk.text || '');
      }
      
      console.log('\n' + '─'.repeat(50));
      console.log('✅ Streaming completed');
      
    } catch (error) {
      console.error('❌ Streaming failed:', error.message);
    }
  }

  /**
   * Demonstrate error handling and retries
   */
  async demonstrateErrorHandling() {
    console.log('\n🛡️ Demonstrating Error Handling\n');
    
    try {
      // Test with invalid model
      await this.client.complete({
        prompt: 'Hello world',
        model: 'invalid-model-name',
        maxTokens: 10
      });
    } catch (error) {
      console.log('✅ Caught expected error:', error.message);
    }
    
    try {
      // Test with invalid API key
      const invalidClient = new DedalusClient({
        apiKey: 'invalid-key',
        baseUrl: 'https://api.dedaluslabs.ai'
      });
      
      await invalidClient.complete({
        prompt: 'Hello world',
        model: 'gpt-3.5-turbo',
        maxTokens: 10
      });
    } catch (error) {
      console.log('✅ Caught authentication error:', error.message);
    }
  }

  /**
   * Run the complete advanced demo
   */
  async runAdvancedDemo() {
    console.log('🚀 Starting Advanced Dedalus Labs Demo\n');
    console.log('=' .repeat(60));
    
    try {
      await this.demonstrateMCPTools();
      await this.demonstrateAIAgent();
      await this.demonstrateStreaming();
      await this.demonstrateErrorHandling();
      
      console.log('\n🎉 Advanced demo completed successfully!');
      console.log('\n💡 Key Features Demonstrated:');
      console.log('   • MCP Server integration');
      console.log('   • Tool registration and execution');
      console.log('   • AI agent with tool usage');
      console.log('   • Streaming responses');
      console.log('   • Error handling');
      
    } catch (error) {
      console.error('\n❌ Advanced demo failed:', error.message);
    }
  }
}

// Run the advanced demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const demo = new AdvancedDedalusDemo();
  demo.runAdvancedDemo().catch(console.error);
}

export default AdvancedDedalusDemo;