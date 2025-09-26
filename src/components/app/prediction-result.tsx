"use client";

import type { PredictMatchWinnerOutput } from "@/ai/flows/predict-match-winner";
import { AreaChart, Crosshair, RefreshCw, Target, Trophy } from "lucide-react";

interface PredictionResultProps {
  result: PredictMatchWinnerOutput;
}

export function PredictionResult({ result }: PredictionResultProps) {
  const metrics = [
    { name: "Accuracy", value: result.accuracy, Icon: Target },
    { name: "AUC", value: result.auc, Icon: AreaChart },
    { name: "Precision", value: result.precision, Icon: Crosshair },
    { name: "Recall", value: result.recall, Icon: RefreshCw },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-muted-foreground">Predicted Winner</h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Trophy className="h-8 w-8 text-amber-400" />
          <p className="text-3xl font-bold text-primary">{result.predictedWinner}</p>
        </div>
      </div>
      
      <div>
        <h4 className="text-md mb-4 text-center font-semibold text-muted-foreground">Model Performance</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {metrics.map(({ name, value, Icon }) => (
            <div key={name} className="flex items-center space-x-3 rounded-lg border bg-card p-4 shadow-sm">
              <div className="flex-shrink-0">
                <Icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{name}</p>
                <p className="text-2xl font-bold">{(value * 100).toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
