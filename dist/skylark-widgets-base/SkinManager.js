/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define([],function(){"use strict";var n=[],t=[];return{register:function(e,r){n.push(r),t[r]=e},get:function(e){return e||(e=n[0]),new t[e]},getList:function(){return n.slice()}}});
//# sourceMappingURL=sourcemaps/SkinManager.js.map
