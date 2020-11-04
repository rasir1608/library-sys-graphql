import { useLazyQuery, gql } from '@apollo/client';
import {message} from 'antd';
export const useHttpQury = (query:string,config = {}) => {
  const [run, {  error, ...props}] = useLazyQuery(gql`${query}`, {
    // pollInterval: 1000,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
    onError:(err) => {
      message.error(err.toString());
    },
    ...config
  });
  return {...props,run}
}

