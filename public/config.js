

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
    dev: 'http://localhost:11002/qjwdzs/',
    //dev: 'http://192.168.14.75:11002/qjwdzs/',
    //pro: 'http://kjxx.cnovit.com/qjwdzs/'
  },
  uris: {
      auth: 'auth/',
      pm: '',
  },
  urls: {
      pm: '',
  },
  wxurl:'http://localhost:11002/qjwdzs/',
  sendurl:'http://kjxx.cnovit.com/yunmas/',
};
window.config = config;
console.info(config);
