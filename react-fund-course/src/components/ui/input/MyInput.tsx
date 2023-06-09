import React from 'react';
import styles from './MyInput.module.scss';

type MyInputProps = {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  name?: string;
  //ref?: React.forwardRef<HTMLInputElement>;
};

type Ref = HTMLInputElement;

const MyInput = React.forwardRef<Ref, MyInputProps>((props: MyInputProps, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={styles.myInput}
    />
  );
});

MyInput.displayName = 'MyInput';

export default MyInput;
