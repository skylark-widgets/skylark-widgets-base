/**
 * skylark-ui-commands - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/Evented","./commands"],function(t,n){var e=t.inherit({klassName:"Command",category:{get:function(){return this._options.category}},checked:{get:function(){return this._options.checked}},icon:{get:function(){return this._options.icon}},label:{get:function(){return this._options.label}},name:{get:function(){return this._name}},shortcut:{get:function(){return this._options.shortCut}},tooltip:{get:function(){return this._options.tooltip}},execute:function(){this.trigger("executed")},isEnabled:function(t){var n=this.trigger("checkingDisabled");return!n||!n.result},shouldShow:function(t){var n=this.trigger("checkingHidden");return!n||!n.result},init:function(t,n){this._name=t,this._options=n||{}}});return n.Command=e});
//# sourceMappingURL=sourcemaps/Command.js.map
