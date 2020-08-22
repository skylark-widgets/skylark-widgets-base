/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-numbers/Vector2","../Widget"],function(t,e){"use strict";return{_buildTextSpan:function(){var t=this.getSkin();this._elm.style.pointerEvents="none",this._elm.style.color=t.textColor,this._elm.style.display="flex",this.span=document.createElement("span"),this.span.style.overflow="hidden",this._elm.appendChild(this.span),this.text=document.createTextNode(""),this.span.appendChild(this.text),this.fitContent=!1,this.allowWordBreak(!1),this.setVerticalAlignment(TextMixinCENTER),this.setAlignment(TextMixinCENTER)},setFont:function(t,e,i){this.span.style.fontFamily=t,void 0!==e&&(this.span.style.fontWeight=e),void 0!==i&&(this.span.style.fontStyle=i)},allowWordBreak:function(t){!0===t?(this.span.style.whiteSpace="normal",this.span.style.wordBreak="break-word"):(this.span.style.whiteSpace="pre",this.span.style.wordBreak="normal")},setText:function(t){this.text.data=t},setTextBorder:function(t,e){this.span.style.textShadow="-"+t+"px 0 "+e+", 0 "+t+"px "+e+", "+t+"px 0 "+e+", 0 -"+t+"px "+e},setTextSize:function(t){this._elm.style.fontSize=t+"px"},setTextColor:function(t){this.span.style.color=t},setOverflow:function(t){t===TextMixinELLIPSIS?(this.span.style.whiteSpace="nowrap",this.span.style.textOverflow="ellipsis"):(this.span.style.whiteSpace="pre",this.span.style.textOverflow="clip")},setAlignment:function(t){t===TextMixinCENTER?(this._elm.style.justifyContent="center",this._elm.style.textAlign="center"):t===TextMixinLEFT?(this._elm.style.justifyContent="flex-start",this._elm.style.textAlign="left"):t===TextMixinRIGHT&&(this._elm.style.justifyContent="flex-end",this._elm.style.textAlign="right")},setVerticalAlignment:function(t){t===TextMixinCENTER?this._elm.style.alignItems="center":t===TextMixinTOP?this._elm.style.alignItems="flex-start":t===TextMixinBOTTOM&&(this._elm.style.alignItems="flex-end")},measure:function(){return new t(this.span.offsetWidth,this.span.offsetHeight)},setMargin:function(t){this.span.style.margin=t+"px"},_updateVisibility:function(){this._elm.style.display=this.visible?"flex":"none"},_updateSize:function(){this.fitContent&&(this.size.x=this.span.clientWidth,this.size.y=this.span.clientHeight),e.prototype._updateSize.call(this)},CENTER:0,LEFT:1,RIGHT:2,TOP:3,BOTTOM:4,CLIP:10,ELLIPSIS:11}});
//# sourceMappingURL=../sourcemaps/mixins/TextMixin.js.map
