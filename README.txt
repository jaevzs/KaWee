KAWEE v3.0 — ACCOUNT + MOBILE FLIGHT BUILD

Included:
- 1–4 player Philippine-history trivia
- Shuffled question deck and shuffled answer choices
- Correct answer unlocks jetpack; successful landing earns +1 point
- First to 10 points wins and earns +1 account star
- Account registration/login with username + password
- Passwords are stored as scrypt hashes, not plaintext
- Account stars and win/game totals are stored in data/accounts.json
- Seasonal rank thresholds are ready for account progression
- Mobile-first no-scroll gameplay layout
- Jetpack button remains visible beside the gameplay while playing on a phone
- Horizontal camera follows the race/leader so the arena slides as players advance
- Astronauts sit on asteroid landing surfaces and animate during flight
- Visible jetpack exhaust
- PC and mobile controls

IMPORTANT FOR RENDER:
The local data/accounts.json file is persistent only if the server has persistent storage.
Render's ephemeral filesystem can reset on restart/redeploy. If you need permanent accounts/ranks,
set DATA_DIR to a persistent disk path (for example /data) on a Render service with a persistent disk,
or replace the JSON store with a managed database later.

Render:
Build Command: npm install
Start Command: npm start
Branch: main
