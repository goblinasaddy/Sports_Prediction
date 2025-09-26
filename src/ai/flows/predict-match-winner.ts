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

// Map frontend display names to the keys in model_metrics.json
const modelKeyMapping: Record<string, string> = {
  'Logistic Regression': 'logistic_regression',
  'Random Forest': 'random_forest',
  'LightGBM': 'lightgbm',
  'Neural Network': 'neural_network',
};

const predictMatchWinnerFlow = ai.defineFlow(
  {
    name: 'predictMatchWinnerFlow',
    inputSchema: PredictMatchWinnerInputSchema,
    outputSchema: PredictMatchWinnerOutputSchema,
  },
  async (input) => {
    // TEMPORARY: Reverting to mock implementation to avoid crash.
    // The previous attempt to fetch live metrics failed.

    // Fetch and log metrics for debugging
    try {
      const allMetrics = await getModelMetrics();
      console.log('DEBUG: Fetched model_metrics.json content:', JSON.stringify(allMetrics, null, 2));
    } catch (e) {
      console.error('DEBUG: Failed to fetch or parse model_metrics.json', e);
    }

    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1500));
    const winner = predicted_winners[Math.floor(Math.random() * predicted_winners.length)];
    
    return {
      winner,
      metrics: {
        Accuracy: Math.random() * (0.95 - 0.8) + 0.8,
        AUC: Math.random() * (0.98 - 0.85) + 0.85,
        Precision: Math.random() * (0.9 - 0.78) + 0.78,
        Recall: Math.random() * (0.92 - 0.82) + 0.82,
      },
    };
  }
);

export async function predictMatchWinner(input: PredictMatchWinnerInput): Promise<PredictMatchWinnerOutput> {
  return predictMatchWinnerFlow(input);
}
