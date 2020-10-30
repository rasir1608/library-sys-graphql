import axios from 'axios';
import {message} from 'antd';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.response.use(res => res,err => {
  const text = err.toString();
  message.info(text);
  return null;
});

export default axios;
