import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import type { blocksItemType } from '../../config';
import './EditorBlock.scss';
import { ElButton } from 'element-plus';

export default defineComponent({
  name: 'EditorBlock',
  props: {
    block: {
      type: Object as PropType<blocksItemType>,
      required: true
    }
  },
  setup(props) {
    const blockStyles = computed(() => ({
      left: props.block.left + 'px',
      top: props.block.top + 'px',
      zIndex: props.block.zIndex
    }));
    return () => (
      <div class={'editor-block'} style={blockStyles.value}>
        {`这是物料-${props.block.type}`}
        <ElButton>按钮</ElButton>
      </div>
    );
  }
});
