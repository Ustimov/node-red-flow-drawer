module.exports = function _RED () {

    var _view = require('./view');
    var _workspaces = require('./workspaces');
    var _nodes = require('./nodes');

    var red = {
        i18n: require('./i18n'),
        state: require('./state'),
        tabs: require('./tabs'),
        types: require('./types'),
        text: require('./text'),
        utils: require('./utils'),
    };

    red.i18n.init(red);
    red.nodes = _nodes(red);
    red.types.init(red);
    red.utils.init(red);
    red.view = _view(red);
    red.workspaces = _workspaces(red);

    return red;
}
