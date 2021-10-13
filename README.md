# twytdn

> Twitter + YouTube Discord Notifier

Written in [Deno](https://deno.land). Run with Docker:

```bash
docker run --rm -v /path/to/config.json:/app/config.json:ro hizkifw/twytdn:latest
```

## Sample `config.json`

```json
{
  "webhookURL": "https://discord.com/api/webhooks/xxxx/xxxxx",
  "dbURL": "sqlite:///tmp/database.sqlite",

  "youtube": [
    {
      "name": "戌亥とこ - Inui Toko -",
      "picture": "https://content.archive.ragtag.moe/UCXRlIK3Cw_TJIQC5kSJJQMg/profile.jpg",
      "id": "UCXRlIK3Cw_TJIQC5kSJJQMg",
      "ping": "<@&1234567890>",
      "webhookURL": "(optional override, e.g. https://discord.com/api/webhooks/xxxx/xxxxx)",
    },
    {
      "name": "アンジュ・カトリーナ - Ange Katrina -",
      "picture": "https://content.archive.ragtag.moe/UCHVXbQzkl3rDfsXWo8xi2qw/profile.jpg",
      "id": "UCHVXbQzkl3rDfsXWo8xi2qw",
      "ping": "<@&1234567890>"
    },
    {
      "name": "リゼ・ヘルエスタ - Lize Helesta -",
      "picture": "https://content.archive.ragtag.moe/UCZ1xuCK1kNmn5RzPYIZop3w/profile.jpg",
      "id": "UCZ1xuCK1kNmn5RzPYIZop3w",
      "ping": "<@&1234567890>"
    }
  ],
  "twitter": [
    {
      "name": "戌亥とこ - Inui Toko -",
      "picture": "https://content.archive.ragtag.moe/UCXRlIK3Cw_TJIQC5kSJJQMg/profile.jpg",
      "id": "inui_toko",
      "ping": "<@&1234567890>"
    },
    {
      "name": "アンジュ・カトリーナ - Ange Katrina -",
      "picture": "https://content.archive.ragtag.moe/UCHVXbQzkl3rDfsXWo8xi2qw/profile.jpg",
      "id": "Ange_Katrina_",
      "ping": "<@&1234567890>"
    },
    {
      "name": "リゼ・ヘルエスタ - Lize Helesta -",
      "picture": "https://content.archive.ragtag.moe/UCZ1xuCK1kNmn5RzPYIZop3w/profile.jpg",
      "id": "Lize_Helesta",
      "ping": "<@&1234567890>"
    }
  ]
}
```
