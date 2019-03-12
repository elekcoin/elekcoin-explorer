/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");


//The app title, visible e.g. in the browser window
exports.title = "blockchain";

//The url it will be accessed from
exports.address = "explorer.example.com";

// logo
exports.logo = "/images/logo.png";


//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "favicon.ico";

//Theme
exports.theme = "Cyborg";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;


//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "EKC";


//coin name, visible e.g. in the browser window
exports.coin = "Elekcoin";


//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "User!Name",
  "password": "Change!Password",
  "database": "blockchaindb",
  "address" : "localhost",
  "port" : 27017
};


//This setting is passed to the wallet
exports.wallet = { "host" : "127.0.0.1",
  "port" : 11227,
  "user" : "elekcoinrpc",
  "pass" : "password"
};


//Locale file
exports.locale = "locale/en.json",


//Menu items to display
exports.display = {
  "api": true,
  "market": true,
  "twitter": true,
  "facebook": false,
  "googleplus": false,
  "youtube": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true
};


//API view
exports.api = {
  "blockindex": 1337,
  "blockhash": "0000000d99f6046e8f4b8e3fcf37616b2186ee7d2304a6ce20b79c6fffc2c903",
  "txhash": "3385c2a164c9b679440e5543f70db86b8682e0a5ecd824de5e63cb03be230d5d",
  "address": "EWaC7hF9pxzy6wEnefC7BsTP4m1RcHd6y8",
};

// markets
exports.markets = {
  "coin": "EKC",
  "exchange": "BTC",
  "enabled": ['bittrex'],
  "default": "bittrex"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 100,
  "low_flag": 1000,
  "high_flag": 10000
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POW",
  "last_txs": 100
};

// twitter
exports.twitter = "yourtwitterpage";
exports.facebook = "yourfacebookpage";
exports.googleplus = "yourgooglepluspage";
exports.youtube = "youryoutubechannel";

exports.confirmations = 6;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;


//genesis
exports.genesis_tx = "50e3d50b5057df1107721e335ef3b7f29a0065c2c56c9401c5fc8f36cb0a60f9";
exports.genesis_block = "000000e6dbc16b618e068af1ee40a35655536c3d1ca40e35387393a4ce87f26b";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "COINBASE";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

exports.labels = {};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }

};

// initially load settings
exports.reloadSettings();
