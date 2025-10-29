'use server';
/**
 * @fileOverview Automatically generates draft responses to customer inquiries.
 *
 * - autoRespondToInquiry - A function that generates a draft response to a customer inquiry.
 * - AutoRespondToInquiryInput - The input type for the autoRespondToInquiry function.
 * - AutoRespondToInquiryOutput - The return type for the autoRespondToInquiry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoRespondToInquiryInputSchema = z.object({
  customerName: z.string().describe('The name of the customer.'),
  customerEmail: z.string().email().describe('The email address of the customer.'),
  inquiryText: z.string().describe('The text of the customer inquiry.'),
});
export type AutoRespondToInquiryInput = z.infer<typeof AutoRespondToInquiryInputSchema>;

const AutoRespondToInquiryOutputSchema = z.object({
  draftResponse: z.string().describe('A draft response to the customer inquiry.'),
});
export type AutoRespondToInquiryOutput = z.infer<typeof AutoRespondToInquiryOutputSchema>;

export async function autoRespondToInquiry(input: AutoRespondToInquiryInput): Promise<AutoRespondToInquiryOutput> {
  return autoRespondToInquiryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'autoRespondToInquiryPrompt',
  input: {schema: AutoRespondToInquiryInputSchema},
  output: {schema: AutoRespondToInquiryOutputSchema},
  prompt: `You are a customer service representative for Elastic, a manufacturer of custom rubber keychains and patches. A customer has submitted the following inquiry. Generate a draft response that is professional, helpful, and addresses the customer's inquiry.

Customer Name: {{{customerName}}}
Customer Email: {{{customerEmail}}}
Inquiry: {{{inquiryText}}}`,
});

const autoRespondToInquiryFlow = ai.defineFlow(
  {
    name: 'autoRespondToInquiryFlow',
    inputSchema: AutoRespondToInquiryInputSchema,
    outputSchema: AutoRespondToInquiryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
