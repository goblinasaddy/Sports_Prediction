'use server';

import {storage} from '@/lib/firebase';
import {ref, getBytes, getMetadata} from 'firebase/storage';

const modelFileNames: Record<string, string> = {
  'Logistic Regression': 'logistic.pkl',
  'Random Forest': 'random_forest.pkl',
  'LightGBM': 'lightgbm.pkl',
  'Neural Network': 'neural_net.pt',
};

// In-memory cache for downloaded files
const fileCache = new Map<string, ArrayBuffer>();
const metadataCache = new Map<string, any>();

async function getFileWithCache(filePath: string): Promise<ArrayBuffer> {
  if (fileCache.has(filePath)) {
    return fileCache.get(filePath)!;
  }
  const fileRef = ref(storage, filePath);
  const bytes = await getBytes(fileRef);
  fileCache.set(filePath, bytes);
  return bytes;
}

export async function getModelFile(modelName: string): Promise<ArrayBuffer> {
  const fileName = modelFileNames[modelName];
  if (!fileName) {
    throw new Error(`Model file not found for: ${modelName}`);
  }
  try {
    return await getFileWithCache(fileName);
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      throw new Error(`The model file '${fileName}' is missing from Firebase Storage.`);
    }
    throw error;
  }
}

export async function getModelMetrics(): Promise<any> {
  const filePath = 'model_metrics.json';
  try {
    const bytes = await getFileWithCache(filePath);
    const jsonString = new TextDecoder().decode(bytes);
    return JSON.parse(jsonString);
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      throw new Error(`The metrics file '${filePath}' is missing from Firebase Storage.`);
    }
    throw error;
  }
}
