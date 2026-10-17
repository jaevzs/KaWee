KaWee deployment fix — October 2026

IMPORTANT FIX
The Render logs showed `ReferenceError: PLATFORM_X is not defined` inside the WebSocket answer handler. That exception occurs after a player answers correctly and can crash the server process, causing a disconnect / Render 502. This build defines the shared PLATFORM_X and PLATFORM_Y asteroid coordinate arrays in server.js, matching public/index.html.

Files are arranged at the ZIP root for deployment:
- server.js
- package.json
- public/index.html
- public/kawee-logo.png

Deploy steps:
1. Replace these files in the ROOT of your GitHub repository (do not put them inside an extra folder).
2. Commit and push to the branch connected to Render.
3. Wait for Render to redeploy, then inspect logs. `ReferenceError: PLATFORM_X is not defined` should no longer appear.
4. Test answering a question, then hold/release the jetpack and verify a landing before checking multiplayer.

Validation: `node --check server.js` passes. This fixes the exact crash shown in the supplied Render log; a live Render test was not available here.
