import React, { PropsWithChildren } from 'react';
import styles from './MyButton.module.scss';

type MyButtonProps = {
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
    //onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const MyButton = (props: PropsWithChildren<MyButtonProps>) => {
  return (
    <button {...props} className={styles.myBtn}>{props.children}</button>
  )
}

export default MyButton