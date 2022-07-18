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
  primaryColor: string;
}

export type { POIItem, SystemSetType };
