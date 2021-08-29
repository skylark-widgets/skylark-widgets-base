/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-numerics/vector2","../widget"],function(t,e){"use strict";var s={_buildText:function(){this.getSkin();this.span=document.createElement("span"),this.span.style.overflow="hidden",this._elm.appendChild(this.span),this.text=document.createTextNode(""),this.span.appendChild(this.text),this.fitContent=!1,this.allowWordBreak(!1),this.setVerticalAlignment(s.CENTER),this.setAlignment(s.CENTER)},setFont:function(t,e,s){this.span.style.fontFamily=t,void 0!==e&&(this.span.style.fontWeight=e),void 0!==s&&(this.span.style.fontStyle=s)},allowWordBreak:function(t){!0===t?(this.span.style.whiteSpace="normal",this.span.style.wordBreak="break-word"):(this.span.style.whiteSpace="pre",this.span.style.wordBreak="normal")},setText:function(t){this.text.data=t},setTextBorder:function(t,e){this.span.style.textShadow="-"+t+"px 0 "+e+", 0 "+t+"px "+e+", "+t+"px 0 "+e+", 0 -"+t+"px "+e},setTextSize:function(t){this._elm.style.fontSize=t+"px"},setTextColor:function(t){this.span.style.color=t},setOverflow:function(t){t===s.ELLIPSIS?(this.span.style.whiteSpace="nowrap",this.span.style.textOverflow="ellipsis"):(this.span.style.whiteSpace="pre",this.span.style.textOverflow="clip")},setAlignment:function(t){t===s.CENTER?(this._elm.style.justifyContent="center",this._elm.style.textAlign="center"):t===s.LEFT?(this._elm.style.justifyContent="flex-start",this._elm.style.textAlign="left"):t===s.RIGHT&&(this._elm.style.justifyContent="flex-end",this._elm.style.textAlign="right")},setVerticalAlignment:function(t){t===s.CENTER?this._elm.style.alignItems="center":t===s.TOP?this._elm.style.alignItems="flex-start":t===s.BOTTOM&&(this._elm.style.alignItems="flex-end")},measure:function(){return new t(this.span.offsetWidth,this.span.offsetHeight)},setMargin:function(t){this.span.style.margin=t+"px"},updateSize:function(){this.fitContent&&(this.size.x=this.span.clientWidth,this.size.y=this.span.clientHeight),e.prototype.updateSize.call(this)},updateVisibility:function(){this._elm.style.display=this.visible?"flex":"none"},CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4,CLIP:10,ELLIPSIS:11};return s});
//# sourceMappingURL=../sourcemaps/mixins/text-mixin.js.map
