module.exports = {
  apps: [
    {
      name: 'api-dd',
      script: './dist/server.js', // O caminho para o seu arquivo compilado
      instances: 'max',           // Usa todos os núcleos da CPU disponíveis
      exec_mode: 'cluster',       // Ativa o modo cluster
      watch: false,               // Em produção, deixe false para evitar restarts infinitos
      max_memory_restart: '1G',   // Se o app vazar memória e bater 1GB, ele reinicia sozinho
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};