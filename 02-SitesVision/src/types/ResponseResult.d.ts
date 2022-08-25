/**
 * 各业务接口响应数据的类型集合
 */

/*  业务 - 定义后台返回数据的泛型；<T> 业务数据泛型
------------------------------------------------ */
import { ListSitesParams } from '@/types/RequestParams';

interface ResponseResult<T> {
  code: number;
  message: string;
  data: T;
}

/*  业务 - User 模块各接口返回数据泛型
------------------------------------------------ */
// 登录接口
interface UserLogin {
  positionID: number;
  token: string;
  userId: number;
  userName: string;
  cusNo: string;
}

/*  业务 - 通用模块各接口返回数据泛型
------------------------------------------------ */
// 省市区查询接口
interface DataArea {
  cnName: string;
  code: string;
  createDate: string;
  enName: null | string;
  id: number;
  joinCode: string;
  remark: null | string;
  selected: number;
  typeID: number;
}

/*  业务 - 列表模块各接口的请求参数泛型
------------------------------------------------ */
// 机会点列表接口
interface ListSites {
  rows: Array; // 表格数据
  total: number; // 总数
}

/*  第三方 - 高德地图
------------------------------------------------ */
// IP 定位
interface AmapV3IP {
  city: string; // 城市名称
  province: string; // 省份名称
  rectangle: string; // 城市所在矩形区域，左下右上对标对坐标集
  status: '0' | '1'; // 返回状态值
  adcode: string; // 城市 adcode 编码
  centerLngLat: object; // rectangle 算出的中心点
}

export type { ResponseResult, UserLogin, AmapV3IP, DataArea, ListSites };
