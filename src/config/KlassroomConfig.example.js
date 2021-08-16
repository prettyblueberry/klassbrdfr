import { KlassroomConfig, KlassbookConfig } from '@klassroom/klassroom-sdk-js';

KlassroomConfig.setup({
  ENV: 'dev',
  APP_ID: '553e7f3c01ae1',
  GOOGLE_API: 'AIzaSyDx-n45-N6QveRzQ1KX8XbD5TWSMGUkrqs',
  API_URL: 'https://api2dev.klassroom.co',
  XMPP_DOMAIN: 'im.roomapp.local',
  CULTURE: 'en',
  WSURL: 'wss://ws2dev.klassroom.co/ws/',
  SOURCE: 'klassroom',
  VERSION: '5.0',
  STRIPE: 'pk_test_Jv2NK171Od3oahrt5I51npu0',
});

KlassbookConfig.setup({
  assets: {
    baseURL: 'https://static.klassroom.co/klassbook/photobook-img/'
  }
});


export {
  KlassroomConfig,
  KlassbookConfig
};
