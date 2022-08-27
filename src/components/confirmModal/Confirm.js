import styles from "./Confirm.module.scss";
import Button from "../button/Button";
import confirmIcon from "../../assets/images/icon-check.svg";
import rejectIcon from "../../assets/images/icon-cross.svg";

const Confirm = (props) => (
  <div className={styles.wrapper}>
    {props.enough ? (
      <>
        <img src={confirmIcon} alt={""} />
        <h2>Thanks for your support!</h2>
        <span>
          Your pledge brings us one step closer to sharing Mastercraft Bamboo
          Monitor Riser worldwide. You will get an email once our campaign is
          completed.
        </span>

        <Button closeConfirmFn={props.closeConfirm}>Got it!</Button>
      </>
    ) : (
      <>
        <img src={rejectIcon} alt={""} />
        <h2>Minimum plan price is higher!</h2>
        <span>
          Please go one step back and enter correct amount to support selected
          backing plan.
        </span>
        <Button closeConfirmFn={props.closeConfirm} secondary>
          Got it!
        </Button>
      </>
    )}
  </div>
);

export default Confirm;
