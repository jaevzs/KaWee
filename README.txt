KaWee multiplayer stability update

Files included:
- server.js
- public/index.html
- public/kawee-logo.png
- package.json

Changes in this update:
1. Reconnecting no longer automatically cancels a player's active flight and silently resets the room question. This was a direct cause of the mobile view returning to the previous asteroid while another device had already shown the landing.
2. The flight animation is started from the shared server state rather than being started twice locally and again from the server event. This reduces client-to-client visual timing drift, especially on mobile.
3. Added a Leave Room button. Leaving removes the player from the room without logging them out; their account and Stars remain saved, and they can create or join another room.

Deployment:
Upload/replace these files in the same GitHub repository and branch that Render deploys (normally main), preserving the folder structure. Wait for Render to finish deploying, then test with two devices. These code checks passed locally, but a live multiplayer test against your Render service is still needed to verify the disconnect and landing behavior in production.
