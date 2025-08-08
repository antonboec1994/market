import { Link, useLocation } from "react-router-dom";

import styles from "./Breadcrumbs.module.scss";

type BreadcrumbsProps = {
  pageTitle: string | undefined;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pageTitle }) => {
  const location = useLocation();

  return (
    <section className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__inner}>
        <ul className={styles.breadcrumb__list}>
          {location.pathname.includes("product") ? (
            <>
              <li className={styles.breadcrumbs__item}>
                <Link className={styles.breadcrumbs__link} to="/">
                  Главная
                </Link>
              </li>
              <li className={styles.breadcrumbs__item}>
                <Link className={styles.breadcrumbs__link} to="/catalog">
                  Каталог
                </Link>
              </li>
              <li className={styles.breadcrumbs__item}>{pageTitle}</li>
            </>
          ) : (
            <>
              <li className={styles.breadcrumbs__item}>
                <Link className={styles.breadcrumbs__link} to="/">
                  Главная
                </Link>
              </li>
              <li className={styles.breadcrumbs__item}>{pageTitle}</li>
            </>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Breadcrumbs;
