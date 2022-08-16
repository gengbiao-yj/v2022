/// setup hooks
import mitt from 'mitt';
const EventBus = mitt();
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { eventBusName } from '@/types';

/*  通用 start
------------------------------------------------ */
// 浏览器宽度监视
export function getWatchBrowserWidth() {
  const browserWidth = ref<number>(window.innerWidth - 0);
  const watchBrowserWidth = (e: any) => {
    browserWidth.value = e.target.innerWidth;
  };
  onMounted(() => {
    window.addEventListener('resize', watchBrowserWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', watchBrowserWidth);
  });
  return browserWidth;
}
/*  通用 end
------------------------------------------------ */

/*  事件总线 start
------------------------------------------------ */
// 订阅事件
export function busOn(name: eventBusName, callBack: any) {
  if (!name) return;
  onMounted(() => {
    EventBus.off(name, callBack);
    EventBus.on(name, callBack);
  });
  onBeforeUnmount(() => {
    EventBus.off(name, callBack);
  });
}
// 触发事件
export function busEmit(name: eventBusName, params: any) {
  if (!name) return;
  EventBus.emit(name, params);
}
/*  事件总线 end
------------------------------------------------ */
