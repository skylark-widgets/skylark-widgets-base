/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./base","./Widget","./Panel"],function(i,t,e){"use strict";var s=t.inherit({klassName:"DualPanel",_construct:function(i){t.prototype._construct.call(this,i,"div");var o=this.getSkin();this._elm.style.overflow="hidden",this._elm.style.backgroundColor=o.panelColor,this.divA=new e(this),this.divA.element.style.backgroundColor=o.panelColor,this.divB=new e(this),this.divB.element.style.backgroundColor=o.panelColor,this.resizeTab=document.createWidget("div"),this.resizeTab.style.position="absolute",this.resizeTab.style.cursor="e-resize",this.resizeTab.style.backgroundColor=o.resizeTabColor,this._elm.appendChild(this.resizeTab),this.tabPosition=.5,this.tabPositionMax=1,this.tabPositionMin=0,this.tabSize=5,this.orientation=s.HORIZONTAL;var n=this;this.connect(window,"mousemove",function(i){n.orientation===s.HORIZONTAL?n.tabPosition+=i.movementX/n.size.x:n.orientation===s.VERTICAL&&(n.tabPosition+=i.movementY/n.size.y),n.tabPosition>n.tabPositionMax?n.tabPosition=n.tabPositionMax:n.tabPosition<n.tabPositionMin&&(n.tabPosition=n.tabPositionMin),n.updateInterface(),n.onResize()}),this.connect(window,"mouseup",function(i){n.manager.destroy()}),this.onResize=function(){Editor.gui.updateInterface()}},setOnResize:function(i){this.onResize=i},updateSize:function(){if(t.prototype.updateSize.call(this),this.orientation===s.HORIZONTAL){var i=this.tabPosition*this.size.x;this.divA.position.set(0,0),this.divA.size.set(i,this.size.y),this.divA.updateInterface(),this.divB.size.set(this.size.x-i-this.tabSize,this.size.y),this.divB.position.set(this.divA.size.x+this.tabSize,0),this.divB.updateInterface(),this.resizeTab.style.cursor="e-resize",this.resizeTab.style.top="0px",this.resizeTab.style.left=this.divA.size.x+"px",this.resizeTab.style.width=this.tabSize+"px",this.resizeTab.style.height=this.size.y+"px"}else if(this.orientation===s.VERTICAL){i=this.tabPosition*this.size.y;this.divA.position.set(0,0),this.divA.size.set(this.size.x,i),this.divA.updateInterface(),this.divB.size.set(this.size.x,this.size.y-i-this.tabSize),this.divB.position.set(0,this.divA.size.y+this.tabSize),this.divB.updateInterface(),this.resizeTab.style.cursor="n-resize",this.resizeTab.style.top=this.divA.size.y+"px",this.resizeTab.style.left="0px",this.resizeTab.style.width=this.size.x+"px",this.resizeTab.style.height=this.tabSize+"px"}}});return s.HORIZONTAL=0,s.VERTICAL=1,containers.DualPanel=s});
//# sourceMappingURL=sourcemaps/DualPanel.js.map