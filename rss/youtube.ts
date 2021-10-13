import { parse } from 'https://deno.land/x/xml@v1.0.3/mod.ts';
import { FeedItem } from './consume.ts';

type YouTubeVideo = FeedItem & {
  'yt:videoId': string;
  'yt:channelId': string;
  link: {
    '@href': string;
  };
  author: {
    name: string;
    uri: string;
  };
  published: string;
  updated: string;
  'media:group': {
    'media:title': string;
    'media:thumbnail': {
      '@url': string;
    };
    'media:community': {
      'media:statistics': { '@views': number };
    };
  };
};

type YouTubeRSS = {
  feed: {
    entry: YouTubeVideo[];
  };
};

const isLive = (video: YouTubeVideo) =>
  video['media:group']['media:community']['media:statistics']['@views'] > 0;

export const fetchYouTubeRSS = async (channelId: string) => {
  const response = await fetch(
    'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId
  );
  const xml = await response.text();
  const feed = parse(xml) as YouTubeRSS;
  return feed.feed.entry.filter(isLive).map((item) => ({
    ...item,
    url: item.link['@href'],
  }));
};
