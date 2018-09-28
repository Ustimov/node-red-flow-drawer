/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

const RED = require('./red');

RED.workspaces = (function() {

    var activeWorkspace = 0;
    var workspaceIndex = 0;

    function addWorkspace(ws,skipHistoryEntry) {
        if (ws) {
            workspace_tabs.addTab(ws);
        } else {
            console.error('Undefined workspace');
        }
        return ws;
    }

    var workspace_tabs;
    var workspaceTabCount;
    function createWorkspaceTabs() {
        workspace_tabs = RED.tabs.create();
        workspaceTabCount = 0;
    }

    return {
        init: createWorkspaceTabs,
        add: addWorkspace,
        active: function() {
            return activeWorkspace
        },
        show: function(id) {
            if (!workspace_tabs.contains(id)) {
                var sf = RED.nodes.subflow(id);
                if (sf) {
                    addWorkspace({type:"subflow",id:id,icon:"red/images/subflow_tab.png",label:sf.name, closeable: true});
                } else {
                    console.error('Subflow not found');
                    return;
                }
            }
            activeWorkspace = id;
        },
        tabs: function () { return workspace_tabs ? workspace_tabs.tabs : {}; }
    }
})();
