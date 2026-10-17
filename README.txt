KaWee — account registration crash fix

ROOT FILES
- server.js
- package.json
- public/index.html
- public/kawee-logo.png

FIX
The Render log showed `ReferenceError: questView is not defined` during POST /api/register. This caused the account endpoint to crash after creating/saving an account, leaving the browser with an empty response and the JSON parsing error. This version restores the missing daily-quest helpers (questView, ensureDaily, completeQuest, addStars) used by registration, login, /api/me, and WebSocket messages.

DEPLOY
1. Replace the repository files with these files at the repository root (do not leave them inside an extra folder).
2. Render Root Directory: blank (if repo root contains server.js).
3. Build command: npm install
4. Start command: npm start (or node server.js)
5. Redeploy and inspect logs for `KaWee running on` and no `questView is not defined` error.

IMPORTANT
The server saves accounts in its local data directory. On hosts with ephemeral disks, account persistence across restarts/redeploys is not guaranteed unless a persistent disk or external database is configured. This ZIP fixes the specific registration crash shown in the provided Render logs; multiplayer should still be tested with two accounts/devices.
