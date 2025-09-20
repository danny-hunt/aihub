/**
 * Basic Usage Examples for Dedalus Labs
 * 
 * This file contains simple examples of how to use the Dedalus Labs SDK
 * for common AI tasks.
 */

import { DedalusClient } from 'dedalus-labs';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the client
const client = new DedalusClient({
  apiKey: process.env.DEDALUS_API_KEY,
  baseUrl: 'https://api.dedaluslabs.ai'
});

/**
 * Example 1: Simple text completion
 */
export async function simpleCompletion() {
  console.log('Example 1: Simple Text Completion');
  
  const response = await client.complete({
    prompt: 'The future of AI is',
    model: 'gpt-3.5-turbo',
    maxTokens: 100
  });
  
  console.log('Response:', response.text);
  return response;
}

/**
 * Example 2: Chat conversation
 */
export async function chatConversation() {
  console.log('\nExample 2: Chat Conversation');
  
  const messages = [
    { role: 'user', content: 'Hello! Can you help me understand machine learning?' },
    { role: 'assistant', content: 'Of course! Machine learning is a subset of artificial intelligence...' },
    { role: 'user', content: 'What are the main types of machine learning?' }
  ];
  
  const response = await client.chat({
    messages: messages,
    model: 'gpt-4',
    maxTokens: 200
  });
  
  console.log('Assistant:', response.message);
  return response;
}

/**
 * Example 3: Code generation
 */
export async function codeGeneration() {
  console.log('\nExample 3: Code Generation');
  
  const response = await client.complete({
    prompt: 'Write a Python function to calculate the factorial of a number:',
    model: 'gpt-3.5-turbo',
    maxTokens: 150,
    temperature: 0.3 // Lower temperature for more deterministic code
  });
  
  console.log('Generated Code:');
  console.log(response.text);
  return response;
}

/**
 * Example 4: Text analysis
 */
export async function textAnalysis() {
  console.log('\nExample 4: Text Analysis');
  
  const textToAnalyze = `
    The quick brown fox jumps over the lazy dog. 
    This sentence contains every letter of the alphabet.
    It's commonly used for testing fonts and keyboards.
  `;
  
  const response = await client.complete({
    prompt: `Analyze this text and provide insights:\n\n${textToAnalyze}`,
    model: 'gpt-3.5-turbo',
    maxTokens: 200
  });
  
  console.log('Analysis:', response.text);
  return response;
}

/**
 * Example 5: Creative writing
 */
export async function creativeWriting() {
  console.log('\nExample 5: Creative Writing');
  
  const response = await client.complete({
    prompt: 'Write a haiku about artificial intelligence:',
    model: 'gpt-3.5-turbo',
    maxTokens: 100,
    temperature: 0.8 // Higher temperature for more creativity
  });
  
  console.log('Haiku:', response.text);
  return response;
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  try {
    await simpleCompletion();
    await chatConversation();
    await codeGeneration();
    await textAnalysis();
    await creativeWriting();
    
    console.log('\n✅ All examples completed successfully!');
  } catch (error) {
    console.error('❌ Error running examples:', error.message);
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples().catch(console.error);
}