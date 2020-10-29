import React from 'react';
import styles from './index.less';
import { Button } from 'antd';

export default () => {


  function clickBtn() {
    console.log(9)
  }

  return (
    <div>
      <h1 className={styles.title}>Page index 1

        <Button type='primary' onClick={clickBtn}>点击</Button>
      </h1>
    </div>
  );
}
