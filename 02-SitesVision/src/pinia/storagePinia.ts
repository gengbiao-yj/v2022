import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserLogin } from '@/types/ResponseResult';
import type { SystemSetType } from '@/types/Components';
import { storage } from '@/utils';

export default defineStore('basicPinia', () => {
  /*  用户信息存取
  ------------------------------------------------ */
  const userInfo = ref({} as UserLogin);
  function getUserInfo() {
    userInfo.value = storage.getLocal('userInfo').value;
    return userInfo.value;
  }
  function setUserInfo(data: UserLogin) {
    userInfo.value = data;
    storage.setLocal('userInfo', data, 480);
  }
  function resetUserInfo() {
    userInfo.value = {} as UserLogin;
    storage.removeLocal('userInfo');
  }

  /*  系统设置存取
  ------------------------------------------------ */
  const systemParams = ref<SystemSetType>({
    primaryColor: '#5aa3ec'
  });
  function getSystemParams() {
    const storageValue = storage.getLocal('systemSetting').value;
    if (storageValue) {
      systemParams.value = storageValue;
    }
    return systemParams.value;
  }
  function setSystemParams(data: SystemSetType) {
    // 设置主题颜色
    document.documentElement.style.setProperty(
      '--primary-color',
      data.primaryColor
    );
    systemParams.value = data;
    storage.setLocal('systemSetting', data, 480);
  }

  return {
    getUserInfo,
    setUserInfo,
    resetUserInfo,
    userInfo,
    systemParams,
    getSystemParams,
    setSystemParams
  };
});
