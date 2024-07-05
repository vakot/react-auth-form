import classNames from 'classnames'
import React from 'react'
import styles from './styles.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ style, className, onClick, children }) => {
  return (
    <button style={style} className={classNames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  )
}
