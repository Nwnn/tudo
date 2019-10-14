import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  mode : "spa",
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  server : { 
    host : '0.0.0.0',
    port : 80
  
  },

  modules : [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  axios: { }
  
}

export default config