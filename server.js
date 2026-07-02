/**
 * Root server entrypoint
 *
 * Purpose:
 * - Some deployment platforms (Render, Heroku, etc.) run `node server.js` from
 *   the repository root. This file forwards to the actual server
 *   implementation located at `Backend/server.js`.
 *
 * Behavior:
 * - Resolves the `Backend/server.js` path relative to this file.
 * - If the target file is missing, prints a helpful error and exits with code 1.
 * - Otherwise requires the target so the real server starts normally.
 *
 * Usage:
 * - Locally: `node server.js`
 * - Platforms: leave as-is; they will invoke this file automatically.
 *
 * Notes:
 * - Keep the application code inside `Backend/server.js`.
 */

const path = require("path");
const fs = require("fs");

const target = path.join(__dirname, "Backend", "server.js");

if (!fs.existsSync(target)) {
  console.error(`ERROR: Entrypoint not found: ${target}`);
  console.error(
    "Ensure the repository contains Backend/server.js or update this file to point to the correct entry.",
  );
  process.exit(1);
}

console.log(`Loading application from ${target}`);
require(target);
