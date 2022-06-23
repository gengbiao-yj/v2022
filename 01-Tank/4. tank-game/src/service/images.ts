// 图片资源预加载
import config from '../config'
// 声明 mapKey 类型，合法值为 config.images 所有键名
type mapKey = keyof typeof config.images;
export const images = new Map<mapKey, HTMLImageElement>();

/**
 * [promise,promise]
 * Object.entries - 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
 *                  [ ["foo", 32], ["baz", 42] ]
 */
export const promises = Object.entries(config.images).map(([key,value]) => {
  return new Promise(resolve => {
    const img = document.createElement('img');
    img.src = value;
    // 由于图片是异步加载，所以要等图片加载完成
    img.onload = () => {
      images.set(key as mapKey,img); // 断言一下，key 确实属于 mapKey 定义的合法值
      resolve(img);
    }
  })
})