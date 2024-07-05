import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './styles.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: 'error' | 'success' | undefined
}

const BaseInput: React.FC<InputProps> = ({ className, state, ...props }) => {
  return (
    <input
      className={classNames(styles.input, { [styles.success]: state === 'success', [styles.error]: state === 'error' }, className)}
      {...props}
    />
  )
}

export const Input: React.FC<InputProps> = ({ type, ...props }) => {
  if (type === 'password') {
    return <Password {...props} />
  } else {
    return <BaseInput type={type} {...props} />
  }
}

const Password: React.FC<Omit<InputProps, 'type'>> = (props) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      <BaseInput type={show ? 'text' : 'password'} {...props} />
      <span className={styles.suffix} onClick={() => setShow(!show)}>
        {show ? 'Hide' : 'Show'}
      </span>
    </div>
  )
}
