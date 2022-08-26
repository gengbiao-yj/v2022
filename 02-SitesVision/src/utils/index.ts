import {
  fullScreen,
  colorTransition,
  JudgeDataType,
  DataCrypto,
  StorageUtils
} from './others';

const cryptoData = new DataCrypto();
const dataType = new JudgeDataType();
const storage = new StorageUtils();

export { dataType, cryptoData, storage, fullScreen, colorTransition };
