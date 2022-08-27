import styles from "./Button.module.scss";

const Button = (props) => {
  const buttonStyles = props.disabled ? styles.disabled : styles.button;

  return props.openModal ? (
    <button className={buttonStyles} onClick={props.openModal}>
      {props.children}
    </button>
  ) : props.selectRewardFn ? (
    <button className={buttonStyles} onClick={() => props.selectRewardFn()}>
      {props.children}
    </button>
  ) : props.closeConfirmFn ? (
    <button
      className={props.secondary ? styles.rejected : buttonStyles}
      onClick={() => props.closeConfirmFn()}
    >
      {props.children}
    </button>
  ) : (
    <button className={buttonStyles}>{props.children}</button>
  );
};

export default Button;
