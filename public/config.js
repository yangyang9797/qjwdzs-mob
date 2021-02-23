

var config = {
  app: {
    name: "权籍云调查",
    desc: "",
    mainlayout: "portal",
    router: {
      white: ["/login"], // 白名单
      pages: []
    }
  },
  models: {
    // dev: 'http://192.168.14.28:11002/qjwdzs/',
    dev: 'http://192.168.14.75:11002/qjwdzs/',
    //pro: 'http://kjxx.cnovit.com/qjwdzs/'
  },
  uris: {
      auth: 'auth/',
      pm: '',
  },
  urls: {
      pm: '',
  },
  wxurl:'http://kjxx.cnovit.com/qjwdzs/',
  sendurl:'http://kjxx.cnovit.com/yunmas/',
};
window.config = config;
console.info(config);
