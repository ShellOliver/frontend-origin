import style from './InputMoney.module.css';
import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;
const getNumber = (value?: string) => value?.replace(/\D/g, '') || '';

const moneyMask = (e: React.FormEvent<HTMLInputElement>) => {
  if (!e.currentTarget.value.length) return;
  const splitValue = e.currentTarget.value.split('.');
  const value = getNumber(splitValue[0]);
  e.currentTarget.value = new Intl.NumberFormat('en-US').format(Number(value));
  if (splitValue.length > 1) {
    e.currentTarget.value += `.${getNumber(splitValue[1]).slice(0, 2)}`;
  }
};

const cleanUpDecimals = (e: React.FocusEvent<HTMLInputElement>) => {
  const endDot = /\.$/.exec(e.target.value)?.[0];
  if (endDot) {
    e.target.value = e.target.value.slice(0, -1);
    return;
  }

  const singleDecimal = /\.\d+$/.exec(e.target.value)?.[0].length === 2;
  if (singleDecimal) e.target.value += '0';
};

export const InputMoney = (props: Props): JSX.Element => {
  return (
    <input
      className={style.input}
      {...props}
      onInput={moneyMask}
      onBlur={cleanUpDecimals}
    />
  );
};
