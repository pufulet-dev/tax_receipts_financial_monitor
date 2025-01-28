export default ({ env }) => ({
  auth: {
    // Fetches the admin JWT secret from the environment variables
    secret: env('ADMIN_JWT_SECRET', 'your-default-jwt-secret'), // Default fallback is optional
  },
  apiToken: {
    // Fetches the API token salt from the environment variables
    salt: env('API_TOKEN_SALT', 'your-default-api-token-salt-value'), // Default fallback is optional
  },
  transfer: {
    token: {
      // Fetches the transfer token salt from the environment variables
      salt: env('TRANSFER_TOKEN_SALT', 'your-default-transfer-token-salt-value'), // Default fallback is optional
    },
  },
  flags: {
    // Boolean flags, fallback is set to true if not defined in environment
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
