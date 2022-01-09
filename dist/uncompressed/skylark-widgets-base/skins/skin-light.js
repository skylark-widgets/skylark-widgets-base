define([
	"./skin-manager"
],function(SkinManager){	
	"use strict";

	function SkinLight() {
		this.font = "Arial";

		//Color
		this.barColor = "rgba(237, 237, 240,1)";
		this.sepColor = "rgba(0, 0, 0, 0.3)";
		this.panelColor = "rgba(237, 237, 240, 1)";
		this.resizeTabColor = "#222222";
		this.boxColor = "rgba(237, 237, 240, 1)";
		this.textColor = "rgba(12, 12, 13, 1)";
		this.iconColor = "#FFFFFF";

		//Button
		this.buttonColor = "rgba(237, 237, 240,1)";
		this.buttonOverColor = "rgba(221, 222, 223,1)";
		this.buttonLightColor = "#333333";
		
		//Audio player
		this.audioTrack = "#222222";
		this.audioScrubber = "#FFFFFF";
		this.audioProgress = "#555555";

		//Body
		document.body.style.fontFamily = this.font;
		document.body.style.color = this.textColor;
		document.body.style.fontSize = "12px";
	}


	var skin = new SkinLight();

	SkinManager.register(skin, "light");

	return skin;

});
