KaWee — Account + Mobile Gameplay Build

This is the complete KaWee project for Render/GitHub.

FILES
- public/index.html — responsive game client
- server.js — WebSocket multiplayer, accounts, ranks, stars, quests, questions
- package.json — Render/Node configuration

RENDER
Build Command: npm install
Start Command: npm start

IMPORTANT ACCOUNT NOTE
Accounts are stored in data/accounts.json. The server creates this file automatically.
For permanent account/rank storage on Render, attach persistent storage and set DATA_DIR to a writable persistent directory. Without persistent storage, a restart/redeploy can reset the generated account file.

ACCOUNT LOCK
An account can have only one active login session. A second device receives an error until the first session logs out or disconnects.

GAME RULES
- 1–4 players
- Game can start with one player
- Correct answer unlocks the jetpack; it does not immediately award a point
- Successful landing on the next asteroid awards +1 point
- Missed flight returns the player to their last asteroid and awards 0 points
- First player to 10 points wins and receives +1 account star
- Questions are shuffled without repeating until the deck is exhausted
- Answer choices are shuffled for every question
- The race camera follows player progress across a long asteroid field
- Mobile gameplay keeps room controls, arena, question/answers, and press-and-hold Jetpack in the same screen so page scrolling is not required
- Daily quests award bonus stars and reset each day

MOBILE
The Create Room and Join Room controls are in the top bar on small screens. The Jetpack control is beside the question/answer area and remains visible while the arena is visible.
