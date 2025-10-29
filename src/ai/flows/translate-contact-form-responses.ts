'use server';

/**
 * @fileOverview A translation AI agent for contact form responses.
 *
 * - translateContactFormResponse - A function that translates contact form responses between Arabic and English.
 * - TranslateContactFormResponseInput - The input type for the translateContactFormResponse function.
 * - TranslateContactFormResponseOutput - The return type for the translateContactFormResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateContactFormResponseInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  sourceLanguage: z.enum(['en', 'ar']).describe('The source language of the text.'),
  targetLanguage: z.enum(['en', 'ar']).describe('The target language for the translation.'),
});
export type TranslateContactFormResponseInput = z.infer<typeof TranslateContactFormResponseInputSchema>;

const TranslateContactFormResponseOutputSchema = z.object({
  translatedText: z.string().describe('The translated text.'),
});
export type TranslateContactFormResponseOutput = z.infer<typeof TranslateContactFormResponseOutputSchema>;

export async function translateContactFormResponse(
  input: TranslateContactFormResponseInput
): Promise<TranslateContactFormResponseOutput> {
  return translateContactFormResponseFlow(input);
}

const translateContactFormResponsePrompt = ai.definePrompt({
  name: 'translateContactFormResponsePrompt',
  input: {schema: TranslateContactFormResponseInputSchema},
  output: {schema: TranslateContactFormResponseOutputSchema},
  prompt: `You are a translation expert. Translate the following text from {{sourceLanguage}} to {{targetLanguage}}.

Text: {{{text}}}`,
});

const translateContactFormResponseFlow = ai.defineFlow(
  {
    name: 'translateContactFormResponseFlow',
    inputSchema: TranslateContactFormResponseInputSchema,
    outputSchema: TranslateContactFormResponseOutputSchema,
  },
  async input => {
    const {output} = await translateContactFormResponsePrompt(input);
    return output!;
  }
);
