import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
import App from './components/App'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});
export default () => {


  function clickBtn() {
    console.log(9)
  }

  return (
    <ApolloProvider client={client}>
      <h1 className={styles.title}>Page index 1
        <App></App>
        <Button type='primary' onClick={clickBtn}>点击</Button>
      </h1>
    </ApolloProvider>
  );
}
