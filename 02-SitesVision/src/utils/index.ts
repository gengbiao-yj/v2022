import DataCrypto from './crypto';
import JudgeDataType from './dataTypeJudge';
import StorageUtils from './Storage';
import { fullScreen, colorTransition } from './others';

const cryptoData = new DataCrypto();
const dataType = new JudgeDataType();
const storage = new StorageUtils();

export { dataType, cryptoData, storage, fullScreen, colorTransition };
