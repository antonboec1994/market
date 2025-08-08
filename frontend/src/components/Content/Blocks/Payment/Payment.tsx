import styles from "./Payment.module.scss";

const Payment: React.FC = () => {
  return (
    <section className={styles.payment}>
      <div className="container">
        <div className={styles.payment__inner}>
          <h2 className={styles.payment__title}>Способы оплаты офисной мебели и иных товаров и сервисных услуг</h2>
          <p className={styles.payment__text}>Славянская Столица работает как с юридическими лицами, так и с частными потребителями на всей территории Российской Федерации. В арсенале компании наиболее удобные и популярные формы расчетов за товары и услуги.</p>
          <div className={styles.payment__box}>
            <div className={styles.payment__box_title}>Перечень способов оплаты</div>
            <div className={styles.delivery__box_line}>
              <div className={styles.delivery__line_col_left}>
                <span className={styles.delivery__line_col_span}> 1. Оплата по безналичному расчету </span>
              </div>
              <div className={styles.delivery__line_col_right}>
                <p className={styles.delivery__line_col_text}>Основная форма оплаты для юридических лиц. Производится на основании выставленного счета на оплату, договора либо спецификации. При передаче товара предоставляются оригиналы документов строгой отчетности в соответствии с действующим законодательством.</p>
              </div>
            </div>
            <div className={styles.delivery__box_line}>
              <div className={styles.delivery__line_col_left}>
                <span className={styles.delivery__line_col_span}> 2. Оплата наличными </span>
              </div>
              <div className={styles.delivery__line_col_right}>
                <p className={styles.delivery__line_col_text}>Оплата производится на основании выставленного счета на оплату в отделении любого из банков, принимающих наличную оплату на расчетный счет юридического лица. Этой формой оплаты могут воспользоваться как физические, так и юридические лица.</p>
                <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>ВАЖНО! При оплате этим способом большинство банков взимают незначительную комиссию за свои услуги, что может отразиться на конечной сумме покупки.</p>
              </div>
            </div>
            <div className={styles.delivery__box_line}>
              <div className={styles.delivery__line_col_left}>
                <span className={styles.delivery__line_col_span}> 3. Оплата онлайн (интернет-банкинг) </span>
              </div>
              <div className={styles.delivery__line_col_right}>
                <p className={styles.delivery__line_col_text}>Любой желающий приобрести мебель в нашей компании, может произвести оплату, сидя у компьютера, при наличии доступа в личный кабинет Онлайн-Банкинга. Оплата наших товаров и услуг данным способом производится по аналогии с оплатой любых других товаров и услуг на основании выставленного счета на оплату.</p>
                <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>ВАЖНО! Применяя эту форму оплаты, вы самостоятельно вносите платежные реквизиты, указанные в нашем счете на оплату, что не исключает вероятность механической ошибки. В связи с этим настоятельно рекомендуем внимательно сверить все данные перед осуществлением транзакции.</p>
                <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>Для большей безопасности предлагаем проверить реквизиты на этой странице: Контакты</p>
                <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>Просим в назначении платежа ОБЯЗАТЕЛЬНО указывать вид оплачиваемого товара или услуги, а также номер и дату оплачиваемого счета. Эти данные необходимы для моментальной идентификации платежа.</p>
              </div>
            </div>
          </div>
          <p className={styles.payment__text}>Обращаем Ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях информационные материалы и цены, размещенные на сайте, не являются публичной офертой, определяемой положениями Статей 435 и 437 Гражданского кодекса РФ.</p>
          <p className={styles.payment__text}>Официальная информация о ценах на товары может содержаться исключительно в выставленных счетах на оплату или в спецификациях, являющихся приложениями к договору поставки.</p>
        </div>
      </div>
    </section>
  );
};

export default Payment;
