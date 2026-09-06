# 🎹 Auto Piano 88 Key Bot Loader

A Tampermonkey userscript that automatically loads and runs the **Auto Piano 88 Key Bot** on [PianoVerse](https://pianoverse.net/).

The loader provides:

- ⚡ Automatic bot loading from GitHub
- 💾 10-minute local caching
- 🔄 Automatic updates when the cache expires
- 🌐 Network error and timeout handling
- 🛡️ Fallback to an expired cache if the server is unavailable
- 📦 No need to manually download the bot script

---

# 📋 Requirements

You need:

- A supported web browser
- [Tampermonkey](https://www.tampermonkey.net/)
- Access to PianoVerse

The loader currently works on:

```text
https://pianoverse.net/*
https://www.pianoverse.net/*
```

---

# 1. Install Tampermonkey

First, install **Tampermonkey** for your browser.

Visit:

https://www.tampermonkey.net/

Choose your browser and install the extension.

After installation, make sure Tampermonkey is enabled in your browser's Extensions menu.

---

# 2. Create a New Userscript

Open Tampermonkey.

Go to:

```text
Dashboard
```

Then click:

```text
+
```

or:

```text
Create a new script
```

Tampermonkey will open the userscript editor.

---

# 3. Remove the Default Code

Tampermonkey normally creates a sample userscript.

For example:

```javascript
// ==UserScript==
// @name         New Userscript
// ...
// ==/UserScript==

// Your code here...
```

Delete **all** of the default code.

---

# 4. Paste the Loader

Copy the complete **Auto Piano 88 Key Bot Loader** from this repository and paste it into the Tampermonkey editor.

The script should start with:

```javascript
// ==UserScript==
// @name         Auto Piano 88 Key Bot Loader
```

and end with:

```javascript
})();
```

Make sure this permission is also included:

```javascript
// @grant        GM_xmlhttpRequest
```

The loader uses `GM_xmlhttpRequest()` to download the bot from GitHub.

---

# 5. Save the Userscript

After pasting the code, press:

```text
Ctrl + S
```

or use:

```text
File → Save
```

Then return to:

```text
Tampermonkey → Dashboard
```

You should see:

```text
Auto Piano 88 Key Bot Loader
```

Make sure the script is **enabled**.

---

# 6. Open PianoVerse

Visit:

https://pianoverse.net/

The loader will automatically run when the page matches one of its `@match` rules:

```javascript
// @match        https://pianoverse.net/*
// @match        https://www.pianoverse.net/*
```

You do **not** need to manually run the userscript.

---

# 7. How the Loader Works

When PianoVerse is opened, the loader first checks its local cache.

The process is:

```text
Open PianoVerse
       ↓
Tampermonkey runs the Loader
       ↓
Check local cache
       ↓
Is the cache still valid?
       ↙                ↘
     YES                 NO
      ↓                   ↓
Run cached script     Download from GitHub
                          ↓
                     Save to cache
                          ↓
                       Run bot
```

---

# 8. First Launch

On the first launch, there is no cached script.

The loader downloads:

```text
https://raw.githubusercontent.com/noname-new/other_code/refs/heads/main/auto_piano_88key_bot.js
```

The process is:

```text
GitHub
  ↓
auto_piano_88key_bot.js
  ↓
Save to localStorage
  ↓
Execute the script
```

If the download succeeds, the browser console will show:

```text
[AUTO PIANO] Loaded successfully from:
https://raw.githubusercontent.com/noname-new/other_code/refs/heads/main/auto_piano_88key_bot.js
```

---

# 9. Cache System

The loader stores the downloaded script in `localStorage`.

It uses these keys:

```javascript
const CACHE_KEY = "AUTO_PIANO_88KEY_CACHE";
const CACHE_TIME_KEY = "AUTO_PIANO_88KEY_CACHE_TIME";
```

The cache duration is:

```javascript
const CACHE_DURATION = 10 * 60 * 1000;
```

This means the cache lasts for:

```text
10 minutes
```

### Example

```text
10:00
↓
Download bot from GitHub
↓
Save to cache

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
Download the latest version from GitHub
```

---

# 10. Why Use a Cache?

Without caching, the bot would need to be downloaded from GitHub every time PianoVerse is opened.

The cache helps:

- ⚡ Reduce loading time
- 📉 Reduce unnecessary GitHub requests
- 🌐 Allow the bot to continue working when GitHub is temporarily unavailable
- 🔄 Still receive updates automatically after the cache expires

---

# 11. Network Error Handling

The loader handles several types of request failures.

If the GitHub request fails because of a network error, the loader will try the next URL in the `URLS` array.

The current configuration contains:

```javascript
const URLS = [
    "https://raw.githubusercontent.com/noname-new/other_code/refs/heads/main/auto_piano_88key_bot.js",
];
```

If all URLs fail, the loader attempts to use the existing cache.

---

# 12. Expired Cache Fallback

One of the loader's features is the ability to use an **expired cache** when the server cannot be reached.

For example:

```text
Cache expired
      ↓
Try to download latest version
      ↓
GitHub unavailable
      ↓
Use old cached version
```

The loader does this with:

```javascript
loadFromCache(true)
```

The console will show:

```text
[AUTO PIANO] Loaded from expired cache.
```

This means the bot is running from an older cached version.

---

# 13. Checking the Loader

If you want to check whether the loader is running, open Developer Tools.

Press:

```text
F12
```

Then select:

```text
Console
```

You may see messages such as:

```text
[AUTO PIANO] Loaded successfully from: ...
```

or:

```text
[AUTO PIANO] Loaded from cache.
```

or:

```text
[AUTO PIANO] Loaded from expired cache.
```

---

# 14. If the Loader Does Not Run

## Check 1 — Tampermonkey

Open:

```text
Extensions
→ Tampermonkey
```

Make sure Tampermonkey is enabled.

---

## Check 2 — Userscript Status

Open:

```text
Tampermonkey
→ Dashboard
```

Find:

```text
Auto Piano 88 Key Bot Loader
```

Make sure it is enabled.

---

## Check 3 — Website

The loader only runs on PianoVerse:

```text
https://pianoverse.net/
```

or:

```text
https://www.pianoverse.net/
```

It will not run on unrelated websites.

---

## Check 4 — Developer Console

Press:

```text
F12
```

and open:

```text
Console
```

Look for JavaScript errors or `[AUTO PIANO]` messages.

---

# 15. If GitHub Cannot Be Reached

The loader validates the response before executing it.

The response must:

- Have HTTP status `200`
- Contain more than 100 characters
- Not start with `<`

This helps prevent the loader from accidentally executing an HTML error page instead of JavaScript.

If the downloaded data is invalid, the loader will try the next URL.

---

# 16. Force a Fresh Download

Normally, the loader waits until the 10-minute cache expires before downloading the latest version.

If you want to force a fresh download immediately, open:

```text
F12 → Console
```

and run:

```javascript
localStorage.removeItem("AUTO_PIANO_88KEY_CACHE");
localStorage.removeItem("AUTO_PIANO_88KEY_CACHE_TIME");
```

Then reload PianoVerse:

```text
Ctrl + R
```

The loader will download the bot from GitHub again.

---

# 17. Updating the Bot

You do **not** need to reinstall the Tampermonkey loader whenever the bot is updated.

Simply update:

```text
auto_piano_88key_bot.js
```

in the GitHub repository.

Once the existing 10-minute cache expires, the loader will automatically download the updated version.

The process is:

```text
Update auto_piano_88key_bot.js
             ↓
           GitHub
             ↓
      Cache expires
             ↓
      Loader downloads
             ↓
       Save new cache
             ↓
        Run new bot
```

---

# 18. Changing the Bot URL

The current bot URL is defined here:

```javascript
const URLS = [
    "https://raw.githubusercontent.com/noname-new/other_code/refs/heads/main/auto_piano_88key_bot.js",
];
```

If the bot is moved to another location, update this URL.

You can also add multiple URLs:

```javascript
const URLS = [
    "https://example.com/bot.js",
    "https://example.com/backup-bot.js",
];
```

The loader will try them in order.

---

# 19. Project Structure

The project can be understood as:

```text
GitHub Repository
│
├── auto_piano_88key_bot.js
│       │
│       │  Main bot
│       ▼
│
└── README.md
        │
        │  Documentation
        ▼

Tampermonkey
│
└── Auto Piano 88 Key Bot Loader
        │
        ├── Check cache
        │
        ├── Valid cache
        │      └── Run cached bot
        │
        └── Expired/missing cache
               │
               └── Download bot
                       │
                       ├── Save cache
                       └── Run bot
```

---

# 20. Quick Start

Already have Tampermonkey installed?

Just follow these steps:

```text
1. Open Tampermonkey
        ↓
2. Create a new userscript
        ↓
3. Paste the Auto Piano 88 Key Bot Loader
        ↓
4. Save with Ctrl + S
        ↓
5. Enable the userscript
        ↓
6. Open pianoverse.net
        ↓
7. The loader automatically downloads the bot
        ↓
8. The bot is executed automatically
```

---

# ⚠️ Troubleshooting

### `Network error`

Check your Internet connection and reload PianoVerse.

### `Request timeout`

The GitHub server did not respond within the configured timeout.

Try reloading the page.

### `Server returned invalid data`

The downloaded response did not pass the loader's validation checks.

Check whether the bot URL is correct.

### `Unable to load script from server or cache`

The loader could not download the bot and no usable cache was available.

Check your Internet connection and the GitHub URL.

### The loader loads successfully, but the bot does not work

This means the loader itself is working, but there may be an error inside:

```text
auto_piano_88key_bot.js
```

Open:

```text
F12 → Console
```

and check for JavaScript errors.

---

# 🔗 Links

- **PianoVerse:** https://pianoverse.net/
- **GitHub:** https://github.com/noname-new
- **Bot source:** https://github.com/noname-new/other_code/blob/main/auto_piano_88key_bot.js
- **Tampermonkey:** https://www.tampermonkey.net/

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ Star!