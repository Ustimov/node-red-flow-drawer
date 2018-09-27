const RED = require('./red');

require('./bidi');
require('./editor');
require('./i18n');
require('./nodes');

require('./state');
require('./tabs');
require('./utils');
require('./view');
require('./workspaces');

RED.i18n.init();
RED.view.init();
RED.workspaces.init();
RED.nodes.init();
RED.view.init();

module.exports = RED;
