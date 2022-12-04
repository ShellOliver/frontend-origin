import style from './InputMoney.module.css';
import React from 'react';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
};

export const rawNumber = (value?: string): number =>
  Number(value?.replace(',', ''));

export const numberFormat = (val: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(val) ? 0 : 2,
  }).format(val);
};

const getNumber = (value?: string): string => value?.replace(/\D/g, '') || '';

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
  e.target.value = numberFormat(rawNumber(e.currentTarget.value));
};

export const InputMoney = (props: Props): JSX.Element => {
  return (
    <input
      className={style.input}
      {...props}
      onInput={moneyMask}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      onBlur={cleanUpDecimals}
    />
  );
};
