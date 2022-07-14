import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import type { blocksItemType } from '../config';
import './EditorBlock.scss';
import { register } from '@/utils/ProvideInject';

export default defineComponent({
  name: 'EditorBlock',
  props: {
    block: {
      type: Object as PropType<blocksItemType>,
      required: true
    }
  },
  setup(props) {
    const registerConfig = inject(register); // 注入组件配置
    const blockStyles = computed(() => ({
      left: props.block.left + 'px',
      top: props.block.top + 'px',
      zIndex: props.block.zIndex
    }));
    return () => {
      // 通过 key 获取组件，利用组件自带 render 函数渲染
      const component = registerConfig!.componentMap[props.block.type];
      return (
        <div class={'editor-block'} style={blockStyles.value}>
          {component.render()}
        </div>
      );
    };
  }
});
