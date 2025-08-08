import Cart from "../../Cart/Cart";

import styles from "../../Cart/Cart.module.scss";

const ProfileCart: React.FC = () => {
  return (
    <div className={styles.profile_cartbox}>
      <Cart />
    </div>
  );
};

export default ProfileCart;
