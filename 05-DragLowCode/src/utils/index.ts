import DataCrypto from './crypto';
import JudgeDataType from './dataTypeJudge';
import StorageUtils from './Storage';
import { setupProvide, register } from './ProvideInject';

const cryptoData = new DataCrypto();
const dataType = new JudgeDataType();
const storage = new StorageUtils();

export { dataType, cryptoData, storage, setupProvide, register };
