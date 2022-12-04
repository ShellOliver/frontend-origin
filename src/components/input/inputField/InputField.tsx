import style from './InputField.module.css';

type Props = {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
};

export const InputField = (props: Props): JSX.Element => {
  const { label, htmlFor } = props;
  return (
    <div className={style.field}>
      <label htmlFor={htmlFor}>{label}</label>
      {props.children}
    </div>
  );
};
