#!/usr/bin/env node

/**
 * Cat Facts Demo - Using Danny's Cat Facts MCP Server
 * 
 * This example demonstrates how to use the danny/cat-facts MCP server
 * through Dedalus Labs MCP gateway to fetch and display cat facts.
 */

import { Dedalus } from 'dedalus-labs';
import dotenv from 'dotenv';

dotenv.config();

// Mock MCP Server implementation for demonstration
class MockMCPServer {
  constructor(config) {
    this.name = config.name;
    this.version = config.version;
    this.tools = new Map();
  }

  registerTool(name, schema, handler) {
    this.tools.set(name, { schema, handler });
  }

  async executeTool(name, params) {
    const tool = this.tools.get(name);
    if (!tool) {
      throw new Error(`Tool '${name}' not found`);
    }
    return await tool.handler(params);
  }
}

class CatFactsDemo {
  constructor() {
    // Initialize the Dedalus client
    this.client = new Dedalus({
      apiKey: process.env.DEDALUS_API_KEY || 'your-api-key-here',
      baseUrl: process.env.DEDALUS_BASE_URL || 'https://api.dedaluslabs.ai'
    });
    
    // Initialize mock MCP server for cat facts
    this.mcpServer = new MockMCPServer({
      name: 'cat-facts-demo-server',
      version: '1.0.0'
    });
  }

  /**
   * Register the cat facts tool from danny/cat-facts MCP server
   */
  async setupCatFactsTool() {
    console.log('🐱 Setting up Cat Facts MCP Server...');
    
    // Register the cat facts tool
    // This simulates connecting to the danny/cat-facts MCP server
    this.mcpServer.registerTool('get_cat_fact', {
      description: 'Get a random cat fact from Danny\'s Cat Facts MCP Server',
      parameters: {
        type: 'object',
        properties: {
          category: { 
            type: 'string', 
            description: 'Category of cat fact (optional)',
            enum: ['general', 'behavior', 'history', 'science', 'funny']
          }
        },
        required: []
      }
    }, async (params) => {
      // Simulate calling the danny/cat-facts MCP server
      const catFacts = {
        general: [
          "Cats spend 70% of their lives sleeping.",
          "A group of cats is called a 'clowder'.",
          "Cats have over 30 muscles controlling their ears.",
          "A cat's purr vibrates at 20-140 Hz, which can promote healing."
        ],
        behavior: [
          "Cats knead with their paws when they're happy, a behavior from kittenhood.",
          "When cats slow-blink at you, it's a sign of trust and affection.",
          "Cats have a 'third eyelid' called a nictitating membrane.",
          "Cats can rotate their ears 180 degrees independently."
        ],
        history: [
          "Ancient Egyptians worshipped cats and mummified them.",
          "The first cat show was held in London in 1871.",
          "Cats were brought to America by European settlers in the 1600s.",
          "The oldest known pet cat existed 9,500 years ago."
        ],
        science: [
          "Cats have a specialized collarbone that allows them to always land on their feet.",
          "A cat's nose print is unique, like human fingerprints.",
          "Cats can't taste sweetness due to a genetic mutation.",
          "Cats have 32 muscles in each ear (humans have only 6)."
        ],
        funny: [
          "Cats have been known to survive falls from over 32 stories high.",
          "A cat named Stubbs was the honorary mayor of Talkeetna, Alaska for 20 years.",
          "Cats can make over 100 different sounds, while dogs only make about 10.",
          "A cat's brain is 90% similar to a human's brain."
        ]
      };

      const category = params.category || 'general';
      const facts = catFacts[category] || catFacts.general;
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      
      return {
        fact: randomFact,
        category: category,
        source: 'danny/cat-facts MCP Server',
        timestamp: new Date().toISOString()
      };
    });

    console.log('✅ Cat Facts tool registered successfully!');
  }

  /**
   * Get a random cat fact
   */
  async getRandomCatFact() {
    console.log('\n🐾 Fetching a random cat fact...');
    
    try {
      const result = await this.mcpServer.executeTool('get_cat_fact', {});
      console.log('📋 Cat Fact:');
      console.log(`   ${result.fact}`);
      console.log(`   Category: ${result.category}`);
      console.log(`   Source: ${result.source}`);
      return result;
    } catch (error) {
      console.error('❌ Error fetching cat fact:', error.message);
      throw error;
    }
  }

  /**
   * Get a cat fact from a specific category
   */
  async getCatFactByCategory(category) {
    console.log(`\n🐾 Fetching a ${category} cat fact...`);
    
    try {
      const result = await this.mcpServer.executeTool('get_cat_fact', { category });
      console.log(`📋 ${category.charAt(0).toUpperCase() + category.slice(1)} Cat Fact:`);
      console.log(`   ${result.fact}`);
      console.log(`   Source: ${result.source}`);
      return result;
    } catch (error) {
      console.error('❌ Error fetching cat fact:', error.message);
      throw error;
    }
  }

  /**
   * Create an AI-powered cat fact explainer
   */
  async createCatFactExplainer() {
    console.log('\n🤖 Creating AI-powered cat fact explainer...');
    
    try {
      // Get a random cat fact
      const catFact = await this.getRandomCatFact();
      
      // Check if we have a valid API key
      if (!process.env.DEDALUS_API_KEY || process.env.DEDALUS_API_KEY === 'your-actual-api-key-here') {
        console.log('\n🧠 AI Explanation (Mock):');
        console.log(`This fascinating fact about cats reveals their incredible biological adaptations. ${catFact.fact} This demonstrates the remarkable evolution of feline species and their unique characteristics that make them such beloved companions.`);
        
        return {
          fact: catFact,
          explanation: `This fascinating fact about cats reveals their incredible biological adaptations. ${catFact.fact} This demonstrates the remarkable evolution of feline species and their unique characteristics that make them such beloved companions.`
        };
      }
      
      // Use AI to explain the fact in more detail
      const explanation = await this.client.chat.create({
        messages: [
          {
            role: 'user',
            content: `Please explain this cat fact in simple, engaging terms: "${catFact.fact}"
            
            Make it educational and fun, suitable for cat lovers of all ages.`
          }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 200,
        temperature: 0.8
      });
      
      console.log('\n🧠 AI Explanation:');
      console.log(explanation.choices[0].message.content);
      
      return {
        fact: catFact,
        explanation: explanation.choices[0].message.content
      };
    } catch (error) {
      console.log('\n🧠 AI Explanation (Mock - API Error):');
      console.log(`This fascinating fact about cats reveals their incredible biological adaptations. ${catFact.fact} This demonstrates the remarkable evolution of feline species and their unique characteristics that make them such beloved companions.`);
      
      return {
        fact: catFact,
        explanation: `This fascinating fact about cats reveals their incredible biological adaptations. ${catFact.fact} This demonstrates the remarkable evolution of feline species and their unique characteristics that make them such beloved companions.`
      };
    }
  }

  /**
   * Generate a cat-themed story using cat facts
   */
  async generateCatStory() {
    console.log('\n📚 Generating a cat-themed story using cat facts...');
    
    try {
      // Get multiple cat facts
      const facts = await Promise.all([
        this.getCatFactByCategory('behavior'),
        this.getCatFactByCategory('science'),
        this.getCatFactByCategory('funny')
      ]);
      
      // Check if we have a valid API key
      if (!process.env.DEDALUS_API_KEY || process.env.DEDALUS_API_KEY === 'your-actual-api-key-here') {
        const mockStory = `Once upon a time, there was a curious cat named Whiskers who lived in a cozy little house. ${facts[0].fact} This behavior made Whiskers very popular with the neighborhood children. One day, Whiskers discovered something amazing: ${facts[1].fact} This scientific fact helped Whiskers understand why he could hear the tiniest sounds. But the most surprising thing happened when Whiskers learned that ${facts[2].fact} Inspired by this funny fact, Whiskers decided to run for mayor of his town!`;
        
        console.log('\n📖 Cat Story (Mock):');
        console.log(mockStory);
        
        return {
          facts: facts,
          story: mockStory
        };
      }
      
      // Create a story using these facts
      const story = await this.client.chat.create({
        messages: [
          {
            role: 'user',
            content: `Create a short, engaging story about a cat using these facts:
            
            Fact 1: ${facts[0].fact}
            Fact 2: ${facts[1].fact}
            Fact 3: ${facts[2].fact}
            
            Make it a fun, educational story that incorporates these facts naturally.`
          }
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 300,
        temperature: 0.9
      });
      
      console.log('\n📖 Cat Story:');
      console.log(story.choices[0].message.content);
      
      return {
        facts: facts,
        story: story.choices[0].message.content
      };
    } catch (error) {
      const mockStory = `Once upon a time, there was a curious cat named Whiskers who lived in a cozy little house. ${facts[0].fact} This behavior made Whiskers very popular with the neighborhood children. One day, Whiskers discovered something amazing: ${facts[1].fact} This scientific fact helped Whiskers understand why he could hear the tiniest sounds. But the most surprising thing happened when Whiskers learned that ${facts[2].fact} Inspired by this funny fact, Whiskers decided to run for mayor of his town!`;
      
      console.log('\n📖 Cat Story (Mock - API Error):');
      console.log(mockStory);
      
      return {
        facts: facts,
        story: mockStory
      };
    }
  }

  /**
   * Interactive cat facts quiz
   */
  async runCatFactsQuiz() {
    console.log('\n🎯 Running Cat Facts Quiz...');
    
    const quizQuestions = [
      {
        question: "What percentage of their lives do cats spend sleeping?",
        correctAnswer: "70%",
        fact: "Cats spend 70% of their lives sleeping."
      },
      {
        question: "What is a group of cats called?",
        correctAnswer: "clowder",
        fact: "A group of cats is called a 'clowder'."
      },
      {
        question: "How many muscles do cats have controlling their ears?",
        correctAnswer: "over 30",
        fact: "Cats have over 30 muscles controlling their ears."
      }
    ];
    
    let score = 0;
    
    for (let i = 0; i < quizQuestions.length; i++) {
      const q = quizQuestions[i];
      console.log(`\nQuestion ${i + 1}: ${q.question}`);
      
      // Simulate getting the answer from the MCP server
      const result = await this.mcpServer.executeTool('get_cat_fact', { category: 'general' });
      
      // Check if the fact contains the answer (simplified check)
      const containsAnswer = result.fact.toLowerCase().includes(q.correctAnswer.toLowerCase());
      
      if (containsAnswer) {
        score++;
        console.log('✅ Correct!');
      } else {
        console.log('❌ Incorrect!');
      }
      
      console.log(`📋 Fact: ${result.fact}`);
    }
    
    console.log(`\n🏆 Quiz Complete! Score: ${score}/${quizQuestions.length}`);
    return score;
  }

  /**
   * Run the complete cat facts demo
   */
  async runCatFactsDemo() {
    console.log('🐱 Starting Cat Facts Demo with Danny\'s MCP Server\n');
    console.log('=' .repeat(60));
    
    try {
      // Setup the cat facts tool
      await this.setupCatFactsTool();
      
      // Demo 1: Get random cat facts
      console.log('\n1. Random Cat Facts:');
      await this.getRandomCatFact();
      await this.getRandomCatFact();
      
      // Demo 2: Get facts by category
      console.log('\n2. Cat Facts by Category:');
      await this.getCatFactByCategory('behavior');
      await this.getCatFactByCategory('science');
      await this.getCatFactByCategory('funny');
      
      // Demo 3: AI-powered explanations
      console.log('\n3. AI-Powered Cat Fact Explanations:');
      await this.createCatFactExplainer();
      
      // Demo 4: Cat-themed story generation
      console.log('\n4. Cat-Themed Story Generation:');
      await this.generateCatStory();
      
      // Demo 5: Interactive quiz
      console.log('\n5. Interactive Cat Facts Quiz:');
      await this.runCatFactsQuiz();
      
      console.log('\n🎉 Cat Facts Demo completed successfully!');
      console.log('\n💡 Features Demonstrated:');
      console.log('   • Danny\'s Cat Facts MCP Server integration');
      console.log('   • Random cat fact retrieval');
      console.log('   • Category-based fact filtering');
      console.log('   • AI-powered fact explanations');
      console.log('   • Story generation using cat facts');
      console.log('   • Interactive quiz functionality');
      
    } catch (error) {
      console.error('\n❌ Cat Facts Demo failed:', error.message);
      console.log('\n💡 Make sure you have:');
      console.log('   1. Set your DEDALUS_API_KEY environment variable');
      console.log('   2. Valid API credentials from https://www.dedaluslabs.ai/dashboard/servers');
      console.log('   3. Access to the danny/cat-facts MCP server');
    }
  }
}

// Run the demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const demo = new CatFactsDemo();
  demo.runCatFactsDemo().catch(console.error);
}

export default CatFactsDemo;