const NodeRedFlowDrawer = require('./flow-drawer');

// var newNodesObj = [
//     {
//       "id": "728edb1b.dd9b64",
//       "type": "tab",
//       "label": "Wrapperstt",
//       "disabled": false,
//       "info": ""
//     },
//     {
//       "id": "670b6620.41bfa8",
//       "type": "tab",
//       "label": "xxxMa",
//       "disabled": false,
//       "info": ""
//     },
//     {
//       "id": "41d38104.9fbac",
//       "type": "tab",
//       "label": "BKS WSDLs"
//     },
//     {
//       "id": "e2f95d0f.fa398",
//       "type": "tab",
//       "label": "Security",
//       "disabled": true,
//       "info": ""
//     },
//     {
//       "id": "3e1c47b2.c62058",
//       "type": "subflow",
//       "name": "Wrapperstt_STTwithCache",
//       "info": "Input:\nmsg.payload.token --> JWT token\n\nConfiguration:\nwrapperstt.stt.endpoint\nwrapperstt.stt.tokens_bks_personal.uri\nwrapperstt.stt.tokens_bks_personal.method\n",
//       "in": [
//         {
//           "x": 50,
//           "y": 30,
//           "wires": [
//             {
//               "id": "c6a82feb.88ae1"
//             }
//           ]
//         }
//       ],
//       "out": [
//         {
//           "x": 880,
//           "y": 120,
//           "wires": [
//             {
//               "id": "41f61896.6bc658",
//               "port": 0
//             }
//           ]
//         },
//         {
//           "x": 820,
//           "y": 240,
//           "wires": [
//             {
//               "id": "46194855.6fb378",
//               "port": 0
//             }
//           ]
//         }
//       ],
//       "outputLabels": [
//         "Correct execution",
//         "Some error happened"
//       ]
//     },
//     {
//       "id": "afd0ddc1.30287",
//       "type": "subflow",
//       "name": "bksJSONwrapper",
//       "info": "- msg.data.token: BKS token\n- msg.requestData: input object, that will be sent directly\n- msg.method: HTTP method for the BKS call\n- msg.url: BKS URL\n",
//       "in": [
//         {
//           "x": 60,
//           "y": 80,
//           "wires": [
//             {
//               "id": "eee026ba.378e08"
//             }
//           ]
//         }
//       ],
//       "out": [
//         {
//           "x": 1840,
//           "y": 80,
//           "wires": [
//             {
//               "id": "d73d1a4b.b12458",
//               "port": 0
//             },
//             {
//               "id": "36e2d4ee.12fa6c",
//               "port": 1
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "id": "2da4fc90.909b04",
//       "type": "subflow",
//       "name": "Wrapperstt_IOCwithCache",
//       "info": "",
//       "in": [
//         {
//           "x": 60,
//           "y": 80,
//           "wires": [
//             {
//               "id": "4e658911.e096f8"
//             }
//           ]
//         }
//       ],
//       "out": [
//         {
//           "x": 1340,
//           "y": 40,
//           "wires": [
//             {
//               "id": "8710d9ac.a56b68",
//               "port": 0
//             },
//             {
//               "id": "2b4b6bda.572bf4",
//               "port": 0
//             }
//           ]
//         },
//         {
//           "x": 1340,
//           "y": 120,
//           "wires": [
//             {
//               "id": "8710d9ac.a56b68",
//               "port": 1
//             }
//           ]
//         }
//       ],
//       "outputLabels": [
//         "OK response",
//         "IOC error"
//       ]
//     },
//     {
//       "id": "c5b147b8.e229b8",
//       "type": "subflow",
//       "name": "bksSoapWrapper",
//       "info": "",
//       "in": [
//         {
//           "x": 60,
//           "y": 100,
//           "wires": [
//             {
//               "id": "9a7e6890.f6f688"
//             }
//           ]
//         }
//       ],
//       "out": [
//         {
//           "x": 1362.2777709960938,
//           "y": 97.77786636352539,
//           "wires": [
//             {
//               "id": "d5be8328.10b08",
//               "port": 0
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "id": "bfbde0a1.c002b",
//       "type": "Cache",
//       "z": "",
//       "name": "cache_usema",
//       "defaultTtl": "36000",
//       "checkPeriod": ""
//     },
//     {
//       "id": "513a7aa3.d767d4",
//       "type": "Cache",
//       "z": "",
//       "name": "cache_publicKeys",
//       "defaultTtl": "36000",
//       "checkPeriod": ""
//     },
//     {
//       "id": "5a4cbd3.9e41144",
//       "type": "tls-config",
//       "z": "",
//       "name": "No-cert-verification",
//       "cert": "",
//       "key": "",
//       "ca": "",
//       "verifyservercert": false
//     },
//     {
//       "id": "869a1fb6.3c48e",
//       "type": "Cache",
//       "z": "",
//       "name": "cache_crema",
//       "defaultTtl": "600",
//       "checkPeriod": ""
//     },
//     {
//       "id": "296523d4.ea694c",
//       "type": "Cache",
//       "z": "3e1c47b2.c62058",
//       "name": "cacheSTTpersonalBKSTokens",
//       "defaultTtl": "100",
//       "checkPeriod": ""
//     },
//     {
//       "id": "cc379902.9a97e8",
//       "type": "Cache",
//       "z": "2da4fc90.909b04",
//       "name": "cacheIOCStatus",
//       "defaultTtl": "3600",
//       "checkPeriod": ""
//     },
//     {
//       "id": "36573ce1.e2f544",
//       "type": "swagger-doc",
//       "z": "",
//       "summary": "",
//       "description": "",
//       "tags": "",
//       "consumes": "",
//       "produces": "",
//       "parameters": [
//         {
//           "name": "status",
//           "in": "query",
//           "description": "Credential status to be considered for the output",
//           "required": false,
//           "type": "string",
//           "format": "List of strings, separated by comma"
//         }
//       ],
//       "responses": {},
//       "deprecated": false
//     },
//     {
//       "id": "bd91a484.29ff88",
//       "type": "http in",
//       "z": "e2f95d0f.fa398",
//       "name": "",
//       "url": "/testbks",
//       "method": "post",
//       "swaggerDoc": "",
//       "x": 121.16667175292969,
//       "y": 94.88888549804688,
//       "wires": [
//         [
//           "d6c39ff7.e62dd"
//         ]
//       ]
//     },
//     {
//       "id": "d6c39ff7.e62dd",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "",
//       "func": "let ver = context.global.crypto.createVerify(\"RSA-SHA1\");\nver.write(msg.payload.token);\nver.end();\nmsg.payload = ver.verify(msg.payload.publicKey, msg.payload.signature, \"base64\");\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 289.1666564941406,
//       "y": 97,
//       "wires": [
//         [
//           "2a7729b0.cbf616"
//         ]
//       ]
//     },
//     {
//       "id": "2a7729b0.cbf616",
//       "type": "http response",
//       "z": "e2f95d0f.fa398",
//       "name": "",
//       "x": 437.16668701171875,
//       "y": 95.11111450195312,
//       "wires": []
//     },
//     {
//       "id": "9a1ff6a1.427248",
//       "type": "http in",
//       "z": "e2f95d0f.fa398",
//       "name": "",
//       "url": "/security/verifyBKSToken",
//       "method": "post",
//       "swaggerDoc": "",
//       "x": 182.1666717529297,
//       "y": 186.8888931274414,
//       "wires": [
//         [
//           "a91b8c01.233da"
//         ]
//       ]
//     },
//     {
//       "id": "a91b8c01.233da",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "init",
//       "func": "//parseBKSToken\nmsg.data = {};\n\nmsg.data.token = msg.req.headers.authorization || \"\";\nif (msg.data.token === \"\") {\n    context.global.utils.prepareError(400, \"The authorization header has not been set in the request\", msg, node);\n}\nelse {\n    msg.data.token_parts = context.global.utils.parseBKSToken(msg.data.token, node);\n    node.log(JSON.stringify(msg.data.token_parts));\n    if (msg.data.token_parts.isValid) {\n        msg.data.now = Date.now();\n        node.log(msg.data.now);\n    }\n    else {\n        context.global.utils.prepareError(400, \"The authorization header is not a BKS token\", msg, node);\n    }\n//msg.payload = msg.data;\n}\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 398.16669845581055,
//       "y": 186.55555820465088,
//       "wires": [
//         [
//           "15d414bd.ebe52b"
//         ]
//       ]
//     },
//     {
//       "id": "15d414bd.ebe52b",
//       "type": "switch",
//       "z": "e2f95d0f.fa398",
//       "name": "wrongRequest",
//       "property": "statusCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "gte",
//           "v": "400",
//           "vt": "num"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "false",
//       "outputs": 2,
//       "x": 573.1666870117188,
//       "y": 186.55555725097656,
//       "wires": [
//         [
//           "a16cd977.b4c818"
//         ],
//         [
//           "1211d9d4.f8ab36"
//         ]
//       ]
//     },
//     {
//       "id": "a16cd977.b4c818",
//       "type": "http response",
//       "z": "e2f95d0f.fa398",
//       "name": "error400",
//       "x": 760.1666793823242,
//       "y": 139.55555725097656,
//       "wires": []
//     },
//     {
//       "id": "2720a741.31e288",
//       "type": "http response",
//       "z": "e2f95d0f.fa398",
//       "name": "end",
//       "x": 2069.166400909424,
//       "y": 163.55563926696777,
//       "wires": []
//     },
//     {
//       "id": "1211d9d4.f8ab36",
//       "type": "switch",
//       "z": "e2f95d0f.fa398",
//       "name": "expired",
//       "property": "data.token_parts.valid_until",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "lt",
//           "v": "data.now",
//           "vt": "msg"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "false",
//       "outputs": 2,
//       "x": 762.1666793823242,
//       "y": 194.22222518920898,
//       "wires": [
//         [
//           "bfa96669.e2fac8"
//         ],
//         [
//           "b7fe9358.04e8a"
//         ]
//       ]
//     },
//     {
//       "id": "bfa96669.e2fac8",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "setExpired",
//       "func": "context.global.utils.prepareError(401, \"The token has expired\", msg, node);\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 934.1666259765625,
//       "y": 141.11111450195312,
//       "wires": [
//         [
//           "f74fe5f8.62bb48"
//         ]
//       ]
//     },
//     {
//       "id": "f74fe5f8.62bb48",
//       "type": "http response",
//       "z": "e2f95d0f.fa398",
//       "name": "error401expired",
//       "x": 1126.1666259765625,
//       "y": 140.22222900390625,
//       "wires": []
//     },
//     {
//       "id": "b7fe9358.04e8a",
//       "type": "Cache in",
//       "z": "e2f95d0f.fa398",
//       "name": "getCachePublicKey",
//       "cache": "513a7aa3.d767d4",
//       "keyType": "msg",
//       "keyProperty": "data.token_parts.emitter",
//       "valueType": "msg",
//       "valueProperty": "payload",
//       "useString": false,
//       "x": 951.1665992736816,
//       "y": 200.66666984558105,
//       "wires": [
//         [
//           "ee79f382.8868b"
//         ]
//       ]
//     },
//     {
//       "id": "ee79f382.8868b",
//       "type": "switch",
//       "z": "e2f95d0f.fa398",
//       "name": "",
//       "property": "payload",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "nnull"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "false",
//       "outputs": 2,
//       "x": 1129.6111450195312,
//       "y": 201.66665649414062,
//       "wires": [
//         [
//           "6c2e3c6c.58baa4"
//         ],
//         [
//           "72c1e9f7.0c54e8"
//         ]
//       ]
//     },
//     {
//       "id": "72c1e9f7.0c54e8",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "prepare2callKeyManager",
//       "func": "msg.headers = {};\nmsg.url = context.global.config.security.url.keymanager.replace(\"{key}\", msg.data.token_parts.emitter);\nnode.log(msg._msgid + \"URL to call keymanager: \" + msg.url);\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1325.8332061767578,
//       "y": 240.66666984558105,
//       "wires": [
//         [
//           "2b1357ba.708e68"
//         ]
//       ]
//     },
//     {
//       "id": "2b1357ba.708e68",
//       "type": "http request",
//       "z": "e2f95d0f.fa398",
//       "name": "publicKeyManager",
//       "method": "GET",
//       "ret": "obj",
//       "url": "",
//       "tls": "5a4cbd3.9e41144",
//       "x": 1552.8333129882812,
//       "y": 241.00000381469727,
//       "wires": [
//         [
//           "4e868f98.fc02b"
//         ]
//       ]
//     },
//     {
//       "id": "4e868f98.fc02b",
//       "type": "switch",
//       "z": "e2f95d0f.fa398",
//       "name": "",
//       "property": "statusCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "eq",
//           "v": "200",
//           "vt": "str"
//         },
//         {
//           "t": "eq",
//           "v": "404",
//           "vt": "str"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "false",
//       "outputs": 3,
//       "x": 1726.0557174682617,
//       "y": 240.00000381469727,
//       "wires": [
//         [
//           "d19967d8.e1e218",
//           "6c2e3c6c.58baa4"
//         ],
//         [
//           "b27c88fc.6e5e98"
//         ],
//         [
//           "ada492bf.f1e64"
//         ]
//       ]
//     },
//     {
//       "id": "ada492bf.f1e64",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "setGeneralError",
//       "func": "context.global.utils.prepareError(401,\n    \"Unexpected error ({statusCode}) retrieving the public key to verify the token's signature\"\n    .replace(\"{statusCode}\", msg.statusCode),\n    msg, node);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1897.2777709960938,
//       "y": 291,
//       "wires": [
//         [
//           "de7474fb.7aba68"
//         ]
//       ]
//     },
//     {
//       "id": "de7474fb.7aba68",
//       "type": "http response",
//       "z": "e2f95d0f.fa398",
//       "name": "error401generic",
//       "x": 2094.6111450195312,
//       "y": 291.1111145019531,
//       "wires": []
//     },
//     {
//       "id": "b27c88fc.6e5e98",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "setUnknownEmitter",
//       "func": "context.global.utils.prepareError(401,\n    \"The token emitter ({emitter}) has not defined the public key in the keymanager\"\n    .replace(\"{emitter}\", msg.data.token_parts.emitter),\n    msg, node);\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1906.8888893127441,
//       "y": 249.00000381469727,
//       "wires": [
//         [
//           "dd4dd9ce.e2a798"
//         ]
//       ]
//     },
//     {
//       "id": "dd4dd9ce.e2a798",
//       "type": "http response",
//       "z": "e2f95d0f.fa398",
//       "name": "error401wrongEmitter",
//       "x": 2135.277780532837,
//       "y": 249.11111450195312,
//       "wires": []
//     },
//     {
//       "id": "d19967d8.e1e218",
//       "type": "Cache out",
//       "z": "e2f95d0f.fa398",
//       "name": "storePublicKey",
//       "cache": "513a7aa3.d767d4",
//       "keyType": "msg",
//       "keyProperty": "data.token_parts.emitter",
//       "valueType": "msg",
//       "valueProperty": "payload.key",
//       "ttlType": "msg",
//       "ttlProperty": "",
//       "useString": false,
//       "x": 1899.0555419921875,
//       "y": 207.11111450195312,
//       "wires": []
//     },
//     {
//       "id": "6c2e3c6c.58baa4",
//       "type": "function",
//       "z": "e2f95d0f.fa398",
//       "name": "verifySignature",
//       "func": "let publicKey = msg.payload.key ? msg.payload.key : msg.payload;\n\nlet signatureStartPosition = msg.data.token_parts.token_decoded.lastIndexOf(\"#\")+1;\nlet token = msg.data.token_parts.token_decoded.substring(0, signatureStartPosition);\nlet signature = msg.data.token_parts.token_decoded.substring(signatureStartPosition);\n\nnode.log(publicKey);\nnode.log(token);\nnode.log(signature);\n\nif(context.global.utils.isValidBKSSignature(token, signature, publicKey)) {\n    msg.payload = {\n        \"sessionID\": msg.data.token_parts.sessionID,\n        \"ip\": msg.data.token_parts.ip,\n        \"validUntil\": msg.data.token_parts.valid_until,\n        \"emitter\": msg.data.token_parts.emitter,\n        \"uid\": msg.data.token_parts.uid\n    };\n    \n    msg.headers = {};\n    context.global.utils.setResponseHeaders(msg);\n    msg.statusCode = 200;\n}\nelse {\n    context.global.utils.prepareError(401, \"The token signature cannot be verified using the public key\", msg, node);\n}\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1899.1666870117188,
//       "y": 164,
//       "wires": [
//         [
//           "2720a741.31e288"
//         ]
//       ]
//     },
//     {
//       "id": "c60b4a9d.862f78",
//       "type": "comment",
//       "z": "41d38104.9fbac",
//       "name": "Security structural",
//       "info": "",
//       "x": 150,
//       "y": 80,
//       "wires": []
//     },
//     {
//       "id": "2634f549.bdc28a",
//       "type": "http in",
//       "z": "41d38104.9fbac",
//       "name": "",
//       "url": "/strucsec/:bank/retrieveMultipleUser",
//       "method": "get",
//       "swaggerDoc": "",
//       "x": 180,
//       "y": 120,
//       "wires": [
//         [
//           "ddf7354c.78c4a8"
//         ]
//       ]
//     },
//     {
//       "id": "ddf7354c.78c4a8",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "init",
//       "func": "msg.idrequest = \"[wsdls-strucsec-rtvmlpusr \" + msg._msgid + \"] \";\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"'\" );\n\nmsg.data = {};\n\nmsg.data.outputs = {\n    \"BKS_result_ok\": {\n        \"status\": 200\n    },\n    \"EX_NoExistsRepository\": {\n        \"status\": 400,\n        \"message\": \"Invalid repository: {repository}\"\n    },\n    \"EX_TechnicalError\": {\n        \"status\": 500,\n        \"message\": \"Technical error in the LDAP operation\"\n    },\n    \"EX_NoResults\": {\n        \"status\": 404,\n        \"message\": \"No data found\"\n    },\n    \"EX_InvalidParameters\": {\n        \"status\": 400,\n        \"message\": \"Invalid input parameters\"\n    },\n    \"Fault\": {\n        \"status\": 500,\n        \"message\": \"Unexpected error\"\n    }\n};\n\nvar authData = msg.data.authData = context.global.utils.parseAuthorizationHeader(msg.req.headers.authorization);\nif (authData.validValue && (authData.isUserPassword || authData.isTokenBKS)) {\n    msg.data.uid = msg.req.query.uid;\n    msg.data.loginID = msg.req.query.login_id;\n    msg.data.person_type = msg.req.query.person_type;\n    msg.data.person_code = msg.req.query.person_code;\n    msg.data.repository = msg.req.query.repository || \"\";\n\n    msg.data.bank = msg.req.params.bank.toLowerCase();\n    msg.data.bank = msg.data.bank === \"seb\" ? \"sb\" : msg.data.bank;\n    \n    if (context.global.config.wsdlbks.ldap.valid_entities.split(\",\").indexOf(msg.data.bank) === -1) {\n        // invalid bank\n        context.global.utils.prepareError(400, `Invalid bank. Possible values: ${context.global.config.wsdlbks.ldap.valid_entities}`, msg);\n    }\n    else if (msg.data.uid || msg.data.loginID || (msg.data.person_type && msg.data.person_code)) {\n        // correct request\n        let cfg = context.global.config;\n        let cfgStr = cfg.wsdlbks.ldap[msg.data.bank].structural_security;\n        msg.method = cfgStr.httpmethod;\n        msg.url = cfgStr.endpoint;\n        msg.data.ws_facade = cfgStr.facade;\n        msg.headers = {};\n        msg.data.cache_key = `${msg.data.bank}_${msg.data.uid || msg.data.loginID || (msg.data.person_type + msg.data.person_code)}`;\n    }\n    else {\n        // bad request\n        context.global.utils.prepareError(400, \"Invalid search criteria: it is mandatory to send the uid, or the login_id or the person_type and person_code\", msg);\n    }\n}\nelse {\n    context.global.utils.prepareError(400, \"Authorization header not present or invalid format (expected Basic or Bearer tokenBKS)\", msg);\n}\n\nreturn msg;\n",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 430,
//       "y": 120,
//       "wires": [
//         [
//           "1a3663d6.e4c36c"
//         ]
//       ]
//     },
//     {
//       "id": "9a7e6890.f6f688",
//       "type": "switch",
//       "z": "c5b147b8.e229b8",
//       "name": "correctRequest",
//       "property": "payload.httpCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "null"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 200,
//       "y": 100,
//       "wires": [
//         [
//           "78192f0d.5cf2e"
//         ],
//         [
//           "995888c5.79b5f8"
//         ]
//       ]
//     },
//     {
//       "id": "995888c5.79b5f8",
//       "type": "http response",
//       "z": "c5b147b8.e229b8",
//       "name": "ko400",
//       "statusCode": "",
//       "headers": {},
//       "x": 370,
//       "y": 140,
//       "wires": []
//     },
//     {
//       "id": "78192f0d.5cf2e",
//       "type": "switch",
//       "z": "c5b147b8.e229b8",
//       "name": "authType",
//       "property": "data.authData.isUserPassword",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "true"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 380,
//       "y": 100,
//       "wires": [
//         [
//           "d13dd352.e90fb"
//         ],
//         [
//           "11b49d0f.35e023"
//         ]
//       ]
//     },
//     {
//       "id": "d13dd352.e90fb",
//       "type": "template",
//       "z": "c5b147b8.e229b8",
//       "name": "userPassword",
//       "field": "data.headerWS",
//       "fieldType": "msg",
//       "format": "handlebars",
//       "syntax": "mustache",
//       "template": "<soapenv:Header>\n  <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">\n    <wsse:UsernameToken wsu:Id=\"UsernameToken-2\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\n      <wsse:Username>{{data.authData.user}}</wsse:Username>\n      <wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">{{data.authData.password}}</wsse:Password>\n    </wsse:UsernameToken>\n  </wsse:Security>\n</soapenv:Header>",
//       "x": 560,
//       "y": 80,
//       "wires": [
//         [
//           "12e0789.f754687"
//         ]
//       ]
//     },
//     {
//       "id": "11b49d0f.35e023",
//       "type": "template",
//       "z": "c5b147b8.e229b8",
//       "name": "tokenBKS",
//       "field": "data.headerWS",
//       "fieldType": "msg",
//       "format": "handlebars",
//       "syntax": "mustache",
//       "template": "<soapenv:Header>\n  <wsse:Security soapenv:actor=\"http://www.isban.es/soap/actor/wssecurityB64\" soapenv:mustUnderstand=\"1\" S12:role=\"wssecurity\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:S12=\"http://www.w3.org/2003/05/soap-envelope\">\n    <wsse:BinarySecurityToken ValueType=\"esquema\" EncodingType=\"wsse:Base64Binary\" wsu:Id=\"SSOToken\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">{{data.authData.tokenBKS}}</wsse:BinarySecurityToken>\n  </wsse:Security>\n</soapenv:Header>",
//       "x": 540,
//       "y": 120,
//       "wires": [
//         [
//           "12e0789.f754687"
//         ]
//       ]
//     },
//     {
//       "id": "7eddef3f.9ad15",
//       "type": "http request",
//       "z": "c5b147b8.e229b8",
//       "name": "bks",
//       "method": "use",
//       "ret": "txt",
//       "url": "",
//       "tls": "",
//       "x": 930,
//       "y": 100,
//       "wires": [
//         [
//           "5dfa3719.5d08b8",
//           "3e2e72d0.b1ba7e"
//         ]
//       ]
//     },
//     {
//       "id": "3b8b3f48.8307f",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "ok",
//       "statusCode": "",
//       "headers": {},
//       "x": 1310,
//       "y": 80,
//       "wires": []
//     },
//     {
//       "id": "aae9c9f1.f571a8",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "resultSwitch",
//       "func": "function prepareOutput(index) {\n    let rtn = [null, null, null, null, null, null];\n    rtn[index] = msg;\n    return rtn;\n}\n\nconst RETURNS = Object.keys(msg.data.outputs);\n\nmsg.payload = msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0];\n\nif (msg.statusCode === 200) {\n    msg.payload = msg.payload[\"prefixRigel0:retrieveMultipleUserResponse\"][0][\"methodResult\"][0];\n    return prepareOutput(RETURNS.indexOf(\"BKS_result_ok\"));\n}\nelse {\n    let exception = JSON.stringify(msg.payload);\n    let rtn;\n    let found=false, i=1;\n    while (!found && i<RETURNS.length) {\n        if (~exception.indexOf(RETURNS[i])) {\n            msg.payload = msg.payload[Object.keys(msg.payload)[0]][0];\n            msg.payload.exception = RETURNS[i];\n            rtn = prepareOutput(i);\n            found = true;\n        }\n        else {\n            i++;\n        }\n    }\n    return rtn;\n}\n",
//       "outputs": "6",
//       "noerr": 0,
//       "x": 1010,
//       "y": 120,
//       "wires": [
//         [
//           "abf2a9c9.807a98"
//         ],
//         [
//           "3f4976da.66b98a"
//         ],
//         [
//           "3f4976da.66b98a"
//         ],
//         [
//           "3f4976da.66b98a"
//         ],
//         [
//           "3f4976da.66b98a"
//         ],
//         [
//           "5925eb8c.203004"
//         ]
//       ],
//       "outputLabels": [
//         "ok",
//         "EX_NoExistsRepository",
//         "EX_TechnicalError",
//         "EX_NoResults",
//         "EX_InvalidParameters",
//         "Fault"
//       ]
//     },
//     {
//       "id": "d5be8328.10b08",
//       "type": "xml",
//       "z": "c5b147b8.e229b8",
//       "name": "",
//       "attr": "",
//       "chr": "",
//       "x": 1232.2777709960938,
//       "y": 97.77786636352539,
//       "wires": [
//         []
//       ]
//     },
//     {
//       "id": "abf2a9c9.807a98",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "ok",
//       "func": "let data = msg.payload.user[0];\n\nfunction getAttribute(attr, subdata) {\n    let d = subdata ? subdata : data;\n    return d && d[attr] ? d[attr][0] : undefined;\n}\n\nfunction getAttributeList(attr, elementName) {\n    let list = data[attr] ? data[attr] : [];\n    let rtn = [];\n    list.forEach(function(v, i){\n        rtn.push(getAttribute(elementName, v));\n    });\n    return rtn;\n}\n\nfunction parseBksBoolean(bksBoolean) {\n    return \"S\" === bksBoolean ? true : false;\n}\n\n/* TODO\n<iColl id=\"attMobile\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attMobile\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"TELEFONO_INTERNACIONAL\"/>\n</iColl>\n<iColl id=\"attCreditCardNumber\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"ALFA JUST IZQUIERDA\" id=\"attCreditCardNumber\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"PAN\"/>\n</iColl>\n<iColl id=\"attContractNumber\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attContractNumber\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"DESCRIPCION_BREVE\"/>\n</iColl>\n<iColl id=\"attPersonalID\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attPersonalID\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"DESCRIPCION_BREVE\"/>\n</iColl>\n<tdc format=\"POR DEFECTO\" id=\"attDocumentRep\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"DOCUM_PERSONA_CORPORATIVO\"/>\n<tdc format=\"CONCATENADOR GUION\" id=\"attLanguage\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"IDIOMA_CORPORATIVO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attSecondSign\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLastSignDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"TIMESTAMP_ALTA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLogonImage\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"URL\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLogonPhrase\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"DESCRIPCION_MEDIA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attmTANRevokedSign\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<iColl id=\"attCompanyID\" minOccurs=\"0\" size=\"\">\n\t<tdc format=\"POR DEFECTO\" id=\"attCompanyID\" in=\"no\" maxOccurs=\"unbounded\" minOccurs=\"0\" nillable=\"true\" out=\"yes\" type=\"DESCRIPCION_BREVE\"/>\n</iColl>\n<tdc format=\"POR DEFECTO\" id=\"attCompanyName\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"DESCRIPCION_MEDIA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLegalPersonNumber\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"NUM_PERSONA_CLIENTE\"/>\n<tdc format=\"FECHA CON MASCARA\" id=\"attStartDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"FECHA_GENERICA\"/>\n<tdc format=\"FECHA CON MASCARA\" id=\"attEndDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"FECHA_GENERICA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attAuthenticationLastError\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attSignByPositionsActive\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"INDICADOR_SI-NO\"/>\n<tdc format=\"POR DEFECTO\" id=\"attRevocationDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"TIMESTAMP_ALTA\"/>\n<tdc format=\"POR DEFECTO\" id=\"attLockDate\" in=\"no\" minOccurs=\"0\" out=\"yes\" type=\"TIMESTAMP_ALTA\"/>\n*/\nmsg.payload = {\n    \"surname\": getAttribute(\"attSurname\"),\n    \"fullName\": getAttribute(\"attFullName\"),\n    \"uid\": getAttribute(\"attUID\"),\n    \"loginID\": getAttribute(\"attAlias\"),\n    \"lastLogonDate\": getAttribute(\"attLastLogonDate\"),\n    \"lastChangePwdDate\": getAttribute(\"attLastChangePWDate\"),\n    \"attEntity\": getAttribute(\"attEntity\"),\n    \"environment\": getAttribute(\"attEnvironment\"),\n    \"expirationDate\": getAttribute(\"attExpirationDate\"),\n    \"isInitialSign\": parseBksBoolean(getAttribute(\"attFirstTimeSign\")),\n    \"isInitialLogin\": parseBksBoolean(getAttribute(\"attFirstTime\")),\n    \"isRevokedPassword\": parseBksBoolean(getAttribute(\"attRevokedPassword\")),\n    \"isRevokedSign\": parseBksBoolean(getAttribute(\"attRevokedSign\")),\n    \"clientType\": getAttribute(\"TIPO_DE_PERSONA\", getAttribute(\"attPersonNumber\")),\n    \"clientCode\": getAttribute(\"CODIGO_DE_PERSONA\", getAttribute(\"attPersonNumber\")),\n    \"secondToTheLastLoginDate\": getAttribute(\"attBeforeLastLogonDate\"),\n    \"signMethods\": getAttributeList(\"attSignMethods\", \"dato\"),\n    \"name\": getAttribute(\"attName\"),\n    \"documentType\": getAttribute(\"TIPO_DOCUM_PERSONA_CORP\", getAttribute(\"attDocument\")),\n    \"documentCode\": (getAttribute(\"CODIGO_DOCUM_PERSONA_CORP\", getAttribute(\"attDocument\")) || \"\").trim(),\n    \"lastIncorrectLoginDate\": getAttribute(\"attLastUnsuccessLogon\"),\n    \"isUserLocked\": parseBksBoolean(getAttribute(\"attLockUser\")),\n    \"isPasswordActive\": parseBksBoolean(getAttribute(\"attPasswordActive\"))\n};\nmsg.headers = {};\nmsg.statusCode = 200;\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1170,
//       "y": 80,
//       "wires": [
//         [
//           "3b8b3f48.8307f"
//         ]
//       ]
//     },
//     {
//       "id": "3f4976da.66b98a",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "functionalException",
//       "func": "let exc = msg.payload;\n\nlet excDetail = exc.detail[0][Object.keys(exc.detail[0])][0];\n\nlet exceptionMessage =\n    (msg.data.outputs[exc.exception].message || \"\").replace(\"{repository}\", msg.data.repository)\n    + \" | \" + exc.faultcode\n    + \" | \" + exc.faultstring\n    + \" | \" + excDetail.errorCode[0].trim()\n    + \" | \" + excDetail.messageByDefault[0]\n    ;\n\nmsg.headers = {};\ncontext.global.utils.prepareError(\n    msg.data.outputs[exc.exception].status,\n    exceptionMessage,\n    msg,\n    node\n);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1210,
//       "y": 120,
//       "wires": [
//         [
//           "1f24e3a0.97a3fc"
//         ]
//       ]
//     },
//     {
//       "id": "5925eb8c.203004",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "unexpectedException",
//       "func": "let exc = msg.payload;\n\nlet exceptionMessage =\n    (msg.data.outputs[exc.exception].message || \"\").replace(\"{repository}\", msg.data.repository)\n    + \" | \" + exc.faultcode\n    + \" | \" + exc.faultstring\n    ;\n\nmsg.headers = {};\ncontext.global.utils.prepareError(\n    msg.data.outputs[exc.exception].status,\n    exceptionMessage,\n    msg,\n    node\n);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1220,
//       "y": 160,
//       "wires": [
//         [
//           "8f9e1908.4bdf48"
//         ]
//       ]
//     },
//     {
//       "id": "1f24e3a0.97a3fc",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "koFunctional",
//       "statusCode": "",
//       "headers": {},
//       "x": 1410,
//       "y": 120,
//       "wires": []
//     },
//     {
//       "id": "8f9e1908.4bdf48",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "koUnexpected",
//       "statusCode": "",
//       "headers": {},
//       "x": 1440,
//       "y": 160,
//       "wires": []
//     },
//     {
//       "id": "5dfa3719.5d08b8",
//       "type": "function",
//       "z": "c5b147b8.e229b8",
//       "name": "print2log",
//       "func": "if (~msg.payload.indexOf(\"Request from nodered\")) {\n    // we've come from the request\n    if (context.global.config.logging.bks.show_request) {\n        //node.log(msg.idrequest + \"Request to BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n        node.log(`${msg.idrequest} Request to BKS (${msg.payload.length} bytes): ${msg.payload.replace(/<wsse\\:Password[^>]*>[^<]+<\\/wsse\\:Password>/, \"<wsse:Password>***</wsse:Password>\").replace(/<wsse\\:BinarySecurityToken[^>]*>([^>]+)[^>]{20}</, \"<wsse:BinarySecurityToken>$1<\")}`);\n    }\n}\nelse {\n    // we've come from the response\n    if (context.global.config.logging.bks.show_response) {\n        node.log(msg.idrequest + \"Response from BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n    }\n}\n\nreturn null;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 972.3333740234375,
//       "y": 46.111183166503906,
//       "wires": [
//         []
//       ]
//     },
//     {
//       "id": "3e2e72d0.b1ba7e",
//       "type": "switch",
//       "z": "c5b147b8.e229b8",
//       "name": "hasBody",
//       "property": "payload.length",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "gt",
//           "v": "0",
//           "vt": "num"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 1080,
//       "y": 100,
//       "wires": [
//         [
//           "d5be8328.10b08"
//         ],
//         [
//           "11b8640f.39a46c"
//         ]
//       ],
//       "outputLabels": [
//         "withBody",
//         null
//       ]
//     },
//     {
//       "id": "11b8640f.39a46c",
//       "type": "function",
//       "z": "c5b147b8.e229b8",
//       "name": "setNoPayloadError",
//       "func": "msg.headers = {};\ncontext.global.utils.prepareError(\n    500,\n    \"No payload was received from BKS. Maybe the 'facade' (\" + msg.data.ws_facade + \") in the request was invalid? Check https://confluence.ci.gsnet.corp/display/DIGITALUNI/General+-+How+to+see+the+available+methods+inside+an+assembly\",\n    msg,\n    node\n);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1270,
//       "y": 140,
//       "wires": [
//         [
//           "ca1c23c1.d1d38"
//         ]
//       ]
//     },
//     {
//       "id": "ca1c23c1.d1d38",
//       "type": "http response",
//       "z": "c5b147b8.e229b8",
//       "name": "koNoPayload",
//       "statusCode": "",
//       "headers": {},
//       "x": 1500,
//       "y": 140,
//       "wires": []
//     },
//     {
//       "id": "6d19907f.5b4f7",
//       "type": "http in",
//       "z": "670b6620.41bfa8",
//       "name": "",
//       "url": "/crema/linked_credentials/:uid",
//       "method": "get",
//       "upload": false,
//       "swaggerDoc": "",
//       "x": 180,
//       "y": 80,
//       "wires": [
//         [
//           "3aa226fe.91abfa"
//         ]
//       ]
//     },
//     {
//       "id": "3aa226fe.91abfa",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "init",
//       "func": "msg.idrequest = \"[CreMa-lc-uid \" + msg._msgid + \"] \";\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"' | Headers JSON: '\" + JSON.stringify(msg.req.headers)\n    + \"'\" );\n\nmsg.data = {};\nmsg.data.uid = msg.req.params.uid;\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 410,
//       "y": 80,
//       "wires": [
//         [
//           "51eff7f2.1b6e88"
//         ]
//       ]
//     },
//     {
//       "id": "5166e7f2.d59e18",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "prepareSCB",
//       "func": "var cfg = context.global.config;\n\nmsg.url = cfg.crema.scbprofile.endpoint.replace(/\\{uid\\}/g, msg.data.uid);\nnode.log(msg.idrequest + \"URL for SCB: \" + msg.url);\n\nmsg.data.user = cfg.crema.scbprofile.application_user.username;\nmsg.data.password = cfg.crema.scbprofile.application_user.password;\n\nmsg.headers = {\n    \"X-Nodered-Request\": msg.idrequest,\n    \"Authorization\": \"Basic \" + new Buffer(msg.data.user + \":\" + msg.data.password).toString(\"base64\")\n};\n\nmsg.data.thread = \"SCB\";\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 905.0000991821289,
//       "y": 112.00001430511475,
//       "wires": [
//         [
//           "707e309c.41697"
//         ]
//       ]
//     },
//     {
//       "id": "73ac903e.ce2d9",
//       "type": "http response",
//       "z": "670b6620.41bfa8",
//       "name": "",
//       "x": 1715.0003280639648,
//       "y": 140.44449615478516,
//       "wires": []
//     },
//     {
//       "id": "707e309c.41697",
//       "type": "http request",
//       "z": "670b6620.41bfa8",
//       "name": "SCB",
//       "method": "GET",
//       "ret": "obj",
//       "url": "",
//       "tls": "",
//       "x": 1059.0000896453857,
//       "y": 112.77778959274292,
//       "wires": [
//         [
//           "71c41ae7.76ceb4"
//         ]
//       ]
//     },
//     {
//       "id": "71c41ae7.76ceb4",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "parseSCB",
//       "func": "node.log(msg.idrequest + \"SCB profile request finished with status \" + msg.statusCode + \" and data: \" + JSON.stringify(msg.payload));\n\nmsg.payload.statusCode = msg.statusCode;\n\nflow.set(msg._msgid + \"_scb\", msg.payload);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1217.0000915527344,
//       "y": 112.77779006958008,
//       "wires": [
//         [
//           "a08e7b3d.a09548"
//         ]
//       ]
//     },
//     {
//       "id": "a08e7b3d.a09548",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "join",
//       "func": "node.log(msg.idrequest + \"Response arrived from: \" + msg.data.thread);\n\nvar scb = flow.get(msg._msgid + \"_scb\");\nvar sb = flow.get(msg._msgid + \"_sb\");\n\nif (!scb || !sb) {\n    node.log(msg.idrequest + \"One of the needed responses has not arrived yet, let's cancel this thread\");\n    return null;\n}\nelse {\n    node.log(msg.idrequest + \"Both threads have finished, let's continue the execution\");\n    msg.data.scb = scb;\n    msg.data.sb = sb;\n    flow.set(msg._msgid + \"_scb\", undefined);\n    flow.set(msg._msgid + \"_sb\", undefined);\n    return msg;\n}\n",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1372.0000534057617,
//       "y": 141.7777910232544,
//       "wires": [
//         [
//           "8a9b91cf.a2136"
//         ]
//       ]
//     },
//     {
//       "id": "923551bc.b2495",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "prepareSB",
//       "func": "var cfg = context.global.config;\n\nmsg.url = cfg.crema.sbprofile.endpoint.replace(/\\{uid\\}/g, msg.data.uid);\nnode.log(msg.idrequest + \"URL for SB: \" + msg.url);\n\nmsg.data.user = cfg.crema.sbprofile.application_user.username;\nmsg.data.password = cfg.crema.sbprofile.application_user.password;\n\nmsg.headers = {\n    \"X-Nodered-Request\": msg.idrequest,\n    \"Authorization\": \"Basic \" + new Buffer(msg.data.user + \":\" + msg.data.password).toString(\"base64\")\n};\n\nmsg.data.thread = \"SB\";\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 905.1667251586914,
//       "y": 162.88889980316162,
//       "wires": [
//         [
//           "cd6512cf.ac6d4"
//         ]
//       ]
//     },
//     {
//       "id": "cd6512cf.ac6d4",
//       "type": "http request",
//       "z": "670b6620.41bfa8",
//       "name": "SB",
//       "method": "GET",
//       "ret": "obj",
//       "url": "",
//       "tls": "",
//       "x": 1059.1667156219482,
//       "y": 163.6666750907898,
//       "wires": [
//         [
//           "32e2361f.1f319a"
//         ]
//       ]
//     },
//     {
//       "id": "32e2361f.1f319a",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "parseSB",
//       "func": "node.log(msg.idrequest + \"SB profile request finished with status \" + msg.statusCode + \" and data: \" + JSON.stringify(msg.payload));\n\nmsg.payload.statusCode = msg.statusCode;\n\nflow.set(msg._msgid + \"_sb\", msg.payload);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1207.1667175292969,
//       "y": 163.66667556762695,
//       "wires": [
//         [
//           "a08e7b3d.a09548"
//         ]
//       ]
//     },
//     {
//       "id": "8a9b91cf.a2136",
//       "type": "function",
//       "z": "670b6620.41bfa8",
//       "name": "prepareOutput",
//       "func": "var scb = msg.data.scb;\nvar sb = msg.data.sb;\n\nmsg.headers = {};\n\nif (scb.statusCode === 500 || sb.statusCode === 500) {\n    node.warn(msg.idrequest + \"One of the profile retrievals finished with error, let's propagate the error\");\n    \n    msg.statusCode = 500;\n    msg.payload = (scb.statusCode === 500) ? scb : sb;\n    delete msg.payload.statusCode;\n}\nelse {\n    msg.payload = [];\n    \n    if (scb.statusCode === 404) {\n        node.log(msg.idrequest + \"User does not exist in SCB :o\");\n    }\n    else {\n        // SCB 200 response\n        node.log(msg.idrequest + \"User does exist in SCB ;)\");\n        scb.bank_id = \"SCB\";\n        delete scb.statusCode;\n        msg.payload.push(scb);\n    }\n\n    if (sb.statusCode === 404) {\n        node.log(msg.idrequest + \"User does not exist in SB :o\");\n    }\n    else {\n        // SB 200 response\n        node.log(msg.idrequest + \"User does exist in SB ;)\");\n        sb.bank_id = \"SB\";\n        delete sb.statusCode;\n        msg.payload.push(sb);\n    }\n\n    if (msg.payload.length === 0) {\n        node.warn(msg.idrequest + \"The user '\" + msg.data.uid + \"' doesn't exist in the bank!\");\n        context.global.utils.prepareError(404, \"The user '\" + msg.data.uid + \"' doesn't exist in the bank!\", msg, node);\n    }\n    else {\n        node.log(msg.idrequest + \"The user exist in \" + msg.payload.length + \" bank(s)\");\n        msg.statusCode = 200;\n    }\n}\n\ncontext.global.utils.setResponseHeaders(msg);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1541.3334693908691,
//       "y": 141.7777910232544,
//       "wires": [
//         [
//           "73ac903e.ce2d9",
//           "5c44d0a6.41cff"
//         ]
//       ]
//     },
//     {
//       "id": "51eff7f2.1b6e88",
//       "type": "Cache in",
//       "z": "670b6620.41bfa8",
//       "name": "",
//       "cache": "869a1fb6.3c48e",
//       "keyType": "msg",
//       "keyProperty": "data.uid",
//       "valueType": "msg",
//       "valueProperty": "payload",
//       "useString": false,
//       "x": 548.1335105895996,
//       "y": 80.22223281860352,
//       "wires": [
//         [
//           "b0212249.f60c6"
//         ]
//       ]
//     },
//     {
//       "id": "b0212249.f60c6",
//       "type": "switch",
//       "z": "670b6620.41bfa8",
//       "name": "isCached",
//       "property": "payload",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "nnull"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 699.1333312988281,
//       "y": 81.82221698760986,
//       "wires": [
//         [
//           "5391f1cb.05f03"
//         ],
//         [
//           "5166e7f2.d59e18",
//           "923551bc.b2495"
//         ]
//       ]
//     },
//     {
//       "id": "5391f1cb.05f03",
//       "type": "http response",
//       "z": "670b6620.41bfa8",
//       "name": "cached",
//       "x": 897.1334228515625,
//       "y": 57.288891315460205,
//       "wires": []
//     },
//     {
//       "id": "5a6d83d0.ab8cfc",
//       "type": "Cache out",
//       "z": "670b6620.41bfa8",
//       "name": "storeInCache",
//       "cache": "bfbde0a1.c002b",
//       "keyType": "msg",
//       "keyProperty": "data.uid",
//       "valueType": "msg",
//       "valueProperty": "payload",
//       "ttlType": "msg",
//       "ttlProperty": "",
//       "useString": false,
//       "x": 1882.1334381103516,
//       "y": 86.28889036178589,
//       "wires": []
//     },
//     {
//       "id": "5c44d0a6.41cff",
//       "type": "switch",
//       "z": "670b6620.41bfa8",
//       "name": "",
//       "property": "statusCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "eq",
//           "v": "200",
//           "vt": "str"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 1,
//       "x": 1715.4667625427246,
//       "y": 87.68888473510742,
//       "wires": [
//         [
//           "5a6d83d0.ab8cfc"
//         ]
//       ]
//     },
//     {
//       "id": "bf2be06f.26322",
//       "type": "http in",
//       "z": "728edb1b.dd9b64",
//       "name": "",
//       "url": "/wrapperstt/tokens/bks/personal",
//       "method": "post",
//       "upload": false,
//       "swaggerDoc": "36573ce1.e2f544",
//       "x": 190,
//       "y": 80,
//       "wires": [
//         [
//           "422c9d2c.514d24"
//         ]
//       ]
//     },
//     {
//       "id": "1fe4a018.37f4a",
//       "type": "http response",
//       "z": "728edb1b.dd9b64",
//       "name": "end",
//       "statusCode": "",
//       "headers": {},
//       "x": 2450,
//       "y": 80,
//       "wires": []
//     },
//     {
//       "id": "422c9d2c.514d24",
//       "type": "switch",
//       "z": "728edb1b.dd9b64",
//       "name": "hasToken",
//       "property": "payload.token",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "nnull"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 440,
//       "y": 80,
//       "wires": [
//         [
//           "a433e1b.285702"
//         ],
//         [
//           "b9df7f00.2ba46"
//         ]
//       ]
//     },
//     {
//       "id": "b9df7f00.2ba46",
//       "type": "function",
//       "z": "728edb1b.dd9b64",
//       "name": "prepare400",
//       "func": "context.global.utils.prepareError(400, \"Missing token in the request\", msg, node);\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 610,
//       "y": 120,
//       "wires": [
//         [
//           "c8df3e8c.ed934"
//         ]
//       ]
//     },
//     {
//       "id": "c8df3e8c.ed934",
//       "type": "http response",
//       "z": "728edb1b.dd9b64",
//       "name": "error400",
//       "statusCode": "",
//       "headers": {},
//       "x": 780,
//       "y": 120,
//       "wires": []
//     },
//     {
//       "id": "4eb9eeb2.f6f5f",
//       "type": "Cache in",
//       "z": "3e1c47b2.c62058",
//       "name": "getFromCache",
//       "cache": "296523d4.ea694c",
//       "keyType": "msg",
//       "keyProperty": "data.cache_key",
//       "valueType": "msg",
//       "valueProperty": "cachedData",
//       "useString": false,
//       "x": 360,
//       "y": 40,
//       "wires": [
//         [
//           "69676db9.ad3f84"
//         ]
//       ]
//     },
//     {
//       "id": "c6a82feb.88ae1",
//       "type": "function",
//       "z": "3e1c47b2.c62058",
//       "name": "getTokenInfo",
//       "func": "msg.data = msg.data || {};\nmsg.data.jwt = msg.payload.token;\nmsg.data.jwt_chunked = context.global.utils.parseJWT(msg.payload.token);\nmsg.data.uid = msg.data.jwt_chunked.uid;\nmsg.data.cache_key = `${msg.data.jwt_chunked.uid}${msg.data.jwt_chunked.sessionID}`;\nnode.log(`${msg.idrequest} UID=${msg.data.uid} | SessionID=${msg.data.jwt_chunked.sessionID}`);\n\nmsg.url =\n    context.global.config.wrapperstt.stt.endpoint +\n    context.global.config.wrapperstt.stt.tokens_bks_personal.uri\n    ;\nmsg.method = context.global.config.wrapperstt.stt.tokens_bks_personal.method;\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 170,
//       "y": 40,
//       "wires": [
//         [
//           "4eb9eeb2.f6f5f"
//         ]
//       ]
//     },
//     {
//       "id": "69676db9.ad3f84",
//       "type": "switch",
//       "z": "3e1c47b2.c62058",
//       "name": "wasCached",
//       "property": "cachedData",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "nnull"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 550,
//       "y": 40,
//       "wires": [
//         [
//           "2c0ae2b0.11510e"
//         ],
//         [
//           "3c20736.fbfeb8c"
//         ]
//       ]
//     },
//     {
//       "id": "eb031d95.05ec1",
//       "type": "subflow:3e1c47b2.c62058",
//       "z": "728edb1b.dd9b64",
//       "x": 840,
//       "y": 80,
//       "wires": [
//         [
//           "e9c82cc0.5f90e"
//         ],
//         [
//           "7b55af94.d8c74"
//         ]
//       ]
//     },
//     {
//       "id": "3c20736.fbfeb8c",
//       "type": "http request",
//       "z": "3e1c47b2.c62058",
//       "name": "call2stt",
//       "method": "use",
//       "ret": "obj",
//       "url": "",
//       "tls": "",
//       "x": 300,
//       "y": 140,
//       "wires": [
//         [
//           "3dc340f6.07699"
//         ]
//       ]
//     },
//     {
//       "id": "2c0ae2b0.11510e",
//       "type": "function",
//       "z": "3e1c47b2.c62058",
//       "name": "yesItWasCached",
//       "func": "msg.payload = msg.cachedData;\ndelete msg.cachedData;\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 770,
//       "y": 40,
//       "wires": [
//         [
//           "41f61896.6bc658"
//         ]
//       ]
//     },
//     {
//       "id": "3dc340f6.07699",
//       "type": "switch",
//       "z": "3e1c47b2.c62058",
//       "name": "isCorrectResponse",
//       "property": "statusCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "eq",
//           "v": "200",
//           "vt": "str"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 450,
//       "y": 200,
//       "wires": [
//         [
//           "4069fe7b.eacf6",
//           "41f61896.6bc658"
//         ],
//         [
//           "46194855.6fb378"
//         ]
//       ]
//     },
//     {
//       "id": "4069fe7b.eacf6",
//       "type": "Cache out",
//       "z": "3e1c47b2.c62058",
//       "name": "saveOnCache",
//       "cache": "296523d4.ea694c",
//       "keyType": "msg",
//       "keyProperty": "data.cache_key",
//       "valueType": "msg",
//       "valueProperty": "payload",
//       "ttlType": "msg",
//       "ttlProperty": "",
//       "useString": false,
//       "x": 700,
//       "y": 180,
//       "wires": []
//     },
//     {
//       "id": "41f61896.6bc658",
//       "type": "function",
//       "z": "3e1c47b2.c62058",
//       "name": "parseSTTResponse",
//       "func": "msg.data.bkstokens = {};\nmsg.payload.forEach(function(tokencito){\n    msg.data.bkstokens[tokencito.bank_id] = tokencito;\n    node.log(`${msg.idrequest} Received token from STT for bank ${tokencito.bank_id}`);\n});\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 720,
//       "y": 120,
//       "wires": [
//         [
//           "6504dd4d.e81ae4"
//         ]
//       ]
//     },
//     {
//       "id": "7b55af94.d8c74",
//       "type": "http response",
//       "z": "728edb1b.dd9b64",
//       "name": "koSTT",
//       "statusCode": "",
//       "headers": {},
//       "x": 1050,
//       "y": 120,
//       "wires": []
//     },
//     {
//       "id": "530bf490.5f286c",
//       "type": "split",
//       "z": "728edb1b.dd9b64",
//       "name": "splitTokens",
//       "splt": "\\n",
//       "spltType": "str",
//       "arraySplt": 1,
//       "arraySpltType": "len",
//       "stream": false,
//       "addname": "",
//       "x": 1250,
//       "y": 80,
//       "wires": [
//         [
//           "5797a29e.c9cd5c",
//           "c79a4eca.d0aa"
//         ]
//       ]
//     },
//     {
//       "id": "e9c82cc0.5f90e",
//       "type": "change",
//       "z": "728edb1b.dd9b64",
//       "name": "backUpSTT",
//       "rules": [
//         {
//           "t": "set",
//           "p": "data.stt_response",
//           "pt": "msg",
//           "to": "payload",
//           "tot": "msg"
//         }
//       ],
//       "action": "",
//       "property": "",
//       "from": "",
//       "to": "",
//       "reg": false,
//       "x": 1070,
//       "y": 80,
//       "wires": [
//         [
//           "ef1c6369.692d1",
//           "530bf490.5f286c"
//         ]
//       ]
//     },
//     {
//       "id": "4da0e449.8e961c",
//       "type": "join",
//       "z": "728edb1b.dd9b64",
//       "name": "joinTokens",
//       "mode": "auto",
//       "build": "string",
//       "property": "payload",
//       "propertyType": "msg",
//       "key": "topic",
//       "joiner": "\\n",
//       "joinerType": "str",
//       "accumulate": false,
//       "timeout": "",
//       "count": "",
//       "x": 2090,
//       "y": 80,
//       "wires": [
//         [
//           "461b37b9.58b388"
//         ]
//       ]
//     },
//     {
//       "id": "461b37b9.58b388",
//       "type": "function",
//       "z": "728edb1b.dd9b64",
//       "name": "prepareOutput",
//       "func": "const VALID_STATUS = (msg.req.query.status || context.global.config.wrapperstt.stt.tokens_bks_personal.default_valid_status).split(\",\");\nlet tokens = msg.payload;\nmsg.payload = [];\ntokens.forEach(function(tokenData){\n    if (tokenData.status) {\n        node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, has the status ${tokenData.status} in IOC`);\n        if (~VALID_STATUS.indexOf(tokenData.status)) {\n            tokenData.tokenSTT.status = tokenData.status;\n            msg.payload.push(tokenData.tokenSTT);\n            node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, has been added to the output`);\n        }\n        else {\n            node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, is going to be ignored because the status is not in the list of the valid ones (${JSON.stringify(VALID_STATUS)})`);\n        }\n    }\n    else {\n        node.log(`${msg.idrequest} The token received from STT, for the bank ${tokenData.tokenSTT.bank_id}, is going to be ignored since there were an error received from IOC (${tokenData.httpCode} ${tokenData.httpMessage} | ${tokenData.moreInformation})`);\n    }\n});\n\nif (!msg.payload.length) {\n    msg.payload = '{\"errors\":[{\"code\":404,\"message\":\"user_not_found\",\"level\":\"INFO\",\"description\":\"User not found.\",\"moreInfo\":\"\"}]}';\n    msg.statusCode = 404;\n}\nelse {\n    msg.statusCode = 200;\n}\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 2280,
//       "y": 80,
//       "wires": [
//         [
//           "1fe4a018.37f4a",
//           "60867867.c14d58"
//         ]
//       ]
//     },
//     {
//       "id": "6c02137a.08010c",
//       "type": "http in",
//       "z": "41d38104.9fbac",
//       "name": "",
//       "url": "/mobilebanking/:bank/viewOnly_LA",
//       "method": "get",
//       "upload": false,
//       "swaggerDoc": "",
//       "x": 198.8333282470703,
//       "y": 377.44446563720703,
//       "wires": [
//         [
//           "8f6e7e5f.a6959"
//         ]
//       ]
//     },
//     {
//       "id": "4dd84630.101378",
//       "type": "comment",
//       "z": "41d38104.9fbac",
//       "name": "MBANDE_ACC_SCB_ENS",
//       "info": "Mobile Banking possible errors:\n\nMBANDE_0001 - Sehr geehrter Kunde, aufgrund eines Systemfehlers steht Ihnen zur Zeit das InternetBanking & Ordering der Santander Bank leider nicht zur Verfügung. Bitte versuchen Sie es zu einem späteren Zeitpunkt erneut.\nMBANDE_0002 - Es sind keine Transaktionen für den gewählten Zeitraum vorhanden.\nMBANDE_0003 - Bitte beachten Sie, dass der eingegebene Betrag den maximal verfügbaren Betrag für diese Transaktion übersteigt.\nMBANDE_0004 - Konnte für die Überweisung.\nMBANDE_0005 - Es sind keine iTANs zur Durchführung dieser Transaktion verfügbar.\nMBANDE_0006 - Es sind keine iTANs zur Durchführung dieser Transaktion verfügbar.\nMBANDE_0007 - Neue iTAN-Liste bestellen. iTAN-Liste weniger als 3.\nMBANDE_0008 - Kontonummer: Der eingegebene Wert ist ungültig.\nMBANDE_0009 - BLZ: Der eingegebene Wert ist ungültig.\nMBANDE_0010 - IBAN: Die eingegebene IBAN ist nicht bekannt oder enthält ungültige Zeichen.\nMBANDE_0011 - Betrag: Bitte beachten Sie, dass der eingegebene Betrag den maximal verfügbaren Betrag für diese Transaktion übersteigt.\nMBANDE_0012 - ITAN ungültig. Bitte Tragen Sie unbedingt dort einen 6-stelligen Code\nMBANDE_0013 - IBAN NICHT SEPA-FÄHIG.\nMBANDE_0014 - KONTOART UNGÜLTIG.\nMBANDE_0015 - Es liegen zur Zeit keine Nachrichten für Sie vor.\nMBANDE_0016 - Ihr Online-Banking Zugang wurde auf nur lesen gesetzt.\n",
//       "x": 168.8333282470703,
//       "y": 297.44446563720703,
//       "wires": []
//     },
//     {
//       "id": "8f6e7e5f.a6959",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "init",
//       "func": "msg.idrequest = `[wsdls-mobile-viewOnly_LA ${msg._msgid}] `;\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"'\" );\n\nmsg.data = {};\n\n/*\nmsg.data.outputs = {\n    \"BKS_result_ok\": {\n        \"status\": 200\n    },\n    \"EX_NoExistsRepository\": {\n        \"status\": 400,\n        \"message\": \"Invalid repository: {repository}\"\n    },\n    \"EX_TechnicalError\": {\n        \"status\": 500,\n        \"message\": \"Technical error in the LDAP operation\"\n    },\n    \"EX_NoResults\": {\n        \"status\": 404,\n        \"message\": \"No data found\"\n    },\n    \"EX_InvalidParameters\": {\n        \"status\": 400,\n        \"message\": \"Invalid input parameters\"\n    },\n    \"Fault\": {\n        \"status\": 500,\n        \"message\": \"Unexpected error\"\n    }\n};\n*/\n\nconst authData = msg.data.authData = context.global.utils.parseAuthorizationHeader(msg.req.headers.authorization);\nif (authData.validValue && authData.isTokenBKS) {\n    const tokenBKS = context.global.utils.parseBKSToken(authData.tokenBKS);\n    msg.data.uid = tokenBKS.uid;\n    msg.data.token = encodeURIComponent(msg.req.headers.authorization.replace(/^bearer /i, \"\"));\n    msg.data.bank = msg.req.params.bank.toLowerCase();\n    msg.data.bank = msg.data.bank === \"seb\" ? \"sb\" : msg.data.bank;\n    \n    if ([\"scb\", \"sb\"].indexOf(msg.data.bank) === -1) {\n        // invalid bank\n        context.global.utils.prepareError(400, \"Invalid bank. Possible values: 'scb', 'sb'\", msg);\n    }\n    else {\n        // correct request\n        let cfg = context.global.config;\n        let cfgBks = cfg.wsdlbks.mobilebanking.common_accounts[msg.data.bank];\n        msg.method = cfgBks.httpmethod;\n        msg.url = cfgBks.endpoint;\n        \n        msg.requestData = encodeURIComponent(JSON.stringify({\n          \"viewOnly_LA\": {\n            \"profile\": {\n              \"company\": cfgBks.profile.entity,\n              \"channel\": \"INT\",\n              \"language\": \" de-DE\"\n            }\n          }\n        }));\n\n        msg.headers = {\n            \"Content-Type\": \"application/x-www-form-urlencoded\"\n        };\n    }\n}\nelse {\n    context.global.utils.prepareError(401, \"Authorization header not present or invalid format (expected Basic or Bearer tokenBKS)\", msg);\n}\n\nreturn msg;\n",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 438.8333282470703,
//       "y": 377.44446563720703,
//       "wires": [
//         [
//           "4238af43.b49c9"
//         ]
//       ]
//     },
//     {
//       "id": "eee026ba.378e08",
//       "type": "switch",
//       "z": "afd0ddc1.30287",
//       "name": "correctRequest",
//       "property": "payload.httpCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "null"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 200,
//       "y": 80,
//       "wires": [
//         [
//           "76cc51b7.96924"
//         ],
//         [
//           "a2487c81.d4b3f"
//         ]
//       ]
//     },
//     {
//       "id": "a2487c81.d4b3f",
//       "type": "http response",
//       "z": "afd0ddc1.30287",
//       "name": "ko400",
//       "statusCode": "",
//       "headers": {},
//       "x": 370,
//       "y": 140,
//       "wires": []
//     },
//     {
//       "id": "76cc51b7.96924",
//       "type": "template",
//       "z": "afd0ddc1.30287",
//       "name": "prepareRequest",
//       "field": "payload",
//       "fieldType": "msg",
//       "format": "handlebars",
//       "syntax": "mustache",
//       "template": "authenticationType=token&token={{data.token}}&requestData={{{requestData}}}",
//       "output": "str",
//       "x": 400,
//       "y": 80,
//       "wires": [
//         [
//           "489f1e9a.cd3d9"
//         ]
//       ]
//     },
//     {
//       "id": "63b39578.14047c",
//       "type": "http request",
//       "z": "afd0ddc1.30287",
//       "name": "call2bks",
//       "method": "use",
//       "ret": "txt",
//       "url": "",
//       "tls": "",
//       "x": 800,
//       "y": 80,
//       "wires": [
//         [
//           "affc6089.bdd32",
//           "a2e2b8b5.2aea98"
//         ]
//       ]
//     },
//     {
//       "id": "affc6089.bdd32",
//       "type": "function",
//       "z": "afd0ddc1.30287",
//       "name": "print2log",
//       "func": "if (~msg.payload.indexOf(\"Request from nodered\")) {\n    // we've come from the request\n    if (context.global.config.logging.bks.show_request) {\n        node.log(msg.idrequest + \"Request to BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n    }\n}\nelse {\n    // we've come from the response\n    if (context.global.config.logging.bks.show_response) {\n        node.log(msg.idrequest + \"Response from BKS (\" + msg.payload.length + \" bytes): \" + msg.payload);\n    }\n}\n\nreturn null;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 960,
//       "y": 40,
//       "wires": [
//         []
//       ]
//     },
//     {
//       "id": "a2e2b8b5.2aea98",
//       "type": "switch",
//       "z": "afd0ddc1.30287",
//       "name": "hasBody",
//       "property": "payload.length",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "gt",
//           "v": "0",
//           "vt": "num"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 960,
//       "y": 80,
//       "wires": [
//         [
//           "83757855.72bf68"
//         ],
//         [
//           "717400f2.7a22b"
//         ]
//       ],
//       "outputLabels": [
//         "withBody",
//         null
//       ]
//     },
//     {
//       "id": "717400f2.7a22b",
//       "type": "function",
//       "z": "afd0ddc1.30287",
//       "name": "setNoPayloadError",
//       "func": "msg.headers = {};\ncontext.global.utils.prepareError(\n    500,\n    \"No payload was received from BKS. Check the logs there!\",\n    msg,\n    node\n);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1010,
//       "y": 140,
//       "wires": [
//         [
//           "e1398053.b0d1"
//         ]
//       ]
//     },
//     {
//       "id": "e1398053.b0d1",
//       "type": "http response",
//       "z": "afd0ddc1.30287",
//       "name": "koNoPayload",
//       "statusCode": "",
//       "headers": {},
//       "x": 1220,
//       "y": 140,
//       "wires": []
//     },
//     {
//       "id": "83757855.72bf68",
//       "type": "json",
//       "z": "afd0ddc1.30287",
//       "name": "",
//       "pretty": false,
//       "x": 1110,
//       "y": 80,
//       "wires": [
//         [
//           "d73d1a4b.b12458"
//         ]
//       ]
//     },
//     {
//       "id": "41d8598a.e291f8",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "prepareOutput",
//       "func": "msg.statusCode = 200;\nif (msg.payload.methodResult) {\n    const mr = msg.payload.methodResult;\n    msg.payload = {\n        \"isViewOnly\": !(mr.statusUser === \"0\" && mr.tipoUser === \"O\")\n    };\n}\nelse if (msg.payload.fault) {\n    let codError = \"\",\n        descripcionErrorTraduc = \"\";\n    try {\n        let errorData = msg.payload.fault.detail.com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA.error;\n        codError = errorData.codError.trim();\n        descripcionErrorTraduc = errorData.descripcionErrorTraduc;\n    }\n    catch(e) {\n        node.log(`${msg.idrequest} Unexpected error format received from BKS`);\n        //descripcionErrorTraduc = JSON.stringify(msg.payload.fault);\n        codError = msg.payload.fault.faultcode;\n        descripcionErrorTraduc = `${msg.payload.fault.faultcode} | ${msg.payload.fault.faultstring} | ${msg.payload.fault.detail}`;\n    }\n    \n    if (codError === \"MBANDE_0016\") {\n        msg.payload = {\n            \"isViewOnly\": true\n        };\n    }\n    else {\n        context.global.utils.prepareError(500,\n            descripcionErrorTraduc,\n            msg,\n            node\n        );\n    }\n}\nelse {\n    context.global.utils.prepareError(500,\n        JSON.stringify(msg.payload),\n        msg,\n        node\n    );\n}\n\nif (msg.statusCode === 200) {\n    return [msg, null];\n}\nelse {\n    return [null, msg];\n}\n",
//       "outputs": "2",
//       "noerr": 0,
//       "x": 828.8333282470703,
//       "y": 377.44446563720703,
//       "wires": [
//         [
//           "fe9dfb4b.480118"
//         ],
//         [
//           "736fbb0f.0a70a4"
//         ]
//       ]
//     },
//     {
//       "id": "fe9dfb4b.480118",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "ok",
//       "statusCode": "",
//       "headers": {},
//       "x": 998.8333282470703,
//       "y": 377.44446563720703,
//       "wires": []
//     },
//     {
//       "id": "736fbb0f.0a70a4",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "koUnexpected",
//       "statusCode": "",
//       "headers": {},
//       "x": 1028.8333282470703,
//       "y": 417.44446563720703,
//       "wires": []
//     },
//     {
//       "id": "6649a13a.4acc4",
//       "type": "http in",
//       "z": "41d38104.9fbac",
//       "name": "",
//       "url": "/mobilebanking/:bank/estadoCanal_LA",
//       "method": "get",
//       "upload": false,
//       "swaggerDoc": "",
//       "x": 218.8333282470703,
//       "y": 537.444465637207,
//       "wires": [
//         [
//           "a1b1674b.1845e8"
//         ]
//       ]
//     },
//     {
//       "id": "a1b1674b.1845e8",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "init",
//       "func": "msg.idrequest = `[wsdls-mobile-estadoCanal_LA ${msg._msgid}] `;\nnode.log(\n    msg.idrequest\n    + \"Request URL: '\" + msg.req.url\n    + \"'\" );\n\nmsg.data = {};\n\nconst authData = msg.data.authData = context.global.utils.parseAuthorizationHeader(msg.req.headers.authorization);\nif (authData.validValue && authData.isTokenBKS) {\n    const tokenBKS = context.global.utils.parseBKSToken(authData.tokenBKS);\n    msg.data.uid = tokenBKS.uid;\n    msg.data.token = encodeURIComponent(msg.req.headers.authorization.replace(/^bearer /i, \"\"));\n    msg.data.bank = msg.req.params.bank.toLowerCase();\n    msg.data.bank = msg.data.bank === \"seb\" ? \"sb\" : msg.data.bank;\n    \n    if ([\"scb\", \"sb\"].indexOf(msg.data.bank) === -1) {\n        // invalid bank\n        context.global.utils.prepareError(400, \"Invalid bank. Possible values: 'scb', 'sb'\", msg);\n    }\n    else {\n        // correct request\n        let cfg = context.global.config;\n        let cfgBks = cfg.wsdlbks.mobilebanking.common_accounts[msg.data.bank];\n        msg.method = cfgBks.httpmethod;\n        msg.url = cfgBks.endpoint;\n        \n        msg.requestData = encodeURIComponent(JSON.stringify({\n          \"estadoCanal_LA\": {\n            \"entrada\": {\n              \"canalCon\": \"INT\",\n              \"canalBe\": \"INT\",\n              \"uid\": msg.data.uid\n            }\n          }\n        }));\n\n        msg.headers = {\n            \"Content-Type\": \"application/x-www-form-urlencoded\"\n        };\n    }\n}\nelse {\n    context.global.utils.prepareError(401, \"Authorization header not present or invalid format (expected Basic or Bearer tokenBKS)\", msg);\n}\n\nreturn msg;\n",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 478.8333282470703,
//       "y": 537.444465637207,
//       "wires": [
//         [
//           "b68f59f.944a0a8"
//         ]
//       ]
//     },
//     {
//       "id": "d4c5135b.1a837",
//       "type": "function",
//       "z": "41d38104.9fbac",
//       "name": "prepareOutput",
//       "func": "msg.statusCode = 200;\nif (msg.payload.methodResult) {\n    msg.payload = {\n        \"isActive\": true\n    };\n}\nelse if (msg.payload.fault && msg.payload.fault.detail && msg.payload.fault.detail.com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA) {\n    msg.payload = {\n        \"isActive\": false\n    };\n}\nelse {\n    context.global.utils.prepareError(500,\n        JSON.stringify(msg.payload),\n        msg,\n        node\n    );\n}\n\nif (msg.statusCode === 200) {\n    return [msg, null];\n}\nelse {\n    return [null, msg];\n}\n",
//       "outputs": "2",
//       "noerr": 0,
//       "x": 868.8333282470703,
//       "y": 537.444465637207,
//       "wires": [
//         [
//           "d934ff22.ca1c8"
//         ],
//         [
//           "1d8fd3f2.e46b3c"
//         ]
//       ]
//     },
//     {
//       "id": "d934ff22.ca1c8",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "ok",
//       "statusCode": "",
//       "headers": {},
//       "x": 1038.8333282470703,
//       "y": 537.444465637207,
//       "wires": []
//     },
//     {
//       "id": "1d8fd3f2.e46b3c",
//       "type": "http response",
//       "z": "41d38104.9fbac",
//       "name": "koUnexpected",
//       "statusCode": "",
//       "headers": {},
//       "x": 1068.8333282470703,
//       "y": 577.444465637207,
//       "wires": []
//     },
//     {
//       "id": "4238af43.b49c9",
//       "type": "subflow:afd0ddc1.30287",
//       "z": "41d38104.9fbac",
//       "x": 618.8333282470703,
//       "y": 377.44446563720703,
//       "wires": [
//         [
//           "41d8598a.e291f8"
//         ]
//       ]
//     },
//     {
//       "id": "489f1e9a.cd3d9",
//       "type": "function",
//       "z": "afd0ddc1.30287",
//       "name": "addTraceHeader",
//       "func": "msg.headers.cookie = `ignoreme=Request from nodered ${msg._msgid}`;\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 610,
//       "y": 80,
//       "wires": [
//         [
//           "63b39578.14047c"
//         ]
//       ]
//     },
//     {
//       "id": "b68f59f.944a0a8",
//       "type": "subflow:afd0ddc1.30287",
//       "z": "41d38104.9fbac",
//       "x": 658.8333282470703,
//       "y": 537.444465637207,
//       "wires": [
//         [
//           "d4c5135b.1a837"
//         ]
//       ]
//     },
//     {
//       "id": "d73d1a4b.b12458",
//       "type": "switch",
//       "z": "afd0ddc1.30287",
//       "name": "",
//       "property": "statusCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "eq",
//           "v": "200",
//           "vt": "num"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 1250,
//       "y": 80,
//       "wires": [
//         [],
//         [
//           "165c6358.5648dd"
//         ]
//       ]
//     },
//     {
//       "id": "165c6358.5648dd",
//       "type": "function",
//       "z": "afd0ddc1.30287",
//       "name": "checkIfCommonError",
//       "func": "let codError, descripcionErrorTraduc;\ntry {\n    codError = msg.payload.fault.faultcode;\n    descripcionErrorTraduc = `${msg.payload.fault.faultcode} | ${msg.payload.fault.faultstring} | ${msg.payload.fault.detail}`;\n}\ncatch(e) {\n    //node.log(`${msg.idrequest} Unexpected error format received from BKS`);\n    //descripcionErrorTraduc = JSON.stringify(msg.payload.fault);\n}\n\nif (codError) {\n    if (~[\"50201022\", \"50201021\"].indexOf(codError)) {\n        context.global.utils.prepareError(401,\n            descripcionErrorTraduc,\n            msg,\n            node\n        );\n    }\n    // TODO any other common error to manage?\n}\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 1440,
//       "y": 140,
//       "wires": [
//         [
//           "36e2d4ee.12fa6c"
//         ]
//       ]
//     },
//     {
//       "id": "36e2d4ee.12fa6c",
//       "type": "switch",
//       "z": "afd0ddc1.30287",
//       "name": "commonError",
//       "property": "payload.httpCode",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "nnull"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 1660,
//       "y": 140,
//       "wires": [
//         [
//           "ac0d320.75c02d"
//         ],
//         []
//       ]
//     },
//     {
//       "id": "ac0d320.75c02d",
//       "type": "http response",
//       "z": "afd0ddc1.30287",
//       "name": "ko_commonError",
//       "statusCode": "",
//       "headers": {},
//       "x": 1871.0555419921875,
//       "y": 168.33334350585938,
//       "wires": []
//     },
//     {
//       "id": "2eed6e9d.891762",
//       "type": "comment",
//       "z": "41d38104.9fbac",
//       "name": "viewOnly_LA",
//       "info": "normal credential:\n{\n    \"methodResult\": {\n        \"statusUser\": \"0\",\n        \"tipoUser\": \"O\"\n    }\n}\n\nview only:\n{\n    \"fault\": {\n        \"faultcode\": \"0001\",\n        \"faultstring\": \"Exception Code: 0001. Executing Facade: F_MBANDE_CommonAccounts, Method: viewOnly_LA\",\n        \"detail\": {\n            \"com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA\": {\n                \"error\": {\n                    \"codError\": \"MBANDE_0016                             \",\n                    \"errorCode\": \"1\",\n                    \"descripcionErrorTraduc\": \"Ihr Online-Banking Zugang wurde auf \\\"nur lesen\\\" gesetzt.\"\n                }\n            }\n        }\n    }\n}\n\nblocked credential:\n{\n    \"fault\": {\n        \"faultcode\": \"0001\",\n        \"faultstring\": \"Exception Code: 0001. Executing Facade: F_MBANDE_CommonAccounts, Method: viewOnly_LA\",\n        \"detail\": {\n            \"com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA\": {\n                \"error\": {\n                    \"codError\": \"MBANDE_0001                             \",\n                    \"errorCode\": \"1\",\n                    \"descripcionErrorTraduc\": \"Der Paydierkt Service steht Ihnen momentan nicht     zur Verfügung.\"\n                }\n            }\n        }\n    }\n}\n",
//       "x": 118.83332824707031,
//       "y": 337.44446563720703,
//       "wires": []
//     },
//     {
//       "id": "6db51ef9.0ac6b",
//       "type": "comment",
//       "z": "41d38104.9fbac",
//       "name": "estadoCanal_LA",
//       "info": "normal credential:\n{\n    \"methodResult\": {}\n}\n\nview only:\n{\n    \"methodResult\": {}\n}\n\nblocked credential:\n{\n    \"fault\": {\n        \"faultcode\": \"0001\",\n        \"faultstring\": \"Exception Code: 0001. Executing Facade: F_MBANDE_CommonAccounts, Method: estadoCanal_LA\",\n        \"detail\": {\n            \"com_banesto_al_mbande_commonaccounts_f_exc__General_CommAcc_LA\": {\n                \"error\": {\n                    \"codError\": null,\n                    \"errorCode\": null,\n                    \"descripcionErrorTraduc\": null\n                }\n            }\n        }\n    }\n}\n",
//       "x": 128.8333282470703,
//       "y": 497.44446563720703,
//       "wires": []
//     },
//     {
//       "id": "8cbd539b.044d6",
//       "type": "subflow:2da4fc90.909b04",
//       "z": "728edb1b.dd9b64",
//       "x": 1660,
//       "y": 80,
//       "wires": [
//         [
//           "b04c0392.6681c"
//         ],
//         [
//           "b04c0392.6681c"
//         ]
//       ]
//     },
//     {
//       "id": "ef1c6369.692d1",
//       "type": "debug",
//       "z": "728edb1b.dd9b64",
//       "name": "",
//       "active": false,
//       "console": "false",
//       "complete": "true",
//       "x": 1210,
//       "y": 220,
//       "wires": []
//     },
//     {
//       "id": "b04c0392.6681c",
//       "type": "change",
//       "z": "728edb1b.dd9b64",
//       "name": "saveIOCData",
//       "rules": [
//         {
//           "t": "set",
//           "p": "payload.tokenSTT",
//           "pt": "msg",
//           "to": "tokenSTT",
//           "tot": "msg"
//         }
//       ],
//       "action": "",
//       "property": "",
//       "from": "",
//       "to": "",
//       "reg": false,
//       "x": 1900,
//       "y": 80,
//       "wires": [
//         [
//           "4da0e449.8e961c"
//         ]
//       ]
//     },
//     {
//       "id": "518f5edf.fd6e1",
//       "type": "function",
//       "z": "2da4fc90.909b04",
//       "name": "prepareViewOnly",
//       "func": "msg.headers = {\n    \"authorization\": `Bearer ${msg.payload.token}`\n};\nmsg.url = context.global.config.wrapperstt.ioc.viewOnly.endpoint.replace(\"{bank}\", msg.payload.bank_id);\nmsg.method = context.global.config.wrapperstt.ioc.viewOnly.method; \nmsg.thread = \"viewOnly\";\nmsg.partsBackUp = msg.parts;\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 590,
//       "y": 80,
//       "wires": [
//         [
//           "e115ed18.961ee"
//         ]
//       ]
//     },
//     {
//       "id": "4e658911.e096f8",
//       "type": "Cache in",
//       "z": "2da4fc90.909b04",
//       "name": "getFromCache",
//       "cache": "cc379902.9a97e8",
//       "keyType": "msg",
//       "keyProperty": "data.uid",
//       "valueType": "msg",
//       "valueProperty": "cachedData",
//       "useString": false,
//       "x": 200,
//       "y": 80,
//       "wires": [
//         [
//           "5fae98a6.5d1dd8"
//         ]
//       ]
//     },
//     {
//       "id": "5fae98a6.5d1dd8",
//       "type": "switch",
//       "z": "2da4fc90.909b04",
//       "name": "wasCached",
//       "property": "cachedData",
//       "propertyType": "msg",
//       "rules": [
//         {
//           "t": "nnull"
//         },
//         {
//           "t": "else"
//         }
//       ],
//       "checkall": "true",
//       "outputs": 2,
//       "x": 390,
//       "y": 80,
//       "wires": [
//         [
//           "2b4b6bda.572bf4"
//         ],
//         [
//           "518f5edf.fd6e1",
//           "937014e1.1ec598"
//         ]
//       ]
//     },
//     {
//       "id": "937014e1.1ec598",
//       "type": "function",
//       "z": "2da4fc90.909b04",
//       "name": "prepareChannelStatus",
//       "func": "msg.headers = {\n    \"authorization\": `Bearer ${msg.payload.token}`\n};\nmsg.url = context.global.config.wrapperstt.ioc.estadoCanal.endpoint.replace(\"{bank}\", msg.payload.bank_id);\nmsg.method = context.global.config.wrapperstt.ioc.estadoCanal.method; \nmsg.thread = \"estadoCanal\";\nmsg.partsBackUp = msg.parts;\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 600,
//       "y": 120,
//       "wires": [
//         [
//           "9c924f47.58882"
//         ]
//       ]
//     },
//     {
//       "id": "26d08e34.fc5192",
//       "type": "Cache out",
//       "z": "2da4fc90.909b04",
//       "name": "saveOnCache",
//       "cache": "cc379902.9a97e8",
//       "keyType": "msg",
//       "keyProperty": "data.uid",
//       "valueType": "msg",
//       "valueProperty": "payload",
//       "ttlType": "msg",
//       "ttlProperty": "",
//       "useString": false,
//       "x": 1400,
//       "y": 80,
//       "wires": []
//     },
//     {
//       "id": "9375fa00.5142b8",
//       "type": "join",
//       "z": "2da4fc90.909b04",
//       "name": "",
//       "mode": "custom",
//       "build": "object",
//       "property": "payload",
//       "propertyType": "msg",
//       "key": "thread",
//       "joiner": "\\n",
//       "joinerType": "str",
//       "accumulate": false,
//       "timeout": "10",
//       "count": "2",
//       "x": 1010,
//       "y": 100,
//       "wires": [
//         [
//           "8710d9ac.a56b68"
//         ]
//       ]
//     },
//     {
//       "id": "60867867.c14d58",
//       "type": "debug",
//       "z": "728edb1b.dd9b64",
//       "name": "",
//       "active": false,
//       "console": "false",
//       "complete": "true",
//       "x": 2431.1666259765625,
//       "y": 136.88888549804688,
//       "wires": []
//     },
//     {
//       "id": "9c924f47.58882",
//       "type": "http request",
//       "z": "2da4fc90.909b04",
//       "name": "channelStatus",
//       "method": "use",
//       "ret": "obj",
//       "url": "",
//       "tls": "",
//       "x": 820,
//       "y": 120,
//       "wires": [
//         [
//           "9375fa00.5142b8"
//         ]
//       ]
//     },
//     {
//       "id": "e115ed18.961ee",
//       "type": "http request",
//       "z": "2da4fc90.909b04",
//       "name": "viewOnly",
//       "method": "use",
//       "ret": "obj",
//       "url": "",
//       "tls": "",
//       "x": 800,
//       "y": 80,
//       "wires": [
//         [
//           "9375fa00.5142b8"
//         ]
//       ]
//     },
//     {
//       "id": "5797a29e.c9cd5c",
//       "type": "debug",
//       "z": "728edb1b.dd9b64",
//       "name": "",
//       "active": true,
//       "console": "false",
//       "complete": "true",
//       "x": 1390,
//       "y": 220,
//       "wires": []
//     },
//     {
//       "id": "6504dd4d.e81ae4",
//       "type": "debug",
//       "z": "3e1c47b2.c62058",
//       "name": "",
//       "active": true,
//       "console": "false",
//       "complete": "true",
//       "x": 863.1666870117188,
//       "y": 168.66665649414062,
//       "wires": []
//     },
//     {
//       "id": "8710d9ac.a56b68",
//       "type": "function",
//       "z": "2da4fc90.909b04",
//       "name": "parseIOCResponse",
//       "func": "msg.parts = msg.partsBackUp;\n\nconst viewOnly = msg.payload.viewOnly || {};\nconst channelStatus = msg.payload.estadoCanal || {};\n\nconst isViewOnly = viewOnly.hasOwnProperty(\"isViewOnly\") ? viewOnly.isViewOnly : null;\nconst isActive = channelStatus.hasOwnProperty(\"isActive\") ? channelStatus.isActive : null;\n\nif (isViewOnly === null || isActive === null) {\n    //node.log(`${msg.idrequest} Some error occured in IOC: isViewOnly=${isViewOnly} | isActive=${isActive}`);\n    msg.statusCode = 500;\n    if (viewOnly.httpCode) {\n        node.log(`${msg.idrequest} Error in IOC viewOnly: ${JSON.stringify(viewOnly)}`);\n        msg.payload = viewOnly;\n    }\n    else if (channelStatus.httpCode) {\n        node.log(`${msg.idrequest} Error in IOC channelStatus: ${JSON.stringify(channelStatus)}`);\n        msg.payload = channelStatus;\n    }\n    else {\n        node.log(`${msg.idrequest} Unexpected error in IOC: ${JSON.stringify(msg.payload)}`);\n        context.global.utils.prepareError(500,\n            JSON.stringify(msg.payload),\n            msg,\n            node\n        );\n    }\n    return [null, msg];\n}\nelse {\n    let status;\n    if (isActive && !isViewOnly) {\n        status = \"normal\";\n    }\n    else if (isActive && isViewOnly) {\n        status = \"readonly\";\n    }\n    else {\n        status = \"blocked\";\n    }\n    node.log(`${msg.idrequest} Status in IOC: ${status}`);\n    msg.payload = {\n       \"status\": status\n    };\n    return [msg, null]\n}\n\nreturn msg;",
//       "outputs": "2",
//       "noerr": 0,
//       "x": 1190,
//       "y": 100,
//       "wires": [
//         [
//           "26d08e34.fc5192"
//         ],
//         []
//       ],
//       "outputLabels": [
//         "correctIOCResponses",
//         "koInIOC"
//       ]
//     },
//     {
//       "id": "c79a4eca.d0aa",
//       "type": "change",
//       "z": "728edb1b.dd9b64",
//       "name": "saveToken",
//       "rules": [
//         {
//           "t": "set",
//           "p": "tokenSTT",
//           "pt": "msg",
//           "to": "payload",
//           "tot": "msg"
//         }
//       ],
//       "action": "",
//       "property": "",
//       "from": "",
//       "to": "",
//       "reg": false,
//       "x": 1430,
//       "y": 80,
//       "wires": [
//         [
//           "8cbd539b.044d6"
//         ]
//       ]
//     },
//     {
//       "id": "2b4b6bda.572bf4",
//       "type": "change",
//       "z": "2da4fc90.909b04",
//       "name": "yesItWasCached",
//       "rules": [
//         {
//           "t": "set",
//           "p": "payload",
//           "pt": "msg",
//           "to": "cachedData",
//           "tot": "msg"
//         }
//       ],
//       "action": "",
//       "property": "",
//       "from": "",
//       "to": "",
//       "reg": false,
//       "x": 590,
//       "y": 40,
//       "wires": [
//         []
//       ]
//     },
//     {
//       "id": "a433e1b.285702",
//       "type": "change",
//       "z": "728edb1b.dd9b64",
//       "name": "setIdRequest",
//       "rules": [
//         {
//           "t": "set",
//           "p": "idrequest",
//           "pt": "msg",
//           "to": "$join([\"[wrapperstt \", _msgid, \"] \"], \"\")\t",
//           "tot": "jsonata"
//         }
//       ],
//       "action": "",
//       "property": "",
//       "from": "",
//       "to": "",
//       "reg": false,
//       "x": 610,
//       "y": 80,
//       "wires": [
//         [
//           "eb031d95.05ec1"
//         ]
//       ]
//     },
//     {
//       "id": "46194855.6fb378",
//       "type": "function",
//       "z": "3e1c47b2.c62058",
//       "name": "STTerror",
//       "func": "node.log(`${msg.idrequest} Error received from STT: ${msg.statusCode} - ${JSON.stringify(msg.payload)}`);\n\nreturn msg;",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 680,
//       "y": 240,
//       "wires": [
//         []
//       ]
//     },
//     {
//       "id": "18964177.b9320f",
//       "type": "subflow:c5b147b8.e229b8",
//       "z": "41d38104.9fbac",
//       "x": 810,
//       "y": 120,
//       "wires": [
//         [
//           "aae9c9f1.f571a8"
//         ]
//       ]
//     },
//     {
//       "id": "1a3663d6.e4c36c",
//       "type": "template",
//       "z": "41d38104.9fbac",
//       "name": "request_body",
//       "field": "inputXML",
//       "fieldType": "msg",
//       "format": "handlebars",
//       "syntax": "mustache",
//       "template": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.isban.es/webservices/TECHNICAL_FACADES/Security/F_facseg_security/internet/ACFACSEGSecurity/v1\">\n#header#\n  <soapenv:Body>\n    <v1:retrieveMultipleUser facade=\"{{data.ws_facade}}\">\n      <repository>{{data.repository}}</repository>\n      <userInformation>\n      {{#data.uid}}\n        <attUID>{{data.uid}}</attUID>\n      {{/data.uid}}\n      {{#data.loginID}}\n        <attAlias>{{data.loginID}}</attAlias>\n      {{/data.loginID}}\n      {{#data.person_type}}\n        <attPersonNumber>\n          <TIPO_DE_PERSONA>{{data.person_type}}</TIPO_DE_PERSONA>\n          <CODIGO_DE_PERSONA>{{data.person_code}}</CODIGO_DE_PERSONA>\n        </attPersonNumber>\n      {{/data.person_type}}\n      </userInformation>\n    </v1:retrieveMultipleUser>\n  </soapenv:Body>\n</soapenv:Envelope>\n",
//       "x": 600,
//       "y": 120,
//       "wires": [
//         [
//           "18964177.b9320f"
//         ]
//       ]
//     },
//     {
//       "id": "12e0789.f754687",
//       "type": "function",
//       "z": "c5b147b8.e229b8",
//       "name": "prepareRequest",
//       "func": "msg.payload = msg.inputXML\n    .replace(\"#header#\", msg.data.headerWS)\n    .replace(\"<soapenv:Body>\", `<soapenv:Body>\\n<!-- Request from nodered ${msg._msgid} -->`)\n    ;\nreturn msg;\n",
//       "outputs": 1,
//       "noerr": 0,
//       "x": 760,
//       "y": 100,
//       "wires": [
//         [
//           "7eddef3f.9ad15",
//           "5dfa3719.5d08b8"
//         ]
//       ]
//     }
//   ];

var newNodesObj = [
  {
    "id": "b2ff1837.594c38",
    "type": "tab",
    "label": "My_Legacy_Internet_Signatures v1_0_0",
    "disabled": false,
    "info": ""
  },
  {
    "id": "a6126c31.c6f39",
    "type": "subflow",
    "name": "Validate response OK STT",
    "info": "",
    "in": [
      {
        "x": 60,
        "y": 120,
        "wires": [
          {
            "id": "1586eb06.4a4a15"
          }
        ]
      }
    ],
    "out": [
      {
        "x": 1320,
        "y": 60,
        "wires": [
          {
            "id": "dcc2070b.6a7908",
            "port": 0
          }
        ]
      },
      {
        "x": 1320,
        "y": 120,
        "wires": [
          {
            "id": "dcc2070b.6a7908",
            "port": 1
          }
        ]
      },
      {
        "x": 1320,
        "y": 180,
        "wires": [
          {
            "id": "dcc2070b.6a7908",
            "port": 2
          }
        ]
      }
    ],
    "inputLabels": [
      "response"
    ],
    "outputLabels": [
      "SB",
      "SCB",
      "otherwise"
    ]
  },
  {
    "id": "c7386136.14ebd",
    "type": "subflow",
    "name": "Validate response FAIL STT",
    "info": "",
    "in": [
      {
        "x": 80,
        "y": 60,
        "wires": [
          {
            "id": "a5ec8925.01d9e8"
          }
        ]
      }
    ],
    "out": []
  },
  {
    "id": "7057bed3.3ce1c",
    "type": "subflow",
    "name": "Get signature methods",
    "info": "",
    "in": [
      {
        "x": 60,
        "y": 80,
        "wires": [
          {
            "id": "e3da3565.d25cf8"
          }
        ]
      }
    ],
    "out": []
  },
  {
    "id": "5da96df6.ad9244",
    "type": "subflow",
    "name": "Initialize signature",
    "info": "",
    "in": [
      {
        "x": 60,
        "y": 40,
        "wires": [
          {
            "id": "8ce9e13d.43834"
          }
        ]
      }
    ],
    "out": []
  },
  {
    "id": "32ef7014.05f01",
    "type": "subflow",
    "name": "Verify signature",
    "info": "",
    "in": [
      {
        "x": 80,
        "y": 80,
        "wires": [
          {
            "id": "bf58c645.909928"
          }
        ]
      }
    ],
    "out": []
  },
  {
    "id": "63bcb5ac.d78e9c",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "32bbbd4.a9c3342",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "224116f2.d2196a",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "d5e3f793.783298",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "c017021a.def7a",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "9c27c7a4.a0b0e8",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "ff2bd5bb.d37218",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "cf9ce5ce.ab1648",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "4cc35b30.a1be84",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "29bd1bd0.e658e4",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "fc8bac76.794e3",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "805fbede.56465",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "2afe0aa9.df3296",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "2342acca.4e0094",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "97c07b33.8fede8",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "c5ba4a92.d69a18",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "d41401a4.caf9f",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "b1d5d74d.1f0158",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "7b838566.8b6ebc",
    "type": "swagger-doc",
    "z": "",
    "summary": "",
    "description": "Returns the information of signatures methods allowed for the customer for a specific operation.",
    "tags": "[My Legacy Internet Signatures Service]",
    "consumes": "",
    "produces": "",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "description": "Oauth Token\t",
        "required": true,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "X-IBM-Client-Id",
        "in": "header",
        "description": "Client id\t",
        "required": true,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "Accept",
        "in": "header",
        "description": "Accept parameter\t",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "Content-type",
        "in": "header",
        "description": "Content type parameter",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "client_type",
        "in": "header",
        "description": "Used to derive possible signature methods",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "operation_code",
        "in": "query",
        "description": "Operation code. It identifies the operation we are going to sign (paydirekt enrollment, paydirekt change, …). The code will be converted internally to an opcode.",
        "required": true,
        "type": "string",
        "format": "n/a"
      }
    ],
    "responses": {
      "200": {
        "description": "Correct execution",
        "schema": {
          "properties": {
            "id": {
              "type": "string",
              "format": "n/a"
            },
            "status": {
              "type": "string",
              "format": "n/a"
            },
            "alert": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "n/a"
              }
            },
            "alert.title": {
              "type": "string",
              "format": "n/a"
            },
            "alert.description": {
              "type": "string",
              "format": "n/a"
            },
            "alert.solution": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      "204": {
        "description": "The operations does not need the signature of the customer."
      },
      "400": {
        "description": "Some mandatory input data is missing. The format of an input data is invalid.",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "400"
            },
            "httpMessage": {
              "type": "string",
              "format": "Bad request"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      },
      "401": {
        "description": "The oauth token or access token is not valid",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "401"
            },
            "httpMessage": {
              "type": "string",
              "format": "Unauthorized"
            },
            "moreInformation": {
              "type": "string",
              "format": "Failed to verify OAuth information."
            }
          }
        }
      },
      "403": {
        "description": "Forbidden",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "403"
            },
            "httpMessage": {
              "type": "string",
              "format": "Forbidden"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      },
      "404": {
        "description": "No resources match requested URI",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "404"
            },
            "httpMessage": {
              "type": "string",
              "format": "Not Found"
            },
            "moreInformation": {
              "type": "string",
              "format": "No Available Signature"
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "500"
            },
            "httpMessage": {
              "type": "string",
              "format": "Internal server error"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      }
    },
    "deprecated": false
  },
  {
    "id": "4e785b2b.86b004",
    "type": "swagger-doc",
    "z": "",
    "summary": "It initializes a specific signature for one specific operation.",
    "description": "It initializes a specific signature for one specific operation.",
    "tags": "[My Legacy Internet Signatures Service]",
    "consumes": "",
    "produces": "",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "description": "Oauth Token",
        "required": true,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "X-IBM-Client-Id\t",
        "in": "header",
        "description": "Client id",
        "required": true,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "Accept",
        "in": "header",
        "description": "Accept parameter",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "Content-type",
        "in": "header",
        "description": "Content type parameter",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "methodId",
        "in": "body",
        "description": "Signature method identifier: ITAN, MOBILE_TAN",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "methodId": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      {
        "name": "operationCode",
        "in": "body",
        "description": "Operation code. It identifies the operation we are going to sign (überweisung, …). The code will be converted internally to an opcode.",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "operationCode": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      {
        "name": "transactionInfo",
        "in": "body",
        "description": "Transactions information in JSON format coded in Base64. The fields depend on the transaction to perform by the customer.\t",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "transactionInfo": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Correct execution",
        "schema": {
          "properties": {
            "challenge": {
              "type": "string",
              "format": "n/a"
            },
            "additionalInfo": {
              "type": "string",
              "format": "Additional information needed for the signature validation coded in Base64."
            },
            "alerts": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "n/a"
              }
            },
            "alerts.title": {
              "type": "string",
              "format": "n/a"
            },
            "alerts.description": {
              "type": "string",
              "format": "n/a"
            },
            "alerts.solution": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      "400": {
        "description": "Bad request",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "400"
            },
            "httpMessage": {
              "type": "string",
              "format": "Bad request"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      },
      "401": {
        "description": "Incorrect authentication",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "401"
            },
            "httpMessage": {
              "type": "string",
              "format": "Unauthorized"
            },
            "moreInformation": {
              "type": "string",
              "format": "Failed to verify OAuth information."
            }
          }
        }
      },
      "403": {
        "description": "Forbidden",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "403"
            },
            "httpMessage": {
              "type": "string",
              "format": "Forbidden"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      },
      "404": {
        "description": "Not found",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "404"
            },
            "httpMessage": {
              "type": "string",
              "format": "Not found"
            },
            "moreInformation": {
              "type": "string",
              "format": "No resources match requested URI"
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "500"
            },
            "httpMessage": {
              "type": "string",
              "format": "Internal server error"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      }
    },
    "deprecated": false
  },
  {
    "id": "41bb05ec.6ce77c",
    "type": "swagger-doc",
    "z": "",
    "summary": "It verifies the customer signature and generate a new activity log trace for this transaction.",
    "description": "It verifies the customer signature and generate a new activity log trace for this transaction.  The activity log will receive the complete information of the transaction including information related to the customer signature and the information if the signing is correct or not.",
    "tags": "[My Legacy Internet Signatures Service]",
    "consumes": "",
    "produces": "",
    "parameters": [
      {
        "name": "Authorization",
        "in": "header",
        "description": "Oauth Token",
        "required": true,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "X-IBM-Client-Id",
        "in": "header",
        "description": "Client id",
        "required": true,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "Accept",
        "in": "header",
        "description": "Accept parameter",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "Content-type",
        "in": "header",
        "description": "Content type parameter",
        "required": false,
        "type": "string",
        "format": "n/a"
      },
      {
        "name": "methodId",
        "in": "body",
        "description": "Signature method identifier: ITAN, MOBILE_TAN",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "methodId": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      {
        "name": "operationCode",
        "in": "body",
        "description": "Operation code. It identifies the operation we are going to sign (überweisung, …). The code will be converted internally to an opcode.\t",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "operationCode": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      {
        "name": "transactionInfo",
        "in": "body",
        "description": "Transactions informartion in JSON format coded in Base64. The fields depend on the transaction to perform by the customer.Usually same data sended during the initialize of the signature\"\t",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "transactionInfo": {
              "type": "string",
              "format": "Transactions informartion in JSON format coded in Base64"
            }
          }
        }
      },
      {
        "name": "additionalInfo",
        "in": "body",
        "description": "Additional information needed for the signature validation coded in Base64.This field has to be mapped directly to the verification of the signature.  E.g:  mobileTAN: otpID - Code generated in order to ensure the relation between initializedSign() and the verifySign(). Currently only the mobileTAN implementation is going to generate this code.SmartCard: All the parameters needed for the Smart Card plugin.iTAN: Empty",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "additionalInfo": {
              "type": "string",
              "format": "Additional information needed for the signature validation coded in Base64."
            }
          }
        }
      },
      {
        "name": "customerSignature",
        "in": "body",
        "description": "Data with the signature introduced by the customer (iTAN, mTAN, …) - if needed",
        "required": true,
        "schema": {
          "type": "object",
          "properties": {
            "customerSignature": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Correct execution",
        "schema": {
          "properties": {
            "alerts": {
              "type": "array",
              "items": {
                "type": "string",
                "format": "n/a"
              }
            },
            "alerts.title": {
              "type": "string",
              "format": "n/a"
            },
            "alerts.description": {
              "type": "string",
              "format": "n/a"
            },
            "alerts.solution": {
              "type": "string",
              "format": "n/a"
            }
          }
        }
      },
      "400": {
        "description": "Some mandatory input data is missing.  The format of an input data is invalid.",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "400"
            },
            "httpMessage": {
              "type": "string",
              "format": "Bad request"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      },
      "401": {
        "description": "The oauth token or access token is not valid",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "401"
            },
            "httpMessage": {
              "type": "string",
              "format": "Unauthorized"
            },
            "moreInformation": {
              "type": "string",
              "format": "Failed to verify OAuth information."
            }
          }
        }
      },
      "403": {
        "description": "Forbidden",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "403"
            },
            "httpMessage": {
              "type": "string",
              "format": "Forbidden"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      },
      "404": {
        "description": "No resources match requested URI or signature expired",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "404"
            },
            "httpMessage": {
              "type": "string",
              "format": "Not Found"
            },
            "moreInformation": {
              "type": "string",
              "format": "No resources match requested URI"
            }
          }
        }
      },
      "409": {
        "description": "The signature is not valid and a new challenge is requested",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "409"
            },
            "httpMessage": {
              "type": "string",
              "format": "Conflict"
            },
            "moreInformation": {
              "type": "string",
              "format": "iTAN ungültig. Bitte tragen Sie die korrekte 6-stellige iTAN ein."
            },
            "newChallenge": {
              "type": "string",
              "format": "Bitte geben Sie iTAN Nr. 93 von der iTAN-Liste 00004 ein."
            },
            "additionalInfo": {
              "type": "string",
              "format": "Base 64 encoded"
            }
          }
        }
      },
      "423": {
        "description": "The signature is not valid and the signature method is locked.",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "423"
            },
            "httpMessage": {
              "type": "string",
              "format": "Locked"
            },
            "moreInformation": {
              "type": "string",
              "format": "iTAN ungültig. ...."
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "schema": {
          "properties": {
            "httpCode": {
              "type": "string",
              "format": "500"
            },
            "httpMessage": {
              "type": "string",
              "format": "Internal server error"
            },
            "moreInformation": {
              "type": "string"
            }
          }
        }
      }
    },
    "deprecated": false
  },
  {
    "id": "b9e446fa.960808",
    "type": "tls-config",
    "z": "",
    "name": "",
    "cert": "",
    "key": "",
    "ca": "",
    "certname": "",
    "keyname": "",
    "caname": "",
    "verifyservercert": false
  },
  {
    "id": "f3b01034.cb6ad",
    "type": "catch",
    "z": "b2ff1837.594c38",
    "name": "ManageErrors",
    "scope": null,
    "x": 130,
    "y": 60,
    "wires": [
      [
        "da06a887.34bd58",
        "51783901.de9ff8"
      ]
    ]
  },
  {
    "id": "da06a887.34bd58",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "prepareError",
    "func": "prepareErrorRes = function (msg){\n  var httpcodes = {\n      \"202\": \"Accepted\",\n      \"400\": \"Bad request\",\n      \"401\": \"Unauthorized\",\n      \"403\": \"Forbidden\",\n      \"404\": \"Resource not found\",\n      \"405\": \"Method Not Allowed\",\n      \"409\": \"Conflict\",\n      \"423\": \"Locked\",\n      \"500\": \"Internal Server error\",\n      \"504\": \"Server timeout\"\n  }\n\n  var moreInfo = {\n      \"202\": \"Accepted\",\n      \"400\": \"Bad request\",\n      \"401\": \"Failed to verify OAuth information.\",\n      \"403\": \"Forbidden\",\n      \"404\": \"No resources match requested URI\",\n      \"405\": \"Method Not Allowed\",\n      \"409\": \"The request could not be completed due to a conflict with the current state of the target resource\",\n      \"423\": \"The destination resource is locked\",\n      \"500\": \"Internal Server error\",\n      \"504\": \"Server timeout\"\n  }\n\n  // to avoid recursive error handling on response errors\n  if(msg.error.source.type===\"http response\"){\n    msg = null;\n  } else {\n    if (msg.payload.httpCode !== undefined && msg.payload.httpMessage !== undefined && msg.payload.moreInformation !== undefined) { //ERROR FROM OTHER TAB\n        return msg;\n    }\n    \n    if (msg.statusCode === undefined) {\n        msg.statusCode = 500;\n        msg.moreInformation = msg.error.message;\n    } else {\n        if (msg.statusCode == 200) {\n            msg.internal = true;\n            msg.statusCode = 500;\n            msg.moreInformation = msg.error.message;\n        }\n    }\n    \n    let moreInformation = \"\";\n    if (msg.moreInformation === undefined) {\n        moreInformation = moreInfo[msg.statusCode] || \"UNKNOWN CODE DESCRIPTION\";   \n    } else {\n        if (msg.moreInformation.source !== undefined && msg.moreInformation.path !== undefined && msg.moreInformation.errors !== undefined) { //ALREADY FORMATTED\n            moreInformation = msg.moreInformation;\n        } else {\n            let urlData = (msg.responseUrl !== undefined && !msg.internal) ? \n                        msg.responseUrl.includes(\"https://\") ? msg.responseUrl.substring(8) : msg.responseUrl.substring(7)\n                      : \"Internal flow/Node: '\"+msg.error.source.name + \"' and ID: '\"+msg.error.source.id+ \"'\";\n                      \n            let errorMessage = \"UNKNOWN ERROR MESSAGE\";\n            if (msg.moreInformation !== undefined) {\n                if (typeof msg.moreInformation === 'object') {\n                    let base = msg.moreInformation;\n                    if (base[\"SOAP-ENV:Envelope\"] !== undefined) {\n                        msg.moreInformation = base[\"SOAP-ENV:Envelope\"][\"SOAP-ENV:Body\"][0];\n                    }\n                    if (base[\"soap-env:Envelope\"] !== undefined) {\n                        msg.moreInformation = base[\"soap-env:Envelope\"][\"soap-env:Body\"][0];\n                    }\n                }\n                errorMessage = msg.moreInformation;\n            }\n            \n            moreInformation = {\n                source: urlData.substring(0, urlData.indexOf(\"/\")),\n                path: urlData.includes(\"Internal flow\") ? urlData.substring(urlData.indexOf(\"/\")+1) : urlData.substring(urlData.indexOf(\"/\")),\n                errors: errorMessage\n            };\n        }\n    }\n    \n    msg.payload = {\n      \"httpCode\": String(msg.statusCode),\n      \"httpMessage\": httpcodes[msg.statusCode] || \"\",\n      moreInformation\n    }\n\tif(msg.toAdd !== undefined){\n\t\tlet claves = Object.keys(msg.toAdd);\n\t\tfor(let i=0; i<claves.length; i++) {\n\t\t\t\tmsg.payload[claves[i]]= msg.toAdd[claves[i]];\n\t\t}\n\t}\n    msg.headers = { 'x-request-id': msg._msgid }\n  }\n\n  return msg\n};\n\nif(msg.error.message === \"Invalid JSON\"){\n    msg.statusCode= 400;\n    \n    let mensaje = msg._error[0].message;\n    let toReplace = msg._error[0].dataPath.includes(\"body\") ? \".req.body.\" : \n                    msg._error[0].dataPath.includes(\"headers\") ? \".req.headers.\" : \n                    msg._error[0].dataPath.includes(\"query\") ? \".req.query.\" : \n                    msg._error[0].dataPath.includes(\"params\") ? \".req.params.\" :\n                    \"\";\n    let property = msg._error[0].dataPath.replace(toReplace, \"\");\n    if (mensaje.includes(\"should\")) {\n        msg.moreInformation = property +\" \"+ mensaje;\n    } else {\n        msg.moreInformation = mensaje;\n    }\n    \n    if (mensaje.includes(\"pattern\")) {\n        if (property !== undefined) {\n            let pattern = msg._error[0].params.pattern;\n            if (/^\\[a\\-zA\\-Z0\\-9]\\{\\d{1},\\d{1,}}$/.test(pattern)){\n                let indexs = pattern.substring(pattern.lastIndexOf(\"{\"));\n                indexs = indexs.replace(\"{\", \"[\");\n                indexs = indexs.replace(\"}\", \"]\");\n                indexs = JSON.parse(indexs);\n                    \n                let changing = msg.moreInformation.substring(0, msg.moreInformation.indexOf(\"pattern\")+8);\n                msg.moreInformation = changing + \"with min \"+indexs[0]+\" and max \"+indexs[1]+\" numbers and/or upper/lower case letters\";\n            } else if (/^\\[a\\-zA\\-Z0\\-9]\\{\\d{1,}}$/.test(pattern)){\n                let index = pattern.substring(pattern.lastIndexOf(\"{\"));\n                index = indexs.replace(\"{\", \"[\");\n                index = indexs.replace(\"}\", \"]\");\n                \n                let changing = msg.moreInformation.substring(0, msg.moreInformation.indexOf(\"pattern\")+8);\n                msg.moreInformation = changing + \"with min and max \"+index+\" numbers and/or upper/lower case letters\";\n                \n            } else if (/^\\[a\\-zA\\-Z0\\-9]$/.test(pattern)){\n                let changing = msg.moreInformation.substring(0, msg.moreInformation.indexOf(\"pattern\")+8);\n                msg.moreInformation = changing + \"with a number or a upper/lower case letter\";\n            } else {\n                switch (aux) {\n                    case \"^[0-9]{4}-[0-9]{2}-[0-9]{2}$\":\n                        msg.moreInformation = msg.moreInformation.replace(\"\\\"^[0-9]{4}-[0-9]{2}-[0-9]{2}$\\\"\", \"date (YYYY-MM-DD)\");\n                        break;\n                }\n            }\n        } else {\n            if (mensaje.includes(\"\\\"^[0-9]{4}-[0-9]{2}-[0-9]{2}$\\\"\")) {\n                msg.moreInformation = msg.moreInformation.replace(\"\\\"^[0-9]{4}-[0-9]{2}-[0-9]{2}$\\\"\", \"date (YYYY-MM-DD)\");\n            }\n        }\n    }\n}\n\nreturn prepareErrorRes(msg);",
    "outputs": 1,
    "noerr": 0,
    "x": 320,
    "y": 60,
    "wires": [
      [
        "9a2b536.ab5a1b"
      ]
    ]
  },
  {
    "id": "9a2b536.ab5a1b",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "[!2XX]",
    "statusCode": "",
    "headers": {},
    "x": 520,
    "y": 60,
    "wires": []
  },
  {
    "id": "ac2db8ec.3ddc18",
    "type": "http response",
    "z": "7057bed3.3ce1c",
    "name": "response",
    "statusCode": "",
    "headers": {},
    "x": 420,
    "y": 280,
    "wires": []
  },
  {
    "id": "4384860e.a7f5c8",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "SB",
    "info": "",
    "x": 1530,
    "y": 340,
    "wires": []
  },
  {
    "id": "a33a4e68.9f1aa",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "SCB",
    "info": "",
    "x": 1530,
    "y": 420,
    "wires": []
  },
  {
    "id": "acb0ecf2.c8b2c",
    "type": "http in",
    "z": "b2ff1837.594c38",
    "name": "",
    "url": "/legacy/methods",
    "method": "get",
    "upload": false,
    "swaggerDoc": "7b838566.8b6ebc",
    "x": 200,
    "y": 300,
    "wires": [
      [
        "d439028b.4de96",
        "e535d473.290ee8"
      ]
    ]
  },
  {
    "id": "c089cdc7.8535c",
    "type": "change",
    "z": "7057bed3.3ce1c",
    "name": "",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "data.salidamap",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 220,
    "y": 280,
    "wires": [
      [
        "ac2db8ec.3ddc18"
      ]
    ]
  },
  {
    "id": "8ddeeaed.412568",
    "type": "debug",
    "z": "7057bed3.3ce1c",
    "name": "payload legible",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 560,
    "y": 120,
    "wires": []
  },
  {
    "id": "51783901.de9ff8",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "ERROR",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 320,
    "y": 100,
    "wires": []
  },
  {
    "id": "9fc6674b.a27b58",
    "type": "xml",
    "z": "7057bed3.3ce1c",
    "name": "",
    "property": "payload",
    "attr": "",
    "chr": "",
    "x": 390,
    "y": 120,
    "wires": [
      [
        "8ddeeaed.412568"
      ]
    ]
  },
  {
    "id": "ccf65861.6fc368",
    "type": "http in",
    "z": "b2ff1837.594c38",
    "name": "",
    "url": "/legacy/initialize_signature",
    "method": "post",
    "upload": false,
    "swaggerDoc": "4e785b2b.86b004",
    "x": 230,
    "y": 800,
    "wires": [
      [
        "8d20d040.7768c",
        "c227730.7a3729"
      ]
    ]
  },
  {
    "id": "b3f74f61.c3b94",
    "type": "http request",
    "z": "5da96df6.ad9244",
    "name": "",
    "method": "POST",
    "ret": "txt",
    "url": "",
    "tls": "29bd1bd0.e658e4",
    "x": 210,
    "y": 120,
    "wires": [
      [
        "fbdf5074.b9677"
      ]
    ]
  },
  {
    "id": "8ce9e13d.43834",
    "type": "change",
    "z": "5da96df6.ad9244",
    "name": "prepareRequest",
    "rules": [
      {
        "t": "delete",
        "p": "headers",
        "pt": "msg"
      },
      {
        "t": "set",
        "p": "headers.authorization",
        "pt": "msg",
        "to": "req.headers.authorization",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.x-ibm-client-id",
        "pt": "msg",
        "to": "req.headers.x-ibm-client-id",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.accept",
        "pt": "msg",
        "to": "req.headers.accept",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.content-type",
        "pt": "msg",
        "to": "req.headers.content-type",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 220,
    "y": 40,
    "wires": [
      [
        "847cc497.32c5b8"
      ]
    ]
  },
  {
    "id": "847cc497.32c5b8",
    "type": "template",
    "z": "5da96df6.ad9244",
    "name": "setPayload",
    "field": "payload",
    "fieldType": "msg",
    "format": "handlebars",
    "syntax": "mustache",
    "template": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.isban.es/webservices/EBAN/Sign/Fi_ebansignde/EbanSignDEWebServices/v1\">\n    <soapenv:Header>\n        <wsse:Security SOAP-ENV:actor=\"http://www.isban.es/soap/actor/wssecurityUserPass\" SOAP-ENV:mustUnderstand=\"1\" S12:role=\"wsssecurity\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:S12=\"http://www.w3.org/2003/05/soap-envelope\">\n            <wsse:BinarySecurityToken ValueType=\"esquema\" EncodingType=\"wsse:Base64Binary\" wsu:Id=\"SSOToken\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">{{data.password}}</wsse:BinarySecurityToken>\n        </wsse:Security>\n    </soapenv:Header>\n   <soapenv:Body>\n      <v1:initializeSign facade=\"EbanSignDEWebServices\">\n         <company>{{data.company}}</company>\n         <channel>{{data.const.channel}}</channel>\n         <opCode>{{data.translatedOperationCode}}</opCode>\n         <activityLogCode></activityLogCode>\n         <transactionInfo>\n            <signCode>{{data.methodId}}</signCode>\n         </transactionInfo>\n      </v1:initializeSign>\n   </soapenv:Body>\n</soapenv:Envelope>",
    "output": "str",
    "x": 210,
    "y": 80,
    "wires": [
      [
        "b3f74f61.c3b94",
        "f9a38837.2e05e8"
      ]
    ]
  },
  {
    "id": "51af7770.536dd8",
    "type": "comment",
    "z": "5da96df6.ad9244",
    "name": "getComplexMessages (MULIDI)",
    "info": "POST MULIDI.getComplexMessages.endpoint\nSearch for translation.",
    "x": 1010,
    "y": 100,
    "wires": []
  },
  {
    "id": "8cb9c95.9026438",
    "type": "function",
    "z": "5da96df6.ad9244",
    "name": "checkResponse",
    "func": "if (msg.statusCode !== 200) {\n    msg.expandInformation = true;\n    let urlData = msg.url.substring(8);\n    msg.moreInformation = {\n        source: urlData.substring(0, urlData.indexOf(\"/\")),\n        path: urlData.substring(urlData.indexOf(\"/\")),\n        errors: msg.payload.fault.detail\n    };\n    throw new Error();\n}\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 1000,
    "y": 220,
    "wires": [
      [
        "4d5ab267.85b1ec",
        "dd638451.e5e4f8"
      ]
    ]
  },
  {
    "id": "7c03327c.41997c",
    "type": "http request",
    "z": "5da96df6.ad9244",
    "name": "",
    "method": "GET",
    "ret": "obj",
    "url": "",
    "tls": "fc8bac76.794e3",
    "x": 990,
    "y": 180,
    "wires": [
      [
        "8cb9c95.9026438"
      ]
    ]
  },
  {
    "id": "bb1d1f4c.5083a",
    "type": "function",
    "z": "5da96df6.ad9244",
    "name": "prepareRequest",
    "func": "msg.translatable = msg.payload;\n\nmsg.toTranslate = [\"challengeMessage:messageCode\", \"challengeMessage:params\", \"alertList\"];\n\nmsg.url = context.global.config.wsdl.MULIDI.getComplexMessages.endpoint;\n\nlet peticion = [];\nlet params = [];\n\nfor (let i = 0; i < msg.toTranslate.length; i++) {\n    let clave = null;\n    let concepto = null;\n    \n    if (msg.toTranslate[i].includes(\":\")) {\n        let claves = msg.toTranslate[i].split(\":\");\n        clave = msg.translatable[claves[0]];\n        for (let x = 1; x < claves.length; x++) {\n            clave = clave[claves[x]];\n        }\n    } else {\n        clave = msg.translatable[msg.toTranslate[i]];\n    }\n    \n    if (clave === \"\" || clave === undefined || clave === null || (typeof clave !== \"object\" && clave.includes(\"*\"))) {\n        continue;\n    }\n    \n    switch (msg.toTranslate[i]) {\n        case \"challengeMessage:messageCode\":\n            tipoDeDato=\"CODIGO_MENSAJE_APP\";\n            concepto=\"001\";\n            break;\n        case \"challengeMessage:params\":\n            let claves = clave;\n            for (let y = 0; y < claves.length; y++) {\n                clave = claves[y];\n                params.push({\n                    \"message\": {\n                        \"CLAVE_CONCATENADA\": null,\n                        \"CODIGO_TIPO_DE_DATO\": null,\n                        \"FORMATO_TEXTO\": null,\n                        \"IDIOMA_CORPORATIVO\": {\n                          \"IDIOMA_ISO\": null,\n                          \"DIALECTO_ISO\": null\n                        },\n                        \"CONCEPTO\": null,\n                        \"DESCRIPCION\": clave\n                    }\n                });\n            }\n            clave = claves;\n            break;\n        case \"alertList\":\n            let clavesAux = clave;\n            for (let y = 0; y < clavesAux.length; y++) {\n                clave = clavesAux[y];\n                peticion.push({\n                    \"message\": {\n                        \"message\": {\n                            \"CLAVE_CONCATENADA\": clave,\n                            \"CODIGO_TIPO_DE_DATO\": \"CODIGO_MENSAJE_APP\",\n                            \"FORMATO_TEXTO\": null,\n                            \"IDIOMA_CORPORATIVO\": {\n                              \"IDIOMA_ISO\": null,\n                              \"DIALECTO_ISO\": null\n                            },\n                            \"CONCEPTO\": \"002\",\n                            \"DESCRIPCION\": null\n                        }\n                    }\n                });\n            }\n            clave = clavesAux;\n            break;\n        default:\n            tipoDeDato=\"TIPO_DE_INTERVENCION\";\n            concepto=null;\n            break;\n    }\n    \n    if (typeof clave !== \"object\") {\n        peticion.push({\n            \"message\": {\n                \"CLAVE_CONCATENADA\": clave,\n                \"CODIGO_TIPO_DE_DATO\": tipoDeDato,\n                \"FORMATO_TEXTO\": null,\n                \"IDIOMA_CORPORATIVO\": {\n                  \"IDIOMA_ISO\": null,\n                  \"DIALECTO_ISO\": null\n                },\n                \"CONCEPTO\": concepto,\n                \"DESCRIPCION\": \"\"\n            }\n        });\n    }\n}\n\nlet dataToTranslate = [\n    {\n        \"message\": {\n            \"params\": params,\n            \"message\": peticion[0].message\n        }\n    }\n];\n\npeticion.shift();\n\ndataToTranslate = dataToTranslate.concat(peticion);\n\nrequestData = {\n  \"getComplexMessages\": {\n    \"translations\": {\n      \"translatableDescriptionsList\": {\n        \"translationsList\": {}\n      },\n      \"translatableCompoundDescriptions\": dataToTranslate\n    },\n    \"translationsDefault\": {},\n    \"profile\": {\n      \"company\": msg.data.company,\n      \"channel\": msg.data.const.channel,\n      \"language\": {\n        \"IDIOMA_ISO\": msg.data.const.IDIOMA_ISO,\n        \"DIALECTO_ISO\": msg.data.const.DIALECTO_ISO\n      }\n    }\n  }\n};\n\n\nmsg.url += encodeURIComponent(JSON.stringify(requestData)); \nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 1000,
    "y": 140,
    "wires": [
      [
        "7c03327c.41997c",
        "a1a5320f.d2bf4"
      ]
    ]
  },
  {
    "id": "9b710a2f.318ed8",
    "type": "switch",
    "z": "5da96df6.ad9244",
    "name": "hasBody",
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
    "repair": false,
    "outputs": 2,
    "x": 340,
    "y": 200,
    "wires": [
      [
        "2c9793e.8284d6c",
        "612bfdc4.52ec74"
      ],
      [
        "9ad3fda8.d646f",
        "dd49a77c.b57e18"
      ]
    ],
    "outputLabels": [
      "withBody",
      ""
    ]
  },
  {
    "id": "2c9793e.8284d6c",
    "type": "function",
    "z": "5da96df6.ad9244",
    "name": "checkResponse & format",
    "func": "if (msg.payload[\"SOAP-ENV:Envelope\"] !== undefined) {\n    msg.payload = msg.payload[\"SOAP-ENV:Envelope\"][\"SOAP-ENV:Body\"][0];\n} else if (msg.payload[\"soap-env:Envelope\"] !== undefined) {\n    msg.payload = msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0];\n}\n\nif (msg.statusCode !== 200) {\n    let aux = msg.payload[\"soap-env:Fault\"][0].detail[0];\n    let exMessageByDefault = aux[Object.keys(aux)[0]][0].codeError === undefined ? aux[Object.keys(aux)[0]][0].technicalException[0].message : aux[Object.keys(aux)[0]][0].codeError[0];\n    let urlData = msg.url.substring(8);\n    msg.expandInformation = true;\n    msg.moreInformation = {\n        source: urlData.substring(0, urlData.indexOf(\"/\")),\n        path: urlData.substring(urlData.indexOf(\"/\")),\n        errors: exMessageByDefault\n    };\n    \n    throw new Error();\n}\n\nmsg.payload = msg.payload[\"prefixRigel0:initializeSignResponse\"][0].methodResult[0];\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 610,
    "y": 220,
    "wires": [
      [
        "87d552c8.6b8fd",
        "60072daa.4d3f24"
      ]
    ],
    "outputLabels": [
      "ok"
    ]
  },
  {
    "id": "9ad3fda8.d646f",
    "type": "function",
    "z": "5da96df6.ad9244",
    "name": "setNoPayloadError",
    "func": "msg.headers = {};\n\nmsg.urlData = msg.url.substring(8);\n\nmsg.statusCode = 500;\nmsg.expandInformation = true;\nmsg.moreInformation = {\n    source: msg.urlData.substring(0, msg.urlData.indexOf(\"/\")),\n    path: msg.urlData.substring(msg.urlData.indexOf(\"/\")),\n    errors: \"No payload received\"\n};\n\nthrow new Error();",
    "outputs": 1,
    "noerr": 0,
    "x": 550,
    "y": 360,
    "wires": [
      [
        "7ef10e9.3a1bff"
      ]
    ]
  },
  {
    "id": "7ef10e9.3a1bff",
    "type": "http response",
    "z": "5da96df6.ad9244",
    "name": "koNoPayload",
    "statusCode": "",
    "headers": {},
    "x": 780,
    "y": 360,
    "wires": []
  },
  {
    "id": "9eb265a9.e9d278",
    "type": "comment",
    "z": "5da96df6.ad9244",
    "name": "ERROR HANDLER",
    "info": "",
    "x": 550,
    "y": 320,
    "wires": []
  },
  {
    "id": "4a00214a.74a9a",
    "type": "comment",
    "z": "5da96df6.ad9244",
    "name": "MAPPING",
    "info": "",
    "x": 560,
    "y": 180,
    "wires": []
  },
  {
    "id": "87d552c8.6b8fd",
    "type": "change",
    "z": "5da96df6.ad9244",
    "name": "",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "payload.{\t   \"challengeMessage\": challengeMessage.{\t        \"messageCode\": messageCode[0],\t        \"params\": params.param\t   },\t   \"additionalSignatureData\": additionalSignatureData,\t   \"alertList\": alertList.alert.alert\t}\t\t",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 580,
    "y": 260,
    "wires": [
      [
        "96357b03.c7a7b8",
        "bb1d1f4c.5083a"
      ]
    ]
  },
  {
    "id": "fbdf5074.b9677",
    "type": "xml",
    "z": "5da96df6.ad9244",
    "name": "",
    "property": "payload",
    "attr": "",
    "chr": "",
    "x": 190,
    "y": 160,
    "wires": [
      [
        "9b710a2f.318ed8",
        "505e4dd6.ecf2d4"
      ]
    ]
  },
  {
    "id": "7d49c7f0.373998",
    "type": "http response",
    "z": "5da96df6.ad9244",
    "name": "",
    "statusCode": "",
    "headers": {},
    "x": 1410,
    "y": 220,
    "wires": []
  },
  {
    "id": "4d5ab267.85b1ec",
    "type": "function",
    "z": "5da96df6.ad9244",
    "name": "formatResponse",
    "func": "msg.translated = [];\n\nfor (let i = 0; i < msg.payload.methodResult.translatableCompoundDescriptions.length; i++) {\n    msg.translated.push(msg.payload.methodResult.translatableCompoundDescriptions[i].message.message.DESCRIPCION || \"\");\n}\n\nlet additionalInfo = \"\";\n\nswitch (msg.data.methodId) {\n    case \"itan\":\n        additionalInfo = \"\";\n        break;\n    case \"mtan\":\n        additionalSignatureData = \"Pendiente de recuperar!!\";\n        break;\n    case \"smart_card\":\n        break;\n}\n\nlet challenge = msg.translated[0];\nlet alerts = [];\n\nmsg.translated.shift();\n\nfor (let i = 0; i < msg.translated.length; i++) {\n    let solution = \"\";\n    \n    switch (msg.data.methodId) {\n    case \"itan\":\n        solution = \"empty\";\n        break;\n    case \"mtan\":\n        solution = \"Pendiente de recuperar!!\";\n        break;\n    case \"smart_card\":\n        break;\n    }\n    \n    alerts.push({\n        title: \"Hinweis\",\n        description: msg.translated[i],\n        solution\n    });\n}\n\nmsg.payload = {\n  challenge,\n  additionalInfo,\n  alerts\n};\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 1220,
    "y": 220,
    "wires": [
      [
        "7d49c7f0.373998"
      ]
    ]
  },
  {
    "id": "bf58c645.909928",
    "type": "change",
    "z": "32ef7014.05f01",
    "name": "prepareRequest",
    "rules": [
      {
        "t": "delete",
        "p": "headers",
        "pt": "msg"
      },
      {
        "t": "set",
        "p": "headers.authorization",
        "pt": "msg",
        "to": "req.headers.authorization",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.x-ibm-client-id",
        "pt": "msg",
        "to": "req.headers.x-ibm-client-id",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.accept",
        "pt": "msg",
        "to": "req.headers.accept",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.content-type",
        "pt": "msg",
        "to": "req.headers.content-type",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 240,
    "y": 80,
    "wires": [
      [
        "c97c493d.f52698"
      ]
    ]
  },
  {
    "id": "c97c493d.f52698",
    "type": "template",
    "z": "32ef7014.05f01",
    "name": "Set payload",
    "field": "payload",
    "fieldType": "msg",
    "format": "handlebars",
    "syntax": "mustache",
    "template": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.isban.es/webservices/EBAN/Sign/Fi_ebansignde/EbanSignDEWebServices/v1\">\n    <soapenv:Header>\n        <wsse:Security SOAP-ENV:actor=\"http://www.isban.es/soap/actor/wssecurityUserPass\" SOAP-ENV:mustUnderstand=\"1\" S12:role=\"wsssecurity\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:S12=\"http://www.w3.org/2003/05/soap-envelope\">\n            <wsse:BinarySecurityToken ValueType=\"esquema\" EncodingType=\"wsse:Base64Binary\" wsu:Id=\"SSOToken\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">{{data.password}}</wsse:BinarySecurityToken>\n        </wsse:Security>\n    </soapenv:Header>\n   <soapenv:Body>\n        <v1:verifySign facade=\"EbanSignDEWebServices\">\n            <company>{{data.company}}</company> <!--obligatorio-->\n            <channel>{{data.const.channel}}</channel> <!--obligatorio-->\n            <opCode>{{data.translatedOperationCode}}</opCode> <!--obligatorio-->\n            <activityLogCode></activityLogCode>\n            <transactionInfo> <!--obligatorio-->\n                <signCode>{{data.methodId}}</signCode>\n                <fromAccount>{{data.transactionInfo.account}}</fromAccount>\n                <amount>\n                    <IMPORTE>{{data.transactionInfo.amount}}</IMPORTE>\n                    <DIVISA>{{data.const.divisa}}</DIVISA>\n                </amount>\n                <additionalTransactionData><![CDATA[<?xml version=\"1.0\" encoding=\"UTF-8\"?><additionalTransactionData><element><key>email</key><value>testing@isban.es</value></element><element><key>telephone</key><value>666123456</value></element></additionalTransactionData>]]></additionalTransactionData>\n                <paramOrder>\n                    <param>signCode</param>   \n                    <param>fromBlz</param>\n                    <param>fromAccount</param>\n                    <param>amount</param>\n                    <param>email</param>\n                    <param>telephone</param>\n                    <param>customerSignature</param>\n                </paramOrder>\n            </transactionInfo>\n            <additionalSignatureData></additionalSignatureData>\n            <customerSignature>{{data.request.customerSignature}}</customerSignature> <!--obligatorio-->\n      </v1:verifySign>\n   </soapenv:Body>\n</soapenv:Envelope>\n",
    "output": "str",
    "x": 230,
    "y": 120,
    "wires": [
      [
        "c77e976d.e5c3e8",
        "e6866727.d994c8"
      ]
    ]
  },
  {
    "id": "c77e976d.e5c3e8",
    "type": "http request",
    "z": "32ef7014.05f01",
    "name": "",
    "method": "POST",
    "ret": "txt",
    "url": "",
    "tls": "2afe0aa9.df3296",
    "x": 230,
    "y": 160,
    "wires": [
      [
        "88ef8a2d.8ec2f8"
      ]
    ]
  },
  {
    "id": "88ef8a2d.8ec2f8",
    "type": "xml",
    "z": "32ef7014.05f01",
    "name": "",
    "property": "payload",
    "attr": "",
    "chr": "",
    "x": 210,
    "y": 200,
    "wires": [
      [
        "e3c47e23.864f2"
      ]
    ]
  },
  {
    "id": "e3c47e23.864f2",
    "type": "function",
    "z": "32ef7014.05f01",
    "name": "Check error and setData",
    "func": "if(msg.statusCode!==200){\n\n    let aux = msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"soap-env:Fault\"][0].detail[0];\n    \n    if(aux !== undefined && msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"soap-env:Fault\"][0].detail[0][\"prefixRigel0:com.banesto.al.eban.ebansignde.lic.f.exc.EX_WrongSignature\"][0].errorCode[0]==\"EBAN_ITANCode_INCORRECT_ATTEMPT         \"){\n        msg.isErr = true;\n        msg.payload = msg.payload = msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"soap-env:Fault\"][0].detail[0][\"prefixRigel0:com.banesto.al.eban.ebansignde.lic.f.exc.EX_WrongSignature\"][0].challengeMessage;\n        return [null,msg]\n    }\n\n    msg.moreInformation=msg.payload\n    throw new Error();\n}\n\nif (msg.data.logged == \"SB\") {\n    msg.payload = {\n        \"data\": msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"prefixRigel0:verifySignResponse\"][0].methodResult[0],\n        \"sb\": true\n    }\n} else {\n    msg.payload = {\n        \"data\": msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"prefixRigel0:verifySignResponse\"][0].methodResult[0],\n        \"scb\": true\n    }\n}\n\nreturn [msg,null];",
    "outputs": 2,
    "noerr": 0,
    "x": 270,
    "y": 240,
    "wires": [
      [
        "66969ab1.f34db4",
        "a194e232.e6304"
      ],
      [
        "d6d52a9a.6229d8"
      ]
    ]
  },
  {
    "id": "66969ab1.f34db4",
    "type": "switch",
    "z": "32ef7014.05f01",
    "name": "msg.payload.data",
    "property": "payload.data",
    "propertyType": "msg",
    "rules": [
      {
        "t": "eq",
        "v": "",
        "vt": "str"
      },
      {
        "t": "else"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 2,
    "x": 810,
    "y": 180,
    "wires": [
      [
        "6789d435.95466c"
      ],
      [
        "d6d52a9a.6229d8"
      ]
    ]
  },
  {
    "id": "d6d52a9a.6229d8",
    "type": "http response",
    "z": "32ef7014.05f01",
    "name": "",
    "statusCode": "",
    "headers": {},
    "x": 1310,
    "y": 240,
    "wires": []
  },
  {
    "id": "e71be2f2.a3e54",
    "type": "http in",
    "z": "b2ff1837.594c38",
    "name": "",
    "url": "/legacy/verify_signature",
    "method": "post",
    "upload": false,
    "swaggerDoc": "41bb05ec.6ce77c",
    "x": 260,
    "y": 1280,
    "wires": [
      [
        "bf615664.bee948",
        "3843417d.2aaf2e"
      ]
    ]
  },
  {
    "id": "8b7adbe8.2ac288",
    "type": "comment",
    "z": "32ef7014.05f01",
    "name": "Check is method Empty",
    "info": "",
    "x": 820,
    "y": 140,
    "wires": []
  },
  {
    "id": "65018e3a.73ac2",
    "type": "comment",
    "z": "32ef7014.05f01",
    "name": "Alerts Empty",
    "info": "",
    "x": 1070,
    "y": 100,
    "wires": []
  },
  {
    "id": "4ccf25e6.bac98c",
    "type": "http request",
    "z": "7057bed3.3ce1c",
    "name": "",
    "method": "POST",
    "ret": "txt",
    "url": "",
    "tls": "d5e3f793.783298",
    "x": 210,
    "y": 160,
    "wires": [
      [
        "d51a987e.284818"
      ]
    ]
  },
  {
    "id": "5c3092ff.7871ac",
    "type": "function",
    "z": "7057bed3.3ce1c",
    "name": "Check error and setData",
    "func": "if(msg.statusCode!==200){\n    throw new Error ();\n}\n\nif (msg.data.logged == \"SB\") {\n    msg.payload = {\n        \"data\": msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"prefixRigel0:availableUserSignsResponse\"][0].methodResult[0].listAvailableSignature[0].availableSignature,\n        \"sb\": true\n    }\n} else {\n    msg.payload = {\n        \"data\": msg.payload[\"soap-env:Envelope\"][\"soap-env:Body\"][0][\"prefixRigel0:availableUserSignsResponse\"][0].methodResult[0].listAvailableSignature[0].availableSignature,\n        \"scb\": true\n    }\n}\n\nmsg.data.salidamap=[];\n \nfor(let i = 0 ; i<msg.payload.data.length; i++){\n    msg.data.salidamap.push(    \n        {\n            \"id\": ((msg.payload.data[i].signType[0]==\"itan\" ) ? \"ITAN\": \"MOBILE_TAN\"),\n            \"status\": \"OK\",\n            \"alert\": {\n                \"title\": \"Hinweis\",\n                \"description\": \"Bitte ...\",\n                \"solution\": \"...\"\n            }\n         });\n}\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 250,
    "y": 240,
    "wires": [
      [
        "c089cdc7.8535c"
      ]
    ]
  },
  {
    "id": "d51a987e.284818",
    "type": "xml",
    "z": "7057bed3.3ce1c",
    "name": "",
    "property": "payload",
    "attr": "",
    "chr": "",
    "x": 190,
    "y": 200,
    "wires": [
      [
        "5c3092ff.7871ac",
        "77ea92b9.9af5cc"
      ]
    ]
  },
  {
    "id": "aae8995c.cae738",
    "type": "template",
    "z": "7057bed3.3ce1c",
    "name": "Set payload",
    "field": "payload",
    "fieldType": "msg",
    "format": "handlebars",
    "syntax": "mustache",
    "template": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:v1=\"http://www.isban.es/webservices/EBAN/Sign/Fi_ebansignde/EbanSignDEWebServices/v1\">  \n   <soapenv:Header>\n      <wsse:Security SOAP-ENV:actor=\"http://www.isban.es/soap/actor/wssecurityUserPass\" SOAP-ENV:mustUnderstand=\"1\" S12:role=\"wsssecurity\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:S12=\"http://www.w3.org/2003/05/soap-envelope\">\n         <wsse:BinarySecurityToken ValueType=\"esquema\" EncodingType=\"wsse:Base64Binary\" wsu:Id=\"SSOToken\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">{{data.password}}</wsse:BinarySecurityToken>\n      </wsse:Security>\n   </soapenv:Header>\n   <soapenv:Body>\n      <v1:availableUserSigns facade=\"EbanSignDEWebServices\">\n         <opCode>{{data.translatedOperationCode}}</opCode>     \n         <company>{{data.company}}</company>\n         <channel>{{data.const.channel}}</channel>\n      </v1:availableUserSigns>\n   </soapenv:Body>\n</soapenv:Envelope>",
    "output": "str",
    "x": 210,
    "y": 120,
    "wires": [
      [
        "4ccf25e6.bac98c",
        "9fc6674b.a27b58"
      ]
    ]
  },
  {
    "id": "7f77f1cc.dfea",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SBparameters",
    "rules": [
      {
        "t": "set",
        "p": "url",
        "pt": "msg",
        "to": "$globalContext(\"config.wsdl.myLegacyInternetSignatures.methods.SB.endpoint\")",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.company",
        "pt": "msg",
        "to": "data.const.companySB",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.password",
        "pt": "msg",
        "to": "sb.password",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1580,
    "y": 380,
    "wires": [
      [
        "2265d3d1.5d320c"
      ]
    ]
  },
  {
    "id": "505e4dd6.ecf2d4",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "1 op",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 190,
    "y": 200,
    "wires": []
  },
  {
    "id": "a1a5320f.d2bf4",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "2",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 1220,
    "y": 120,
    "wires": []
  },
  {
    "id": "1c70fb51.b2bbc5",
    "type": "json",
    "z": "b2ff1837.594c38",
    "name": "",
    "property": "transactionInfo",
    "action": "",
    "pretty": false,
    "x": 1950,
    "y": 1440,
    "wires": [
      [
        "7db959ea.9d4798"
      ]
    ]
  },
  {
    "id": "a194e232.e6304",
    "type": "debug",
    "z": "32ef7014.05f01",
    "name": "",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 250,
    "y": 280,
    "wires": []
  },
  {
    "id": "6789d435.95466c",
    "type": "change",
    "z": "32ef7014.05f01",
    "name": "",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{}",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1060,
    "y": 140,
    "wires": [
      [
        "d6d52a9a.6229d8"
      ]
    ]
  },
  {
    "id": "dcc2070b.6a7908",
    "type": "switch",
    "z": "a6126c31.c6f39",
    "name": "loggedSystem",
    "property": "data.logged",
    "propertyType": "msg",
    "rules": [
      {
        "t": "eq",
        "v": "SB",
        "vt": "str"
      },
      {
        "t": "eq",
        "v": "SCB",
        "vt": "str"
      },
      {
        "t": "else"
      }
    ],
    "checkall": "true",
    "repair": false,
    "outputs": 3,
    "x": 1160,
    "y": 120,
    "wires": [
      [],
      [],
      []
    ]
  },
  {
    "id": "8151fff2.ea489",
    "type": "change",
    "z": "32ef7014.05f01",
    "name": "translate challenge",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "payload.{\t   \"challengeMessage\": {\t        \"messageCode\": messageCode[0],\t        \"params\": params.param\t   }\t}\t\t",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "toTranslate",
        "pt": "msg",
        "to": "[\"challengeMessage:messageCode\", \"challengeMessage:params\"]",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 490,
    "y": 340,
    "wires": [
      [
        "e7499f3a.500ed"
      ]
    ]
  },
  {
    "id": "96357b03.c7a7b8",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "1",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 990,
    "y": 360,
    "wires": []
  },
  {
    "id": "e349538a.09e4e",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "/methods",
    "info": "",
    "x": 120,
    "y": 220,
    "wires": []
  },
  {
    "id": "87cf5779.d511a8",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "/initialize_signature",
    "info": "",
    "x": 150,
    "y": 720,
    "wires": []
  },
  {
    "id": "61ebd3d.b9d532c",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "/verify_signature",
    "info": "",
    "x": 160,
    "y": 1200,
    "wires": []
  },
  {
    "id": "6f18a13d.8e361",
    "type": "security-stt",
    "z": "b2ff1837.594c38",
    "name": "Call STT",
    "token": "data.tokenJWT",
    "tokenType": "msg",
    "endpoint": "config.wsdl.bks.v2.personal.internet.endpoint",
    "endpointType": "global",
    "cache_ttl": 0,
    "cache_ttlType": "num",
    "x": 980,
    "y": 480,
    "wires": [
      [
        "3ce377ae.e2f128",
        "d074702e.88b57"
      ],
      [
        "3ce377ae.e2f128",
        "1aa35579.80cb0b"
      ],
      [
        "3ce377ae.e2f128",
        "1aa35579.80cb0b"
      ],
      [
        "3ce377ae.e2f128",
        "1aa35579.80cb0b"
      ]
    ]
  },
  {
    "id": "dc4d6d11.7e304",
    "type": "function",
    "z": "a6126c31.c6f39",
    "name": "checkResponse & saveToken",
    "func": "for(var i=0; i<msg.payload.stt_response.length; i++){\n   if(msg.payload.stt_response[i].bank_id === \"SCB\"){\n        msg.scb = {\n            user : msg.payload.stt_response[i].uid,\n            password : msg.payload.stt_response[i].token\n        };\n    }\n    else{\n        msg.sb = {\n            user : msg.payload.stt_response[i].uid,\n            password : msg.payload.stt_response[i].token\n        };\n    }\n}\n\nif (msg.scb === undefined && msg.sb === undefined) {\n    msg.statusCode = 401;\n    throw new Error();\n}\n\nif(msg.scb !== undefined){\n    msg.data.scb = msg.scb;\n    if (msg.scb.user === msg.data.sub) {\n       msg.data.logged = \"SCB\";\n       msg.data.systemId = \"400\";\n    }\n}\n\nif(msg.sb !== undefined){\n    msg.data.sb = msg.sb;\n    if (msg.sb.user === msg.data.sub) {\n       msg.data.logged = \"SB\";\n       msg.data.systemId = \"300\";\n    }\n}\n\nnode.warn(msg.data.logged);\n\nreturn msg;\n",
    "outputs": 1,
    "noerr": 0,
    "x": 910,
    "y": 120,
    "wires": [
      [
        "dcc2070b.6a7908"
      ]
    ]
  },
  {
    "id": "eb346eb3.787c1",
    "type": "http response",
    "z": "c7386136.14ebd",
    "name": "response",
    "statusCode": "",
    "headers": {
      "Content-Type": "application/json"
    },
    "x": 500,
    "y": 60,
    "wires": []
  },
  {
    "id": "d439028b.4de96",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "Entra /methods",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 340,
    "y": 200,
    "wires": []
  },
  {
    "id": "3ce377ae.e2f128",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "response /methods",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 1250,
    "y": 340,
    "wires": []
  },
  {
    "id": "1586eb06.4a4a15",
    "type": "function",
    "z": "a6126c31.c6f39",
    "name": "AutoBearer",
    "func": "if(msg.req.headers.authorization.substring(0,6)!== \"Bearer\"){\n    msg.req.headers.authorization = \"Bearer \" + msg.req.headers.authorization;\n}\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 190,
    "y": 120,
    "wires": [
      [
        "991273a1.a61f2"
      ]
    ]
  },
  {
    "id": "991273a1.a61f2",
    "type": "change",
    "z": "a6126c31.c6f39",
    "name": "decodeSub",
    "rules": [
      {
        "t": "set",
        "p": "data.sub",
        "pt": "msg",
        "to": "$base64decode($split($substring(req.headers.authorization, 7), \".\")[1])",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 370,
    "y": 120,
    "wires": [
      [
        "ed13dece.d76ba"
      ]
    ]
  },
  {
    "id": "ed13dece.d76ba",
    "type": "json",
    "z": "a6126c31.c6f39",
    "name": "",
    "property": "data.sub",
    "action": "obj",
    "pretty": false,
    "x": 530,
    "y": 120,
    "wires": [
      [
        "ce75dffa.3624d"
      ]
    ]
  },
  {
    "id": "ce75dffa.3624d",
    "type": "change",
    "z": "a6126c31.c6f39",
    "name": "setSub",
    "rules": [
      {
        "t": "set",
        "p": "data.sub",
        "pt": "msg",
        "to": "data.sub.sub",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 680,
    "y": 120,
    "wires": [
      [
        "dc4d6d11.7e304"
      ]
    ]
  },
  {
    "id": "2132e977.392346",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "2.- Transform operation code",
    "info": "Transform operation code to call SCB/SB",
    "x": 520,
    "y": 400,
    "wires": []
  },
  {
    "id": "fa529159.6aede",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "saveTranslatedOperationCode",
    "func": "let operationCode = msg.data.request.operation_code;\nlet translatedOperationCode = \"\";\nmsg.data.translatedOperationCode = context.global.config.operation.code[operationCode];\n\nif (msg.data.translatedOperationCode !== undefined) {\n    return [null,msg];\n} else {\n    return [msg,null];\n}",
    "outputs": 2,
    "noerr": 0,
    "x": 570,
    "y": 480,
    "wires": [
      [
        "79d7c344.c072dc"
      ],
      [
        "6f18a13d.8e361"
      ]
    ]
  },
  {
    "id": "e535d473.290ee8",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "save entry data",
    "rules": [
      {
        "t": "set",
        "p": "metadata",
        "pt": "msg",
        "to": "{\t    \"apiVersion\": $split(req.url, \"/\")[1],\t    \"apiName\": $substringBefore($split(req.url, \"/\")[2], \"?\")\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.request",
        "pt": "msg",
        "to": "payload",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.tokenJWT",
        "pt": "msg",
        "to": "req.headers.authorization",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 520,
    "y": 300,
    "wires": [
      [
        "1cae900f.f4686"
      ]
    ]
  },
  {
    "id": "65563ce2.67f7c4",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {},
    "x": 1080,
    "y": 100,
    "wires": []
  },
  {
    "id": "a5ec8925.01d9e8",
    "type": "change",
    "z": "c7386136.14ebd",
    "name": "401 Incorrect authentication",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"401\",\t    \"httpMessage\": \"Unauthorized\",\t    \"moreInformation\": \"Failed to verify OAuth information.\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "401",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 280,
    "y": 60,
    "wires": [
      [
        "eb346eb3.787c1"
      ]
    ]
  },
  {
    "id": "79d7c344.c072dc",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "400 Bad request",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"400\",\t    \"httpMessage\": \"Bad request\",\t    \"moreInformation\": \"\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "400",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 800,
    "y": 320,
    "wires": [
      [
        "4d6c7a65.b81724"
      ]
    ]
  },
  {
    "id": "8841fa92.4f1cc8",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "403 Forbidden",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"403\",\t    \"httpMessage\": \"Forbidden\",\t    \"moreInformation\": \"\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "403",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 840,
    "y": 100,
    "wires": [
      [
        "65563ce2.67f7c4"
      ]
    ]
  },
  {
    "id": "b68cdc8a.cab75",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "404 Not found",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"404\",\t    \"httpMessage\": \"Not Found\",\t    \"moreInformation\": \"No Available Signature\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "404",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1580,
    "y": 540,
    "wires": [
      [
        "62023831.d1e0b8"
      ]
    ]
  },
  {
    "id": "3b6a437d.82844c",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "500 Internal server error",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"500\",\t    \"httpMessage\": \"Internal server error\",\t    \"moreInformation\": \"\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "500",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 870,
    "y": 140,
    "wires": [
      [
        "65563ce2.67f7c4"
      ]
    ]
  },
  {
    "id": "1cae900f.f4686",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "Validate input data",
    "func": "if ((msg.req.headers[\"authorization\"] !== undefined) && \n    (msg.req.headers[\"x-ibm-client-id\"] !== undefined) && \n    //(msg.req.headers[\"client_type\"] !== undefined) && //mandatory only in new version of API\n    (msg.payload[\"operation_code\"] !== undefined))\n{\n    return [null,msg];\n} else {\n    return [msg,null];\n}",
    "outputs": 2,
    "noerr": 0,
    "x": 530,
    "y": 340,
    "wires": [
      [
        "79d7c344.c072dc"
      ],
      [
        "7492e2.1790fd2"
      ]
    ]
  },
  {
    "id": "babb0668.94e3f8",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "1.- Validate input params",
    "info": "",
    "x": 510,
    "y": 260,
    "wires": []
  },
  {
    "id": "4d6c7a65.b81724",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {},
    "x": 980,
    "y": 320,
    "wires": []
  },
  {
    "id": "ad46434.3d226c",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.- Call STT",
    "info": "POST /tokens/bks/personal",
    "x": 950,
    "y": 420,
    "wires": []
  },
  {
    "id": "759ce38e.f1c5cc",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.2- response error",
    "info": "",
    "x": 1210,
    "y": 520,
    "wires": []
  },
  {
    "id": "4a844021.74418",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "4.- Get signature methods",
    "info": "",
    "x": 1850,
    "y": 340,
    "wires": []
  },
  {
    "id": "7492e2.1790fd2",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SaveConstantsMethods",
    "rules": [
      {
        "t": "set",
        "p": "data.const.channel",
        "pt": "msg",
        "to": "INT",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.companySB",
        "pt": "msg",
        "to": "3294",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.companySCB",
        "pt": "msg",
        "to": "3293",
        "tot": "str"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 550,
    "y": 440,
    "wires": [
      [
        "fa529159.6aede"
      ]
    ]
  },
  {
    "id": "62023831.d1e0b8",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {
      "Content-Type": "application/json"
    },
    "x": 1840,
    "y": 540,
    "wires": []
  },
  {
    "id": "7dfb9087.6e82a",
    "type": "security-stt",
    "z": "b2ff1837.594c38",
    "name": "Call STT",
    "token": "data.tokenJWT",
    "tokenType": "msg",
    "endpoint": "config.wsdl.bks.v2.personal.internet.endpoint",
    "endpointType": "global",
    "cache_ttl": 0,
    "cache_ttlType": "num",
    "x": 1060,
    "y": 1000,
    "wires": [
      [
        "893ab3aa.4e0cc",
        "db8f1f90.e19"
      ],
      [
        "893ab3aa.4e0cc",
        "83b1c59d.18a488"
      ],
      [
        "893ab3aa.4e0cc",
        "83b1c59d.18a488"
      ],
      [
        "893ab3aa.4e0cc",
        "83b1c59d.18a488"
      ]
    ]
  },
  {
    "id": "a0734e30.e86a7",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "2.- Transform operation code",
    "info": "Transform operation code to call SCB/SB",
    "x": 600,
    "y": 900,
    "wires": []
  },
  {
    "id": "ca928225.e8fb2",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "saveTranslatedOperationCode&MethodId",
    "func": "let operationCode = msg.data.request.operationCode;\nlet translatedOperationCode = \"\";\nmsg.data.translatedOperationCode = context.global.config.operation.code[operationCode];\n\nswitch (msg.data.request.methodId) {\n    case \"ITAN\":\n        msg.data.methodId = \"itan\";\n        break;\n    case \"MOBILE_TAN\":\n        msg.data.methodId = \"mtan\";\n        break;\n}\n\nif ((msg.data.translatedOperationCode !== undefined) && (msg.data.methodId !== undefined)) {\n    return [null,msg];\n} else {\n    return [msg,null];\n}",
    "outputs": 2,
    "noerr": 0,
    "x": 680,
    "y": 980,
    "wires": [
      [
        "2e656478.c216fc"
      ],
      [
        "7dfb9087.6e82a"
      ]
    ]
  },
  {
    "id": "8d20d040.7768c",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "save entry data",
    "rules": [
      {
        "t": "set",
        "p": "metadata",
        "pt": "msg",
        "to": "{\t    \"apiVersion\": $split(req.url, \"/\")[1],\t    \"apiName\": $substringBefore($split(req.url, \"/\")[2], \"?\")\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.request",
        "pt": "msg",
        "to": "payload",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.tokenJWT",
        "pt": "msg",
        "to": "req.headers.authorization",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 600,
    "y": 800,
    "wires": [
      [
        "91fcc06d.b8ba4"
      ]
    ]
  },
  {
    "id": "91fcc06d.b8ba4",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "Validate input data",
    "func": "if ((msg.req.headers[\"authorization\"] !== undefined) && \n    (msg.req.headers[\"x-ibm-client-id\"] !== undefined) && \n    (msg.payload[\"methodId\"] !== undefined) &&\n    (msg.payload[\"operationCode\"] !== undefined) &&\n    (msg.payload[\"transactionInfo\"] !== undefined))\n{\n    return [null,msg];\n} else {\n    return [msg,null];\n}",
    "outputs": 2,
    "noerr": 0,
    "x": 610,
    "y": 840,
    "wires": [
      [
        "2e656478.c216fc"
      ],
      [
        "340aa7c4.7e73e8",
        "d964bec0.2f2db"
      ]
    ]
  },
  {
    "id": "259dc7be.b6ee78",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "1.- Validate input params",
    "info": "",
    "x": 590,
    "y": 760,
    "wires": []
  },
  {
    "id": "9aa33c04.f56da",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.- Call STT",
    "info": "POST /tokens/bks/personal",
    "x": 1030,
    "y": 940,
    "wires": []
  },
  {
    "id": "d964bec0.2f2db",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SaveConstantsInitialize",
    "rules": [
      {
        "t": "set",
        "p": "data.const.channel",
        "pt": "msg",
        "to": "INT",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.companySB",
        "pt": "msg",
        "to": "3294",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.companySCB",
        "pt": "msg",
        "to": "3293",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.IDIOMA_ISO",
        "pt": "msg",
        "to": "de ",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.DIALECTO_ISO",
        "pt": "msg",
        "to": "DE",
        "tot": "str"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 630,
    "y": 940,
    "wires": [
      [
        "ca928225.e8fb2"
      ]
    ]
  },
  {
    "id": "893ab3aa.4e0cc",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "response /methods",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 1070,
    "y": 1100,
    "wires": []
  },
  {
    "id": "a9690fcc.aac32",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {},
    "x": 1060,
    "y": 820,
    "wires": []
  },
  {
    "id": "2e656478.c216fc",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "400 Bad request",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"400\",\t    \"httpMessage\": \"Bad request\",\t    \"moreInformation\": \"\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "400",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 880,
    "y": 820,
    "wires": [
      [
        "a9690fcc.aac32"
      ]
    ]
  },
  {
    "id": "5b7c1b7c.4d15e4",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "4.- Initialize signature",
    "info": "",
    "x": 1940,
    "y": 860,
    "wires": []
  },
  {
    "id": "60072daa.4d3f24",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "4 op",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 810,
    "y": 160,
    "wires": []
  },
  {
    "id": "76ebefbf.4318f",
    "type": "security-stt",
    "z": "b2ff1837.594c38",
    "name": "Call STT",
    "token": "data.tokenJWT",
    "tokenType": "msg",
    "endpoint": "config.wsdl.bks.v2.personal.internet.endpoint",
    "endpointType": "global",
    "cache_ttl": 0,
    "cache_ttlType": "num",
    "x": 1140,
    "y": 1480,
    "wires": [
      [
        "dd814dc9.407c7",
        "c5b4f23a.c1c36"
      ],
      [
        "dd814dc9.407c7",
        "227ac09b.e709f"
      ],
      [
        "dd814dc9.407c7",
        "227ac09b.e709f"
      ],
      [
        "dd814dc9.407c7",
        "227ac09b.e709f"
      ]
    ]
  },
  {
    "id": "bf44127.74ed4f",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "2.- Transform operation code",
    "info": "Transform operation code to call SCB/SB",
    "x": 740,
    "y": 1380,
    "wires": []
  },
  {
    "id": "3ce0adb.32ea552",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "saveTranslatedOperationCode&MethodId",
    "func": "let operationCode = msg.data.request.operationCode;\nlet translatedOperationCode = \"\";\nmsg.data.translatedOperationCode = context.global.config.operation.code[operationCode];\n\nswitch (msg.data.request.methodId) {\n    case \"ITAN\":\n        msg.data.methodId = \"itan\";\n        break;\n    case \"MOBILE_TAN\":\n        msg.data.methodId = \"mtan\";\n        break;\n}\n\nif ((msg.data.translatedOperationCode !== undefined) && (msg.data.methodId !== undefined)) {\n    return [null,msg];\n} else {\n    return [msg,null];\n}",
    "outputs": 2,
    "noerr": 0,
    "x": 820,
    "y": 1460,
    "wires": [
      [
        "537819a9.431c18"
      ],
      [
        "76ebefbf.4318f"
      ]
    ]
  },
  {
    "id": "bf615664.bee948",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "save entry data",
    "rules": [
      {
        "t": "set",
        "p": "metadata",
        "pt": "msg",
        "to": "{\t    \"apiVersion\": $split(req.url, \"/\")[1],\t    \"apiName\": $substringBefore($split(req.url, \"/\")[2], \"?\")\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.request",
        "pt": "msg",
        "to": "payload",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.tokenJWT",
        "pt": "msg",
        "to": "req.headers.authorization",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 740,
    "y": 1280,
    "wires": [
      [
        "fc5bb07d.4f10b"
      ]
    ]
  },
  {
    "id": "fc5bb07d.4f10b",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "Validate input data",
    "func": "if ((msg.req.headers[\"authorization\"] !== undefined) && \n    (msg.req.headers[\"x-ibm-client-id\"] !== undefined) && \n    (msg.payload[\"methodId\"] !== undefined) &&\n    (msg.payload[\"operationCode\"] !== undefined) &&\n    (msg.payload[\"transactionInfo\"] !== undefined) &&\n    (msg.payload[\"additionalInfo\"] !== undefined) &&\n    (msg.payload[\"customerSignature\"] !== undefined))\n{\n    return [null,msg];\n} else {\n    return [msg,null];\n}",
    "outputs": 2,
    "noerr": 0,
    "x": 750,
    "y": 1320,
    "wires": [
      [
        "537819a9.431c18"
      ],
      [
        "efc82ad1.23c518",
        "2491b355.010cbc"
      ]
    ]
  },
  {
    "id": "ab4ec92c.00fbd8",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "1.- Validate input params",
    "info": "",
    "x": 730,
    "y": 1240,
    "wires": []
  },
  {
    "id": "28f640f7.c18b9",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.- Call STT",
    "info": "POST /tokens/bks/personal",
    "x": 1110,
    "y": 1420,
    "wires": []
  },
  {
    "id": "2491b355.010cbc",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SaveConstantsVerify",
    "rules": [
      {
        "t": "set",
        "p": "data.const.channel",
        "pt": "msg",
        "to": "INT",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.companySB",
        "pt": "msg",
        "to": "3294",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.companySCB",
        "pt": "msg",
        "to": "3293",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "data.const.divisa",
        "pt": "msg",
        "to": "EUR",
        "tot": "str"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 760,
    "y": 1420,
    "wires": [
      [
        "3ce0adb.32ea552"
      ]
    ]
  },
  {
    "id": "dd814dc9.407c7",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "response /methods",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 1150,
    "y": 1580,
    "wires": []
  },
  {
    "id": "cb14298d.bc9668",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {},
    "x": 1200,
    "y": 1300,
    "wires": []
  },
  {
    "id": "537819a9.431c18",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "400 Bad request",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"400\",\t    \"httpMessage\": \"Bad request\",\t    \"moreInformation\": \"\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "400",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1020,
    "y": 1300,
    "wires": [
      [
        "cb14298d.bc9668"
      ]
    ]
  },
  {
    "id": "d82adc3d.4f661",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "4.- Verify signature",
    "info": "",
    "x": 2130,
    "y": 1400,
    "wires": []
  },
  {
    "id": "c227730.7a3729",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "Entra /initialize_signature",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 490,
    "y": 700,
    "wires": []
  },
  {
    "id": "3843417d.2aaf2e",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "Entra /verify_signature",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 520,
    "y": 1180,
    "wires": []
  },
  {
    "id": "340aa7c4.7e73e8",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "nodo",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 830,
    "y": 700,
    "wires": []
  },
  {
    "id": "efc82ad1.23c518",
    "type": "debug",
    "z": "b2ff1837.594c38",
    "name": "nodo",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 956.6666870117188,
    "y": 1235.71435546875,
    "wires": []
  },
  {
    "id": "612bfdc4.52ec74",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "2 op",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 550,
    "y": 140,
    "wires": []
  },
  {
    "id": "dd49a77c.b57e18",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "3 op",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 510,
    "y": 400,
    "wires": []
  },
  {
    "id": "603966ad.2aa3b8",
    "type": "comment",
    "z": "32ef7014.05f01",
    "name": "MULIDI",
    "info": "",
    "x": 1130,
    "y": 380,
    "wires": []
  },
  {
    "id": "a331affd.b9b5e",
    "type": "function",
    "z": "32ef7014.05f01",
    "name": "formatResponse",
    "func": "if(msg.isErr){\n    msg.translated = msg.payload.methodResult.translatableCompoundDescriptions[0].message.message.DESCRIPCION;\n    msg.statusCode=409;\n    msg.moreInformation = \"iTAN ungültig. Bitte tragen Sie die korrekte 6-stellige iTAN ein.\";\n    msg.toAdd={\n        \"newChallenge\" : msg.translated,\n        \"additionalInfo\": msg.req.body.additionalInfo !== undefined? msg.req.body.additionalInfo : \"\"\n        }\n    msg.expandInformation = true;\n    throw new Error(msg);\n    \n}else{\n    msg.translated = [];\n    \n    for (let i = 0; i < msg.payload.methodResult.translatableCompoundDescriptions.length; i++) {\n        msg.translated.push(msg.payload.methodResult.translatableCompoundDescriptions[i].message.message.DESCRIPCION || \"\");\n    }\n    switch (msg.data.methodId) {\n        case \"itan\":\n            additionalInfo = \"\";\n            break;\n        case \"mtan\":\n            break;\n        case \"smart_card\":\n            break;\n    }\n    \n    let alerts = [];\n    \n    for (let i = 0; i < msg.translated.length; i++) {\n        let solution = \"\";\n        \n        switch (msg.data.methodId) {\n        case \"itan\":\n            solution = \"empty\";\n            break;\n        case \"mtan\":\n            break;\n        case \"smart_card\":\n            break;\n        }\n        \n        alerts.push({\n            title: \"Hinweis\",\n            description: msg.translated[i],\n            solution\n        });\n    }\n    \n    msg.payload = {\n      \"alerts\" : alerts\n    };\n\n}\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 1160,
    "y": 540,
    "wires": [
      [
        "d6d52a9a.6229d8"
      ]
    ]
  },
  {
    "id": "e7499f3a.500ed",
    "type": "function",
    "z": "32ef7014.05f01",
    "name": "prepareRequest",
    "func": "msg.translatable = msg.payload;\n\nmsg.url = context.global.config.wsdl.MULIDI.getComplexMessages.endpoint;\n\nlet peticion = [];\nlet params = [];\n\nfor (let i = 0; i < msg.toTranslate.length; i++) {\n    let clave = null;\n    let concepto = null;\n    \n    if (msg.toTranslate[i].includes(\":\")) {\n        let claves = msg.toTranslate[i].split(\":\");\n        clave = msg.translatable[claves[0]];\n        for (let x = 1; x < claves.length; x++) {\n            clave = clave[claves[x]];\n        }\n    } else {\n        clave = msg.translatable[msg.toTranslate[i]];\n    }\n    \n    if (clave === \"\" || clave === undefined || clave === null || (typeof clave !== \"object\" && clave.includes(\"*\"))) {\n        continue;\n    }\n    \n    switch (msg.toTranslate[i]) {\n        case \"challengeMessage:messageCode\":\n            tipoDeDato=\"CODIGO_MENSAJE_APP\";\n            concepto=\"001\";\n            break;\n        case \"challengeMessage:params\":\n            let claves = clave;\n            for (let y = 0; y < claves.length; y++) {\n                clave = claves[y];\n                params.push({\n                    \"message\": {\n                        \"CLAVE_CONCATENADA\": null,\n                        \"CODIGO_TIPO_DE_DATO\": null,\n                        \"FORMATO_TEXTO\": null,\n                        \"IDIOMA_CORPORATIVO\": {\n                          \"IDIOMA_ISO\": null,\n                          \"DIALECTO_ISO\": null\n                        },\n                        \"CONCEPTO\": null,\n                        \"DESCRIPCION\": clave\n                    }\n                });\n            }\n            clave = claves;\n            break;\n        case \"alertList\":\n            let clavesAux = clave;\n            for (let y = 0; y < clavesAux.length; y++) {\n                clave = clavesAux[y];\n                peticion.push({\n                    \"message\": {\n                        \"message\": {\n                            \"CLAVE_CONCATENADA\": clave,\n                            \"CODIGO_TIPO_DE_DATO\": \"CODIGO_MENSAJE_APP\",\n                            \"FORMATO_TEXTO\": null,\n                            \"IDIOMA_CORPORATIVO\": {\n                              \"IDIOMA_ISO\": null,\n                              \"DIALECTO_ISO\": null\n                            },\n                            \"CONCEPTO\": \"002\",\n                            \"DESCRIPCION\": null\n                        }\n                    }\n                });\n            }\n            clave = clavesAux;\n            break;\n        default:\n            tipoDeDato=\"TIPO_DE_INTERVENCION\";\n            concepto=null;\n            break;\n    }\n    \n    if (typeof clave !== \"object\") {\n        peticion.push({\n            \"message\": {\n                \"CLAVE_CONCATENADA\": clave,\n                \"CODIGO_TIPO_DE_DATO\": tipoDeDato,\n                \"FORMATO_TEXTO\": null,\n                \"IDIOMA_CORPORATIVO\": {\n                  \"IDIOMA_ISO\": null,\n                  \"DIALECTO_ISO\": null\n                },\n                \"CONCEPTO\": concepto,\n                \"DESCRIPCION\": \"\"\n            }\n        });\n    }\n}\n\nlet dataToTranslate = [\n    {\n        \"message\": {\n            \"params\": params,\n            \"message\": peticion[0].message\n        }\n    }\n];\n\npeticion.shift();\n\ndataToTranslate = dataToTranslate.concat(peticion);\n\nrequestData = {\n  \"getComplexMessages\": {\n    \"translations\": {\n      \"translatableDescriptionsList\": {\n        \"translationsList\": {}\n      },\n      \"translatableCompoundDescriptions\": dataToTranslate\n    },\n    \"translationsDefault\": {},\n    \"profile\": {\n      \"company\": (msg.data.systemId === \"400\" ? \"3293\" : \"3294\"),\n      \"channel\": \"INT\",\n      \"language\": {\n        \"IDIOMA_ISO\": \"de \",\n        \"DIALECTO_ISO\": \"DE\"\n      }\n    }\n  }\n};\n\n\nmsg.url += encodeURIComponent(JSON.stringify(requestData)); \nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 1160,
    "y": 420,
    "wires": [
      [
        "8d992289.3f6eb"
      ]
    ]
  },
  {
    "id": "8d992289.3f6eb",
    "type": "http request",
    "z": "32ef7014.05f01",
    "name": "",
    "method": "GET",
    "ret": "obj",
    "url": "",
    "tls": "b9e446fa.960808",
    "x": 1150,
    "y": 460,
    "wires": [
      [
        "49cf64c4.51385c"
      ]
    ]
  },
  {
    "id": "49cf64c4.51385c",
    "type": "function",
    "z": "32ef7014.05f01",
    "name": "checkResponse",
    "func": "if (msg.statusCode !== 200) {\n    msg.expandInformation = true;\n    let urlData = msg.url.substring(8);\n    msg.moreInformation = {\n        source: urlData.substring(0, urlData.indexOf(\"/\")),\n        path: urlData.substring(urlData.indexOf(\"/\")),\n        errors: msg.payload.fault.detail\n    };\n    throw new Error();\n}\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 1160,
    "y": 500,
    "wires": [
      [
        "a331affd.b9b5e"
      ]
    ]
  },
  {
    "id": "fd66ea7f.54c1f8",
    "type": "change",
    "z": "32ef7014.05f01",
    "name": "translate alerts",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "\tpayload.data.{\t\t   \"alertList\": alerts\t}\t\t\t",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "toTranslate",
        "pt": "msg",
        "to": "[\"alertList\"]",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 940,
    "y": 320,
    "wires": [
      [
        "e7499f3a.500ed"
      ]
    ]
  },
  {
    "id": "e3da3565.d25cf8",
    "type": "change",
    "z": "7057bed3.3ce1c",
    "name": "prepareRequest",
    "rules": [
      {
        "t": "delete",
        "p": "headers",
        "pt": "msg"
      },
      {
        "t": "set",
        "p": "headers.authorization",
        "pt": "msg",
        "to": "req.headers.authorization",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.x-ibm-client-id",
        "pt": "msg",
        "to": "req.headers.x-ibm-client-id",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.accept",
        "pt": "msg",
        "to": "req.headers.accept",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "headers.content-type",
        "pt": "msg",
        "to": "req.headers.content-type",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 220,
    "y": 80,
    "wires": [
      [
        "aae8995c.cae738"
      ]
    ]
  },
  {
    "id": "c9541018.3e018",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SCBparameters",
    "rules": [
      {
        "t": "set",
        "p": "url",
        "pt": "msg",
        "to": "$globalContext(\"config.wsdl.myLegacyInternetSignatures.methods.SCB.endpoint\")",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.company",
        "pt": "msg",
        "to": "data.const.companySCB",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.password",
        "pt": "msg",
        "to": "scb.password",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1580,
    "y": 460,
    "wires": [
      [
        "2265d3d1.5d320c"
      ]
    ]
  },
  {
    "id": "d565ede6.840c4",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "Otherwise",
    "info": "",
    "x": 1540,
    "y": 500,
    "wires": []
  },
  {
    "id": "77ea92b9.9af5cc",
    "type": "debug",
    "z": "7057bed3.3ce1c",
    "name": "Response legible",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 410,
    "y": 200,
    "wires": []
  },
  {
    "id": "1faadd54.99d343",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "MULIDI",
    "info": "",
    "x": 2230,
    "y": 460,
    "wires": []
  },
  {
    "id": "97a5a9e9.c26088",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "formatResponse",
    "func": "if(msg.isErr){\n    msg.translated = msg.payload.methodResult.translatableCompoundDescriptions[0].message.message.DESCRIPCION;\n    msg.statusCode=409;\n    msg.moreInformation = \"iTAN ungültig. Bitte tragen Sie die korrekte 6-stellige iTAN ein.\";\n    msg.toAdd={\n        \"newChallenge\" : msg.translated,\n        \"additionalInfo\": msg.req.body.additionalInfo !== undefined? msg.req.body.additionalInfo : \"\"\n        }\n    msg.expandInformation = true;\n    throw new Error(msg);\n    \n}else{\n    msg.translated = [];\n    \n    for (let i = 0; i < msg.payload.methodResult.translatableCompoundDescriptions.length; i++) {\n        msg.translated.push(msg.payload.methodResult.translatableCompoundDescriptions[i].message.message.DESCRIPCION || \"\");\n    }\n    switch (msg.data.methodId) {\n        case \"itan\":\n            additionalInfo = \"\";\n            break;\n        case \"mtan\":\n            break;\n        case \"smart_card\":\n            break;\n    }\n    \n    let alerts = [];\n    \n    for (let i = 0; i < msg.translated.length; i++) {\n        let solution = \"\";\n        \n        switch (msg.data.methodId) {\n        case \"itan\":\n            solution = \"empty\";\n            break;\n        case \"mtan\":\n            break;\n        case \"smart_card\":\n            break;\n        }\n        \n        alerts.push({\n            title: \"Hinweis\",\n            description: msg.translated[i],\n            solution\n        });\n    }\n    \n    msg.payload = {\n      \"alerts\" : alerts\n    };\n\n}\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 2240,
    "y": 660,
    "wires": [
      []
    ]
  },
  {
    "id": "468ebc99.30fac4",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "prepareRequest",
    "func": "msg.translatable = msg.payload;\n\nmsg.url = context.global.config.wsdl.MULIDI.getComplexMessages.endpoint;\n\nlet peticion = [];\nlet params = [];\n\nfor (let i = 0; i < msg.toTranslate.length; i++) {\n    let clave = null;\n    let concepto = null;\n    \n    if (msg.toTranslate[i].includes(\":\")) {\n        let claves = msg.toTranslate[i].split(\":\");\n        clave = msg.translatable[claves[0]];\n        for (let x = 1; x < claves.length; x++) {\n            clave = clave[claves[x]];\n        }\n    } else {\n        clave = msg.translatable[msg.toTranslate[i]];\n    }\n    \n    if (clave === \"\" || clave === undefined || clave === null || (typeof clave !== \"object\" && clave.includes(\"*\"))) {\n        continue;\n    }\n    \n    switch (msg.toTranslate[i]) {\n        case \"challengeMessage:messageCode\":\n            tipoDeDato=\"CODIGO_MENSAJE_APP\";\n            concepto=\"001\";\n            break;\n        case \"challengeMessage:params\":\n            let claves = clave;\n            for (let y = 0; y < claves.length; y++) {\n                clave = claves[y];\n                params.push({\n                    \"message\": {\n                        \"CLAVE_CONCATENADA\": null,\n                        \"CODIGO_TIPO_DE_DATO\": null,\n                        \"FORMATO_TEXTO\": null,\n                        \"IDIOMA_CORPORATIVO\": {\n                          \"IDIOMA_ISO\": null,\n                          \"DIALECTO_ISO\": null\n                        },\n                        \"CONCEPTO\": null,\n                        \"DESCRIPCION\": clave\n                    }\n                });\n            }\n            clave = claves;\n            break;\n        case \"alertList\":\n            let clavesAux = clave;\n            for (let y = 0; y < clavesAux.length; y++) {\n                clave = clavesAux[y];\n                peticion.push({\n                    \"message\": {\n                        \"message\": {\n                            \"CLAVE_CONCATENADA\": clave,\n                            \"CODIGO_TIPO_DE_DATO\": \"CODIGO_MENSAJE_APP\",\n                            \"FORMATO_TEXTO\": null,\n                            \"IDIOMA_CORPORATIVO\": {\n                              \"IDIOMA_ISO\": null,\n                              \"DIALECTO_ISO\": null\n                            },\n                            \"CONCEPTO\": \"002\",\n                            \"DESCRIPCION\": null\n                        }\n                    }\n                });\n            }\n            clave = clavesAux;\n            break;\n        default:\n            tipoDeDato=\"TIPO_DE_INTERVENCION\";\n            concepto=null;\n            break;\n    }\n    \n    if (typeof clave !== \"object\") {\n        peticion.push({\n            \"message\": {\n                \"CLAVE_CONCATENADA\": clave,\n                \"CODIGO_TIPO_DE_DATO\": tipoDeDato,\n                \"FORMATO_TEXTO\": null,\n                \"IDIOMA_CORPORATIVO\": {\n                  \"IDIOMA_ISO\": null,\n                  \"DIALECTO_ISO\": null\n                },\n                \"CONCEPTO\": concepto,\n                \"DESCRIPCION\": \"\"\n            }\n        });\n    }\n}\n\nlet dataToTranslate = [\n    {\n        \"message\": {\n            \"params\": params,\n            \"message\": peticion[0].message\n        }\n    }\n];\n\npeticion.shift();\n\ndataToTranslate = dataToTranslate.concat(peticion);\n\nrequestData = {\n  \"getComplexMessages\": {\n    \"translations\": {\n      \"translatableDescriptionsList\": {\n        \"translationsList\": {}\n      },\n      \"translatableCompoundDescriptions\": dataToTranslate\n    },\n    \"translationsDefault\": {},\n    \"profile\": {\n      \"company\": (msg.data.systemId === \"400\" ? \"3293\" : \"3294\"),\n      \"channel\": \"INT\",\n      \"language\": {\n        \"IDIOMA_ISO\": \"de \",\n        \"DIALECTO_ISO\": \"DE\"\n      }\n    }\n  }\n};\n\n\nmsg.url += encodeURIComponent(JSON.stringify(requestData)); \nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 2240,
    "y": 540,
    "wires": [
      [
        "574236a1.1922b8"
      ]
    ]
  },
  {
    "id": "574236a1.1922b8",
    "type": "http request",
    "z": "b2ff1837.594c38",
    "name": "",
    "method": "GET",
    "ret": "obj",
    "url": "",
    "tls": "b9e446fa.960808",
    "x": 2230,
    "y": 580,
    "wires": [
      [
        "64aa241e.37f3cc"
      ]
    ]
  },
  {
    "id": "64aa241e.37f3cc",
    "type": "function",
    "z": "b2ff1837.594c38",
    "name": "checkResponse",
    "func": "if (msg.statusCode !== 200) {\n    msg.expandInformation = true;\n    throw new Error();\n}\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "x": 2240,
    "y": 620,
    "wires": [
      [
        "97a5a9e9.c26088"
      ]
    ]
  },
  {
    "id": "590d8e97.6a8",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "\tpayload.data.{\t\t   \"alert\": alert\t}\t\t\t",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "toTranslate",
        "pt": "msg",
        "to": "[\"alert\"]",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 2240,
    "y": 500,
    "wires": [
      [
        "468ebc99.30fac4"
      ]
    ]
  },
  {
    "id": "fa88b0e1.6003d",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "SB",
    "info": "",
    "x": 1630,
    "y": 860,
    "wires": []
  },
  {
    "id": "9f430708.f2b698",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "SCB",
    "info": "",
    "x": 1630,
    "y": 940,
    "wires": []
  },
  {
    "id": "48fa012f.28dc3",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SBparameters",
    "rules": [
      {
        "t": "set",
        "p": "url",
        "pt": "msg",
        "to": "$globalContext(\"config.wsdl.myLegacyInternetSignatures.initializeSign.SB.endpoint\")",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.company",
        "pt": "msg",
        "to": "data.const.companySB",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.password",
        "pt": "msg",
        "to": "sb.password",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1680,
    "y": 900,
    "wires": [
      [
        "2c47908d.b0192"
      ]
    ]
  },
  {
    "id": "c124920d.dbb1e",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "404 Not found",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"404\",\t    \"httpMessage\": \"Not Found\",\t    \"moreInformation\": \"No Available Signature\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "404",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1680,
    "y": 1060,
    "wires": [
      [
        "ac58b31.0f65f5"
      ]
    ]
  },
  {
    "id": "13eeaca2.525933",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SCBparameters",
    "rules": [
      {
        "t": "set",
        "p": "url",
        "pt": "msg",
        "to": "$globalContext(\"config.wsdl.myLegacyInternetSignatures.initializeSign.SCB.endpoint\")",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.company",
        "pt": "msg",
        "to": "data.const.companySCB",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.password",
        "pt": "msg",
        "to": "scb.password",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1680,
    "y": 980,
    "wires": [
      [
        "2c47908d.b0192"
      ]
    ]
  },
  {
    "id": "90e9d433.4dd4d8",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "Otherwise",
    "info": "",
    "x": 1640,
    "y": 1020,
    "wires": []
  },
  {
    "id": "ac58b31.0f65f5",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {
      "Content-Type": "application/json"
    },
    "x": 1860,
    "y": 1060,
    "wires": []
  },
  {
    "id": "96d2ea4b.d1ad88",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "SB",
    "info": "",
    "x": 1730,
    "y": 1400,
    "wires": []
  },
  {
    "id": "829a48b7.b8db78",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "SCB",
    "info": "",
    "x": 1730,
    "y": 1480,
    "wires": []
  },
  {
    "id": "b72bde14.3e3ca",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SBparameters",
    "rules": [
      {
        "t": "set",
        "p": "url",
        "pt": "msg",
        "to": "$globalContext(\"config.wsdl.myLegacyInternetSignatures.verifySign.SB.endpoint\")",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.company",
        "pt": "msg",
        "to": "data.const.companySB",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.password",
        "pt": "msg",
        "to": "sb.password",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "transactionInfo",
        "pt": "msg",
        "to": "$base64decode(data.transactionInfo)",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1780,
    "y": 1440,
    "wires": [
      [
        "1c70fb51.b2bbc5"
      ]
    ]
  },
  {
    "id": "faead75a.ad98a8",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "404 Not found",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "{\t    \"httpCode\": \"404\",\t    \"httpMessage\": \"Not Found\",\t    \"moreInformation\": \"No Available Signature\"\t}",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "statusCode",
        "pt": "msg",
        "to": "404",
        "tot": "num"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1780,
    "y": 1600,
    "wires": [
      [
        "9e578928.cdd178"
      ]
    ]
  },
  {
    "id": "c833e8d7.ce9a98",
    "type": "change",
    "z": "b2ff1837.594c38",
    "name": "SCBparameters",
    "rules": [
      {
        "t": "set",
        "p": "url",
        "pt": "msg",
        "to": "$globalContext(\"config.wsdl.myLegacyInternetSignatures.verifySign.SCB.endpoint\")",
        "tot": "jsonata"
      },
      {
        "t": "set",
        "p": "data.company",
        "pt": "msg",
        "to": "data.const.companySCB",
        "tot": "msg"
      },
      {
        "t": "set",
        "p": "data.password",
        "pt": "msg",
        "to": "scb.password",
        "tot": "msg"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1780,
    "y": 1520,
    "wires": [
      [
        "7db959ea.9d4798"
      ]
    ]
  },
  {
    "id": "f6e17852.f42038",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "Otherwise",
    "info": "",
    "x": 1740,
    "y": 1560,
    "wires": []
  },
  {
    "id": "9e578928.cdd178",
    "type": "http response",
    "z": "b2ff1837.594c38",
    "name": "response",
    "statusCode": "",
    "headers": {
      "Content-Type": "application/json"
    },
    "x": 1760,
    "y": 1660,
    "wires": []
  },
  {
    "id": "fa2c52a5.9318",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "payload legible",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 560,
    "y": 80,
    "wires": []
  },
  {
    "id": "f9a38837.2e05e8",
    "type": "xml",
    "z": "5da96df6.ad9244",
    "name": "",
    "property": "payload",
    "attr": "",
    "chr": "",
    "x": 390,
    "y": 80,
    "wires": [
      [
        "fa2c52a5.9318"
      ]
    ]
  },
  {
    "id": "f98488.bfcb8b78",
    "type": "debug",
    "z": "32ef7014.05f01",
    "name": "payload legible",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 580,
    "y": 120,
    "wires": []
  },
  {
    "id": "e6866727.d994c8",
    "type": "xml",
    "z": "32ef7014.05f01",
    "name": "",
    "property": "payload",
    "attr": "",
    "chr": "",
    "x": 410,
    "y": 120,
    "wires": [
      [
        "f98488.bfcb8b78"
      ]
    ]
  },
  {
    "id": "c45d8bb5.510028",
    "type": "comment",
    "z": "32ef7014.05f01",
    "name": "ir a mulidi solo alerts",
    "info": "",
    "x": 950,
    "y": 280,
    "wires": []
  },
  {
    "id": "e620077f.bc3f88",
    "type": "comment",
    "z": "32ef7014.05f01",
    "name": "ir a mulidi translate challenges",
    "info": "",
    "x": 520,
    "y": 300,
    "wires": []
  },
  {
    "id": "38109c59.c291a4",
    "type": "http response",
    "z": "5da96df6.ad9244",
    "name": "",
    "statusCode": "",
    "headers": {},
    "x": 830,
    "y": 260,
    "wires": []
  },
  {
    "id": "dd638451.e5e4f8",
    "type": "debug",
    "z": "5da96df6.ad9244",
    "name": "checkResponse",
    "active": true,
    "tosidebar": true,
    "console": false,
    "tostatus": false,
    "complete": "true",
    "x": 1260,
    "y": 180,
    "wires": []
  },
  {
    "id": "d074702e.88b57",
    "type": "subflow:a6126c31.c6f39",
    "z": "b2ff1837.594c38",
    "name": "validate response OK STT",
    "x": 1260,
    "y": 460,
    "wires": [
      [
        "7f77f1cc.dfea"
      ],
      [
        "c9541018.3e018"
      ],
      [
        "b68cdc8a.cab75"
      ]
    ]
  },
  {
    "id": "f4ed2108.c88cb",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.1- response ok",
    "info": "",
    "x": 1200,
    "y": 400,
    "wires": []
  },
  {
    "id": "db8f1f90.e19",
    "type": "subflow:a6126c31.c6f39",
    "z": "b2ff1837.594c38",
    "name": "validate response OK STT",
    "x": 1380,
    "y": 980,
    "wires": [
      [
        "48fa012f.28dc3"
      ],
      [
        "13eeaca2.525933"
      ],
      [
        "c124920d.dbb1e"
      ]
    ]
  },
  {
    "id": "1aa35579.80cb0b",
    "type": "subflow:c7386136.14ebd",
    "z": "b2ff1837.594c38",
    "name": "Validate response FAIL STT",
    "x": 1260,
    "y": 560,
    "wires": []
  },
  {
    "id": "83b1c59d.18a488",
    "type": "subflow:c7386136.14ebd",
    "z": "b2ff1837.594c38",
    "name": "Validate response FAIL STT",
    "x": 1380,
    "y": 1080,
    "wires": []
  },
  {
    "id": "cc00f350.f3db5",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.2- response error",
    "info": "",
    "x": 1330,
    "y": 1040,
    "wires": []
  },
  {
    "id": "c48e8665.29ec18",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.1- response ok",
    "info": "",
    "x": 1320,
    "y": 920,
    "wires": []
  },
  {
    "id": "227ac09b.e709f",
    "type": "subflow:c7386136.14ebd",
    "z": "b2ff1837.594c38",
    "name": "Validate response FAIL STT",
    "x": 1460,
    "y": 1620,
    "wires": []
  },
  {
    "id": "fdba8a66.d5cef8",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.2- response error",
    "info": "",
    "x": 1410,
    "y": 1580,
    "wires": []
  },
  {
    "id": "c5b4f23a.c1c36",
    "type": "subflow:a6126c31.c6f39",
    "z": "b2ff1837.594c38",
    "name": "validate response OK STT",
    "x": 1460,
    "y": 1520,
    "wires": [
      [
        "b72bde14.3e3ca"
      ],
      [
        "c833e8d7.ce9a98"
      ],
      [
        "faead75a.ad98a8"
      ]
    ]
  },
  {
    "id": "71ed1b9a.4a0da4",
    "type": "comment",
    "z": "b2ff1837.594c38",
    "name": "3.1- response ok",
    "info": "",
    "x": 1400,
    "y": 1460,
    "wires": []
  },
  {
    "id": "2265d3d1.5d320c",
    "type": "subflow:7057bed3.3ce1c",
    "z": "b2ff1837.594c38",
    "name": "Get signature methods",
    "x": 1840,
    "y": 380,
    "wires": []
  },
  {
    "id": "2c47908d.b0192",
    "type": "subflow:5da96df6.ad9244",
    "z": "b2ff1837.594c38",
    "name": "Initialize signature",
    "x": 1950,
    "y": 900,
    "wires": []
  },
  {
    "id": "7db959ea.9d4798",
    "type": "subflow:32ef7014.05f01",
    "z": "b2ff1837.594c38",
    "name": "Verify signature",
    "x": 2140,
    "y": 1440,
    "wires": []
  }
];

const flowDrawer = new NodeRedFlowDrawer();
flowDrawer.draw(newNodesObj).then((images) => {
  for (let image of images) {
    console.log(`<img src="${image}"></img>`)
  }
});
