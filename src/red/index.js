module.exports = function _RED () {

    //console.log('_NEW RED');
    var _view = require('./view')

    var red = {
        i18n: require('./i18n'),
        nodes: require('./nodes'),
        state: require('./state'),
        tabs: require('./tabs'),
        types: require('./types'),
        text: require('./text'),
        utils: require('./utils'),
        workspaces: require('./workspaces')
    };

    red.i18n.init(red);
    red.nodes.init(red);
    red.types.init(red);
    red.utils.init(red);
    //red.view.init(red);
    red.view = _view(red);
    red.workspaces.init(red);

    return red;
}
