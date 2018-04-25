// JavaScript Document

(function(){
	"use strict";
	console.log("SEAF Fired");

// JS
var vid = document.querySelector('video');
var contain = document.querySelector('#container');

console.log(vid);
console.log(contain);

var setDimensions = function () {
  // Video's intrinsic dimensions
  var w = vid.videoWidth
    , h = vid.videoHeight;

  // Intrinsic Ratio
  // Will be more than 1 if W > H and less if W < H
  var vidRatio = (w / h).toFixed(2);

  // Get the container's computed styles
  //
  // Also calculate the min dimensions required (this will be
  // the container dimentions)
  var styles = window.getComputedStyle(container)
    , minW = parseInt( styles.getPropertyValue('width') )
    , minH = parseInt( styles.getPropertyValue('height') );

  // What's the min:intrinsic dimensions
  //
  // The idea is to get which of the container dimension
  // has a higher value when compared with the equivalents
  // of the video. Imagine a 1200x700 container and
  // 1000x500 video. Then in order to find the right balance
  // and do minimum scaling, we have to find the dimension
  // with higher ratio.
  //
  // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
  // scale 500 to 700 and then calculate what should be the
  // right width. If we scale 1000 to 1200 then the height
  // will become 600 proportionately.
  var wRatio = minW / w
    , hRatio = minH / h;

  // Whichever ratio is more, the scaling
  // has to be done over that dimension
  if (wRatio > hRatio) {
    var newW = minW;
    var newH = Math.ceil( newW / vidRatio );
  }
  else {
    var newH = minH;
    var newW = Math.ceil( newH * vidRatio );
  }

  vid.style.width = newWidth + 'px';
  vid.style.height = newHeight + 'px';
};

vid.addEventListener('loadedmetadata', setDimensions, false);
window.addEventListener('resize', setDimensions, false);

 })();
