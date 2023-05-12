import React, { PropsWithChildren } from 'react';
import styles from './MyButton.module.css';

type Props = {
    disabled?: boolean;
};

const MyButton = (props: PropsWithChildren<Props>) => {
  return (
    <button {...props} className={styles.myBtn}>{props.children}</button>
  )
}

export default MyButton