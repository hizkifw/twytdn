import { StorageArea } from 'https://deno.land/x/kvstorage@v0.4.3/sqlite.ts';
import config from '../config.ts';

export type FeedItem = {
  id: string;
  url: string;
  title: string;
};

const kv = new StorageArea('kv', { url: config.dbURL });

const kvCreate = async (id: string) => {
  try {
    if (typeof (await kv.get(id)) === 'undefined') {
      await kv.set(id, {
        createdAt: Date.now(),
      });
      return true;
    }
  } catch (ex) {
    console.error(ex);
  }
  return false;
};

export const consume = async <T extends FeedItem>(
  fetchres: Promise<T[]> | T[]
) => {
  const valid: T[] = [];
  for (const item of await fetchres)
    if (await kvCreate(item.id)) valid.push(item);
  return valid;
};
