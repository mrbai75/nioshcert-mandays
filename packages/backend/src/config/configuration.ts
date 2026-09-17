// Config berpusat — baca dari env
export const configuration = () => ({
  port: process.env.PORT ? Number(process.env.PORT) : 3001,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
});
