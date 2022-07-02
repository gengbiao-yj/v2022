import { RouteRecordRaw } from 'vue-router';

const businessPages = require.context('../views/BusinessPage', true, /\.vue$/);
const businessRoute = [] as RouteRecordRaw[];

businessPages.keys().forEach(path => {
  const model = businessPages(path);
  getRouteByModel(path, model);
});
function getRouteByModel(filePath: string, model: { [key: string]: any }) {
  const name = filePath.split('/').pop()?.split('.')[0];
  // const viewModel = () => import(`../${model.default.__file.split('src/')[1]}`);
  const route = {
    path: `/${name}`,
    name: `${name}`,
    // component: viewModel,
    component: model.default,
    meta: {
      title: '登录'
    }
  };
  businessRoute.push(route);
}
export default businessRoute;
