import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import type { configType } from '../config';
import './Editor.scss';
import EditorBlock from '../editorBlock/EditorBlock';
import { register } from '@/utils/ProvideInject';

export default defineComponent({
  name: 'EditorRoot',
  props: {
    modelValue: {
      type: Object as PropType<configType>,
      required: true
    }
  },
  setup(props) {
    // 计算属性返回一个 ref 值（默认双向绑定）,访问计算结果时要加 .value
    // 获取配置数据
    const data = computed<configType>({
      get() {
        return props.modelValue;
      },
      set() {
        console.log(1);
      }
    });
    // 获取编辑区域配置样式
    const containerStyles = computed(() => ({
      width: data.value.container.width + 'px',
      height: data.value.container.height + 'px'
    }));
    return () => {
      const registerConfig = inject(register);
      const components = registerConfig!.componentList;

      return (
        <div class={'editor'}>
          <div class={'editor-left'}>
            {/* 遍历显示物料区现有物料 */}
            {components.map(component => (
              <div class={'editor-left-item'}>
                <span>{component.label}</span>
                <span>{component.preview()}</span>
              </div>
            ))}
          </div>
          <div class={'editor-top'}>菜单栏</div>
          <div class={'editor-right'}>属性区</div>
          <div class={'editor-container'}>
            {/* 包裹盒子，生成滚动条 */}
            <div class={'editor-container-box'}>
              {/* 实际编辑区 */}
              <div
                class={'editor-container-canvas'}
                style={containerStyles.value}
              >
                {data.value.blocks.map(block => (
                  <EditorBlock block={block}></EditorBlock>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    };
  }
});
