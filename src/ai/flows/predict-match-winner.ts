'use server';

/**
 * @fileOverview Predicts the winner of a tennis match based on selected tournament and model.
 *
 * - predictMatchWinner - A function that handles the prediction process.
 * - PredictMatchWinnerInput - The input type for the predictMatchWinner function.
 * - PredictMatchWinnerOutput - The return type for the predictMatchWinner function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictMatchWinnerInputSchema = z.object({
  tournament: z.string().describe('The name of the tournament.'),
  model: z
    .enum(['Logistic Regression', 'Random Forest', 'LightGBM', 'Neural Network'])
    .describe('The prediction model to use.'),
});
export type PredictMatchWinnerInput = z.infer<typeof PredictMatchWinnerInputSchema>;

const PredictMatchWinnerOutputSchema = z.object({
  predictedWinner: z.string().describe('The predicted winner of the match.'),
  accuracy: z.number().describe('The accuracy of the selected model.'),
  auc: z.number().describe('The AUC of the selected model.'),
  precision: z.number().describe('The precision of the selected model.'),
  recall: z.number().describe('The recall of the selected model.'),
});
export type PredictMatchWinnerOutput = z.infer<typeof PredictMatchWinnerOutputSchema>;

export async function predictMatchWinner(input: PredictMatchWinnerInput): Promise<PredictMatchWinnerOutput> {
  return predictMatchWinnerFlow(input);
}

const predictMatchWinnerPrompt = ai.definePrompt({
  name: 'predictMatchWinnerPrompt',
  input: {schema: PredictMatchWinnerInputSchema},
  output: {schema: PredictMatchWinnerOutputSchema},
  prompt: `Given the selected tournament: {{{tournament}}} and prediction model: {{{model}}}, predict the winner of the tennis match. Also, provide the accuracy, AUC, precision, and recall of the model.

Return the results in JSON format.`,
});

const predictMatchWinnerFlow = ai.defineFlow(
  {
    name: 'predictMatchWinnerFlow',
    inputSchema: PredictMatchWinnerInputSchema,
    outputSchema: PredictMatchWinnerOutputSchema,
  },
  async input => {
    const {output} = await predictMatchWinnerPrompt(input);
    return output!;
  }
);
