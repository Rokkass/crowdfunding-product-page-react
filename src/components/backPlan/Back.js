import styles from "./Back.module.scss";
import Button from "../button/Button";
import { useState } from "react";

const Back = (props) => {
  const { name, pledge, description, left, selected } = props.plan;
  const [pledgeAmount, setPledgeAmount] = useState("");

  function handleChange(e) {
    setPledgeAmount((oldAmount) => e.target.value);
  }

  return (
    <div
      className={
        left > 0
          ? selected
            ? styles.wrapperSelected
            : styles.wrapper
          : styles.outOfStock
      }
      onClick={props.selectBackFn}
    >
      <div className={styles.top__wrapper}>
        <div className={styles.plansLeft}>
          {left < 200 && (
            <h5>
              {left} <span className={styles.clearStyles}>left</span>
            </h5>
          )}
        </div>
        <div
          className={selected ? styles.radioButtonSelected : styles.radioButton}
        ></div>
        <div className={styles.info__wrapper}>
          <div className={styles.header__wrapper}>
            <h4>{name}</h4>
            <span>
              {pledge && (
                <p className={styles.planCost}>Pledge ${pledge} or more</p>
              )}
            </span>
          </div>
          <span className={styles.planDescription}>{description}</span>
        </div>
      </div>
      {selected && (
        <>
          <div className={styles.borderLine}></div>
          <div className={styles.bottom__wrapper}>
            <span>Enter your pledge</span>
            <form
              autoComplete="off"
              className={styles.form}
              onSubmit={(e) => props.submitBackFn(e, name, pledgeAmount)}
            >
              <label htmlFor={pledge}>
                <input
                  type="number"
                  id={pledge}
                  name={pledge}
                  className={styles.inputPledge}
                  maxLength="5"
                  placeholder={props.placeholder}
                  value={pledgeAmount}
                  onChange={handleChange}
                  required
                />
              </label>
              <Button>Continue</Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Back;
