import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    solid( ),
    
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
     
      devOptions: {
        enabled: true

      },
      manifest: {
        name: 'demo game',
        short_name: 'demogame',
        description: 'just a demo',
        "icons": [
          {
            "src": "/demo-game/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/demo-game/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/demo-game/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/demo-game/pwa-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
        "start_url": "/demo-game/index.html",
        "display": "fullscreen",
        "background_color": "#000000",
        "theme_color": "#000000",
        scope: '/demo-game/',
      }
    })
  ],
  base: '/demo-game',
  build:{
    target: 'esnext',
    outDir: 'docs'
  }
})
