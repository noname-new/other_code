# Auto Piano 88 Key Bot Loader

> [!WARNING]
>
> ## Known Issue: Key Mapping Bug
>
> The **88 Key** and **61 Key** versions currently have a key-mapping bug.
>
> Despite their names, **both versions currently only play 57 keys in practice**.
>
> | Version | Intended |  Actual |
> | ------- | -------: | ------: |
> | 88 Key  |  88 keys | 57 keys |
> | 61 Key  |  61 keys | 57 keys |
>
> This is a **known bug** and is currently being worked on.
>
> The names **"88 Key"** and **"61 Key"** refer to their intended keyboard ranges. The current implementation does **not** correctly support the full number of keys.
>
> **Please keep this limitation in mind before using the bot.**

---

A Tampermonkey userscript that automatically loads and runs the Auto Piano 88 Key Bot on [PianoVerse](https://pianoverse.net/).

## Features

* Automatically loads the bot from GitHub
* Uses a 10-minute local cache
* Automatically downloads the latest version after the cache expires
* Handles network errors and request timeouts
* Falls back to an expired cache if the server is unavailable
* No need to manually download the bot

## Requirements

* A supported web browser
* [Tampermonkey](https://www.tampermonkey.net/)
* Access to [PianoVerse](https://pianoverse.net/)

## Supported Website

* [PianoVerse](https://pianoverse.net/)
* [PianoVerse](https://www.pianoverse.net/)

---

# Installation

## 1. Install Tampermonkey

Go to:

https://www.tampermonkey.net/

Install Tampermonkey for your browser.

After installation, make sure Tampermonkey is enabled.

## 2. Create a New Userscript

Open Tampermonkey.

Go to:

**Dashboard → Create a new script**

Tampermonkey will open the userscript editor.

## 3. Remove the Default Code

Delete all of the default code created by Tampermonkey.

## 4. Paste the Loader

Copy the complete **Auto Piano 88 Key Bot Loader** from this repository and paste it into the Tampermonkey editor.

Make sure the script contains:

```javascript
// @grant        GM_xmlhttpRequest
```

This permission is required because the loader uses `GM_xmlhttpRequest()` to download the bot from GitHub.

## 5. Save the Script

Press:

```text
Ctrl + S
```

Then return to the Tampermonkey Dashboard.

Find:

**Auto Piano 88 Key Bot Loader**

Make sure the script is enabled.

## 6. Open PianoVerse

Go to:

https://pianoverse.net/

The loader will automatically run when the website matches its `@match` rules.

You do not need to manually run the userscript.

---

# How It Works

When PianoVerse is opened, the loader first checks the local cache.

If a valid cache exists:

```text
Open PianoVerse
      ↓
Tampermonkey runs the loader
      ↓
Check cache
      ↓
Cache is valid
      ↓
Load cached bot
      ↓
Execute bot
```

If there is no valid cache:

```text
Open PianoVerse
      ↓
Tampermonkey runs the loader
      ↓
Check cache
      ↓
Cache is missing or expired
      ↓
Download bot from GitHub
      ↓
Save bot to localStorage
      ↓
Execute bot
```

# Bot Source

The loader downloads the bot from:

```text
https://raw.githubusercontent.com/noname-new/other_code/refs/heads/main/auto_piano_88key_bot.js
```

The source file is:

[auto_piano_88key_bot.js](https://github.com/noname-new/other_code/blob/main/auto_piano_88key_bot.js)

# Cache System

The loader stores the downloaded bot in `localStorage`.

The cache duration is:

```text
10 minutes
```

For example:

```text
10:00
↓
Download bot
↓
Save cache

10:05
↓
Open PianoVerse
↓
Cache is still valid
↓
Run cached bot
```

After the cache expires:

```text
10:00
↓
Download bot
↓
10:15
↓
Cache expired
↓
Download the latest version
```

The cache helps reduce unnecessary requests and makes subsequent loads faster.

# Updating the Bot

You do not need to reinstall the Tampermonkey loader whenever the bot is updated.

Simply update:

```text
auto_piano_88key_bot.js
```

in the GitHub repository.

After the current 10-minute cache expires, the loader will automatically download the updated version.

The update process is:

```text
Update bot on GitHub
        ↓
Cache expires
        ↓
Loader downloads new version
        ↓
Save new cache
        ↓
Run new bot
```

# Force a Fresh Download

If you want to download the latest version immediately, open Developer Tools.

Press:

```text
F12
```

Open the **Console** tab and run:

```javascript
localStorage.removeItem("AUTO_PIANO_88KEY_CACHE");
localStorage.removeItem("AUTO_PIANO_88KEY_CACHE_TIME");
```

Then reload PianoVerse:

```text
Ctrl + R
```

The loader will download the bot again from GitHub.

# Network Error Handling

If the GitHub request fails because of a network error or timeout, the loader will try the next URL in the `URLS` array.

If all download attempts fail, the loader will try to use the existing cache.

If an expired cache is used, the console will show:

```text
[AUTO PIANO] Loaded from expired cache.
```

This allows the bot to continue working with an older version when the latest version cannot be downloaded.

# Troubleshooting

## The Loader Does Not Run

Check that:

1. Tampermonkey is installed and enabled.
2. The userscript is enabled in the Tampermonkey Dashboard.
3. You are using PianoVerse.
4. The userscript contains the correct `@match` rules.

The supported URLs are:

```text
https://pianoverse.net/*
https://www.pianoverse.net/*
```

## Network Error

Check your Internet connection and reload the page.

## Request Timeout

The GitHub request took too long.

Try reloading the page.

## Unable to Load Script From Server or Cache

The loader could not download the bot and no usable cache was available.

Check your Internet connection and the bot URL.

## The Loader Works but the Bot Does Not

The problem may be inside:

```text
auto_piano_88key_bot.js
```

Open Developer Tools with `F12` and check the **Console** for JavaScript errors.

# Console Messages

The loader may display messages such as:

```text
[AUTO PIANO] Loaded successfully from:
```

```text
[AUTO PIANO] Loaded from cache.
```

```text
[AUTO PIANO] Loaded from expired cache.
```

```text
[AUTO PIANO] Network error.
```

```text
[AUTO PIANO] Request timeout.
```

```text
[AUTO PIANO] Server returned invalid data.
```

# Project Structure

```text
GitHub Repository
│
├── auto_piano_88key_bot.js
│   └── Main bot
│
└── README.md
    └── Documentation

Tampermonkey
│
└── Auto Piano 88 Key Bot Loader
    │
    ├── Check cache
    │
    ├── Valid cache
    │   └── Run cached bot
    │
    └── Missing/expired cache
        │
        └── Download bot
            │
            ├── Save cache
            └── Run bot
```

# Links

* [PianoVerse](https://pianoverse.net/)
* [GitHub](https://github.com/noname-new)
* [Bot Source](https://github.com/noname-new/other_code/blob/main/auto_piano_88key_bot.js)
* [Tampermonkey](https://www.tampermonkey.net/)

# Credits

**Auto Piano 88 Key Bot Loader**

Author: `noname`

GitHub: [noname-new](https://github.com/noname-new)
