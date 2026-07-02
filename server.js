// Root entrypoint to support deployment platforms expecting server.js at repository root.
// It simply requires the actual server implementation in the Backend folder.

require("./Backend/server.js");
