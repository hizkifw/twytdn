import { assert } from 'https://deno.land/std@0.111.0/testing/asserts.ts';

export type Subscription = {
  name: string;
  picture: string;
  id: string;
  ping: string;
};

export type Config = {
  webhookURL: string;
  dbURL: `${string}://${string}`;
  youtube: Subscription[];
  twitter: Subscription[];
};

export default ((): Config => {
  const getConfig = (): Config => {
    try {
      return JSON.parse(Deno.env.get('CONFIG') || '');
    } catch (_) {
      console.warn('Error reading config from environment');
    }

    try {
      return JSON.parse(Deno.readTextFileSync('config.json'));
    } catch (_) {
      console.warn('Error reading config.json');
    }

    throw new Error('No config');
  };

  // Validate config
  const config = getConfig();
  assert(typeof config === 'object');
  assert(typeof config.dbURL === 'string');
  assert(typeof config.webhookURL === 'string');
  assert(Array.isArray(config.youtube));
  assert(Array.isArray(config.twitter));

  return config;
})();
