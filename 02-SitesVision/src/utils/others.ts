/*  全屏切换(单例)
------------------------------------------------ */
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

/* 颜色转换
------------------------------------------------ */
import type { rgbType } from '@/types/index';
export function colorTransition(color: string, type: 'rgb' | '#x6' | '#x3') {
  function toRGB(): rgbType {
    color = color.trim();
    if (color.indexOf('#') !== -1 && color.length === 7) {
      return {
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5), 16)
      };
    } else if (color.indexOf('#') !== -1 && color.length === 4) {
      return {
        r: parseInt(color.charAt(1) + color.charAt(1), 16),
        g: parseInt(color.charAt(2) + color.charAt(2), 16),
        b: parseInt(color.charAt(3) + color.charAt(3), 16)
      };
    } else {
      return { r: 0, g: 0, b: 0 };
    }
  }
  if (type === 'rgb') return toRGB();
}
