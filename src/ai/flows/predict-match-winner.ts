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
    // In a real scenario, you would use the modelFile for prediction.
    // For now, we are just fetching it to demonstrate connectivity.
    const [modelFile, allMetrics] = await Promise.all([
        getModelFile(input.model),
        getModelMetrics(),
    ]);

    if (!modelFile) {
        throw new Error("Could not load model file from storage.");
    }
    
    const metrics = allMetrics[input.model];
    if (!metrics) {
      throw new Error(`Metrics not found for model: ${input.model}`);
    }

    // Simulate running prediction
    await new Promise(resolve => setTimeout(resolve, 1500));
    const winner = predicted_winners[Math.floor(Math.random() * predicted_winners.length)];
    
    return {
      winner,
      metrics
    };
  }
);

export async function predictMatchWinner(input: PredictMatchWinnerInput): Promise<PredictMatchWinnerOutput> {
  return predictMatchWinnerFlow(input);
}
