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
  winner: z.string().describe('The predicted winner of the match.'),
  metrics: z.object({
    Accuracy: z.number().describe('The accuracy of the selected model.'),
    AUC: z.number().describe('The AUC of the selected model.'),
    Precision: z.number().describe('The precision of the selected model.'),
    Recall: z.number().describe('The recall of the selected model.'),
  }),
});
export type PredictMatchWinnerOutput = z.infer<typeof PredictMatchWinnerOutputSchema>;

// Placeholder for fetching model metrics from a source like Firebase Storage
const model_metrics: Record<string, any> = {
  "Logistic Regression": { "Accuracy": 0.87, "AUC": 0.91, "Precision": 0.85, "Recall": 0.88 },
  "Random Forest": { "Accuracy": 0.89, "AUC": 0.93, "Precision": 0.88, "Recall": 0.90 },
  "LightGBM": { "Accuracy": 0.91, "AUC": 0.95, "Precision": 0.90, "Recall": 0.92 },
  "Neural Network": { "Accuracy": 0.88, "AUC": 0.92, "Precision": 0.86, "Recall": 0.89 },
};

// Placeholder for predicted winners
const predicted_winners = ["Carlos Alcaraz", "Jannik Sinner", "Novak Djokovic", "Alexander Zverev", "Daniil Medvedev"];

const predictMatchWinnerFlow = ai.defineFlow(
  {
    name: 'predictMatchWinnerFlow',
    inputSchema: PredictMatchWinnerInputSchema,
    outputSchema: PredictMatchWinnerOutputSchema,
  },
  async (input) => {
    // Simulate fetching model and metrics
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const metrics = model_metrics[input.model];
    if (!metrics) {
      throw new Error(`Metrics not found for model: ${input.model}`);
    }

    // Simulate running prediction
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
