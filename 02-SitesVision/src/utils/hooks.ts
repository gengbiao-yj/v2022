/**
 * setup hooks
 */

import { ref, onMounted, onBeforeUnmount } from 'vue';

/*  浏览器宽度监视
------------------------------------------------ */
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
