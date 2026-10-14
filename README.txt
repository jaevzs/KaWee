KaWee Mobile + Reconnect Fix v7

Included:
- Mobile WebSocket auto-reconnect with exponential backoff.
- Brief disconnect grace period: a player can reconnect to the same in-memory room for 30 seconds and keep their progress.
- Login token no longer gets invalidated just because the WebSocket closes.
- Login token is stored in localStorage so browser refresh does not erase the client-side session.
- Username registration is case-insensitive and rejects duplicates (e.g. JaeVzs and jaevzs).
- Asteroids have deterministic irregular silhouettes, individually placed craters, surface ridges, and varied shading.
- Touch controls explicitly disable browser touch gestures while holding the flight button.

IMPORTANT ACCOUNT STORAGE NOTE FOR RENDER:
This code can preserve accounts only if its accounts.json file is stored on persistent storage. Render's default filesystem is ephemeral, so redeploys/restarts can erase JSON-file accounts. On a Render service with a persistent disk, attach the disk at /var/data and set environment variable DATA_DIR=/var/data. If your plan does not support persistent disks, use a managed database (for example Render Postgres/Key Value) or another external persistent database; a code-only ZIP cannot enable persistence on Render by itself.

Deployment:
1. Replace the repository files with the contents of this ZIP.
2. Ensure package.json installs ws and start command is `node server.js`.
3. Configure persistent account storage as described above before relying on user accounts.
4. Deploy, then test two devices: register a new unique username, refresh, log in again, and briefly switch network off/on while in a room.

Checks performed before packaging: JavaScript syntax and ZIP integrity. Live testing on Render/physical mobile devices is still required.
