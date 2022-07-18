/**
 * 业务组件涉及类型的集合
 */

/*  components 》 businessSelf 》 headerMenu
------------------------------------------------ */
interface POIItem {
  name: string;
  title: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

interface SystemSetType {
  primaryColor: string; // 当前主题色
  historyPrimaryCol: Array<string>; // 历史主题色, max: 5
}

export type { POIItem, SystemSetType };
