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
        PORT: 4000
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
