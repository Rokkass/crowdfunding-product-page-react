import styles from "./Plan.module.scss";
import Button from "../button/Button";

const Plan = (props) => {
  return (
    <div className={props.left > 0 ? styles.wrapper : styles.outOfStock}>
      <div className={styles.header__wrapper}>
        <h4>{props.name}</h4>
        <p className={styles.planCost}>Pledge ${props.pledge} or more</p>
      </div>
      <span className={styles.planDescription}>{props.description}</span>
      <div className={styles.bottom__wrapper}>
        <h5 className={styles.plansLeft}>
          {props.left} <span className={styles.clearStyles}>left</span>
        </h5>
        {props.left > 0 ? (
          <Button selectRewardFn={() => props.selectRewardFn(props.name)}>
            Select Reward
          </Button>
        ) : (
          <Button disabled>Out of stock</Button>
        )}
      </div>
    </div>
  );
};

export default Plan;
