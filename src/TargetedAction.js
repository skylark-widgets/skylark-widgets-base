/**
 *
 * Copyright (c) 2013 psteam Inc.(http://www.psteam.co.jp)
 * http://www.psteam.co.jp/qface/license
 * 
 * @Author: liwenfeng
 * @Date: 2013/02/28
 */
define([
	"qscript/lang/Class",
	"qface/action/Action"
], function (Class, Action) {

    var TargetedAction = Class.declare({
        "-parent-": Action,
        "-protected-": {
            "-methods-": {
                _stdGetAttrValue: function ( /*String*/ name) {
                    var value = this.overrided(name);
                    if (value === undefined) {
                        value = this._.targetActionInfo[name];
                    }
                    return value;
                },
            }

        },
        "-public-": {
            "-attributes-": {
                "targetObject": {
                    desc: "The target object with target action",
                    type: Object // IControl
                },
                "targetAction": {
                    desc: "The target action name.",
                    type: String
                }

            },
            "-methods-": {
                execute: function () {
                    var targetObject = this.targetObject,
                        targetAction = this.targetAction;

                    targetObject.performAction(targetAction);
                    this.overrided("executed");
                },
                isEnabled: function (context) {
                    var _ = this._,
                        actionInfo = _.actionInfo,
                        isEnabledFunc = actionInfo.isEnabled,
                        disabled;
                    if (isEnabledFunc) {
                        disabled = !isEnabledFunc.apply();
                    }
                    
                    if (disabled) {
                        return false;
                    }
                    return this.overrided();
                },

                shouldShow: function(context) {
                    var _ = this._,
                        actionInfo = _.actionInfo,
                        shouldShowFunc = actionInfo.shouldShow,
                        hidden;
                    if (shouldShowFunc) {
                        hidden = !shouldShowFunc.apply();
                    }

                    if (hidden) {
                        return false;
                    }
                    return this.overrided();
                }
            },
            "-events-": {

            }
        },
        "-constructor-": {
            "initialize": function (params) {
                this.overrided(params);

                var _ = this._,
                    targetObject = _.targetObject,
                    targetAction = _.targetAction,
                    actionInfo = targetObject && targetAction && targetObject.findAction(targetAction);

                if (!actionInfo) {
                    throw new Error("Invalid parameter!");
                } else {
                    _.targetActionInfo = actionInfo;
                }

            }
        }

    });

    return TargetedAction;
});


