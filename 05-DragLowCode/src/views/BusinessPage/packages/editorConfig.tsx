import { ElButton, ElInput } from 'element-plus';
import type { blocksType } from './config';

interface render {
  // eslint-disable-next-line
  (): string | JSX.Element;
}
// 组件类型
interface componentType {
  label: string;
  preview: render;
  render: render;
  key: blocksType;
}

// 组件映射对象类型
type mapType = Record<blocksType, componentType>;

function createEditorConfig() {
  const componentList: Array<componentType> = [];
  const componentMap: mapType = {} as mapType;

  return {
    componentList,
    componentMap,
    register(component: componentType) {
      componentList.push(component);
      componentMap[component.key] = component;
    }
  };
}

export const registerConfig = createEditorConfig();
export type registerConfigType = typeof registerConfig;

registerConfig.register({
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: 'text'
});

registerConfig.register({
  label: '按钮',
  preview: () => <ElButton>预览按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>,
  key: 'button'
});

registerConfig.register({
  label: '输入框',
  preview: () => <ElInput>预览输入框</ElInput>,
  render: () => <ElInput>渲染输入框</ElInput>,
  key: 'input'
});
