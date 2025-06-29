
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
import { submitContactForm, type ContactFormState } from '@/actions/contact';

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
  submissionDetails: z.object({
    name: z.string().describe("The user's name for the contact form."),
    email: z.string().describe("The user's email for the contact form."),
    message: z.string().describe("The user's message for the contact form."),
  }).optional().describe("Details gathered by the AI for form submission. If present with triggerSubmit=true, the system will attempt submission."),
  triggerSubmit: z.boolean().optional().describe("If true, and submissionDetails are present, the system will attempt to submit the contact form using these details."),
  submissionAttempted: z.boolean().optional().describe("True if an attempt was made to submit the contact form in this turn."),
  submissionResult: z.string().optional().describe("The result message from the contact form submission attempt."),
  isSuccess: z.boolean().optional().describe("Indicates if the contact form submission was successful.")
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
  if (!process.env.GOOGLE_API_KEY && !process.env.GOOGLE_GENAI_API_KEY) {
    const errorMessage = "The AI assistant is currently unavailable due to a configuration issue. The site administrator has been notified.";
    console.error("--------------------------------------------------------------------");
    console.error("CRITICAL ERROR: AI Chatbot functionality is disabled.");
    console.error("Neither GOOGLE_API_KEY nor GOOGLE_GENAI_API_KEY is set in the environment variables.");
    console.error("To fix this for your deployed site:");
    console.error("1. Go to your project settings in the Google Cloud console.");
    console.error("2. Find the Secret Manager for your App Hosting backend.");
    console.error("3. Add a new secret with the name 'GOOGLE_API_KEY' and your key as the value.");
    console.error("4. Ensure your App Hosting backend has permission to access this secret.");
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
  - **Getting started:** The best way is to book a free call or use the contact form on our website.

  **Contact Form Assistance:**
  If a user wants to send a detailed message, project inquiry, or anything that sounds like a formal contact request (e.g., "I want to describe my project," "How can I send details?"), you can help them right here.

  **Follow these steps for contact form help:**
  1.  **Acknowledge Intent:** Say something like, "I can help with that! I'll just need a few details to pass along to the team."
  2.  **Gather Name:** Ask for their full name. Example: "What's your full name?"
  3.  **Gather Email:** After they respond, ask for their email. Example: "Thanks, [Name]! And what's the best email to reach you?"
  4.  **Gather Message:** After they give their email, ask for their message. Example: "Perfect. And what's the message you'd like to send?"
  5.  **Confirm and Ask to Submit:** Once you have name, email, AND message, you MUST:
      a.  Populate the \`submissionDetails\` object with the collected \`name\`, \`email\`, and \`message\`.
      b.  Your \`reply\` to the user MUST be: "Okay, I have your name as '[NAME]', your email as '[EMAIL]', and your message is: '[MESSAGE]'. Shall I send this to our team for you?" (Replace placeholders).
      c.  DO NOT set \`triggerSubmit\` to true yet. Wait for their confirmation in the next message.
  6.  **User Confirms Submission:** If the user's *current* message is a confirmation (e.g., "yes," "please," "sounds good") AND you asked for confirmation in your *previous* reply:
      a.  Set \`triggerSubmit\` to \`true\`.
      b.  Populate \`submissionDetails\` AGAIN with the same name, email, and message.
      c.  Your \`reply\` should be: "Great, sending that off to the team now..."
  7.  **User Declines or Changes:** If the user says "no" or wants to change something, just be helpful. Example: "No problem. What would you like to update? The name, email, or message?". Then, restart that part of the process.

  If the user asks a general question, just answer it naturally without starting the form process. Only initiate the form process if their intent is clearly to send a formal message.

  **If You Cannot Answer:**
  If you don't know the answer to a question, it's okay! Just say: "That's a great question. I don't have that information right now, but you can get a detailed answer by using the 'Email Us' or 'Live Chat' options." Do not make up information. Keep replies concise.

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
        return {reply: "I'm sorry, I couldn't generate a response at this moment. Please try one of the contact options below."};
      }

      if (aiOutput.triggerSubmit && aiOutput.submissionDetails) {
        const { name, email, message } = aiOutput.submissionDetails;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        const prevActionState: ContactFormState = { message: '', isSuccess: false };
        try {
          const submissionResult = await submitContactForm(prevActionState, formData);
          return {
            reply: submissionResult.message, 
            submissionAttempted: true,
            submissionResult: submissionResult.message,
            isSuccess: submissionResult.isSuccess,
          };
        } catch (error) {
          console.error("Error submitting contact form from AI flow:", error);
          const errorMessageText = error instanceof Error ? error.message : "An unexpected error occurred during submission.";
          return {
            reply: `There was an error trying to submit your message: ${errorMessageText}. Please try using the contact page or the 'Email Us' button below.`,
            submissionAttempted: true,
            submissionResult: `Error: ${errorMessageText}`,
            isSuccess: false,
          };
        }
      }
      return aiOutput;
    } catch (error) {
      console.error("Error calling autoMovaAIPrompt within flow:", error);
      let userFriendlyReply = "I'm having trouble connecting to the AI service right now. Please try again in a few moments, or use one of the contact options below.";
      
      if (error instanceof Error && (error.message.includes("503") || error.message.toLowerCase().includes("overloaded") || error.message.toLowerCase().includes("service unavailable"))) {
          userFriendlyReply = "The AI service is currently experiencing high demand and is temporarily unavailable. Please try again shortly or use one of the contact options below.";
      }
      
      return {
          reply: userFriendlyReply,
      };
    }
  }
);
