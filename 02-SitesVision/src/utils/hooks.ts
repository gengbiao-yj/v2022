/// setup hooks
import mitt from 'mitt';
const EventBus = mitt();
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { eventBusName } from '@/types';
import { dataArea } from '@/apis/user';

/*  通用 start
------------------------------------------------ */
// 浏览器宽度监视
export function getWatchBrowserWidth(callBack: any) {
  const browserWidth = ref<number>(window.innerWidth - 0);
  const watchBrowserWidth = (e: any) => {
    browserWidth.value = e.target.innerWidth;
    callBack(browserWidth.value);
  };
  window.addEventListener('resize', watchBrowserWidth);
  onMounted(() => {
    callBack(window.innerWidth - 0);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', watchBrowserWidth);
  });
  return browserWidth;
}

/*  事件总线 start
------------------------------------------------ */
// 订阅事件
export function busOn(name: eventBusName, callBack: any) {
  if (!name) return;
  EventBus.off(name, callBack);
  EventBus.on(name, callBack);
  onBeforeUnmount(() => {
    EventBus.off(name, callBack);
  });
}
// 触发事件
export function busEmit(name: eventBusName, params: any) {
  if (!name) return;
  EventBus.emit(name, params);
}

/*  全屏切换
------------------------------------------------ */
let isScreen = false;
let isAddEvent = false;
function updateIsScreen() {
  isScreen = !isScreen;
}
export function fullScreen(_element: any) {
  if (!isAddEvent) {
    document.addEventListener('fullscreenchange', updateIsScreen);
    isAddEvent = true;
  }
  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', updateIsScreen);
    isAddEvent = false;
  });
  return () => {
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
      if (_element.requestFullscreen) {
        _element.requestFullscreen();
      } else if (_element.webkitRequestFullScreen) {
        _element.webkitRequestFullScreen();
      } else if (_element.mozRequestFullScreen) {
        _element.mozRequestFullScreen();
      } else if (_element.msRequestFullscreen) {
        // IE11
        _element.msRequestFullscreen();
      }
    }
  };
}

/*  接口
------------------------------------------------ */
// 省市区接口
export const getDataArea = async (JoinCode: string, TypeID: number) => {
  try {
    const { code, data } = await dataArea({
      JoinCode,
      TypeID
    });
    if (code === 200) {
      return reactive(data);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
