import React, { PropsWithChildren } from 'react';
import styles from './MyButton.module.scss';

type Props = {
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    //onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const MyButton = (props: PropsWithChildren<Props>) => {
  return (
    <button {...props} className={styles.myBtn}>{props.children}</button>
  )
}

export default MyButton