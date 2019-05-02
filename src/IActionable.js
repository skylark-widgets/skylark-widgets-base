/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 *
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
    "qscript/lang/Interface", // declare
    "qscript/lang/refection/ClassInfo"
], function(Interface, ClassInfo ) {

    var IActionable = Interface.declare({
        "-desc": "A  interface for Actionable object.",

        "-parent-": Interface,

        "-module-": "qface/action/IActionable",

        "-interfaces-": [],

        "-protected-": {
            "-fields-": {},

            "-methods-": {

            }
        },

        "-public-": {
            "-attributes-": {
            },
            "-methods-": {
                findAction: function (name) {
                    var typeInfo = ClassInfo.get(this.constructor),
                    methodInfo = typeInfo.findMethod(name),
                    action = methodInfo && methodInfo.getMetaProperty("action");

                    return action;
                },
                listActions: function () {
                    var typeInfo = ClassInfo.get(this.constructor),
                        methodInfos = typeInfo.listMethods(function(methodInfo){
                            return methodInfo.hasMetaProperty("action");
                        }),
                        actions=[];

                    methodInfos.forEach(function(methodInfo){
                        var actionInfo = methodInfo.getMetaProperty("action");
                        actionInfo.name = methodInfo.name;
                        actions.push(actionInfo);
                    });

                    return actions;
                },
                performAction : function(name){
                    this[name]();
                }

            },
            "-events-": {
            }
        }
    });
    return IActionable;
});
