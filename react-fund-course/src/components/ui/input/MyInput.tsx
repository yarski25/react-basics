import React from 'react'
import styles from './MyInput.module.scss'

type Props = {
    type?: string;
    placeholder?: string;
}

const MyInput = (props : Props) => {
  return (
    <input {...props} className={styles.myInput} />
  )
}

export default MyInput