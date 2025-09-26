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
import { getModelFile, getModelMetrics } from '@/services/storage';

const PredictMatchWinnerInputSchema = z.object({
  tournament: z.string().describe('The name of the tournament.'),
  model: z
    .enum(['Logistic Regression', 'Random Forest', 'LightGBM', 'Neural Network'])
    .describe('The prediction model to use.'),
});
export type PredictMatchWinnerInput = z.infer<typeof PredictMatchWinnerInputSchema>;

const PredictMatchWinnerOutputSchema = z.object({
  winner: z.string().describe('The predicted winner of the match.'),
  metrics: z.object({
    Accuracy: z.number().describe('The accuracy of the selected model.'),
    AUC: z.number().describe('The AUC of the selected model.'),
    Precision: z.number().describe('The precision of the selected model.'),
    Recall: z.number().describe('The recall of the selected model.'),
  }),
});
export type PredictMatchWinnerOutput = z.infer<typeof PredictMatchWinnerOutputSchema>;

// Placeholder for predicted winners
const predicted_winners = ["Carlos Alcaraz", "Jannik Sinner", "Novak Djokovic", "Alexander Zverev", "Daniil Medvedev"];

const predictMatchWinnerFlow = ai.defineFlow(
  {
    name: 'predictMatchWinnerFlow',
    inputSchema: PredictMatchWinnerInputSchema,
    outputSchema: PredictMatchWinnerOutputSchema,
  },
  async (input) => {
    // Fetch model and metrics from Firebase Storage
    const [modelFile, allMetrics] = await Promise.all([
      getModelFile(input.model),
      getModelMetrics(),
    ]);

    // Simulate running prediction with the fetched model (actual prediction logic not implemented).
    // The following is placeholder logic. A real implementation would involve
    // using a Python runtime or similar to execute the model.
    await new Promise(resolve => setTimeout(resolve, 1500));
    const winner = predicted_winners[Math.floor(Math.random() * predicted_winners.length)];
    
    // Retrieve metrics for the selected model
    const metrics = allMetrics[input.model];
    if (!metrics) {
      throw new Error(`Metrics not found for model: ${input.model}`);
    }

    return {
      winner,
      metrics,
    };
  }
);

export async function predictMatchWinner(input: PredictMatchWinnerInput): Promise<PredictMatchWinnerOutput> {
  return predictMatchWinnerFlow(input);
}
