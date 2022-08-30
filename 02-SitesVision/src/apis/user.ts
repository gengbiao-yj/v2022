/**
 * 业务
 */
import { http } from '@/plugin/Axios/index';
import qs from 'qs';
import type {
  DataAreaParams,
  ResponseResult,
  UserLogin,
  UserLoginParams,
  DataArea,
  ListViewParams,
  ListView
} from '@/types/index';

/*  注册登录 - start
------------------------------------------------ */
// 登录
function login(Data: UserLoginParams) {
  return http.request<ResponseResult<UserLogin>>({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(Data)
  });
}

/*  通用 - start
------------------------------------------------ */
// 省市区查询
function dataArea(Data: DataAreaParams) {
  return http.request<ResponseResult<Array<DataArea>>>({
    url: '/common/dataArea',
    method: 'post',
    data: qs.stringify(Data)
  });
}

/*  列表模式
------------------------------------------------ */
// 机会点列表
function listViewSites(Data: ListViewParams) {
  return http.request<ResponseResult<ListView>>({
    url: '/listView/sites',
    method: 'post',
    data: qs.stringify(Data)
  });
}

// 门店列表
function listViewStores(Data: ListViewParams) {
  return http.request<ResponseResult<ListView>>({
    url: '/listView/stores',
    method: 'post',
    data: qs.stringify(Data)
  });
}

// 关注竞品店列表
function listViewCompetitors(Data: ListViewParams) {
  return http.request<ResponseResult<ListView>>({
    url: '/listView/competitor',
    method: 'post',
    data: qs.stringify(Data)
  });
}

// 已有商圈列表
function listViewTas(Data: ListViewParams) {
  return http.request<ResponseResult<ListView>>({
    url: '/listView/ta',
    method: 'post',
    data: qs.stringify(Data)
  });
}

export {
  login,
  dataArea,
  listViewSites,
  listViewStores,
  listViewCompetitors,
  listViewTas
};
