import colors from 'vuetify/es5/util/colors'

const config = {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    'plugins/vuetify'
    // 'plugins/anime'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
  ],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    // transpile: [
    //   'animejs/lib/anime.es.js'
    // ]
  },
  //本番環境で、HTTP通信に使うURLを設定することで、axiosが使えるようにする。
  axios: {
    baseURL: process.env.BASE_URL || '/'
  },
  auth: {
    redirect: {
      login: '/sessions/new',  // 未ログイン時のリダイレクト先
      logout: '/',  // ログアウト処理を実行した直後のリダイレクト先
      callback: '/callback',
      home: '/profile',  // ログイン後に遷移するページ
    },
    strategies: {
      google: {
        client_id: '701374405385-6ce46ig6s66o5fdarh37p6rfd7hvk6mi.apps.googleusercontent.com'
      }
    }
  },
  generate: {
    dir: '../public'
  }
}

if (process.env.NODE_ENV === 'development') {
  config.proxy = { '/api': 'http://localhost:3000' }
}

export default config
