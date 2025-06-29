
'use server';
/**
 * @fileOverview An AutoMova AI support chat flow.
 *
 * - autoMovaSupport - A function that handles the chat interaction.
 * - AutoMovaSupportInput - The input type for the autoMovaSupport function.
 * - AutoMovaSupportOutput - The return type for the autoMovaSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoMovaSupportInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The previous chat history.'),
});
export type AutoMovaSupportInput = z.infer<typeof AutoMovaSupportInputSchema>;

const AutoMovaSupportOutputSchema = z.object({
  reply: z.string().describe('The AI-generated reply.'),
});
export type AutoMovaSupportOutput = z.infer<typeof AutoMovaSupportOutputSchema>;

const InternalPromptInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
    isUser: z.boolean(),
    isModel: z.boolean(),
  })).optional().describe('The previous chat history with helper flags.'),
});

export async function autoMovaSupport(input: AutoMovaSupportInput): Promise<AutoMovaSupportOutput> {
  if (!process.env.GOOGLE_API_KEY && !process.env.GOOGLE_GENAI_API_KEY && !process.env.GEMINI_API_KEY) {
    const errorMessage = "The AI assistant is currently unavailable due to a configuration issue. The site administrator has been notified.";
    console.error("--------------------------------------------------------------------");
    console.error("CRITICAL ERROR: AI Chatbot functionality is disabled.");
    console.error("None of GOOGLE_API_KEY, GOOGLE_GENAI_API_KEY, or GEMINI_API_KEY is set in the environment variables.");
    console.error("To fix this for local development:");
    console.error("1. Ensure you have a `.env.local` or `.env` file in the root of your project.");
    console.error("2. Add your Google AI key like this: GOOGLE_API_KEY=your_actual_api_key");
    console.error("3. Make sure to RESTART your Next.js development server (e.g., `npm run dev`).");
    console.error("To fix this for your deployed site:");
    console.error("1. Go to your hosting provider's settings for environment variables or secrets.");
    console.error("2. Add a new secret with the name 'GOOGLE_API_KEY' and your key as the value.");
    console.error("--------------------------------------------------------------------");
    return {
      reply: errorMessage,
    };
  }
  return autoMovaSupportFlow(input);
}

const autoMovaAIPrompt = ai.definePrompt({
  name: 'autoMovaSupportPrompt',
  input: {schema: InternalPromptInputSchema}, 
  output: {schema: AutoMovaSupportOutputSchema},
  config: {
    temperature: 0.4,
  },
  prompt: `You are "AutoMova AI," a friendly, professional, and helpful assistant for AutoMova, a company that builds custom business automation solutions. Your goal is to provide clear, concise answers and guide users. Your tone should be approachable and confident, but not overly salesy.

  **About AutoMova:**
  We help businesses save time, cut costs, and grow by building smart automations. Key services include:
  - Custom Workflow Automation
  - AI-Powered Data Processing
  - Automated Reporting
  - CRM & Sales Automation

  **Our Process:**
  1.  **Discovery Call:** We learn about your needs.
  2.  **Custom Build:** We design and implement your solution.
  3.  **Launch & Grow:** We provide ongoing support as you scale.

  Our main contact email is automova.s@gmail.com.

  **Frequently Asked Questions:**
  - **Who we work with:** Startups, small businesses, online stores, service providers. Anyone with repetitive processes.
  - **Integrations:** We work with the tools you already use (CRMs, email marketing, etc.).
  - **Getting started:** The best way is to book a free call through the website.

  **If You Cannot Answer:**
  If you don't know the answer to a question, it's okay! Just say: "That's a great question. I don't have the specific details on that right now, but our team can give you a complete answer on a free discovery call. You can schedule one easily using the 'Book a Call' buttons on the site." Do not make up information. Keep replies concise.

  Chat History:
  {{#if history}}
    {{#each history}}
      {{#if this.isUser}}
        User: {{{this.content}}}
      {{else if this.isModel}}
        AutoMova AI: {{{this.content}}}
      {{/if}}
    {{/each}}
  {{else}}
    No previous history.
  {{/if}}

  Current User Message:
  {{{message}}}

  AutoMova AI Reply:
  `,
});


const autoMovaSupportFlow = ai.defineFlow(
  {
    name: 'autoMovaSupportFlow',
    inputSchema: AutoMovaSupportInputSchema, 
    outputSchema: AutoMovaSupportOutputSchema,
  },
  async (input) => {
    const historyForPrompt = input.history?.map(msg => ({
      ...msg,
      isUser: msg.role === 'user',
      isModel: msg.role === 'model',
    }));

    try {
      const {output: aiOutput} = await autoMovaAIPrompt({ message: input.message, history: historyForPrompt });

      if (!aiOutput) {
        return {reply: "I'm sorry, I couldn't generate a response at this moment. Please try again or book a call with our team."};
      }
      
      return aiOutput;

    } catch (error) {
      console.error("Error calling autoMovaAIPrompt within flow:", error);
      let userFriendlyReply = "I'm having trouble connecting to the AI service right now. Please try again in a few moments, or book a call with our team.";
      
      if (error instanceof Error && (error.message.includes("503") || error.message.toLowerCase().includes("overloaded") || error.message.toLowerCase().includes("service unavailable"))) {
          userFriendlyReply = "The AI service is currently experiencing high demand and is temporarily unavailable. Please try again shortly or use one of the contact options below.";
      }
      
      return {
          reply: userFriendlyReply,
      };
    }
  }
);
