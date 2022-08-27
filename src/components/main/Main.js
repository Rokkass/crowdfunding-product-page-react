import styles from "./Main.module.scss";
import logo from "../../assets/images/logo-mastercraft.svg";
import bookmark from "../../assets/images/icon-bookmark.svg";
import bookmarked from "../../assets/images/icon-bookmark-checked.svg";
import Button from "../button/Button";
import { useState } from "react";
import Plan from "../plan/Plan";
import Modal from "../modal/Modal";
import Confirm from "../confirmModal/Confirm";

const Main = () => {
  const [bookmarkProject, changeBookmarkProject] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    currentProgress: 89914,
    totalGoal: 100000,
    backers: 5007,
    daysLeft: 56,
  });
  const [modal, toggleModal] = useState(false);
  const [confirmModal, toggleConfirmModal] = useState({
    visible: false,
    enoughAmount: null,
  });
  const [projectPlans, setProjectPlans] = useState([
    {
      name: "Pledge with no reward",
      pledge: null,
      description:
        "Choose to support us without a\n" +
        "    reward if you simply believe in our project. As a backer, you will be signed\n" +
        "    up to receive product updates via email.",
      left: 99999,
      selected: false,
    },
    {
      name: "Bamboo Stand",
      pledge: 25,
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      left: 101,
      selected: false,
    },
    {
      name: "Black Edition Stand",
      pledge: 75,
      description:
        "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer \n" +
        "  member list. Shipping is included.",
      left: 64,
      selected: false,
    },
    {
      name: "Mahogany Special Edition",
      pledge: 200,
      description:
        "You get two Special Edition\n" +
        "    Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added\n" +
        "    to our Backer member list. Shipping is included.",
      left: 0,
      selected: false,
    },
  ]);

  const progressStyle = {
    width: `${
      (projectDetails.currentProgress / projectDetails.totalGoal) * 100
    }%`,
  };

  function changeBookmark() {
    changeBookmarkProject((prevBookmark) => !prevBookmark);
  }

  function toggleModalFn() {
    toggleModal((modal) => !modal);
  }

  function toggleConfirmFn(enough) {
    toggleConfirmModal((modal) => {
      return {
        visible: !modal.visible,
        enoughAmount: enough,
      };
    });
  }
  function scrollToTop() {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  }

  function submitBack(e, name, value) {
    e.preventDefault();
    scrollToTop();
    toggleModalFn();

    projectPlans.map((plan) => {
      return plan.name === name
        ? plan.pledge <= value
          ? (setProjectDetails((old) => ({
              ...old,
              backers: old.backers + 1,
              currentProgress: old.currentProgress + Number(value),
            })),
            toggleConfirmFn(true))
          : toggleConfirmFn(false)
        : plan;
    });
    setProjectPlans((oldPlans) =>
      oldPlans.map((plan) => ({ ...plan, selected: false }))
    );
  }

  function selectReward(name) {
    scrollToTop();
    toggleModalFn();
    setProjectPlans((oldPlans) =>
      oldPlans.map((plan) =>
        plan.name === name
          ? // ? { ...plan, selected: !plan.selected }
            { ...plan, selected: true }
          : { ...plan, selected: false }
      )
    );
  }

  function selectBack(name) {
    setProjectPlans((oldPlans) =>
      projectPlans.map((plan) => {
        return plan.name === name && plan.left > 0
          ? { ...plan, selected: true }
          : { ...plan, selected: false };
      })
    );
  }

  const planElements = projectPlans.map(
    (plan) =>
      plan.name !== "Pledge with no reward" && (
        <Plan
          key={plan.name}
          name={plan.name}
          pledge={plan.pledge}
          description={plan.description}
          left={plan.left}
          selectRewardFn={selectReward}
        />
      )
  );
  return (
    <main>
      <div className={styles.productName__wrapper}>
        <img className={styles.product__image} src={logo} alt="" />
        <h2 className={styles.productName__title}>
          Mastercraft Bamboo Monitor Riser
        </h2>
        <p className={styles.productDescription}>
          A beautiful & handcrafted monitor stand to reduce neck and eye strain.
        </p>
        <div className={styles.buttons__wrapper}>
          <Button openModal={toggleModal}>Back this project</Button>
          {bookmarkProject === false ? (
            <button className={styles.bookmark} onClick={changeBookmark}>
              <img className={styles.bookmark__image} src={bookmark} alt="" />
              {window.innerWidth > 470 ? "Bookmark" : ""}
            </button>
          ) : (
            <button className={styles.bookmarked} onClick={changeBookmark}>
              <img className={styles.bookmark__image} src={bookmarked} alt="" />
              {window.innerWidth > 470 ? "Bookmarked" : ""}
            </button>
          )}
        </div>
      </div>
      <div className={styles.backingInfo__wrapper}>
        <div className={styles.backingInfo__detailsWrapper}>
          <div className={styles.backingInfo__details}>
            <h2>${projectDetails.currentProgress}</h2>
            <p>of ${projectDetails.totalGoal} backed</p>
          </div>
          <div className={styles.backingInfo__details}>
            <h2>{projectDetails.backers}</h2> <p>total backers</p>
          </div>
          <div className={styles.backingInfo__details}>
            <h2>{projectDetails.daysLeft}</h2> <p>days left</p>
          </div>
        </div>
        <div className={styles.progressBar__wrapper}>
          <div className={styles.progressBar} style={progressStyle}></div>
        </div>
      </div>
      <div className={styles.supportPlans__wrapper}>
        <h4 className={styles.supportPlans__wrapperHeader}>
          About this project
        </h4>
        <span>
          The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform
          that elevates your screen to a more comfortable viewing height.
          Placing your monitor at eye level has the potential to improve your
          posture and make you more comfortable while at work, helping you stay
          focused on the task at hand.
        </span>
        <span>
          Featuring artisan craftsmanship, the simplicity of design creates
          extra desk space below your computer to allow notepads, pens, and USB
          sticks to be stored under the stand.
        </span>
        {planElements}
      </div>
      {modal && (
        <>
          <Modal
            plans={projectPlans}
            selectBackFn={selectBack}
            submitBackFn={submitBack}
            closeModal={toggleModalFn}
          />
          <div className={styles.tint}></div>
        </>
      )}
      {confirmModal.visible && (
        <>
          <Confirm
            closeConfirm={toggleConfirmFn}
            enough={confirmModal.enoughAmount}
          />
          <div className={styles.tint}></div>
        </>
      )}
    </main>
  );
};

export default Main;
