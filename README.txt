# KaWee Multiplayer

A 4-player online prototype for KaWee.

## Mechanics
- Up to 4 players per room.
- Create a room and share the room code.
- First buzzer gets the question.
- Correct answer gives +1 point.
- At 10 points, that player wins and gets +1 Star.
- After a correct answer, hold the jetpack/thrust button.
- There is NO visible meter.
- Release the button at the right time to land on the next platform.
- Too early or too late = fall back to the last platform.
- Stars determine rank.

## Run locally
1. Install Node.js.
2. Open a terminal in this folder.
3. Run:
   npm install
   npm start
4. Open http://localhost:3000

For other people on the same Wi-Fi, they can open your computer's local IP with port 3000.

## Put it online
The game needs a server because real multiplayer requires a shared connection. Deploy this folder to a Node.js host such as Render, Railway, Fly.io, or another WebSocket-capable host.

The browser client connects to the same host automatically.
