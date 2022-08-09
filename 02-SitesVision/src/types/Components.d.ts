/**
 * 业务组件涉及类型的集合
 */

/*  components 》 businessSelf 》 headerMenu
------------------------------------------------ */
interface MenuItem {
  label: string;
  value?: string;
  path?: string;
}
interface POIItem {
  name: string;
  title: string;
  items: Array<MenuItem>;
}

interface SystemSetType {
  primaryColor: string; // 当前主题色
  historyPrimaryCol: Array<string>; // 历史主题色, max: 5
}

interface TabsItem {
  title: string,
  name: string,
  path: string
}

export type { POIItem, SystemSetType, MenuItem, TabsItem };
