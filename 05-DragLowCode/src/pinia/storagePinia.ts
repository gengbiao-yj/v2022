import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserLogin } from '@/types/ResponseResult';
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
    storage.setLocal('userInfo', data, 120);
  }
  function resetUserInfo() {
    userInfo.value = {} as UserLogin;
    storage.removeLocal('userInfo');
  }
  return { getUserInfo, setUserInfo, resetUserInfo, userInfo };
});
