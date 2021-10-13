import config from './config.ts';

export type Notification = {
  avatarURL: string;
  username: string;
  content: string;
  webhookURL?: string;
};

export const notify = (data: Notification) => {
  return fetch(data.webhookURL || config.webhookURL, {
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
