module.exports = {
  apps: [
    {
      name: 'personal-blog',
      script: 'start.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        HOSTNAME: '0.0.0.0',
        PORT: 3000,
        // 如未在 .env 设置，将使用 SQLite 本地文件
        // 可按需改为 MySQL/Postgres 连接串
        // DATABASE_URL: 'file:./prisma/dev.db',
      },
    },
  ],
}