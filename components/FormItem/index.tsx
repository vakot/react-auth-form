import classNames from 'classnames'
import React, { useMemo } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import styles from './styles.module.css'

export interface Rule {
  valid: ((value: any) => boolean | undefined) | boolean | undefined
  message: React.ReactNode
}

export interface FormItemProps {
  name: string
  rules?: Rule[]
  showError?: boolean
  children: React.ReactElement | React.ReactElement[]
}

export const FormItem: React.FC<FormItemProps> = ({ name, showError = true, rules = [], children }) => {
  const {
    control,
    formState: { isSubmitted },
    watch
  } = useFormContext()

  const {
    field,
    fieldState: { error }
  } = useController({ name, control })

  const childrens = useMemo(() => React.Children.toArray(children), [children])
  const value = watch(name)
  const isError = useMemo(() => {
    return error || rules.find((rule) => !isRuleValid(rule, value))
  }, [rules, error, value])

  return (
    <div className={styles['form-item']}>
      {React.cloneElement(childrens[0] as React.ReactElement, {
        ...field,
        state: isSubmitted ? (isError ? 'error' : 'success') : undefined
      })}

      {childrens.slice(1)}

      {showError && error && <p className={classNames(styles.rule, styles.error)}>{error.message}</p>}

      {!!rules.length && (
        <div className={styles.rules}>
          {rules.map((rule, index) => (
            <p
              key={index}
              className={classNames(styles.rule, {
                [styles.error]: isSubmitted && !isRuleValid(rule, value),
                [styles.success]: isRuleValid(rule, value)
              })}>
              {rule.message}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

const isRuleValid = (rule: Rule, value: any): boolean => {
  if (typeof rule.valid === 'boolean' || typeof rule.valid === 'undefined') {
    return !!rule.valid
  }
  return !!rule.valid(value)
}
