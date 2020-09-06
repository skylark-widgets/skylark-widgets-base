/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-funcs","./base","./Widget","./TextPane","./ImagePane"],function(t,e,s,i,n){"use strict";var o=s.inherit({_construct:function(e){s.prototype._construct.call(this,e,"div");var o=this;this._elm.style.backgroundColor="rgba(0.0, 0.0, 0.0, 0.3)",this._elm.style.zIndex="200",this.counter=0,this.text=new i(this),this.text.setText("Loading data"),this.text.setStyle("color","#FFFFFF"),this.message=new i(this),this.message.setText("Please wait"),this.message.setStyle("color","#FFFFFF"),this.message.allowWordBreak(!0),this.icon=new n(this),this.icon.setImage("files/loading.png");var h=0;this.timer=new t.loop(function(){h+=.05,o.icon.setStyle("transform","rotate("+h+"rad)")}),this.listenTo(this.$(window),"resize",function(t){o.updateInterface()})},show:function(){this.counter++,1===this.counter&&(this.timer.start(),this.visible=!0,this.updateInterface())},hide:function(t){this.counter--,(this.counter<1||!0===t)&&(this.counter=0,this.timer.stop(),this.setVisibility(!1))},destroy:function(){s.prototype.destroy.call(this),this.counter=0,this.timer.stop(),this.manager.destroy()},updateSize:function(){this.size.copy(this.parent.size),s.prototype.updateSize.call(this),this.text.setStyle("fontSize","38px"),this.text.size.set(this.size.x,100),this.text.center(),this.text.position.y-=this.text.size.y,this.text.updateInterface(),this.message.setStyle("fontSize","20px"),this.message.size.set(this.size.x,100),this.message.center(),this.message.position.y-=this.message.size.y/2,this.message.updateInterface(),this.icon.size.set(80,80),this.icon.center(),this.icon.position.y+=30,this.icon.updateInterface()}});return e.LoadingModal=o});
//# sourceMappingURL=sourcemaps/LoadingModal.js.map
