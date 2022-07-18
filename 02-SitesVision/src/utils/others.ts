// 全屏切换(单例)
let isScreen = false;
const updateIsScreen = () => {
  isScreen = !isScreen;
};
export function fullScreen() {
  document.addEventListener('fullscreenchange', updateIsScreen);
  return () => {
    const element: any = document.documentElement;
    const _document: any = document;
    if (isScreen) {
      if (_document.exitFullscreen) {
        _document.exitFullscreen();
      } else if (_document.webkitCancelFullScreen) {
        _document.webkitCancelFullScreen();
      } else if (_document.mozCancelFullScreen) {
        _document.mozCancelFullScreen();
      } else if (_document.msExitFullscreen) {
        // IE11
        _document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
      }
    }
  };
}
