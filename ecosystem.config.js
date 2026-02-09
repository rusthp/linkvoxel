module.exports = {
    apps: [
        {
            name: 'linkvoxel',
            script: 'npm',
            args: 'start',
            cwd: './', // Diretório atual
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000 // Porta interna
            }
        }
    ]
}
