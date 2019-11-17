/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx/Evented","./base"],function(i,n,t){var e=n.inherit({_construct:function(n,t){this._widget=n,Object.defineProperty(this,"options",{value:i.mixin({},this.options,t,!0)}),this._init&&this._init()}});return t.Addon=e});
//# sourceMappingURL=sourcemaps/Addon.js.map
