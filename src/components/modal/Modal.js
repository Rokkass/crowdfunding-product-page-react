import styles from "./Modal.module.scss";
import Back from "../backPlan/Back";

const Modal = ({ closeModal, plans, selectBackFn, submitBackFn }) => {
  const backPlanElements = plans.map((plan) => (
    <Back
      key={plan.name}
      plan={plan}
      placeholder={plan.pledge}
      selectBackFn={() => selectBackFn(plan.name)}
      submitBackFn={submitBackFn}
    />
  ));
  return (
    <div className={styles.modal}>
      <button className={styles.closeButton} onClick={closeModal} />
      <h3 className={styles.header}>Back this project</h3>
      <span className={styles.description}>
        Want to support us in bringing Mastercraft Bamboo Monitor Riser out in
        the world?
      </span>
      {backPlanElements}
    </div>
  );
};

export default Modal;
