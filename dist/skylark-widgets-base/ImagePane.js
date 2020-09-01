/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./base","./Widget"],function(t,e){"use strict";var i=e.inherit({_construct:function(t){e.call(this,t,"img"),this._elm.style.borderStyle="none",this._elm.style.objectFit="contain"},setImage:function(t){this._elm.src=t}});return t.ImagePane=i});
//# sourceMappingURL=sourcemaps/ImagePane.js.map
