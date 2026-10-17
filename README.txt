KaWee multiplayer trivia game

Deployment
- Node.js application
- Install dependencies with: npm install
- Start with: npm start (or node server.js)
- Static homepage: public/index.html
- WebSocket and HTTP server: server.js

Game updates in this package
- Replaced the previous question bank with 204 unique multiple-choice questions grounded in the 12 uploaded Kultura handouts (Handouts 13–24 / lessons and topics shown in those PDFs).
- Answer choices are shuffled for each question while preserving the correct answer.
- A correct answer unlocks the jetpack but does not trigger an automatic flight animation. The animation begins only when a player actually presses and holds the jetpack control; the server awards the point only after release and a successful landing window.
- Preserved account, room, rank/star, help, and leave-room features from the existing project.

Verification performed
- server.js passed `node --check`.
- Question-bank check: 204 questions, 204 unique question prompts, four options per question.
- Full browser-to-browser multiplayer testing was not possible in this environment; test with two separate logged-in accounts/devices after deployment.
