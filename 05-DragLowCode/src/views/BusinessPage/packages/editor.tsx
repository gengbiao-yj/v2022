import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { configType } from '../config';
import './editor.scss';

export default defineComponent({
  name: 'EditorComp',
  props: {
    data: {
      type: Object as PropType<configType>,
      required: true
    }
  },
  setup(props) {
    console.log(props.data);
    return () => (
      <div class={'editor'}>
        <div class={'editor-left'}>物料区</div>
        <div class={'editor-top'}>菜单栏</div>
        <div class={'editor-right'}>属性区</div>
        <div class={'editor-container'}>
          {/* 包裹盒子，生成滚动条 */}
          <div class={'editor-container-box'}>
            {/* 实际编辑区 */}
            <div class={'editor-container-canvas'}>编辑区</div>
          </div>
        </div>
      </div>
    );
  }
});
