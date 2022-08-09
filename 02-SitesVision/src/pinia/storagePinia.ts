import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
  UserLogin,
  SystemSetType,
  rgbType,
  TabsItem
} from '@/types/index';
import { storage, colorTransition } from '@/utils';

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
    primaryColor: '#5aa3ec',
    historyPrimaryCol: ['#5aa3ec']
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
    const rgb = colorTransition(data.primaryColor, 'rgb') as rgbType;
    document.documentElement.style.setProperty('--primary-color-r', rgb.r + '');
    document.documentElement.style.setProperty('--primary-color-g', rgb.g + '');
    document.documentElement.style.setProperty('--primary-color-b', rgb.b + '');
    document.documentElement.style.setProperty(
      '--primary-color',
      data.primaryColor
    );
    systemParams.value = data;
    storage.setLocal('systemSetting', data, 480);
  }

  /*  header tabs 导航标签页持久化存储
  ------------------------------------------------ */
  const tabs = ref<Array<TabsItem>>([
    {
      title: '地图主页',
      name: '1',
      path: '/Main'
    }
  ]);

  function setTabs(data: Array<TabsItem>) {
    tabs.value = data;
    storage.setLocal('routerTabs', data, 480);
  }

  function getTabs() {
    const storageValue = storage.getLocal('routerTabs').value;
    if (storageValue) {
      tabs.value = storageValue;
    }
    return tabs.value;
  }

  return {
    getUserInfo,
    setUserInfo,
    resetUserInfo,
    userInfo,
    systemParams,
    getSystemParams,
    setSystemParams,
    tabs,
    setTabs,
    getTabs
  };
});
