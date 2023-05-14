import React, { PropsWithChildren } from 'react'
import styles from './MyModal.module.scss'

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyModal = (props : PropsWithChildren<Props>) => {

    const rootStyles = [styles.myModal];
    if(props.visible) {
        rootStyles.push(styles.active);
    }

  return (
    <div className={rootStyles.join(' ')}
         onClick={() => props.setVisible(false)}>
        <div className='styles.myModalContent'
             onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>
  )
}

export default MyModal