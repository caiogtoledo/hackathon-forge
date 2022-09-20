// Autodesk Forge configuration
module.exports = {
  // Set environment variables or hard-code here
  credentials: {
    client_id: "bjcqhGnODt0JIiSW7UFVlURqy7R30mqw",
    client_secret: "qAfvd7XLngGweSFA",
    callback_url: "http://localhost:3000/api/forge/callback/oauth",
    // client_id: process.env.FORGE_CLIENT_ID,
    // client_secret: process.env.FORGE_CLIENT_SECRET,
    // callback_url: process.env.FORGE_CALLBACK_URL,
  },
  scopes: {
    // Required scopes for the server-side application
    internal: [
      "bucket:create",
      "bucket:read",
      "data:read",
      "data:create",
      "data:write",
    ],
    // Required scope for the client-side viewer
    public: ["viewables:read"],
  },
};
