import type { App, DirectiveBinding } from 'vue';

export function setupGlobalDirective(app: App) {
  //  元素旋转
  app.directive('rotate', (el, binding: DirectiveBinding<boolean>) => {
    el.style.transition = 'all ease-in-out 0.3s';
    if (binding.value === false) {
      el.style.transform = 'rotate(0deg)';
    } else if (binding.value === true) {
      el.style.transform = `rotate(${binding.arg}deg)`;
    }
  });
}
