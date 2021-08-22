function toggleFullScreen(isFull) {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen
  || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen
  || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (isFull && !doc.fullscreenElement && !doc.mozFullScreenElement
    && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else if (!isFull && (doc.fullscreenElement || doc.mozFullScreenElement
    || doc.webkitFullscreenElement || doc.msFullscreenElement)) {
    cancelFullScreen.call(doc);
  }
}

export default toggleFullScreen;
