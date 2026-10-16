KaWee — mobile landing and connection diagnostics patch

This ZIP is based on the KaWee package you uploaded. It keeps the existing game, logo, help screen, quiz, stars, and account code.

Changes in this patch:
- Fixed mobile character positioning: the character was being scaled twice because CSS zoom scaled its position as well as its size. Asteroids and player coordinates now use the same world scale.
- Added server-side WebSocket diagnostics. Render Logs will now show rejected authentication connections and WebSocket close codes/reasons, which were not logged before.
- Kept the existing reconnect behavior and account files; this patch does not erase accounts.

Files:
- server.js
- package.json
- public/index.html
- public/kawee-logo.png

Deploy safely:
1. Back up your current GitHub files first.
2. Replace server.js and public/index.html with the versions from this ZIP. Keep package.json and public/kawee-logo.png in their existing locations.
3. Commit to the main branch and wait for Render to show Live.
4. Reproduce the disconnect on PC and mobile, then check Render Logs for lines starting with [ws]. Share those lines if the issue persists.

Render settings for this repository layout:
- Root Directory: blank
- Build Command: npm install
- Start Command: node server.js

Important limitation:
The mobile double-scaling bug is corrected in the code. The disconnect issue needs the new [ws] log lines to distinguish a dropped network socket from a rejected/invalid login token. If Render restarts and its local account file is lost, account/token persistence must be configured separately; this ZIP does not claim to configure a Render persistent disk or external database.
