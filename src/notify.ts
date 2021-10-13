import config from './config.ts';

export type Notification = {
  avatarURL: string;
  username: string;
  content: string;
};

export const notify = (data: Notification) => {
  return fetch(config.webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'fetch (+https://ragtag.moe)',
    },
    body: JSON.stringify({
      ...data,
      avatar_url: data.avatarURL,
    }),
  });
};
