import styles from "./Contacts.module.scss";

const Contacts: React.FC = () => {
  return (
    <section className={styles.page_contacts}>
      <h2 className={styles.page_contacts__title}>Контакты</h2>
      <div className={styles.page_contacts__head_box}>Мы продолжаем работать. Наш коллектив остается на связи и готов ответить на ваши вопросы</div>
      <div className={styles.page_contacts__contact_inner}>
        <div className={styles.page_contacts__contact_info}>
          <div className={styles.page_contacts__contact_text}>
            <div>
              Пн_пт: с<span className={styles.page_contacts__contact_text_span}> 09:00 </span>
              до
              <span className={styles.page_contacts__contact_text_span}> 20:00 </span>
            </div>
            <div>
              Сб_вс: с<span className={styles.page_contacts__contact_text_span}> 10:00 </span>
              до
              <span className={styles.page_contacts__contact_text_span}> 18:00 </span>
            </div>
          </div>
          <a className={styles.page_contacts__contact_tel} href="tel:+74956425384">
            +7 (495) 642-53-04
          </a>
          <a className={styles.page_contacts__contact_tel} href="tel:+74956425384">
            +7 (495) 642-53-52
          </a>
          <a className={styles.page_contacts__contact_tel} href="tel:+74956425384">
            +7 (495) 532-70-25
          </a>
          <a className={styles.page_contacts__contact_tel} href="tel:+74956425384">
            +7 (495) 741-82-97
          </a>
          <div className={styles.page_contacts__contact_text}>
            Эл. почта:
            <a className={styles.page_contacts__contact_email} href="mailto:albero_mebel@mail.ru">
              albero_mebel@mail.ru
            </a>
          </div>
          <div className={styles.page_contacts__contact_text}>Whatsapp/Viber/Telegram/Skype</div>
          <div className={styles.page_contacts__contact_text}>
            <span className={styles.page_contacts__contact_text_span}>г.Москва, 47 км МКАД, стр.21, БЦ "Боровский"</span>
          </div>
        </div>
        <div className={styles.page_contacts__contact_map}>
          <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A10739dc7b5499d02f91e9a713b0f625001fe04adcecd2b61ee179e151cffcb53&amp;source=constructor" width="750px" height="400" frameBorder="0"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
