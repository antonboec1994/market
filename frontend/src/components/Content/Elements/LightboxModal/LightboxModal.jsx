import styles from "./LightboxModal.module.scss";

const LightboxModal = ({ clickedImage, imageNext, imagePrev, setClickedImage }) => {
  const modalClose = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImage(null);
    }
  };

  return (
    <div className={`${styles.lightbox_modal} dismiss`} onClick={modalClose}>
      <div className={`${styles.lightbox_modal__close} dismiss`}></div>
      <div className={styles.lightbox_prev} onClick={imagePrev}></div>
      <div className={styles.lightbox_next} onClick={imageNext}></div>
      <div className={styles.lightbox_modal__content}>
        <img src={clickedImage} alt="alt" />
      </div>
    </div>
  );
};

export default LightboxModal;
