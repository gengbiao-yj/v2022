/*  注入、提取 键值类型
------------------------------------------------ */
import type { InjectionKey } from 'vue';
import { registerConfig } from '@/views/BusinessPage/packages/editorConfig';
import type { registerConfigType } from '@/views/BusinessPage/packages/editorConfig';

/*  供给组件配置
------------------------------------------------ */
export const register = Symbol() as InjectionKey<registerConfigType>;

export function setupProvide(provide: any) {
  provide(register, registerConfig); // 组件配置分发
}
