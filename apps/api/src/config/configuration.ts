export default () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '4000', 10),
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwt: {
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TTL || '900', 10),
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TTL || '1209600', 10),
    secret: process.env.JWT_SECRET || 'change-me'
  }
})
