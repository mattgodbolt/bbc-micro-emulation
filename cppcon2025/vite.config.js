import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [{
    name: 'md-reload',
    configureServer(server) {
      server.watcher.add('*.md')
      server.watcher.on('change', file => 
        file.endsWith('.md') && server.ws.send({ type: 'full-reload' })
      )
    }
  }]
})