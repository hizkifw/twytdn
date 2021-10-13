import { parse } from 'https://deno.land/x/xml@v1.0.3/mod.ts';
import { FeedItem } from './consume.ts';

type NitterTweet = FeedItem & {
  'dc:creator': string;
  description: string;
  pubDate: string;
  guid: string;
  link: string;
};

type NitterRSS = {
  rss: {
    '@version': number;
    channel: {
      title: string;
      link: string;
      description: string;
      ttl: number;
      image: {
        title: string;
        link: string;
        url: string;
        width: number;
        height: number;
      };
      item: NitterTweet[];
    };
  };
};

export const fetchTwitterRSS = async (username: string) => {
  const response = await fetch('https://nitter.net/' + username + '/rss');
  const xml = await response.text();
  const feed = parse(xml) as NitterRSS;
  return feed.rss.channel.item.map((tweet) => ({
    ...tweet,
    id: tweet.guid,
    url: tweet.link.replace('nitter.net', 'twitter.com').replace('#m', ''),
  }));
};
