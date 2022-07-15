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

export type { POIItem };
