'use server';

/**
 * @fileOverview Recommends the best prediction models for a given tennis tournament.
 *
 * - suggestTournamentModels - A function that suggests the best prediction models for a selected tournament.
 * - SuggestTournamentModelsInput - The input type for the suggestTournamentModels function.
 * - SuggestTournamentModelsOutput - The return type for the suggestTournamentModels function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTournamentModelsInputSchema = z.object({
  tournament: z.string().describe('The name of the selected tennis tournament.'),
});
export type SuggestTournamentModelsInput = z.infer<typeof SuggestTournamentModelsInputSchema>;

const SuggestTournamentModelsOutputSchema = z.object({
  suggestedModels: z
    .array(z.string())
    .describe(
      'An array of the best performing prediction models for the selected tournament, ordered by performance.'
    ),
});
export type SuggestTournamentModelsOutput = z.infer<typeof SuggestTournamentModelsOutputSchema>;

export async function suggestTournamentModels(
  input: SuggestTournamentModelsInput
): Promise<SuggestTournamentModelsOutput> {
  return suggestTournamentModelsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTournamentModelsPrompt',
  input: {schema: SuggestTournamentModelsInputSchema},
  output: {schema: SuggestTournamentModelsOutputSchema},
  prompt: `You are an expert in tennis match prediction models.

  Based on the selected tournament, recommend the best performing prediction models. Consider model accuracy, AUC, precision, and recall.
  Order the models by performance, with the best model first.

  Tournament: {{{tournament}}}
  `,
});

const suggestTournamentModelsFlow = ai.defineFlow(
  {
    name: 'suggestTournamentModelsFlow',
    inputSchema: SuggestTournamentModelsInputSchema,
    outputSchema: SuggestTournamentModelsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
