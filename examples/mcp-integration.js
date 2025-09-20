/**
 * MCP Integration Examples for Dedalus Labs
 * 
 * This file demonstrates how to integrate Dedalus Labs with MCP (Model Context Protocol)
 * for building sophisticated AI agents with tool capabilities.
 */

import { DedalusClient } from 'dedalus-labs';
import { MCPServer } from 'dedalus-labs-mcp';
import dotenv from 'dotenv';

dotenv.config();

// Initialize clients
const client = new DedalusClient({
  apiKey: process.env.DEDALUS_API_KEY,
  baseUrl: 'https://api.dedaluslabs.ai'
});

const mcpServer = new MCPServer({
  name: 'dedalus-examples-server',
  version: '1.0.0'
});

/**
 * Example 1: Simple tool registration and usage
 */
export async function simpleToolExample() {
  console.log('Example 1: Simple Tool Registration');
  
  // Register a simple greeting tool
  mcpServer.registerTool('greet', {
    description: 'Generate a personalized greeting',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the person to greet' },
        language: { type: 'string', description: 'Language for the greeting', default: 'English' }
      },
      required: ['name']
    }
  }, async (params) => {
    const greetings = {
      English: `Hello, ${params.name}! Nice to meet you.`,
      Spanish: `¡Hola, ${params.name}! Mucho gusto.`,
      French: `Bonjour, ${params.name}! Enchanté.`,
      German: `Hallo, ${params.name}! Freut mich.`
    };
    
    return {
      greeting: greetings[params.language] || greetings.English,
      timestamp: new Date().toISOString()
    };
  });
  
  // Use the tool
  const result = await mcpServer.executeTool('greet', { 
    name: 'Alice', 
    language: 'Spanish' 
  });
  
  console.log('Tool Result:', result);
  return result;
}

/**
 * Example 2: Data processing tool
 */
export async function dataProcessingExample() {
  console.log('\nExample 2: Data Processing Tool');
  
  // Register a data analysis tool
  mcpServer.registerTool('analyze_data', {
    description: 'Analyze a dataset and provide insights',
    parameters: {
      type: 'object',
      properties: {
        data: { 
          type: 'array', 
          description: 'Array of numbers to analyze',
          items: { type: 'number' }
        }
      },
      required: ['data']
    }
  }, async (params) => {
    const data = params.data;
    const sum = data.reduce((a, b) => a + b, 0);
    const average = sum / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    
    return {
      count: data.length,
      sum,
      average: parseFloat(average.toFixed(2)),
      min,
      max,
      range: max - min
    };
  });
  
  // Use the tool
  const result = await mcpServer.executeTool('analyze_data', {
    data: [1, 5, 3, 9, 2, 8, 4, 7, 6]
  });
  
  console.log('Analysis Result:', result);
  return result;
}

/**
 * Example 3: AI agent with tool usage
 */
export async function aiAgentExample() {
  console.log('\nExample 3: AI Agent with Tool Usage');
  
  // Register a web search simulation tool
  mcpServer.registerTool('search_web', {
    description: 'Search the web for information (simulated)',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' }
      },
      required: ['query']
    }
  }, async (params) => {
    // Simulate web search results
    const mockResults = {
      'artificial intelligence': 'AI is transforming industries worldwide...',
      'machine learning': 'Machine learning algorithms learn from data...',
      'neural networks': 'Neural networks mimic the human brain...'
    };
    
    return {
      query: params.query,
      results: mockResults[params.query.toLowerCase()] || 'No results found for this query.',
      timestamp: new Date().toISOString()
    };
  });
  
  // Create an AI agent that uses tools
  const agentPrompt = `
  You are an AI research assistant. Use the available tools to help answer questions.
  When a user asks about a topic, search for information and then provide a comprehensive answer.
  `;
  
  const userQuestion = 'Tell me about artificial intelligence';
  
  try {
    // Step 1: Search for information
    const searchResult = await mcpServer.executeTool('search_web', { query: userQuestion });
    
    // Step 2: Generate AI response based on search results
    const response = await client.complete({
      prompt: `${agentPrompt}
      
      User Question: ${userQuestion}
      Search Results: ${searchResult.results}
      
      Please provide a comprehensive answer based on the search results.`,
      model: 'gpt-3.5-turbo',
      maxTokens: 300
    });
    
    console.log('Agent Response:', response.text);
    return response;
    
  } catch (error) {
    console.error('Agent error:', error.message);
  }
}

/**
 * Example 4: Multi-step workflow
 */
export async function multiStepWorkflow() {
  console.log('\nExample 4: Multi-step Workflow');
  
  // Register multiple tools for a workflow
  mcpServer.registerTool('validate_email', {
    description: 'Validate an email address format',
    parameters: {
      type: 'object',
      properties: {
        email: { type: 'string', description: 'Email address to validate' }
      },
      required: ['email']
    }
  }, async (params) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      email: params.email,
      isValid: emailRegex.test(params.email),
      timestamp: new Date().toISOString()
    };
  });
  
  mcpServer.registerTool('send_notification', {
    description: 'Send a notification (simulated)',
    parameters: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Notification message' },
        recipient: { type: 'string', description: 'Recipient email' }
      },
      required: ['message', 'recipient']
    }
  }, async (params) => {
    return {
      status: 'sent',
      message: params.message,
      recipient: params.recipient,
      timestamp: new Date().toISOString()
    };
  });
  
  // Execute multi-step workflow
  const email = 'user@example.com';
  const message = 'Welcome to our service!';
  
  try {
    // Step 1: Validate email
    const validation = await mcpServer.executeTool('validate_email', { email });
    console.log('Email validation:', validation);
    
    if (validation.isValid) {
      // Step 2: Send notification
      const notification = await mcpServer.executeTool('send_notification', {
        message,
        recipient: email
      });
      console.log('Notification sent:', notification);
    } else {
      console.log('Invalid email address, skipping notification');
    }
    
  } catch (error) {
    console.error('Workflow error:', error.message);
  }
}

/**
 * Example 5: Error handling in MCP tools
 */
export async function errorHandlingExample() {
  console.log('\nExample 5: Error Handling in MCP Tools');
  
  // Register a tool that can fail
  mcpServer.registerTool('risky_operation', {
    description: 'Perform a risky operation that might fail',
    parameters: {
      type: 'object',
      properties: {
        operation: { type: 'string', description: 'Operation to perform' }
      },
      required: ['operation']
    }
  }, async (params) => {
    if (params.operation === 'fail') {
      throw new Error('This operation was designed to fail');
    }
    
    return {
      operation: params.operation,
      status: 'success',
      result: `Operation '${params.operation}' completed successfully`
    };
  });
  
  try {
    // Test successful operation
    const success = await mcpServer.executeTool('risky_operation', { operation: 'succeed' });
    console.log('Success case:', success);
    
    // Test failing operation
    const failure = await mcpServer.executeTool('risky_operation', { operation: 'fail' });
    console.log('Failure case:', failure);
    
  } catch (error) {
    console.log('Caught expected error:', error.message);
  }
}

/**
 * Run all MCP integration examples
 */
export async function runAllMCPExamples() {
  try {
    await simpleToolExample();
    await dataProcessingExample();
    await aiAgentExample();
    await multiStepWorkflow();
    await errorHandlingExample();
    
    console.log('\n✅ All MCP integration examples completed successfully!');
  } catch (error) {
    console.error('❌ Error running MCP examples:', error.message);
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllMCPExamples().catch(console.error);
}