module.exports = {
  apps: [
    {
      name: 'jangid-api',
      script: 'apps/api/dist/main.js',
      cwd: '/var/www/jangid-platform',
      instances: 1,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
        JWT_SECRET: 'edf89b1227353476499f06058870beec6509584f28cf90715ad069dc28fd8b07714ae8034e2cb19a801a633ca5de6fd82e2af2d4d7a6ec319ce4a841c7af548',
        JWT_ACCESS_TTL: '900',
        JWT_REFRESH_TTL: '1209600',
        CORS_ORIGIN: 'https://jangid.co.in,https://www.jangid.co.in'
      },
      error_file: '/var/www/jangid-platform/logs/api-error.log',
      out_file: '/var/www/jangid-platform/logs/api-out.log',
      merge_logs: true,
      time: true
    },
    {
      name: 'jangid-web',
      script: 'node_modules/nuxt/bin/nuxt.mjs',
      args: 'start',
      cwd: '/var/www/jangid-platform/apps/web',
      instances: 1,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NUXT_PUBLIC_API_BASE: 'http://localhost:4000/api'
      },
      error_file: '/var/www/jangid-platform/logs/web-error.log',
      out_file: '/var/www/jangid-platform/logs/web-out.log',
      merge_logs: true,
      time: true
    }
  ]
}
