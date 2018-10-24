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

module.exports = (function() {
    const validators = {
        number: function(blankAllowed){return function(v) { return (blankAllowed&&(v===""||v===undefined)) || (v!=="" && !isNaN(v));};},
        regex: function(re){return function(v) { return re.test(v);};},
        typedInput: function() { return function() {return true;};}
    };

    return {
        init: function(RED) {
            RED.validators = validators;
        }
    };
})();
