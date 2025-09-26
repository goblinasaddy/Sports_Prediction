"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { PREDICTION_MODELS, TOURNAMENTS } from "@/lib/constants";
import { predictMatchWinner, type PredictMatchWinnerOutput } from "@/ai/flows/predict-match-winner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { TennisBallIcon } from "./icons";
import { PredictionResult } from "./prediction-result";

const formSchema = z.object({
  tournament: z.string().min(1, { message: "Please select a tournament." }),
  model: z.enum(PREDICTION_MODELS, {
    errorMap: () => ({ message: "Please select a prediction model." }),
  }),
});

export function PredictionForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictMatchWinnerOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tournament: "",
      model: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictMatchWinner(values);
      setPrediction(result);
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "Prediction Failed",
        description: "An error occurred while fetching the prediction. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg shadow-xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3">
          <TennisBallIcon className="h-10 w-10 text-primary" />
          <CardTitle className="text-4xl font-headline font-bold">MatchPoint Predictor</CardTitle>
        </div>
        <CardDescription className="pt-2">Select a tournament and model to predict the winner.</CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 px-6 pb-4">
            <FormField
              control={form.control}
              name="tournament"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Upcoming Tournament</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a tournament..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TOURNAMENTS.map((tournament) => (
                        <SelectItem key={tournament} value={tournament}>
                          {tournament}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Prediction Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a model..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PREDICTION_MODELS.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4 px-6 pb-6 pt-2">
            <Button type="submit" disabled={isLoading} className="w-full h-14 text-lg font-bold shadow-md hover:shadow-lg transition-shadow">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Predicting...
                </>
              ) : (
                "Predict Winner"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {prediction && (
        <div className="animate-in fade-in-50 duration-500">
          <Separator className="mb-6"/>
          <div className="px-6 pb-6">
            <PredictionResult result={prediction} />
          </div>
        </div>
      )}
    </Card>
  );
}
