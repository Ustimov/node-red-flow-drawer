var RED = require('./red');
require('./bidi');
require('./editor');
require('./i18n');
require('./nodes');
// var httpin = require('./nodes/core/io/21-httpin');
// httpin(RED);
require('./state');
require('./tabs');
require('./utils');
require('./view');
require('./workspaces');
// var registry = require("./registry");
// registry.init();
// registry.load();

// console.log(RED);
RED.i18n.init();
RED.view.init();
RED.workspaces.init();
RED.nodes.init();
RED.view.init();

var nodeList = [{"id":"node-red/sentiment","name":"sentiment","types":["sentiment"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/inject","name":"inject","types":["inject"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/catch","name":"catch","types":["catch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/status","name":"status","types":["status"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/debug","name":"debug","types":["debug"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/link","name":"link","types":["link in","link out"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/exec","name":"exec","types":["exec"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/function","name":"function","types":["function"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/template","name":"template","types":["template"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/delay","name":"delay","types":["delay"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/trigger","name":"trigger","types":["trigger"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/comment","name":"comment","types":["comment"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/unknown","name":"unknown","types":["unknown"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/rpi-gpio","name":"rpi-gpio","types":["rpi-gpio in","rpi-gpio out","rpi-mouse","rpi-keyboard"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/tls","name":"tls","types":["tls-config"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/mqtt","name":"mqtt","types":["mqtt in","mqtt out","mqtt-broker"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/httpin","name":"httpin","types":["http in","http response"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/httprequest","name":"httprequest","types":["http request"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/websocket","name":"websocket","types":["websocket in","websocket out","websocket-listener","websocket-client"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/watch","name":"watch","types":["watch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/tcpin","name":"tcpin","types":["tcp in","tcp out","tcp request"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/udp","name":"udp","types":["udp in","udp out"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/switch","name":"switch","types":["switch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/change","name":"change","types":["change"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/range","name":"range","types":["range"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/split","name":"split","types":["split","join"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/sort","name":"sort","types":["sort"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/batch","name":"batch","types":["batch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/CSV","name":"CSV","types":["csv"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/HTML","name":"HTML","types":["html"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/JSON","name":"JSON","types":["json"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/XML","name":"XML","types":["xml"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/YAML","name":"YAML","types":["yaml"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/tail","name":"tail","types":["tail"],"enabled":true,"local":false,"module":"node-red","err":"Not currently supported on Windows.","version":"0.19.4-git"},{"id":"node-red/file","name":"file","types":["file","file in"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red-node-rbe/rbe","name":"rbe","types":["rbe"],"enabled":true,"local":false,"module":"node-red-node-rbe","version":"0.2.3"},{"id":"node-red-node-email/email","name":"email","types":["e-mail","e-mail in"],"enabled":true,"local":false,"module":"node-red-node-email","version":"0.1.29"},{"id":"node-red-node-feedparser/feedparse","name":"feedparse","types":["feedparse"],"enabled":true,"local":false,"module":"node-red-node-feedparser","version":"0.1.14"},{"id":"node-red-node-twitter/twitter","name":"twitter","types":["twitter-credentials","twitter in","twitter out"],"enabled":true,"local":false,"module":"node-red-node-twitter","version":"1.1.2"},{"id":"node-red-contrib-test-node/test-node","name":"test-node","types":["test-node"],"enabled":true,"local":true,"module":"node-red-contrib-test-node","version":"0.0.2"}];
RED.nodes.setNodeList(nodeList);
var iconSets = {"node-red":["alert.png","arduino.png","arrow-in.png","batch.png","bluetooth.png","bridge-dash.png","bridge.png","cog.png","comment.png","db.png","debug.png","envelope.png","feed.png","file-in.png","file-out.png","file.png","function.png","hash.png","inject.png","join.png","leveldb.png","light.png","link-out.png","mongodb.png","mouse.png","node-changed.png","node-error.png","parser-csv.png","parser-html.png","parser-json.png","parser-xml.png","parser-yaml.png","range.png","redis.png","rpi.png","serial.png","sort.png","split.png","subflow.png","swap.png","switch.png","template.png","timer.png","trigger.png","twitter.png","watch.png","white-globe.png"],"node-red-node-rbe":["rbe.png"],"node-red-node-email":[],"node-red-node-feedparser":[],"node-red-node-twitter":[],"node-red-contrib-test-node":[]};
RED.nodes.setIconSets(iconSets);

require('./types');

var newNodesObj = [
    {
      "id": "728edb1b.dd9b64",
      "type": "tab",
      "label": "Wrapperstt",
      "disabled": false,
      "info": ""
    },
    {
      "id": "670b6620.41bfa8",
      "type": "tab",
      "label": "xxxMa",
      "disabled": false,
      "info": ""
    },
    {
      "id": "41d38104.9fbac",
      "type": "tab",
      "label": "BKS WSDLs"
    },
    {
      "id": "e2f95d0f.fa398",
      "type": "tab",
      "label": "Security",
      "disabled": true,
      "info": ""
    },
    {
      "id": "3e1c47b2.c62058",
      "type": "subflow",
      "name": "Wrapperstt_STTwithCache",
      "info": "Input:\nmsg.payload.token --> JWT token\n\nConfiguration:\nwrapperstt.stt.endpoint\nwrapperstt.stt.tokens_bks_personal.uri\nwrapperstt.stt.tokens_bks_personal.method\n",
      "in": [
        {
          "x": 50,
          "y": 30,
          "wires": [
            {
              "id": "c6a82feb.88ae1"
            }
          ]
        }
      ],
      "out": [
        {
          "x": 880,
          "y": 120,
          "wires": [
            {
              "id": "41f61896.6bc658",
              "port": 0
            }
          ]
        },
        {
          "x": 820,
          "y": 240,
          "wires": [
            {
              "id": "46194855.6fb378",
              "port": 0
            }
          ]
        }
      ],
      "outputLabels": [
        "Correct execution",
        "Some error happened"
      ]
    },
    {
      "id": "afd0ddc1.30287",
      "type": "subflow",
      "name": "bksJSONwrapper",
      "info": "- msg.data.token: BKS token\n- msg.requestData: input object, that will be sent directly\n- msg.method: HTTP method for the BKS call\n- msg.url: BKS URL\n",
      "in": [
        {
          "x": 60,
          "y": 80,
          "wires": [
            {
              "id": "eee026ba.378e08"
            }
          ]
        }
      ],
      "out": [
        {
          "x": 1840,
          "y": 80,
          "wires": [
            {
              "id": "d73d1a4b.b12458",
              "port": 0
            },
            {
              "id": "36e2d4ee.12fa6c",
              "port": 1
            }
          ]
        }
      ]
    },
    {
      "id": "2da4fc90.909b04",
      "type": "subflow",
      "name": "Wrapperstt_IOCwithCache",
      "info": "",
      "in": [
        {
          "x": 60,
          "y": 80,
          "wires": [
            {
              "id": "4e658911.e096f8"
            }
          ]
        }
      ],
      "out": [
        {
          "x": 1340,
          "y": 40,
          "wires": [
            {
              "id": "8710d9ac.a56b68",
              "port": 0
            },
            {
              "id": "2b4b6bda.572bf4",
              "port": 0
            }
          ]
        },
        {
          "x": 1340,
          "y": 120,
          "wires": [
            {
              "id": "8710d9ac.a56b68",
              "port": 1
            }
          ]
        }
      ],
      "outputLabels": [
        "OK response",
        "IOC error"
      ]
    },
    {
      "id": "c5b147b8.e229b8",
      "type": "subflow",
      "name": "bksSoapWrapper",
      "info": "",
      "in": [
        {
          "x": 60,
          "y": 100,
          "wires": [
            {
              "id": "9a7e6890.f6f688"
            }
          ]
        }
      ],
      "out": [
        {
          "x": 1362.2777709960938,
          "y": 97.77786636352539,
          "wires": [
            {
              "id": "d5be8328.10b08",
              "port": 0
            }
          ]
        }
      ]
    },
    {
      "id": "bfbde0a1.c002b",
      "type": "Cache",
      "z": "",
      "name": "cache_usema",
      "defaultTtl": "36000",
      "checkPeriod": ""
    },
    {
      "id": "513a7aa3.d767d4",
      "type": "Cache",
      "z": "",
      "name": "cache_publicKeys",
      "defaultTtl": "36000",
      "checkPeriod": ""
    },
    {
      "id": "5a4cbd3.9e41144",
      "type": "tls-config",
      "z": "",
      "name": "No-cert-verification",
      "cert": "",
      "key": "",
      "ca": "",
      "verifyservercert": false
    },
    {
      "id": "869a1fb6.3c48e",
      "type": "Cache",
      "z": "",
      "name": "cache_crema",
      "defaultTtl": "600",
      "checkPeriod": ""
    },
    {
      "id": "296523d4.ea694c",
      "type": "Cache",
      "z": "3e1c47b2.c62058",
      "name": "cacheSTTpersonalBKSTokens",
      "defaultTtl": "100",
      "checkPeriod": ""
    },
    {
      "id": "cc379902.9a97e8",
      "type": "Cache",
      "z": "2da4fc90.909b04",
      "name": "cacheIOCStatus",
      "defaultTtl": "3600",
      "checkPeriod": ""
    },
    {
      "id": "36573ce1.e2f544",
      "type": "swagger-doc",
      "z": "",
      "summary": "",
      "description": "",
      "tags": "",
      "consumes": "",
      "produces": "",
      "parameters": [
        {
          "name": "status",
          "in": "query",
          "description": "Credential status to be considered for the output",
          "required": false,
          "type": "string",
          "format": "List of strings, separated by comma"
        }
      ],
      "responses": {},
      "deprecated": false
    },
    {
      "id": "bd91a484.29ff88",
      "type": "http in",
      "z": "e2f95d0f.fa398",
      "name": "",
      "url": "/testbks",
      "method": "post",
      "swaggerDoc": "",
      "x": 121.16667175292969,
      "y": 94.88888549804688,
      "wires": [
        [
          "d6c39ff7.e62dd"
        ]
      ]
    },
    {
      "id": "d6c39ff7.e62dd",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "",
      "func": "let ver = context.global.crypto.createVerify(\"RSA-SHA1\");\nver.write(msg.payload.token);\nver.end();\nmsg.payload = ver.verify(msg.payload.publicKey, msg.payload.signature, \"base64\");\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 289.1666564941406,
      "y": 97,
      "wires": [
        [
          "2a7729b0.cbf616"
        ]
      ]
    },
    {
      "id": "2a7729b0.cbf616",
      "type": "http response",
      "z": "e2f95d0f.fa398",
      "name": "",
      "x": 437.16668701171875,
      "y": 95.11111450195312,
      "wires": []
    },
    {
      "id": "9a1ff6a1.427248",
      "type": "http in",
      "z": "e2f95d0f.fa398",
      "name": "",
      "url": "/security/verifyBKSToken",
      "method": "post",
      "swaggerDoc": "",
      "x": 182.1666717529297,
      "y": 186.8888931274414,
      "wires": [
        [
          "a91b8c01.233da"
        ]
      ]
    },
    {
      "id": "a91b8c01.233da",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "init",
      "func": "//parseBKSToken\nmsg.data = {};\n\nmsg.data.token = msg.req.headers.authorization || \"\";\nif (msg.data.token === \"\") {\n    context.global.utils.prepareError(400, \"The authorization header has not been set in the request\", msg, node);\n}\nelse {\n    msg.data.token_parts = context.global.utils.parseBKSToken(msg.data.token, node);\n    node.log(JSON.stringify(msg.data.token_parts));\n    if (msg.data.token_parts.isValid) {\n        msg.data.now = Date.now();\n        node.log(msg.data.now);\n    }\n    else {\n        context.global.utils.prepareError(400, \"The authorization header is not a BKS token\", msg, node);\n    }\n//msg.payload = msg.data;\n}\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 398.16669845581055,
      "y": 186.55555820465088,
      "wires": [
        [
          "15d414bd.ebe52b"
        ]
      ]
    },
    {
      "id": "15d414bd.ebe52b",
      "type": "switch",
      "z": "e2f95d0f.fa398",
      "name": "wrongRequest",
      "property": "statusCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "gte",
          "v": "400",
          "vt": "num"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "false",
      "outputs": 2,
      "x": 573.1666870117188,
      "y": 186.55555725097656,
      "wires": [
        [
          "a16cd977.b4c818"
        ],
        [
          "1211d9d4.f8ab36"
        ]
      ]
    },
    {
      "id": "a16cd977.b4c818",
      "type": "http response",
      "z": "e2f95d0f.fa398",
      "name": "error400",
      "x": 760.1666793823242,
      "y": 139.55555725097656,
      "wires": []
    },
    {
      "id": "2720a741.31e288",
      "type": "http response",
      "z": "e2f95d0f.fa398",
      "name": "end",
      "x": 2069.166400909424,
      "y": 163.55563926696777,
      "wires": []
    },
    {
      "id": "1211d9d4.f8ab36",
      "type": "switch",
      "z": "e2f95d0f.fa398",
      "name": "expired",
      "property": "data.token_parts.valid_until",
      "propertyType": "msg",
      "rules": [
        {
          "t": "lt",
          "v": "data.now",
          "vt": "msg"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "false",
      "outputs": 2,
      "x": 762.1666793823242,
      "y": 194.22222518920898,
      "wires": [
        [
          "bfa96669.e2fac8"
        ],
        [
          "b7fe9358.04e8a"
        ]
      ]
    },
    {
      "id": "bfa96669.e2fac8",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "setExpired",
      "func": "context.global.utils.prepareError(401, \"The token has expired\", msg, node);\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 934.1666259765625,
      "y": 141.11111450195312,
      "wires": [
        [
          "f74fe5f8.62bb48"
        ]
      ]
    },
    {
      "id": "f74fe5f8.62bb48",
      "type": "http response",
      "z": "e2f95d0f.fa398",
      "name": "error401expired",
      "x": 1126.1666259765625,
      "y": 140.22222900390625,
      "wires": []
    },
    {
      "id": "b7fe9358.04e8a",
      "type": "Cache in",
      "z": "e2f95d0f.fa398",
      "name": "getCachePublicKey",
      "cache": "513a7aa3.d767d4",
      "keyType": "msg",
      "keyProperty": "data.token_parts.emitter",
      "valueType": "msg",
      "valueProperty": "payload",
      "useString": false,
      "x": 951.1665992736816,
      "y": 200.66666984558105,
      "wires": [
        [
          "ee79f382.8868b"
        ]
      ]
    },
    {
      "id": "ee79f382.8868b",
      "type": "switch",
      "z": "e2f95d0f.fa398",
      "name": "",
      "property": "payload",
      "propertyType": "msg",
      "rules": [
        {
          "t": "nnull"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "false",
      "outputs": 2,
      "x": 1129.6111450195312,
      "y": 201.66665649414062,
      "wires": [
        [
          "6c2e3c6c.58baa4"
        ],
        [
          "72c1e9f7.0c54e8"
        ]
      ]
    },
    {
      "id": "72c1e9f7.0c54e8",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "prepare2callKeyManager",
      "func": "msg.headers = {};\nmsg.url = context.global.config.security.url.keymanager.replace(\"{key}\", msg.data.token_parts.emitter);\nnode.log(msg._msgid + \"URL to call keymanager: \" + msg.url);\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1325.8332061767578,
      "y": 240.66666984558105,
      "wires": [
        [
          "2b1357ba.708e68"
        ]
      ]
    },
    {
      "id": "2b1357ba.708e68",
      "type": "http request",
      "z": "e2f95d0f.fa398",
      "name": "publicKeyManager",
      "method": "GET",
      "ret": "obj",
      "url": "",
      "tls": "5a4cbd3.9e41144",
      "x": 1552.8333129882812,
      "y": 241.00000381469727,
      "wires": [
        [
          "4e868f98.fc02b"
        ]
      ]
    },
    {
      "id": "4e868f98.fc02b",
      "type": "switch",
      "z": "e2f95d0f.fa398",
      "name": "",
      "property": "statusCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "eq",
          "v": "200",
          "vt": "str"
        },
        {
          "t": "eq",
          "v": "404",
          "vt": "str"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "false",
      "outputs": 3,
      "x": 1726.0557174682617,
      "y": 240.00000381469727,
      "wires": [
        [
          "d19967d8.e1e218",
          "6c2e3c6c.58baa4"
        ],
        [
          "b27c88fc.6e5e98"
        ],
        [
          "ada492bf.f1e64"
        ]
      ]
    },
    {
      "id": "ada492bf.f1e64",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "setGeneralError",
      "func": "context.global.utils.prepareError(401,\n    \"Unexpected error ({statusCode}) retrieving the public key to verify the token's signature\"\n    .replace(\"{statusCode}\", msg.statusCode),\n    msg, node);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1897.2777709960938,
      "y": 291,
      "wires": [
        [
          "de7474fb.7aba68"
        ]
      ]
    },
    {
      "id": "de7474fb.7aba68",
      "type": "http response",
      "z": "e2f95d0f.fa398",
      "name": "error401generic",
      "x": 2094.6111450195312,
      "y": 291.1111145019531,
      "wires": []
    },
    {
      "id": "b27c88fc.6e5e98",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "setUnknownEmitter",
      "func": "context.global.utils.prepareError(401,\n    \"The token emitter ({emitter}) has not defined the public key in the keymanager\"\n    .replace(\"{emitter}\", msg.data.token_parts.emitter),\n    msg, node);\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1906.8888893127441,
      "y": 249.00000381469727,
      "wires": [
        [
          "dd4dd9ce.e2a798"
        ]
      ]
    },
    {
      "id": "dd4dd9ce.e2a798",
      "type": "http response",
      "z": "e2f95d0f.fa398",
      "name": "error401wrongEmitter",
      "x": 2135.277780532837,
      "y": 249.11111450195312,
      "wires": []
    },
    {
      "id": "d19967d8.e1e218",
      "type": "Cache out",
      "z": "e2f95d0f.fa398",
      "name": "storePublicKey",
      "cache": "513a7aa3.d767d4",
      "keyType": "msg",
      "keyProperty": "data.token_parts.emitter",
      "valueType": "msg",
      "valueProperty": "payload.key",
      "ttlType": "msg",
      "ttlProperty": "",
      "useString": false,
      "x": 1899.0555419921875,
      "y": 207.11111450195312,
      "wires": []
    },
    {
      "id": "6c2e3c6c.58baa4",
      "type": "function",
      "z": "e2f95d0f.fa398",
      "name": "verifySignature",
      "func": "let publicKey = msg.payload.key ? msg.payload.key : msg.payload;\n\nlet signatureStartPosition = msg.data.token_parts.token_decoded.lastIndexOf(\"#\")+1;\nlet token = msg.data.token_parts.token_decoded.substring(0, signatureStartPosition);\nlet signature = msg.data.token_parts.token_decoded.substring(signatureStartPosition);\n\nnode.log(publicKey);\nnode.log(token);\nnode.log(signature);\n\nif(context.global.utils.isValidBKSSignature(token, signature, publicKey)) {\n    msg.payload = {\n        \"sessionID\": msg.data.token_parts.sessionID,\n        \"ip\": msg.data.token_parts.ip,\n        \"validUntil\": msg.data.token_parts.valid_until,\n        \"emitter\": msg.data.token_parts.emitter,\n        \"uid\": msg.data.token_parts.uid\n    };\n    \n    msg.headers = {};\n    context.global.utils.setResponseHeaders(msg);\n    msg.statusCode = 200;\n}\nelse {\n    context.global.utils.prepareError(401, \"The token signature cannot be verified using the public key\", msg, node);\n}\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1899.1666870117188,
      "y": 164,
      "wires": [
        [
          "2720a741.31e288"
        ]
      ]
    },
    {
      "id": "c60b4a9d.862f78",
      "type": "comment",
      "z": "41d38104.9fbac",
      "name": "Security structural",
      "info": "",
      "x": 150,
      "y": 80,
      "wires": []
    },
    {
      "id": "2634f549.bdc28a",
      "type": "http in",
      "z": "41d38104.9fbac",
      "name": "",
      "url": "/strucsec/:bank/retrieveMultipleUser",
      "method": "get",
      "swaggerDoc": "",
      "x": 180,
      "y": 120,
      "wires": [
        [
          "ddf7354c.78c4a8"
        ]
      ]
    },
    {
      "id": "ddf7354c.78c4a8",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "init",
      "func": "msg.idrequest = \"[wsdls-strucsec-rtvmlpusr \" + msg._msgid + \"] \";\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"'\" );\n\nmsg.data = {};\n\nmsg.data.outputs = {\n    \"BKS_result_ok\": {\n        \"status\": 200\n    },\n    \"EX_NoExistsRepository\": {\n        \"status\": 400,\n        \"message\": \"Invalid repository: {repository}\"\n    },\n    \"EX_TechnicalError\": {\n        \"status\": 500,\n        \"message\": \"Technical error in the LDAP operation\"\n    },\n    \"EX_NoResults\": {\n        \"status\": 404,\n        \"message\": \"No data found\"\n    },\n    \"EX_InvalidParameters\": {\n        \"status\": 400,\n        \"message\": \"Invalid input parameters\"\n    },\n    \"Fault\": {\n        \"status\": 500,\n        \"message\": \"Unexpected error\"\n    }\n};\n\nvar authData = msg.data.authData = context.global.utils.parseAuthorizationHeader(msg.req.headers.authorization);\nif (authData.validValue && (authData.isUserPassword || authData.isTokenBKS)) {\n    msg.data.uid = msg.req.query.uid;\n    msg.data.loginID = msg.req.query.login_id;\n    msg.data.person_type = msg.req.query.person_type;\n    msg.data.person_code = msg.req.query.person_code;\n    msg.data.repository = msg.req.query.repository || \"\";\n\n    msg.data.bank = msg.req.params.bank.toLowerCase();\n    msg.data.bank = msg.data.bank === \"seb\" ? \"sb\" : msg.data.bank;\n    \n    if (context.global.config.wsdlbks.ldap.valid_entities.split(\",\").indexOf(msg.data.bank) === -1) {\n        // invalid bank\n        context.global.utils.prepareError(400, `Invalid bank. Possible values: ${context.global.config.wsdlbks.ldap.valid_entities}`, msg);\n    }\n    else if (msg.data.uid || msg.data.loginID || (msg.data.person_type && msg.data.person_code)) {\n        // correct request\n        let cfg = context.global.config;\n        let cfgStr = cfg.wsdlbks.ldap[msg.data.bank].structural_security;\n        msg.method = cfgStr.httpmethod;\n        msg.url = cfgStr.endpoint;\n        msg.data.ws_facade = cfgStr.facade;\n        msg.headers = {};\n        msg.data.cache_key = `${msg.data.bank}_${msg.data.uid || msg.data.loginID || (msg.data.person_type + msg.data.person_code)}`;\n    }\n    else {\n        // bad request\n        context.global.utils.prepareError(400, \"Invalid search criteria: it is mandatory to send the uid, or the login_id or the person_type and person_code\", msg);\n    }\n}\nelse {\n    context.global.utils.prepareError(400, \"Authorization header not present or invalid format (expected Basic or Bearer tokenBKS)\", msg);\n}\n\nreturn msg;\n",
      "outputs": 1,
      "noerr": 0,
      "x": 430,
      "y": 120,
      "wires": [
        [
          "1a3663d6.e4c36c"
        ]
      ]
    },
    {
      "id": "9a7e6890.f6f688",
      "type": "switch",
      "z": "c5b147b8.e229b8",
      "name": "correctRequest",
      "property": "payload.httpCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "null"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 200,
      "y": 100,
      "wires": [
        [
          "78192f0d.5cf2e"
        ],
        [
          "995888c5.79b5f8"
        ]
      ]
    },
    {
      "id": "995888c5.79b5f8",
      "type": "http response",
      "z": "c5b147b8.e229b8",
      "name": "ko400",
      "statusCode": "",
      "headers": {},
      "x": 370,
      "y": 140,
      "wires": []
    },
    {
      "id": "78192f0d.5cf2e",
      "type": "switch",
      "z": "c5b147b8.e229b8",
      "name": "authType",
      "property": "data.authData.isUserPassword",
      "propertyType": "msg",
      "rules": [
        {
          "t": "true"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 380,
      "y": 100,
      "wires": [
        [
          "d13dd352.e90fb"
        ],
        [
          "11b49d0f.35e023"
        ]
      ]
    },
    {
      "id": "d13dd352.e90fb",
      "type": "template",
      "z": "c5b147b8.e229b8",
      "name": "userPassword",
      "field": "data.headerWS",
      "fieldType": "msg",
      "format": "handlebars",
      "syntax": "mustache",
      "template": "<soapenv:Header>\n  <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">\n    <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n      <wsse:Username>{{data.authData.user}}</wsse:Username>\n      <wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">{{data.authData.password}}</wsse:Password>\n    </wsse:UsernameToken>\n  </wsse:Security>\n</soapenv:Header>",
      "x": 560,
      "y": 80,
      "wires": [
        [
          "12e0789.f754687"
        ]
      ]
    },
    {
      "id": "11b49d0f.35e023",
      "type": "template",
      "z": "c5b147b8.e229b8",
      "name": "tokenBKS",
      "field": "data.headerWS",
      "fieldType": "msg",
      "format": "handlebars",
      "syntax": "mustache",
      "template": "<soapenv:Header>\n  <wsse:Security soapenv:actor=\"http://www.isban.es/soap/actor/wssecurityB64\" soapenv:mustUnderstand=\"1\" S12:role=\"wssecurity\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:S12=\"http://www.w3.org/2003/05/soap-envelope\">\n    <wsse:BinarySecurityToken ValueType=\"esquema\" EncodingType=\"wsse:Base64Binary\" wsu:Id=\"SSOToken\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">{{data.authData.tokenBKS}}</wsse:BinarySecurityToken>\n  </wsse:Security>\n</soapenv:Header>",
      "x": 540,
      "y": 120,
      "wires": [
        [
          "12e0789.f754687"
        ]
      ]
    },
    {
      "id": "7eddef3f.9ad15",
      "type": "http request",
      "z": "c5b147b8.e229b8",
      "name": "bks",
      "method": "use",
      "ret": "txt",
      "url": "",
      "tls": "",
      "x": 930,
      "y": 100,
      "wires": [
        [
          "5dfa3719.5d08b8",
          "3e2e72d0.b1ba7e"
        ]
      ]
    },
    {
      "id": "3b8b3f48.8307f",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "ok",
      "statusCode": "",
      "headers": {},
      "x": 1310,
      "y": 80,
      "wires": []
    },
    {
      "id": "aae9c9f1.f571a8",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "resultSwitch",
      "func": "function prepareOutput(index) {\n    let rtn = [null, null, null, null, null, null];\n    rtn[index] = msg;\n    return rtn;\n}\n\nconst RETURNS = Object.keys(msg.data.outputs);\n\nmsg.payload = msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0];\n\nif (msg.statusCode === 200) {\n    msg.payload = msg.payload[\"prefixRigel0:retrieveMultipleUserResponse\"][0][\"methodResult\"][0];\n    return prepareOutput(RETURNS.indexOf(\"BKS_result_ok\"));\n}\nelse {\n    let exception = JSON.stringify(msg.payload);\n    let rtn;\n    let found=false, i=1;\n    while (!found && i<RETURNS.length) {\n        if (~exception.indexOf(RETURNS[i])) {\n            msg.payload = msg.payload[Object.keys(msg.payload)[0]][0];\n            msg.payload.exception = RETURNS[i];\n            rtn = prepareOutput(i);\n            found = true;\n        }\n        else {\n            i++;\n        }\n    }\n    return rtn;\n}\n",
      "outputs": "6",
      "noerr": 0,
      "x": 1010,
      "y": 120,
      "wires": [
        [
          "abf2a9c9.807a98"
        ],
        [
          "3f4976da.66b98a"
        ],
        [
          "3f4976da.66b98a"
        ],
        [
          "3f4976da.66b98a"
        ],
        [
          "3f4976da.66b98a"
        ],
        [
          "5925eb8c.203004"
        ]
      ],
      "outputLabels": [
        "ok",
        "EX_NoExistsRepository",
        "EX_TechnicalError",
        "EX_NoResults",
        "EX_InvalidParameters",
        "Fault"
      ]
    },
    {
      "id": "d5be8328.10b08",
      "type": "xml",
      "z": "c5b147b8.e229b8",
      "name": "",
      "attr": "",
      "chr": "",
      "x": 1232.2777709960938,
      "y": 97.77786636352539,
      "wires": [
        []
      ]
    },
    {
      "id": "abf2a9c9.807a98",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "ok",
      "func": "let data = msg.payload.user[0];\n\nfunction getAttribute(attr, subdata) {\n    let d = subdata ? subdata : data;\n    return d && d[attr] ? d[attr][0] : undefined;\n}\n\nfunction getAttributeList(attr, elementName) {\n    let list = data[attr] ? data[attr] : [];\n    let rtn = [];\n    list.forEach(function(v, i){\n        rtn.push(getAttribute(elementName, v));\n    });\n    return rtn;\n}\n\nfunction parseBksBoolean(bksBoolean) {\n    return \"S\" === bksBoolean ? true : false;\n}\n\n/* TODO\n<iColl id=\"attMobile\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attMobile\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"TELEFONO_INTERNACIONAL\"/>\n</iColl>\n<iColl id=\"attCreditCardNumber\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"ALFA JUST IZQUIERDA\" id=\"attCreditCardNumber\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"PAN\"/>\n</iColl>\n<iColl id=\"attContractNumber\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attContractNumber\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"DESCRIPCION_BREVE\"/>\n</iColl>\n<iColl id=\"attPersonalID\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attPersonalID\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"DESCRIPCION_BREVE\"/>\n</iColl>\n<tdc format=\"POR DEFECTO\" id=\"attDocumentRep\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"DOCUM_PERSONA_CORPORATIVO\"/>\n<tdc format=\"CONCATENADOR GUION\" id=\"attLanguage\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"IDIOMA_CORPORATIVO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attSecondSign\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLastSignDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"TIMESTAMP_ALTA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLogonImage\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"URL\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLogonPhrase\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"DESCRIPCION_MEDIA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attmTANRevokedSign\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<iColl id=\"attCompanyID\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attCompanyID\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"DESCRIPCION_BREVE\"/>\n</iColl>\n<tdc format=\"POR DEFECTO\" id=\"attCompanyName\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"DESCRIPCION_MEDIA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLegalPersonNumber\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"NUM_PERSONA_CLIENTE\"/>\n<tdc format=\"FECHA CON MASCARA\" id=\"attStartDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"FECHA_GENERICA\"/>\n<tdc format=\"FECHA CON MASCARA\" id=\"attEndDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"FECHA_GENERICA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attAuthenticationLastError\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attSignByPositionsActive\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attRevocationDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"TIMESTAMP_ALTA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLockDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"TIMESTAMP_ALTA\"/>\n*/\nmsg.payload = {\n    \"surname\": getAttribute(\"attSurname\"),\n    \"fullName\": getAttribute(\"attFullName\"),\n    \"uid\": getAttribute(\"attUID\"),\n    \"loginID\": getAttribute(\"attAlias\"),\n    \"lastLogonDate\": getAttribute(\"attLastLogonDate\"),\n    \"lastChangePwdDate\": getAttribute(\"attLastChangePWDate\"),\n    \"attEntity\": getAttribute(\"attEntity\"),\n    \"environment\": getAttribute(\"attEnvironment\"),\n    \"expirationDate\": getAttribute(\"attExpirationDate\"),\n    \"isInitialSign\": parseBksBoolean(getAttribute(\"attFirstTimeSign\")),\n    \"isInitialLogin\": parseBksBoolean(getAttribute(\"attFirstTime\")),\n    \"isRevokedPassword\": parseBksBoolean(getAttribute(\"attRevokedPassword\")),\n    \"isRevokedSign\": parseBksBoolean(getAttribute(\"attRevokedSign\")),\n    \"clientType\": getAttribute(\"TIPO_DE_PERSONA\", getAttribute(\"attPersonNumber\")),\n    \"clientCode\": getAttribute(\"CODIGO_DE_PERSONA\", getAttribute(\"attPersonNumber\")),\n    \"secondToTheLastLoginDate\": getAttribute(\"attBeforeLastLogonDate\"),\n    \"signMethods\": getAttributeList(\"attSignMethods\", \"dato\"),\n    \"name\": getAttribute(\"attName\"),\n    \"documentType\": getAttribute(\"TIPO_DOCUM_PERSONA_CORP\", getAttribute(\"attDocument\")),\n    \"documentCode\": (getAttribute(\"CODIGO_DOCUM_PERSONA_CORP\", getAttribute(\"attDocument\")) || \"\").trim(),\n    \"lastIncorrectLoginDate\": getAttribute(\"attLastUnsuccessLogon\"),\n    \"isUserLocked\": parseBksBoolean(getAttribute(\"attLockUser\")),\n    \"isPasswordActive\": parseBksBoolean(getAttribute(\"attPasswordActive\"))\n};\nmsg.headers = {};\nmsg.statusCode = 200;\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1170,
      "y": 80,
      "wires": [
        [
          "3b8b3f48.8307f"
        ]
      ]
    },
    {
      "id": "3f4976da.66b98a",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "functionalException",
      "func": "let exc = msg.payload;\n\nlet excDetail = exc.detail[0][Object.keys(exc.detail[0])][0];\n\nlet exceptionMessage =\n    (msg.data.outputs[exc.exception].message || \"\").replace(\"{repository}\", msg.data.repository)\n    + \" | \" + exc.faultcode\n    + \" | \" + exc.faultstring\n    + \" | \" + excDetail.errorCode[0].trim()\n    + \" | \" + excDetail.messageByDefault[0]\n    ;\n\nmsg.headers = {};\ncontext.global.utils.prepareError(\n    msg.data.outputs[exc.exception].status,\n    exceptionMessage,\n    msg,\n    node\n);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1210,
      "y": 120,
      "wires": [
        [
          "1f24e3a0.97a3fc"
        ]
      ]
    },
    {
      "id": "5925eb8c.203004",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "unexpectedException",
      "func": "let exc = msg.payload;\n\nlet exceptionMessage =\n    (msg.data.outputs[exc.exception].message || \"\").replace(\"{repository}\", msg.data.repository)\n    + \" | \" + exc.faultcode\n    + \" | \" + exc.faultstring\n    ;\n\nmsg.headers = {};\ncontext.global.utils.prepareError(\n    msg.data.outputs[exc.exception].status,\n    exceptionMessage,\n    msg,\n    node\n);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1220,
      "y": 160,
      "wires": [
        [
          "8f9e1908.4bdf48"
        ]
      ]
    },
    {
      "id": "1f24e3a0.97a3fc",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "koFunctional",
      "statusCode": "",
      "headers": {},
      "x": 1410,
      "y": 120,
      "wires": []
    },
    {
      "id": "8f9e1908.4bdf48",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "koUnexpected",
      "statusCode": "",
      "headers": {},
      "x": 1440,
      "y": 160,
      "wires": []
    },
    {
      "id": "5dfa3719.5d08b8",
      "type": "function",
      "z": "c5b147b8.e229b8",
      "name": "print2log",
      "func": "if (~msg.payload.indexOf(\"Request from nodered\")) {\n    // we've come from the request\n    if (context.global.config.logging.bks.show_request) {\n        //node.log(msg.idrequest + \"Request to BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n        node.log(`${msg.idrequest} Request to BKS (${msg.payload.length} bytes): ${msg.payload.replace(/<wsse\\:Password[^>]*>[^<]+<\\/wsse\\:Password>/, \"<wsse:Password>***</wsse:Password>\").replace(/<wsse\\:BinarySecurityToken[^>]*>([^>]+)[^>]{20}</, \"<wsse:BinarySecurityToken>$1<\")}`);\n    }\n}\nelse {\n    // we've come from the response\n    if (context.global.config.logging.bks.show_response) {\n        node.log(msg.idrequest + \"Response from BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n    }\n}\n\nreturn null;",
      "outputs": 1,
      "noerr": 0,
      "x": 972.3333740234375,
      "y": 46.111183166503906,
      "wires": [
        []
      ]
    },
    {
      "id": "3e2e72d0.b1ba7e",
      "type": "switch",
      "z": "c5b147b8.e229b8",
      "name": "hasBody",
      "property": "payload.length",
      "propertyType": "msg",
      "rules": [
        {
          "t": "gt",
          "v": "0",
          "vt": "num"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 1080,
      "y": 100,
      "wires": [
        [
          "d5be8328.10b08"
        ],
        [
          "11b8640f.39a46c"
        ]
      ],
      "outputLabels": [
        "withBody",
        null
      ]
    },
    {
      "id": "11b8640f.39a46c",
      "type": "function",
      "z": "c5b147b8.e229b8",
      "name": "setNoPayloadError",
      "func": "msg.headers = {};\ncontext.global.utils.prepareError(\n    500,\n    \"No payload was received from BKS. Maybe the 'facade' (\" + msg.data.ws_facade + \") in the request was invalid? Check https://confluence.ci.gsnet.corp/display/DIGITALUNI/General+-+How+to+see+the+available+methods+inside+an+assembly\",\n    msg,\n    node\n);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1270,
      "y": 140,
      "wires": [
        [
          "ca1c23c1.d1d38"
        ]
      ]
    },
    {
      "id": "ca1c23c1.d1d38",
      "type": "http response",
      "z": "c5b147b8.e229b8",
      "name": "koNoPayload",
      "statusCode": "",
      "headers": {},
      "x": 1500,
      "y": 140,
      "wires": []
    },
    {
      "id": "6d19907f.5b4f7",
      "type": "http in",
      "z": "670b6620.41bfa8",
      "name": "",
      "url": "/crema/linked_credentials/:uid",
      "method": "get",
      "upload": false,
      "swaggerDoc": "",
      "x": 180,
      "y": 80,
      "wires": [
        [
          "3aa226fe.91abfa"
        ]
      ]
    },
    {
      "id": "3aa226fe.91abfa",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "init",
      "func": "msg.idrequest = \"[CreMa-lc-uid \" + msg._msgid + \"] \";\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"' | Headers JSON: '\" + JSON.stringify(msg.req.headers)\n    + \"'\" );\n\nmsg.data = {};\nmsg.data.uid = msg.req.params.uid;\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 410,
      "y": 80,
      "wires": [
        [
          "51eff7f2.1b6e88"
        ]
      ]
    },
    {
      "id": "5166e7f2.d59e18",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "prepareSCB",
      "func": "var cfg = context.global.config;\n\nmsg.url = cfg.crema.scbprofile.endpoint.replace(/\\{uid\\}/g, msg.data.uid);\nnode.log(msg.idrequest + \"URL for SCB: \" + msg.url);\n\nmsg.data.user = cfg.crema.scbprofile.application_user.username;\nmsg.data.password = cfg.crema.scbprofile.application_user.password;\n\nmsg.headers = {\n    \"X-Nodered-Request\": msg.idrequest,\n    \"Authorization\": \"Basic \" + new Buffer(msg.data.user + \":\" + msg.data.password).toString(\"base64\")\n};\n\nmsg.data.thread = \"SCB\";\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 905.0000991821289,
      "y": 112.00001430511475,
      "wires": [
        [
          "707e309c.41697"
        ]
      ]
    },
    {
      "id": "73ac903e.ce2d9",
      "type": "http response",
      "z": "670b6620.41bfa8",
      "name": "",
      "x": 1715.0003280639648,
      "y": 140.44449615478516,
      "wires": []
    },
    {
      "id": "707e309c.41697",
      "type": "http request",
      "z": "670b6620.41bfa8",
      "name": "SCB",
      "method": "GET",
      "ret": "obj",
      "url": "",
      "tls": "",
      "x": 1059.0000896453857,
      "y": 112.77778959274292,
      "wires": [
        [
          "71c41ae7.76ceb4"
        ]
      ]
    },
    {
      "id": "71c41ae7.76ceb4",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "parseSCB",
      "func": "node.log(msg.idrequest + \"SCB profile request finished with status \" + msg.statusCode + \" and data: \" + JSON.stringify(msg.payload));\n\nmsg.payload.statusCode = msg.statusCode;\n\nflow.set(msg._msgid + \"_scb\", msg.payload);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1217.0000915527344,
      "y": 112.77779006958008,
      "wires": [
        [
          "a08e7b3d.a09548"
        ]
      ]
    },
    {
      "id": "a08e7b3d.a09548",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "join",
      "func": "node.log(msg.idrequest + \"Response arrived from: \" + msg.data.thread);\n\nvar scb = flow.get(msg._msgid + \"_scb\");\nvar sb = flow.get(msg._msgid + \"_sb\");\n\nif (!scb || !sb) {\n    node.log(msg.idrequest + \"One of the needed responses has not arrived yet, let's cancel this thread\");\n    return null;\n}\nelse {\n    node.log(msg.idrequest + \"Both threads have finished, let's continue the execution\");\n    msg.data.scb = scb;\n    msg.data.sb = sb;\n    flow.set(msg._msgid + \"_scb\", undefined);\n    flow.set(msg._msgid + \"_sb\", undefined);\n    return msg;\n}\n",
      "outputs": 1,
      "noerr": 0,
      "x": 1372.0000534057617,
      "y": 141.7777910232544,
      "wires": [
        [
          "8a9b91cf.a2136"
        ]
      ]
    },
    {
      "id": "923551bc.b2495",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "prepareSB",
      "func": "var cfg = context.global.config;\n\nmsg.url = cfg.crema.sbprofile.endpoint.replace(/\\{uid\\}/g, msg.data.uid);\nnode.log(msg.idrequest + \"URL for SB: \" + msg.url);\n\nmsg.data.user = cfg.crema.sbprofile.application_user.username;\nmsg.data.password = cfg.crema.sbprofile.application_user.password;\n\nmsg.headers = {\n    \"X-Nodered-Request\": msg.idrequest,\n    \"Authorization\": \"Basic \" + new Buffer(msg.data.user + \":\" + msg.data.password).toString(\"base64\")\n};\n\nmsg.data.thread = \"SB\";\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 905.1667251586914,
      "y": 162.88889980316162,
      "wires": [
        [
          "cd6512cf.ac6d4"
        ]
      ]
    },
    {
      "id": "cd6512cf.ac6d4",
      "type": "http request",
      "z": "670b6620.41bfa8",
      "name": "SB",
      "method": "GET",
      "ret": "obj",
      "url": "",
      "tls": "",
      "x": 1059.1667156219482,
      "y": 163.6666750907898,
      "wires": [
        [
          "32e2361f.1f319a"
        ]
      ]
    },
    {
      "id": "32e2361f.1f319a",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "parseSB",
      "func": "node.log(msg.idrequest + \"SB profile request finished with status \" + msg.statusCode + \" and data: \" + JSON.stringify(msg.payload));\n\nmsg.payload.statusCode = msg.statusCode;\n\nflow.set(msg._msgid + \"_sb\", msg.payload);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1207.1667175292969,
      "y": 163.66667556762695,
      "wires": [
        [
          "a08e7b3d.a09548"
        ]
      ]
    },
    {
      "id": "8a9b91cf.a2136",
      "type": "function",
      "z": "670b6620.41bfa8",
      "name": "prepareOutput",
      "func": "var scb = msg.data.scb;\nvar sb = msg.data.sb;\n\nmsg.headers = {};\n\nif (scb.statusCode === 500 || sb.statusCode === 500) {\n    node.warn(msg.idrequest + \"One of the profile retrievals finished with error, let's propagate the error\");\n    \n    msg.statusCode = 500;\n    msg.payload = (scb.statusCode === 500) ? scb : sb;\n    delete msg.payload.statusCode;\n}\nelse {\n    msg.payload = [];\n    \n    if (scb.statusCode === 404) {\n        node.log(msg.idrequest + \"User does not exist in SCB :o\");\n    }\n    else {\n        // SCB 200 response\n        node.log(msg.idrequest + \"User does exist in SCB ;)\");\n        scb.bank_id = \"SCB\";\n        delete scb.statusCode;\n        msg.payload.push(scb);\n    }\n\n    if (sb.statusCode === 404) {\n        node.log(msg.idrequest + \"User does not exist in SB :o\");\n    }\n    else {\n        // SB 200 response\n        node.log(msg.idrequest + \"User does exist in SB ;)\");\n        sb.bank_id = \"SB\";\n        delete sb.statusCode;\n        msg.payload.push(sb);\n    }\n\n    if (msg.payload.length === 0) {\n        node.warn(msg.idrequest + \"The user '\" + msg.data.uid + \"' doesn't exist in the bank!\");\n        context.global.utils.prepareError(404, \"The user '\" + msg.data.uid + \"' doesn't exist in the bank!\", msg, node);\n    }\n    else {\n        node.log(msg.idrequest + \"The user exist in \" + msg.payload.length + \" bank(s)\");\n        msg.statusCode = 200;\n    }\n}\n\ncontext.global.utils.setResponseHeaders(msg);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1541.3334693908691,
      "y": 141.7777910232544,
      "wires": [
        [
          "73ac903e.ce2d9",
          "5c44d0a6.41cff"
        ]
      ]
    },
    {
      "id": "51eff7f2.1b6e88",
      "type": "Cache in",
      "z": "670b6620.41bfa8",
      "name": "",
      "cache": "869a1fb6.3c48e",
      "keyType": "msg",
      "keyProperty": "data.uid",
      "valueType": "msg",
      "valueProperty": "payload",
      "useString": false,
      "x": 548.1335105895996,
      "y": 80.22223281860352,
      "wires": [
        [
          "b0212249.f60c6"
        ]
      ]
    },
    {
      "id": "b0212249.f60c6",
      "type": "switch",
      "z": "670b6620.41bfa8",
      "name": "isCached",
      "property": "payload",
      "propertyType": "msg",
      "rules": [
        {
          "t": "nnull"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 699.1333312988281,
      "y": 81.82221698760986,
      "wires": [
        [
          "5391f1cb.05f03"
        ],
        [
          "5166e7f2.d59e18",
          "923551bc.b2495"
        ]
      ]
    },
    {
      "id": "5391f1cb.05f03",
      "type": "http response",
      "z": "670b6620.41bfa8",
      "name": "cached",
      "x": 897.1334228515625,
      "y": 57.288891315460205,
      "wires": []
    },
    {
      "id": "5a6d83d0.ab8cfc",
      "type": "Cache out",
      "z": "670b6620.41bfa8",
      "name": "storeInCache",
      "cache": "bfbde0a1.c002b",
      "keyType": "msg",
      "keyProperty": "data.uid",
      "valueType": "msg",
      "valueProperty": "payload",
      "ttlType": "msg",
      "ttlProperty": "",
      "useString": false,
      "x": 1882.1334381103516,
      "y": 86.28889036178589,
      "wires": []
    },
    {
      "id": "5c44d0a6.41cff",
      "type": "switch",
      "z": "670b6620.41bfa8",
      "name": "",
      "property": "statusCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "eq",
          "v": "200",
          "vt": "str"
        }
      ],
      "checkall": "true",
      "outputs": 1,
      "x": 1715.4667625427246,
      "y": 87.68888473510742,
      "wires": [
        [
          "5a6d83d0.ab8cfc"
        ]
      ]
    },
    {
      "id": "bf2be06f.26322",
      "type": "http in",
      "z": "728edb1b.dd9b64",
      "name": "",
      "url": "/wrapperstt/tokens/bks/personal",
      "method": "post",
      "upload": false,
      "swaggerDoc": "36573ce1.e2f544",
      "x": 190,
      "y": 80,
      "wires": [
        [
          "422c9d2c.514d24"
        ]
      ]
    },
    {
      "id": "1fe4a018.37f4a",
      "type": "http response",
      "z": "728edb1b.dd9b64",
      "name": "end",
      "statusCode": "",
      "headers": {},
      "x": 2450,
      "y": 80,
      "wires": []
    },
    {
      "id": "422c9d2c.514d24",
      "type": "switch",
      "z": "728edb1b.dd9b64",
      "name": "hasToken",
      "property": "payload.token",
      "propertyType": "msg",
      "rules": [
        {
          "t": "nnull"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 440,
      "y": 80,
      "wires": [
        [
          "a433e1b.285702"
        ],
        [
          "b9df7f00.2ba46"
        ]
      ]
    },
    {
      "id": "b9df7f00.2ba46",
      "type": "function",
      "z": "728edb1b.dd9b64",
      "name": "prepare400",
      "func": "context.global.utils.prepareError(400, \"Missing token in the request\", msg, node);\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 610,
      "y": 120,
      "wires": [
        [
          "c8df3e8c.ed934"
        ]
      ]
    },
    {
      "id": "c8df3e8c.ed934",
      "type": "http response",
      "z": "728edb1b.dd9b64",
      "name": "error400",
      "statusCode": "",
      "headers": {},
      "x": 780,
      "y": 120,
      "wires": []
    },
    {
      "id": "4eb9eeb2.f6f5f",
      "type": "Cache in",
      "z": "3e1c47b2.c62058",
      "name": "getFromCache",
      "cache": "296523d4.ea694c",
      "keyType": "msg",
      "keyProperty": "data.cache_key",
      "valueType": "msg",
      "valueProperty": "cachedData",
      "useString": false,
      "x": 360,
      "y": 40,
      "wires": [
        [
          "69676db9.ad3f84"
        ]
      ]
    },
    {
      "id": "c6a82feb.88ae1",
      "type": "function",
      "z": "3e1c47b2.c62058",
      "name": "getTokenInfo",
      "func": "msg.data = msg.data || {};\nmsg.data.jwt = msg.payload.token;\nmsg.data.jwt_chunked = context.global.utils.parseJWT(msg.payload.token);\nmsg.data.uid = msg.data.jwt_chunked.uid;\nmsg.data.cache_key = `${msg.data.jwt_chunked.uid}${msg.data.jwt_chunked.sessionID}`;\nnode.log(`${msg.idrequest} UID=${msg.data.uid} | SessionID=${msg.data.jwt_chunked.sessionID}`);\n\nmsg.url =\n    context.global.config.wrapperstt.stt.endpoint +\n    context.global.config.wrapperstt.stt.tokens_bks_personal.uri\n    ;\nmsg.method = context.global.config.wrapperstt.stt.tokens_bks_personal.method;\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 170,
      "y": 40,
      "wires": [
        [
          "4eb9eeb2.f6f5f"
        ]
      ]
    },
    {
      "id": "69676db9.ad3f84",
      "type": "switch",
      "z": "3e1c47b2.c62058",
      "name": "wasCached",
      "property": "cachedData",
      "propertyType": "msg",
      "rules": [
        {
          "t": "nnull"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 550,
      "y": 40,
      "wires": [
        [
          "2c0ae2b0.11510e"
        ],
        [
          "3c20736.fbfeb8c"
        ]
      ]
    },
    {
      "id": "eb031d95.05ec1",
      "type": "subflow:3e1c47b2.c62058",
      "z": "728edb1b.dd9b64",
      "x": 840,
      "y": 80,
      "wires": [
        [
          "e9c82cc0.5f90e"
        ],
        [
          "7b55af94.d8c74"
        ]
      ]
    },
    {
      "id": "3c20736.fbfeb8c",
      "type": "http request",
      "z": "3e1c47b2.c62058",
      "name": "call2stt",
      "method": "use",
      "ret": "obj",
      "url": "",
      "tls": "",
      "x": 300,
      "y": 140,
      "wires": [
        [
          "3dc340f6.07699"
        ]
      ]
    },
    {
      "id": "2c0ae2b0.11510e",
      "type": "function",
      "z": "3e1c47b2.c62058",
      "name": "yesItWasCached",
      "func": "msg.payload = msg.cachedData;\ndelete msg.cachedData;\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 770,
      "y": 40,
      "wires": [
        [
          "41f61896.6bc658"
        ]
      ]
    },
    {
      "id": "3dc340f6.07699",
      "type": "switch",
      "z": "3e1c47b2.c62058",
      "name": "isCorrectResponse",
      "property": "statusCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "eq",
          "v": "200",
          "vt": "str"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 450,
      "y": 200,
      "wires": [
        [
          "4069fe7b.eacf6",
          "41f61896.6bc658"
        ],
        [
          "46194855.6fb378"
        ]
      ]
    },
    {
      "id": "4069fe7b.eacf6",
      "type": "Cache out",
      "z": "3e1c47b2.c62058",
      "name": "saveOnCache",
      "cache": "296523d4.ea694c",
      "keyType": "msg",
      "keyProperty": "data.cache_key",
      "valueType": "msg",
      "valueProperty": "payload",
      "ttlType": "msg",
      "ttlProperty": "",
      "useString": false,
      "x": 700,
      "y": 180,
      "wires": []
    },
    {
      "id": "41f61896.6bc658",
      "type": "function",
      "z": "3e1c47b2.c62058",
      "name": "parseSTTResponse",
      "func": "msg.data.bkstokens = {};\nmsg.payload.forEach(function(tokencito){\n    msg.data.bkstokens[tokencito.bank_id] = tokencito;\n    node.log(`${msg.idrequest} Received token from STT for bank ${tokencito.bank_id}`);\n});\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 720,
      "y": 120,
      "wires": [
        [
          "6504dd4d.e81ae4"
        ]
      ]
    },
    {
      "id": "7b55af94.d8c74",
      "type": "http response",
      "z": "728edb1b.dd9b64",
      "name": "koSTT",
      "statusCode": "",
      "headers": {},
      "x": 1050,
      "y": 120,
      "wires": []
    },
    {
      "id": "530bf490.5f286c",
      "type": "split",
      "z": "728edb1b.dd9b64",
      "name": "splitTokens",
      "splt": "\\n",
      "spltType": "str",
      "arraySplt": 1,
      "arraySpltType": "len",
      "stream": false,
      "addname": "",
      "x": 1250,
      "y": 80,
      "wires": [
        [
          "5797a29e.c9cd5c",
          "c79a4eca.d0aa"
        ]
      ]
    },
    {
      "id": "e9c82cc0.5f90e",
      "type": "change",
      "z": "728edb1b.dd9b64",
      "name": "backUpSTT",
      "rules": [
        {
          "t": "set",
          "p": "data.stt_response",
          "pt": "msg",
          "to": "payload",
          "tot": "msg"
        }
      ],
      "action": "",
      "property": "",
      "from": "",
      "to": "",
      "reg": false,
      "x": 1070,
      "y": 80,
      "wires": [
        [
          "ef1c6369.692d1",
          "530bf490.5f286c"
        ]
      ]
    },
    {
      "id": "4da0e449.8e961c",
      "type": "join",
      "z": "728edb1b.dd9b64",
      "name": "joinTokens",
      "mode": "auto",
      "build": "string",
      "property": "payload",
      "propertyType": "msg",
      "key": "topic",
      "joiner": "\\n",
      "joinerType": "str",
      "accumulate": false,
      "timeout": "",
      "count": "",
      "x": 2090,
      "y": 80,
      "wires": [
        [
          "461b37b9.58b388"
        ]
      ]
    },
    {
      "id": "461b37b9.58b388",
      "type": "function",
      "z": "728edb1b.dd9b64",
      "name": "prepareOutput",
      "func": "const VALID_STATUS = (msg.req.query.status || context.global.config.wrapperstt.stt.tokens_bks_personal.default_valid_status).split(\",\");\nlet tokens = msg.payload;\nmsg.payload = [];\ntokens.forEach(function(tokenData){\n    if (tokenData.status) {\n        node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, has the status ${tokenData.status} in IOC`);\n        if (~VALID_STATUS.indexOf(tokenData.status)) {\n            tokenData.tokenSTT.status = tokenData.status;\n            msg.payload.push(tokenData.tokenSTT);\n            node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, has been added to the output`);\n        }\n        else {\n            node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, is going to be ignored because the status is not in the list of the valid ones (${JSON.stringify(VALID_STATUS)})`);\n        }\n    }\n    else {\n        node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, is going to be ignored since there were an error received from IOC (${tokenData.httpCode} ${tokenData.httpMessage} | ${tokenData.moreInformation})`);\n    }\n});\n\nif (!msg.payload.length) {\n    msg.payload = '{\"errors\":[{\"code\":404,\"message\":\"user_not_found\",\"level\":\"INFO\",\"description\":\"User not found.\",\"moreInfo\":\"\"}]}';\n    msg.statusCode = 404;\n}\nelse {\n    msg.statusCode = 200;\n}\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 2280,
      "y": 80,
      "wires": [
        [
          "1fe4a018.37f4a",
          "60867867.c14d58"
        ]
      ]
    },
    {
      "id": "6c02137a.08010c",
      "type": "http in",
      "z": "41d38104.9fbac",
      "name": "",
      "url": "/mobilebanking/:bank/viewOnly_LA",
      "method": "get",
      "upload": false,
      "swaggerDoc": "",
      "x": 198.8333282470703,
      "y": 377.44446563720703,
      "wires": [
        [
          "8f6e7e5f.a6959"
        ]
      ]
    },
    {
      "id": "4dd84630.101378",
      "type": "comment",
      "z": "41d38104.9fbac",
      "name": "MBANDE_ACC_SCB_ENS",
      "info": "Mobile Banking possible errors:\n\nMBANDE_0001 - Sehr geehrter Kunde, aufgrund eines Systemfehlers steht Ihnen zur Zeit das InternetBanking & Ordering der Santander Bank leider nicht zur Verfügung. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.\nMBANDE_0002 - Es sind keine Transaktionen für den gewählten Zeitraum vorhanden.\nMBANDE_0003 - Bitte beachten Sie, dass der eingegebene Betrag den maximal verfügbaren Betrag für diese Transaktion übersteigt.\nMBANDE_0004 - Konnte für die Überweisung.\nMBANDE_0005 - Es sind keine iTANs zur Durchführung dieser Transaktion verfügbar.\nMBANDE_0006 - Es sind keine iTANs zur Durchführung dieser Transaktion verfügbar.\nMBANDE_0007 - Neue iTAN-Liste bestellen. iTAN-Liste weniger als 3.\nMBANDE_0008 - Kontonummer: Der eingegebene Wert ist ungültig.\nMBANDE_0009 - BLZ: Der eingegebene Wert ist ungültig.\nMBANDE_0010 - IBAN: Die eingegebene IBAN ist nicht bekannt oder enthält ungültige Zeichen.\nMBANDE_0011 - Betrag: Bitte beachten Sie, dass der eingegebene Betrag den maximal verfügbaren Betrag für diese Transaktion übersteigt.\nMBANDE_0012 - ITAN ungültig. Bitte Tragen Sie unbedingt dort einen 6-stelligen Code\nMBANDE_0013 - IBAN NICHT SEPA-FÄHIG.\nMBANDE_0014 - KONTOART UNGÜLTIG.\nMBANDE_0015 - Es liegen zur Zeit keine Nachrichten für Sie vor.\nMBANDE_0016 - Ihr Online-Banking Zugang wurde auf nur lesen gesetzt.\n",
      "x": 168.8333282470703,
      "y": 297.44446563720703,
      "wires": []
    },
    {
      "id": "8f6e7e5f.a6959",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "init",
      "func": "msg.idrequest = `[wsdls-mobile-viewOnly_LA ${msg._msgid}] `;\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"'\" );\n\nmsg.data = {};\n\n/*\nmsg.data.outputs = {\n    \"BKS_result_ok\": {\n        \"status\": 200\n    },\n    \"EX_NoExistsRepository\": {\n        \"status\": 400,\n        \"message\": \"Invalid repository: {repository}\"\n    },\n    \"EX_TechnicalError\": {\n        \"status\": 500,\n        \"message\": \"Technical error in the LDAP operation\"\n    },\n    \"EX_NoResults\": {\n        \"status\": 404,\n        \"message\": \"No data found\"\n    },\n    \"EX_InvalidParameters\": {\n        \"status\": 400,\n        \"message\": \"Invalid input parameters\"\n    },\n    \"Fault\": {\n        \"status\": 500,\n        \"message\": \"Unexpected error\"\n    }\n};\n*/\n\nconst authData = msg.data.authData = context.global.utils.parseAuthorizationHeader(msg.req.headers.authorization);\nif (authData.validValue && authData.isTokenBKS) {\n    const tokenBKS = context.global.utils.parseBKSToken(authData.tokenBKS);\n    msg.data.uid = tokenBKS.uid;\n    msg.data.token = encodeURIComponent(msg.req.headers.authorization.replace(/^bearer /i, \"\"));\n    msg.data.bank = msg.req.params.bank.toLowerCase();\n    msg.data.bank = msg.data.bank === \"seb\" ? \"sb\" : msg.data.bank;\n    \n    if ([\"scb\", \"sb\"].indexOf(msg.data.bank) === -1) {\n        // invalid bank\n        context.global.utils.prepareError(400, \"Invalid bank. Possible values: 'scb', 'sb'\", msg);\n    }\n    else {\n        // correct request\n        let cfg = context.global.config;\n        let cfgBks = cfg.wsdlbks.mobilebanking.common_accounts[msg.data.bank];\n        msg.method = cfgBks.httpmethod;\n        msg.url = cfgBks.endpoint;\n        \n        msg.requestData = encodeURIComponent(JSON.stringify({\n          \"viewOnly_LA\": {\n            \"profile\": {\n              \"company\": cfgBks.profile.entity,\n              \"channel\": \"INT\",\n              \"language\": \" de-DE\"\n            }\n          }\n        }));\n\n        msg.headers = {\n            \"Content-Type\": \"application/x-www-form-urlencoded\"\n        };\n    }\n}\nelse {\n    context.global.utils.prepareError(401, \"Authorization header not present or invalid format (expected Basic or Bearer tokenBKS)\", msg);\n}\n\nreturn msg;\n",
      "outputs": 1,
      "noerr": 0,
      "x": 438.8333282470703,
      "y": 377.44446563720703,
      "wires": [
        [
          "4238af43.b49c9"
        ]
      ]
    },
    {
      "id": "eee026ba.378e08",
      "type": "switch",
      "z": "afd0ddc1.30287",
      "name": "correctRequest",
      "property": "payload.httpCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "null"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 200,
      "y": 80,
      "wires": [
        [
          "76cc51b7.96924"
        ],
        [
          "a2487c81.d4b3f"
        ]
      ]
    },
    {
      "id": "a2487c81.d4b3f",
      "type": "http response",
      "z": "afd0ddc1.30287",
      "name": "ko400",
      "statusCode": "",
      "headers": {},
      "x": 370,
      "y": 140,
      "wires": []
    },
    {
      "id": "76cc51b7.96924",
      "type": "template",
      "z": "afd0ddc1.30287",
      "name": "prepareRequest",
      "field": "payload",
      "fieldType": "msg",
      "format": "handlebars",
      "syntax": "mustache",
      "template": "authenticationType=token&token={{data.token}}&requestData={{{requestData}}}",
      "output": "str",
      "x": 400,
      "y": 80,
      "wires": [
        [
          "489f1e9a.cd3d9"
        ]
      ]
    },
    {
      "id": "63b39578.14047c",
      "type": "http request",
      "z": "afd0ddc1.30287",
      "name": "call2bks",
      "method": "use",
      "ret": "txt",
      "url": "",
      "tls": "",
      "x": 800,
      "y": 80,
      "wires": [
        [
          "affc6089.bdd32",
          "a2e2b8b5.2aea98"
        ]
      ]
    },
    {
      "id": "affc6089.bdd32",
      "type": "function",
      "z": "afd0ddc1.30287",
      "name": "print2log",
      "func": "if (~msg.payload.indexOf(\"Request from nodered\")) {\n    // we've come from the request\n    if (context.global.config.logging.bks.show_request) {\n        node.log(msg.idrequest + \"Request to BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n    }\n}\nelse {\n    // we've come from the response\n    if (context.global.config.logging.bks.show_response) {\n        node.log(msg.idrequest + \"Response from BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n    }\n}\n\nreturn null;",
      "outputs": 1,
      "noerr": 0,
      "x": 960,
      "y": 40,
      "wires": [
        []
      ]
    },
    {
      "id": "a2e2b8b5.2aea98",
      "type": "switch",
      "z": "afd0ddc1.30287",
      "name": "hasBody",
      "property": "payload.length",
      "propertyType": "msg",
      "rules": [
        {
          "t": "gt",
          "v": "0",
          "vt": "num"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 960,
      "y": 80,
      "wires": [
        [
          "83757855.72bf68"
        ],
        [
          "717400f2.7a22b"
        ]
      ],
      "outputLabels": [
        "withBody",
        null
      ]
    },
    {
      "id": "717400f2.7a22b",
      "type": "function",
      "z": "afd0ddc1.30287",
      "name": "setNoPayloadError",
      "func": "msg.headers = {};\ncontext.global.utils.prepareError(\n    500,\n    \"No payload was received from BKS. Check the logs there!\",\n    msg,\n    node\n);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1010,
      "y": 140,
      "wires": [
        [
          "e1398053.b0d1"
        ]
      ]
    },
    {
      "id": "e1398053.b0d1",
      "type": "http response",
      "z": "afd0ddc1.30287",
      "name": "koNoPayload",
      "statusCode": "",
      "headers": {},
      "x": 1220,
      "y": 140,
      "wires": []
    },
    {
      "id": "83757855.72bf68",
      "type": "json",
      "z": "afd0ddc1.30287",
      "name": "",
      "pretty": false,
      "x": 1110,
      "y": 80,
      "wires": [
        [
          "d73d1a4b.b12458"
        ]
      ]
    },
    {
      "id": "41d8598a.e291f8",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "prepareOutput",
      "func": "msg.statusCode = 200;\nif (msg.payload.methodResult) {\n    const mr = msg.payload.methodResult;\n    msg.payload = {\n        \"isViewOnly\": !(mr.statusUser === \"0\" && mr.tipoUser === \"O\")\n    };\n}\nelse if (msg.payload.fault) {\n    let codError = \"\",\n        descripcionErrorTraduc = \"\";\n    try {\n        let errorData = msg.payload.fault.detail.com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA.error;\n        codError = errorData.codError.trim();\n        descripcionErrorTraduc = errorData.descripcionErrorTraduc;\n    }\n    catch(e) {\n        node.log(`${msg.idrequest} Unexpected error format received from BKS`);\n        //descripcionErrorTraduc = JSON.stringify(msg.payload.fault);\n        codError = msg.payload.fault.faultcode;\n        descripcionErrorTraduc = `${msg.payload.fault.faultcode} | ${msg.payload.fault.faultstring} | ${msg.payload.fault.detail}`;\n    }\n    \n    if (codError === \"MBANDE_0016\") {\n        msg.payload = {\n            \"isViewOnly\": true\n        };\n    }\n    else {\n        context.global.utils.prepareError(500,\n            descripcionErrorTraduc,\n            msg,\n            node\n        );\n    }\n}\nelse {\n    context.global.utils.prepareError(500,\n        JSON.stringify(msg.payload),\n        msg,\n        node\n    );\n}\n\nif (msg.statusCode === 200) {\n    return [msg, null];\n}\nelse {\n    return [null, msg];\n}\n",
      "outputs": "2",
      "noerr": 0,
      "x": 828.8333282470703,
      "y": 377.44446563720703,
      "wires": [
        [
          "fe9dfb4b.480118"
        ],
        [
          "736fbb0f.0a70a4"
        ]
      ]
    },
    {
      "id": "fe9dfb4b.480118",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "ok",
      "statusCode": "",
      "headers": {},
      "x": 998.8333282470703,
      "y": 377.44446563720703,
      "wires": []
    },
    {
      "id": "736fbb0f.0a70a4",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "koUnexpected",
      "statusCode": "",
      "headers": {},
      "x": 1028.8333282470703,
      "y": 417.44446563720703,
      "wires": []
    },
    {
      "id": "6649a13a.4acc4",
      "type": "http in",
      "z": "41d38104.9fbac",
      "name": "",
      "url": "/mobilebanking/:bank/estadoCanal_LA",
      "method": "get",
      "upload": false,
      "swaggerDoc": "",
      "x": 218.8333282470703,
      "y": 537.444465637207,
      "wires": [
        [
          "a1b1674b.1845e8"
        ]
      ]
    },
    {
      "id": "a1b1674b.1845e8",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "init",
      "func": "msg.idrequest = `[wsdls-mobile-estadoCanal_LA ${msg._msgid}] `;\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"'\" );\n\nmsg.data = {};\n\nconst authData = msg.data.authData = context.global.utils.parseAuthorizationHeader(msg.req.headers.authorization);\nif (authData.validValue && authData.isTokenBKS) {\n    const tokenBKS = context.global.utils.parseBKSToken(authData.tokenBKS);\n    msg.data.uid = tokenBKS.uid;\n    msg.data.token = encodeURIComponent(msg.req.headers.authorization.replace(/^bearer /i, \"\"));\n    msg.data.bank = msg.req.params.bank.toLowerCase();\n    msg.data.bank = msg.data.bank === \"seb\" ? \"sb\" : msg.data.bank;\n    \n    if ([\"scb\", \"sb\"].indexOf(msg.data.bank) === -1) {\n        // invalid bank\n        context.global.utils.prepareError(400, \"Invalid bank. Possible values: 'scb', 'sb'\", msg);\n    }\n    else {\n        // correct request\n        let cfg = context.global.config;\n        let cfgBks = cfg.wsdlbks.mobilebanking.common_accounts[msg.data.bank];\n        msg.method = cfgBks.httpmethod;\n        msg.url = cfgBks.endpoint;\n        \n        msg.requestData = encodeURIComponent(JSON.stringify({\n          \"estadoCanal_LA\": {\n            \"entrada\": {\n              \"canalCon\": \"INT\",\n              \"canalBe\": \"INT\",\n              \"uid\": msg.data.uid\n            }\n          }\n        }));\n\n        msg.headers = {\n            \"Content-Type\": \"application/x-www-form-urlencoded\"\n        };\n    }\n}\nelse {\n    context.global.utils.prepareError(401, \"Authorization header not present or invalid format (expected Basic or Bearer tokenBKS)\", msg);\n}\n\nreturn msg;\n",
      "outputs": 1,
      "noerr": 0,
      "x": 478.8333282470703,
      "y": 537.444465637207,
      "wires": [
        [
          "b68f59f.944a0a8"
        ]
      ]
    },
    {
      "id": "d4c5135b.1a837",
      "type": "function",
      "z": "41d38104.9fbac",
      "name": "prepareOutput",
      "func": "msg.statusCode = 200;\nif (msg.payload.methodResult) {\n    msg.payload = {\n        \"isActive\": true\n    };\n}\nelse if (msg.payload.fault && msg.payload.fault.detail && msg.payload.fault.detail.com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA) {\n    msg.payload = {\n        \"isActive\": false\n    };\n}\nelse {\n    context.global.utils.prepareError(500,\n        JSON.stringify(msg.payload),\n        msg,\n        node\n    );\n}\n\nif (msg.statusCode === 200) {\n    return [msg, null];\n}\nelse {\n    return [null, msg];\n}\n",
      "outputs": "2",
      "noerr": 0,
      "x": 868.8333282470703,
      "y": 537.444465637207,
      "wires": [
        [
          "d934ff22.ca1c8"
        ],
        [
          "1d8fd3f2.e46b3c"
        ]
      ]
    },
    {
      "id": "d934ff22.ca1c8",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "ok",
      "statusCode": "",
      "headers": {},
      "x": 1038.8333282470703,
      "y": 537.444465637207,
      "wires": []
    },
    {
      "id": "1d8fd3f2.e46b3c",
      "type": "http response",
      "z": "41d38104.9fbac",
      "name": "koUnexpected",
      "statusCode": "",
      "headers": {},
      "x": 1068.8333282470703,
      "y": 577.444465637207,
      "wires": []
    },
    {
      "id": "4238af43.b49c9",
      "type": "subflow:afd0ddc1.30287",
      "z": "41d38104.9fbac",
      "x": 618.8333282470703,
      "y": 377.44446563720703,
      "wires": [
        [
          "41d8598a.e291f8"
        ]
      ]
    },
    {
      "id": "489f1e9a.cd3d9",
      "type": "function",
      "z": "afd0ddc1.30287",
      "name": "addTraceHeader",
      "func": "msg.headers.cookie = `ignoreme=Request from nodered ${msg._msgid}`;\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 610,
      "y": 80,
      "wires": [
        [
          "63b39578.14047c"
        ]
      ]
    },
    {
      "id": "b68f59f.944a0a8",
      "type": "subflow:afd0ddc1.30287",
      "z": "41d38104.9fbac",
      "x": 658.8333282470703,
      "y": 537.444465637207,
      "wires": [
        [
          "d4c5135b.1a837"
        ]
      ]
    },
    {
      "id": "d73d1a4b.b12458",
      "type": "switch",
      "z": "afd0ddc1.30287",
      "name": "",
      "property": "statusCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "eq",
          "v": "200",
          "vt": "num"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 1250,
      "y": 80,
      "wires": [
        [],
        [
          "165c6358.5648dd"
        ]
      ]
    },
    {
      "id": "165c6358.5648dd",
      "type": "function",
      "z": "afd0ddc1.30287",
      "name": "checkIfCommonError",
      "func": "let codError, descripcionErrorTraduc;\ntry {\n    codError = msg.payload.fault.faultcode;\n    descripcionErrorTraduc = `${msg.payload.fault.faultcode} | ${msg.payload.fault.faultstring} | ${msg.payload.fault.detail}`;\n}\ncatch(e) {\n    //node.log(`${msg.idrequest} Unexpected error format received from BKS`);\n    //descripcionErrorTraduc = JSON.stringify(msg.payload.fault);\n}\n\nif (codError) {\n    if (~[\"50201022\", \"50201021\"].indexOf(codError)) {\n        context.global.utils.prepareError(401,\n            descripcionErrorTraduc,\n            msg,\n            node\n        );\n    }\n    // TODO any other common error to manage?\n}\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 1440,
      "y": 140,
      "wires": [
        [
          "36e2d4ee.12fa6c"
        ]
      ]
    },
    {
      "id": "36e2d4ee.12fa6c",
      "type": "switch",
      "z": "afd0ddc1.30287",
      "name": "commonError",
      "property": "payload.httpCode",
      "propertyType": "msg",
      "rules": [
        {
          "t": "nnull"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 1660,
      "y": 140,
      "wires": [
        [
          "ac0d320.75c02d"
        ],
        []
      ]
    },
    {
      "id": "ac0d320.75c02d",
      "type": "http response",
      "z": "afd0ddc1.30287",
      "name": "ko_commonError",
      "statusCode": "",
      "headers": {},
      "x": 1871.0555419921875,
      "y": 168.33334350585938,
      "wires": []
    },
    {
      "id": "2eed6e9d.891762",
      "type": "comment",
      "z": "41d38104.9fbac",
      "name": "viewOnly_LA",
      "info": "normal credential:\n{\n    \"methodResult\": {\n        \"statusUser\": \"0\",\n        \"tipoUser\": \"O\"\n    }\n}\n\nview only:\n{\n    \"fault\": {\n        \"faultcode\": \"0001\",\n        \"faultstring\": \"Exception Code: 0001. Executing Facade: F_MBANDE_CommonAccounts, Method: viewOnly_LA\",\n        \"detail\": {\n            \"com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA\": {\n                \"error\": {\n                    \"codError\": \"MBANDE_0016                             \",\n                    \"errorCode\": \"1\",\n                    \"descripcionErrorTraduc\": \"Ihr Online-Banking Zugang wurde auf \\\"nur lesen\\\" gesetzt.\"\n                }\n            }\n        }\n    }\n}\n\nblocked credential:\n{\n    \"fault\": {\n        \"faultcode\": \"0001\",\n        \"faultstring\": \"Exception Code: 0001. Executing Facade: F_MBANDE_CommonAccounts, Method: viewOnly_LA\",\n        \"detail\": {\n            \"com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA\": {\n                \"error\": {\n                    \"codError\": \"MBANDE_0001                             \",\n                    \"errorCode\": \"1\",\n                    \"descripcionErrorTraduc\": \"Der Paydierkt Service steht Ihnen momentan nicht     zur Verfügung.\"\n                }\n            }\n        }\n    }\n}\n",
      "x": 118.83332824707031,
      "y": 337.44446563720703,
      "wires": []
    },
    {
      "id": "6db51ef9.0ac6b",
      "type": "comment",
      "z": "41d38104.9fbac",
      "name": "estadoCanal_LA",
      "info": "normal credential:\n{\n    \"methodResult\": {}\n}\n\nview only:\n{\n    \"methodResult\": {}\n}\n\nblocked credential:\n{\n    \"fault\": {\n        \"faultcode\": \"0001\",\n        \"faultstring\": \"Exception Code: 0001. Executing Facade: F_MBANDE_CommonAccounts, Method: estadoCanal_LA\",\n        \"detail\": {\n            \"com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA\": {\n                \"error\": {\n                    \"codError\": null,\n                    \"errorCode\": null,\n                    \"descripcionErrorTraduc\": null\n                }\n            }\n        }\n    }\n}\n",
      "x": 128.8333282470703,
      "y": 497.44446563720703,
      "wires": []
    },
    {
      "id": "8cbd539b.044d6",
      "type": "subflow:2da4fc90.909b04",
      "z": "728edb1b.dd9b64",
      "x": 1660,
      "y": 80,
      "wires": [
        [
          "b04c0392.6681c"
        ],
        [
          "b04c0392.6681c"
        ]
      ]
    },
    {
      "id": "ef1c6369.692d1",
      "type": "debug",
      "z": "728edb1b.dd9b64",
      "name": "",
      "active": false,
      "console": "false",
      "complete": "true",
      "x": 1210,
      "y": 220,
      "wires": []
    },
    {
      "id": "b04c0392.6681c",
      "type": "change",
      "z": "728edb1b.dd9b64",
      "name": "saveIOCData",
      "rules": [
        {
          "t": "set",
          "p": "payload.tokenSTT",
          "pt": "msg",
          "to": "tokenSTT",
          "tot": "msg"
        }
      ],
      "action": "",
      "property": "",
      "from": "",
      "to": "",
      "reg": false,
      "x": 1900,
      "y": 80,
      "wires": [
        [
          "4da0e449.8e961c"
        ]
      ]
    },
    {
      "id": "518f5edf.fd6e1",
      "type": "function",
      "z": "2da4fc90.909b04",
      "name": "prepareViewOnly",
      "func": "msg.headers = {\n    \"authorization\": `Bearer ${msg.payload.token}`\n};\nmsg.url = context.global.config.wrapperstt.ioc.viewOnly.endpoint.replace(\"{bank}\", msg.payload.bank_id);\nmsg.method = context.global.config.wrapperstt.ioc.viewOnly.method; \nmsg.thread = \"viewOnly\";\nmsg.partsBackUp = msg.parts;\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 590,
      "y": 80,
      "wires": [
        [
          "e115ed18.961ee"
        ]
      ]
    },
    {
      "id": "4e658911.e096f8",
      "type": "Cache in",
      "z": "2da4fc90.909b04",
      "name": "getFromCache",
      "cache": "cc379902.9a97e8",
      "keyType": "msg",
      "keyProperty": "data.uid",
      "valueType": "msg",
      "valueProperty": "cachedData",
      "useString": false,
      "x": 200,
      "y": 80,
      "wires": [
        [
          "5fae98a6.5d1dd8"
        ]
      ]
    },
    {
      "id": "5fae98a6.5d1dd8",
      "type": "switch",
      "z": "2da4fc90.909b04",
      "name": "wasCached",
      "property": "cachedData",
      "propertyType": "msg",
      "rules": [
        {
          "t": "nnull"
        },
        {
          "t": "else"
        }
      ],
      "checkall": "true",
      "outputs": 2,
      "x": 390,
      "y": 80,
      "wires": [
        [
          "2b4b6bda.572bf4"
        ],
        [
          "518f5edf.fd6e1",
          "937014e1.1ec598"
        ]
      ]
    },
    {
      "id": "937014e1.1ec598",
      "type": "function",
      "z": "2da4fc90.909b04",
      "name": "prepareChannelStatus",
      "func": "msg.headers = {\n    \"authorization\": `Bearer ${msg.payload.token}`\n};\nmsg.url = context.global.config.wrapperstt.ioc.estadoCanal.endpoint.replace(\"{bank}\", msg.payload.bank_id);\nmsg.method = context.global.config.wrapperstt.ioc.estadoCanal.method; \nmsg.thread = \"estadoCanal\";\nmsg.partsBackUp = msg.parts;\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 600,
      "y": 120,
      "wires": [
        [
          "9c924f47.58882"
        ]
      ]
    },
    {
      "id": "26d08e34.fc5192",
      "type": "Cache out",
      "z": "2da4fc90.909b04",
      "name": "saveOnCache",
      "cache": "cc379902.9a97e8",
      "keyType": "msg",
      "keyProperty": "data.uid",
      "valueType": "msg",
      "valueProperty": "payload",
      "ttlType": "msg",
      "ttlProperty": "",
      "useString": false,
      "x": 1400,
      "y": 80,
      "wires": []
    },
    {
      "id": "9375fa00.5142b8",
      "type": "join",
      "z": "2da4fc90.909b04",
      "name": "",
      "mode": "custom",
      "build": "object",
      "property": "payload",
      "propertyType": "msg",
      "key": "thread",
      "joiner": "\\n",
      "joinerType": "str",
      "accumulate": false,
      "timeout": "10",
      "count": "2",
      "x": 1010,
      "y": 100,
      "wires": [
        [
          "8710d9ac.a56b68"
        ]
      ]
    },
    {
      "id": "60867867.c14d58",
      "type": "debug",
      "z": "728edb1b.dd9b64",
      "name": "",
      "active": false,
      "console": "false",
      "complete": "true",
      "x": 2431.1666259765625,
      "y": 136.88888549804688,
      "wires": []
    },
    {
      "id": "9c924f47.58882",
      "type": "http request",
      "z": "2da4fc90.909b04",
      "name": "channelStatus",
      "method": "use",
      "ret": "obj",
      "url": "",
      "tls": "",
      "x": 820,
      "y": 120,
      "wires": [
        [
          "9375fa00.5142b8"
        ]
      ]
    },
    {
      "id": "e115ed18.961ee",
      "type": "http request",
      "z": "2da4fc90.909b04",
      "name": "viewOnly",
      "method": "use",
      "ret": "obj",
      "url": "",
      "tls": "",
      "x": 800,
      "y": 80,
      "wires": [
        [
          "9375fa00.5142b8"
        ]
      ]
    },
    {
      "id": "5797a29e.c9cd5c",
      "type": "debug",
      "z": "728edb1b.dd9b64",
      "name": "",
      "active": true,
      "console": "false",
      "complete": "true",
      "x": 1390,
      "y": 220,
      "wires": []
    },
    {
      "id": "6504dd4d.e81ae4",
      "type": "debug",
      "z": "3e1c47b2.c62058",
      "name": "",
      "active": true,
      "console": "false",
      "complete": "true",
      "x": 863.1666870117188,
      "y": 168.66665649414062,
      "wires": []
    },
    {
      "id": "8710d9ac.a56b68",
      "type": "function",
      "z": "2da4fc90.909b04",
      "name": "parseIOCResponse",
      "func": "msg.parts = msg.partsBackUp;\n\nconst viewOnly = msg.payload.viewOnly || {};\nconst channelStatus = msg.payload.estadoCanal || {};\n\nconst isViewOnly = viewOnly.hasOwnProperty(\"isViewOnly\") ? viewOnly.isViewOnly : null;\nconst isActive = channelStatus.hasOwnProperty(\"isActive\") ? channelStatus.isActive : null;\n\nif (isViewOnly === null || isActive === null) {\n    //node.log(`${msg.idrequest} Some error occured in IOC: isViewOnly=${isViewOnly} | isActive=${isActive}`);\n    msg.statusCode = 500;\n    if (viewOnly.httpCode) {\n        node.log(`${msg.idrequest} Error in IOC viewOnly: ${JSON.stringify(viewOnly)}`);\n        msg.payload = viewOnly;\n    }\n    else if (channelStatus.httpCode) {\n        node.log(`${msg.idrequest} Error in IOC channelStatus: ${JSON.stringify(channelStatus)}`);\n        msg.payload = channelStatus;\n    }\n    else {\n        node.log(`${msg.idrequest} Unexpected error in IOC: ${JSON.stringify(msg.payload)}`);\n        context.global.utils.prepareError(500,\n            JSON.stringify(msg.payload),\n            msg,\n            node\n        );\n    }\n    return [null, msg];\n}\nelse {\n    let status;\n    if (isActive && !isViewOnly) {\n        status = \"normal\";\n    }\n    else if (isActive && isViewOnly) {\n        status = \"readonly\";\n    }\n    else {\n        status = \"blocked\";\n    }\n    node.log(`${msg.idrequest} Status in IOC: ${status}`);\n    msg.payload = {\n       \"status\": status\n    };\n    return [msg, null]\n}\n\nreturn msg;",
      "outputs": "2",
      "noerr": 0,
      "x": 1190,
      "y": 100,
      "wires": [
        [
          "26d08e34.fc5192"
        ],
        []
      ],
      "outputLabels": [
        "correctIOCResponses",
        "koInIOC"
      ]
    },
    {
      "id": "c79a4eca.d0aa",
      "type": "change",
      "z": "728edb1b.dd9b64",
      "name": "saveToken",
      "rules": [
        {
          "t": "set",
          "p": "tokenSTT",
          "pt": "msg",
          "to": "payload",
          "tot": "msg"
        }
      ],
      "action": "",
      "property": "",
      "from": "",
      "to": "",
      "reg": false,
      "x": 1430,
      "y": 80,
      "wires": [
        [
          "8cbd539b.044d6"
        ]
      ]
    },
    {
      "id": "2b4b6bda.572bf4",
      "type": "change",
      "z": "2da4fc90.909b04",
      "name": "yesItWasCached",
      "rules": [
        {
          "t": "set",
          "p": "payload",
          "pt": "msg",
          "to": "cachedData",
          "tot": "msg"
        }
      ],
      "action": "",
      "property": "",
      "from": "",
      "to": "",
      "reg": false,
      "x": 590,
      "y": 40,
      "wires": [
        []
      ]
    },
    {
      "id": "a433e1b.285702",
      "type": "change",
      "z": "728edb1b.dd9b64",
      "name": "setIdRequest",
      "rules": [
        {
          "t": "set",
          "p": "idrequest",
          "pt": "msg",
          "to": "$join([\"[wrapperstt \", _msgid, \"] \"], \"\")\t",
          "tot": "jsonata"
        }
      ],
      "action": "",
      "property": "",
      "from": "",
      "to": "",
      "reg": false,
      "x": 610,
      "y": 80,
      "wires": [
        [
          "eb031d95.05ec1"
        ]
      ]
    },
    {
      "id": "46194855.6fb378",
      "type": "function",
      "z": "3e1c47b2.c62058",
      "name": "STTerror",
      "func": "node.log(`${msg.idrequest} Error received from STT: ${msg.statusCode} - ${JSON.stringify(msg.payload)}`);\n\nreturn msg;",
      "outputs": 1,
      "noerr": 0,
      "x": 680,
      "y": 240,
      "wires": [
        []
      ]
    },
    {
      "id": "18964177.b9320f",
      "type": "subflow:c5b147b8.e229b8",
      "z": "41d38104.9fbac",
      "x": 810,
      "y": 120,
      "wires": [
        [
          "aae9c9f1.f571a8"
        ]
      ]
    },
    {
      "id": "1a3663d6.e4c36c",
      "type": "template",
      "z": "41d38104.9fbac",
      "name": "request_body",
      "field": "inputXML",
      "fieldType": "msg",
      "format": "handlebars",
      "syntax": "mustache",
      "template": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.isban.es/webservices/TECHNICAL_FACADES/Security/F_facseg_security/internet/ACFACSEGSecurity/v1\">\n#header#\n  <soapenv:Body>\n    <v1:retrieveMultipleUser facade=\"{{data.ws_facade}}\">\n      <repository>{{data.repository}}</repository>\n      <userInformation>\n      {{#data.uid}}\n        <attUID>{{data.uid}}</attUID>\n      {{/data.uid}}\n      {{#data.loginID}}\n        <attAlias>{{data.loginID}}</attAlias>\n      {{/data.loginID}}\n      {{#data.person_type}}\n        <attPersonNumber>\n          <TIPO_DE_PERSONA>{{data.person_type}}</TIPO_DE_PERSONA>\n          <CODIGO_DE_PERSONA>{{data.person_code}}</CODIGO_DE_PERSONA>\n        </attPersonNumber>\n      {{/data.person_type}}\n      </userInformation>\n    </v1:retrieveMultipleUser>\n  </soapenv:Body>\n</soapenv:Envelope>\n",
      "x": 600,
      "y": 120,
      "wires": [
        [
          "18964177.b9320f"
        ]
      ]
    },
    {
      "id": "12e0789.f754687",
      "type": "function",
      "z": "c5b147b8.e229b8",
      "name": "prepareRequest",
      "func": "msg.payload = msg.inputXML\n    .replace(\"#header#\", msg.data.headerWS)\n    .replace(\"<soapenv:Body>\", `<soapenv:Body>\\n<!-- Request from nodered ${msg._msgid} -->`)\n    ;\nreturn msg;\n",
      "outputs": 1,
      "noerr": 0,
      "x": 760,
      "y": 100,
      "wires": [
        [
          "7eddef3f.9ad15",
          "5dfa3719.5d08b8"
        ]
      ]
    }
  ];

RED.nodes.import(newNodesObj);

setTimeout(function () {
  const tabs = RED.workspaces.tabs();
  const keys = Object.keys(tabs);
  print(keys).catch((err) => console.log(err));
}, 100); // Timeout for style loading

function print(keys) {
  const key = keys.pop();
  if (!key) {
    return;
  } else {
    RED.workspaces.show(key);
    return RED.view.redraw(true).then(function (uri) {
      console.log('<img src="' + uri + '"></img>');
      const promise = print(keys);
      if (promise) {
        promise.catch((err) => console.log(err));
      }
    });
  }
}
