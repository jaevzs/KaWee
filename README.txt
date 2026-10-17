KaWee — Multiplayer Landing & Answer-Type Fix

Deploy this complete folder as a Node web service. Use Node 18+ and run npm install, then npm start.

This build keeps the account system, 204-question bank, logo, Help, Leave Room, daily quests, and game UI. It hardens room broadcasts against stale sockets, preserves room state during reconnects, adds clearer connection diagnostics, and rebuilds answer distractors so date/time questions use source-supported dates, who questions use people/groups, and other questions use same-type answers from the 12 Kultura handouts/question bank.

Render settings: Build command: npm install | Start command: npm start. The service must keep its persistent data directory if account persistence is required; set DATA_DIR to a persistent disk path.
