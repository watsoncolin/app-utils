// Thin Runware image-generation client shared by the icon and screenshot tools.
// Reads RUNWARE_API_KEY + DEFAULT_IMAGE_MODEL from .env (gitignored).
import 'dotenv/config';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const API = 'https://api.runware.ai/v1';

export function requireKey() {
  const key = process.env.RUNWARE_API_KEY;
  if (!key) throw new Error('RUNWARE_API_KEY missing — copy .env.example to .env and set it.');
  return key;
}

/**
 * Generate one image and return raw bytes (Buffer).
 * @param {{prompt:string, width?:number, height?:number, model?:string, steps?:number, format?:string}} opts
 */
export async function generateImage(opts) {
  const key = requireKey();
  const {
    prompt,
    width = 1024,
    height = 1024,
    model = process.env.DEFAULT_IMAGE_MODEL ?? 'runware:400@2',
    steps = 30,
    format = 'PNG',
  } = opts;

  const body = [{
    taskType: 'imageInference',
    taskUUID: randomUUID(),
    positivePrompt: prompt,
    model, width, height, steps,
    numberResults: 1,
    outputType: 'base64Data',
    outputFormat: format,
  }];

  const res = await axios.post(API, body, {
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    timeout: 300_000,
  });
  const r = res.data?.data?.[0];
  if (r?.imageBase64Data) return Buffer.from(r.imageBase64Data, 'base64');
  if (r?.imageURL) {
    const dl = await axios.get(r.imageURL, { responseType: 'arraybuffer', timeout: 60_000 });
    return Buffer.from(dl.data);
  }
  throw new Error('Runware returned no image');
}

/** Generate and write to a path (creating parent dirs). */
export async function generateToFile(path, opts) {
  const bytes = await generateImage(opts);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, bytes);
  return bytes.length;
}
