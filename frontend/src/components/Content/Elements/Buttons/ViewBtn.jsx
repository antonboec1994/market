import React from "react";
import { Link } from "react-router-dom";

import styles from "./Buttons.module.scss";
const ViewBtn = ({ itemId }) => {
  return (
    <>
      <Link className={`${styles.slide__info_link} icon_eye`} to={`/product/${itemId}`}></Link>
    </>
  );
};

export default ViewBtn;
