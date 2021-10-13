import config, { Subscription } from './config.ts';
import { fetchYouTubeRSS } from './rss/youtube.ts';
import { fetchTwitterRSS } from './rss/twitter.ts';
import { notify } from './notify.ts';
import { consume, FeedItem } from './rss/consume.ts';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const update = async (
  fetcher: (id: string) => Promise<FeedItem[]>,
  list: Subscription[]
) => {
  for (const subscription of list) {
    try {
      const items = await consume(fetcher(subscription.id));
      if (items.length === 0) continue;

      if (items.length > 10) {
        console.log('Skipping first update for', subscription.name);
        continue;
      }

      const urls = items.map((item) => item.url).join('\n');
      console.log('Found', items.length, 'new items for', subscription.name);
      console.log(urls);

      await notify({
        username: subscription.name,
        avatarURL: subscription.picture,
        content: subscription.ping + '\n' + urls,
      });
    } catch (ex) {
      console.error(ex);
    }
  }
};

const run = async () => {
  console.log(
    'VTNotify! Watching',
    config.youtube.length,
    'YouTube channels and',
    config.twitter.length,
    'Twitter accounts'
  );
  while (true) {
    update(fetchYouTubeRSS, config.youtube);
    update(fetchTwitterRSS, config.twitter);
    await sleep(10000);
  }
};

run();
