/**
 * babel-plugin-untrace
 *   Babel plugin for untrace
 *     Remove all function calls where the function name is "trace"
 *
 * Licensed under the MIT license.
 *   https://github.com/Andersbakken/babel-plugin-untrace/blob/master/LICENSE
 */
'use strict';

/*
function findTrace(root, str, seen)
{
    if (!seen)
        seen = [];
    var ret;
    if (!str)
        str = "";

    if (typeof root === "string") {
        if (root === "trace") {
            return [str + ".trace"];
        }
    } else if (typeof root === "object") {
        if (seen.indexOf(root) !== -1) {
            return undefined;
        }
        seen.push(root);
        if (Array.isArray(root)) {
            for (var idx=0; idx<root.length; ++idx) {
                var rr = findTrace(root[idx], str + "." + idx, seen);
                if (rr) {
                    if (!ret) {
                        ret = rr;
                    } else {
                        ret = ret.concat(rr);
                    }
                }

            }
        } else {
            for (var key in root) {
                var rrr = findTrace(root[key], str + "." + key, seen);
                if (rrr) {
                    if (!ret) {
                        ret = rrr;
                    } else {
                        ret = ret.concat(rrr);
                    }
                }
            }
        }
    }
    return ret;
}
*/

module.exports = (babel) => {
    return {
        visitor: {
            CallExpression (nodePath, pluginPass) {
                try {
                    if (nodePath.parentPath.isExpressionStatement()
                        && nodePath.get('callee').parent.callee.property.name === "trace") {
                        nodePath.remove();
                    }
                } catch (err) {
                }
            }
        }
    };
};
