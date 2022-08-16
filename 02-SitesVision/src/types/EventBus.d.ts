/*  事件总线名称
------------------------------------------------ */
const names = [
  'menuCollapse' // menu 菜单折叠状态
] as const;
type eventBusName = typeof names[number];

export type { eventBusName };
