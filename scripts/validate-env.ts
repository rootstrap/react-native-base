import fs from 'fs';
import path from 'path';

import Environment from '../src/@types/env';

const APP_ENV = process.env.APP_ENV ?? 'dev';
const isDev = APP_ENV === 'dev';
const envFileName = isDev ? '.env' : `.env.${APP_ENV}`;
const envFile = path.join(__dirname, `../${envFileName}`);

(() => {
  const fileExists = fs.existsSync(envFile);
  if (!fileExists) {
    console.error(
      `❌ Missing ${envFileName} file. Make sure you have ${envFileName} file in the root directory.`,
    );
    throw new Error(`Missing ${envFileName} file. Check terminal for more details`);
  }
  const content = fs.readFileSync(envFile, 'utf8');
  const envVars = content.split('\n');

  const jsonObject: { [key: string]: string } = {};

  envVars.forEach((envVar: string) => {
    if (envVar === '') {
      return;
    }
    const [key, value] = envVar.split('=');

    jsonObject[key] = value;
  });

  const parsed = Environment.safeParse(jsonObject);
  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
      `\n❌ Missing variables in ${envFileName} file, Make sure all required variables are defined in the ${envFileName} file.`,
    );
    throw new Error('Invalid environment variables, Check terminal for more details ');
  }
})();

export default {};
