#!/usr/bin/env node

import { DedalusClient } from 'dedalus-labs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Dedalus Labs Demo Application
 * 
 * This demo showcases the basic usage of Dedalus Labs MCP gateway
 * for AI applications. Dedalus Labs provides a unified API endpoint
 * for interacting with various AI models and services.
 */

class DedalusDemo {
  constructor() {
    // Initialize the Dedalus client
    // You'll need to get your API key from https://www.dedaluslabs.ai/dashboard/servers
    this.client = new DedalusClient({
      apiKey: process.env.DEDALUS_API_KEY || 'your-api-key-here',
      baseUrl: process.env.DEDALUS_BASE_URL || 'https://api.dedaluslabs.ai'
    });
  }

  /**
   * Basic text completion example
   */
  async textCompletion(prompt) {
    try {
      console.log('🤖 Generating text completion...');
      console.log(`Prompt: ${prompt}`);
      
      const response = await this.client.complete({
        prompt: prompt,
        model: 'gpt-3.5-turbo', // You can specify different models
        maxTokens: 150,
        temperature: 0.7
      });

      console.log('✅ Response:');
      console.log(response.text);
      return response;
    } catch (error) {
      console.error('❌ Error in text completion:', error.message);
      throw error;
    }
  }

  /**
   * Chat completion example
   */
  async chatCompletion(messages) {
    try {
      console.log('💬 Generating chat completion...');
      
      const response = await this.client.chat({
        messages: messages,
        model: 'gpt-4',
        maxTokens: 200,
        temperature: 0.8
      });

      console.log('✅ Chat Response:');
      console.log(response.message);
      return response;
    } catch (error) {
      console.error('❌ Error in chat completion:', error.message);
      throw error;
    }
  }

  /**
   * List available models
   */
  async listModels() {
    try {
      console.log('📋 Fetching available models...');
      
      const models = await this.client.models.list();
      
      console.log('✅ Available Models:');
      models.forEach(model => {
        console.log(`  - ${model.id}: ${model.name || 'No description'}`);
      });
      
      return models;
    } catch (error) {
      console.error('❌ Error fetching models:', error.message);
      throw error;
    }
  }

  /**
   * Run a comprehensive demo
   */
  async runDemo() {
    console.log('🚀 Starting Dedalus Labs Demo\n');
    console.log('=' .repeat(50));
    
    try {
      // 1. List available models
      console.log('\n1. Available Models:');
      await this.listModels();
      
      // 2. Text completion example
      console.log('\n2. Text Completion Example:');
      await this.textCompletion('Explain what Dedalus Labs does in simple terms.');
      
      // 3. Chat completion example
      console.log('\n3. Chat Completion Example:');
      await this.chatCompletion([
        { role: 'user', content: 'What is MCP (Model Context Protocol)?' },
        { role: 'assistant', content: 'MCP is a protocol for AI applications...' },
        { role: 'user', content: 'How does Dedalus Labs use MCP?' }
      ]);
      
      console.log('\n✅ Demo completed successfully!');
      
    } catch (error) {
      console.error('\n❌ Demo failed:', error.message);
      console.log('\n💡 Make sure you have:');
      console.log('   1. Set your DEDALUS_API_KEY environment variable');
      console.log('   2. Valid API credentials from https://www.dedaluslabs.ai/dashboard/servers');
    }
  }
}

// Run the demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const demo = new DedalusDemo();
  demo.runDemo().catch(console.error);
}

export default DedalusDemo;