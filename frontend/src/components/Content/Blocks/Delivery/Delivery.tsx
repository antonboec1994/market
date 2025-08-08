import styles from "./Delivery.module.scss";

const Delivery: React.FC = () => {
  return (
    <section className={styles.delivery}>
      <div className={styles.delivery__inner}>
        <h2 className={styles.delivery__title}>Условия доставки офисной мебели и иных товаров</h2>
        <p className={styles.delivery__text}>Славянская Столица располагает современным автопарком, обслуживаемым опытными водителями-экспедиторами. Мы осуществляем доставку как в городе Москве, так и в другие города Российской Федерации. Для доставки мебели и прочих грузов в регионы, отдаленные от Москвы, мы пользуемся услугами наиболее развитой и надежной в своей отрасли компании Деловые Линии.</p>
        <p className={styles.delivery__text}>
          Доставка осуществляется <span className={styles.delivery__text_span}>с понедельника по пятницу с 9-00 до 18-00.</span>
        </p>
        <p className={styles.delivery__text}>Доставка возможна в выходные дни и вечернее время. Дополнительные условия и стоимость обсуждаются индивидуально.</p>
        <div className={styles.delivery__box}>
          <div className={styles.delivery__box_title}>Тарифы на доставку</div>
          <div className={styles.delivery__box_text}>Разгрузка, подъем товара и вывоз упаковки не включены</div>
          <div className={styles.delivery__box_text}>Условия для применения тарифов на стандартную доставку</div>
          <ul className={styles.delivery__box_list}>
            <li className={styles.delivery__box_list_item}>Наличие свободного подъезда к месту выгрузки товара.</li>
            <li className={styles.delivery__box_list_item}>Наличие свободного места для остановки автомобиля рядом с местом выгрузки товара.</li>
            <li className={styles.delivery__box_list_item}>Cтандартное время оказания услуги: с Пн до Пт с 9-00 до 18-00.</li>
            <li className={styles.delivery__box_list_item}>Фактический объем товара при его размещении на борту автомобиля_не боолее 14 м3.</li>
            <li className={styles.delivery__box_list_item}>Вес товара не превышает 1500 кг.</li>
          </ul>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>1. Самовывоз</span>
              <p className={styles.delivery__line_col_text}>(малый склад по адресу: г.Москва, ул.Рябиновая, д.65, с.2)</p>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>Бесплатно</span>
              <p className={styles.delivery__line_col_text}>Пн-Пт с 9-00 до 17-00</p>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>Необходимо за день до получения товара согласовать приезд и заказать пропуск на территорию склада.</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>2. Доставка в Москве в пределах МКАД</span>
              <p className={styles.delivery__line_col_text}>(+5 км за пределами МКАД)</p>
              <span className={styles.delivery__line_col_span}>при заказе на 49000 руб. и более.</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>Бесплатно</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>(в том числе доставка на терминалы транспортных компаний только из нашего списка рекомендованных, который находится ниже в п. 7)</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>3. Доставка в Москве в пределах МКАД</span>
              <p className={styles.delivery__line_col_text}>(+5 км за пределами МКАД)</p>
              <span className={styles.delivery__line_col_span}>при заказе на сумму от 15000 руб. до 49000 руб.</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>990 руб.</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>(в том числе доставка на терминалы транспортных компаний только из нашего списка рекомендованных, который находится ниже в п. 7)</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>4. Доставка в Москве в пределах МКАД</span>
              <p className={styles.delivery__line_col_text}>(+5 км за пределами МКАД)</p>
              <span className={styles.delivery__line_col_span}>при заказе на сумму до 15000 руб.</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>1990 руб.</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>(в том числе доставка на терминалы транспортных компаний только из нашего списка рекомендованных, который находится ниже в п. 7)</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>5. Доставка за пределами МКАД при заказе от 15000 руб. до 49000 руб.</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>40 рублей за 1км</span>
              <p className={styles.delivery__line_col_text}>(тарифицируется поездка в обе стороны)</p>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>Маршрут рассчитывается с использованием сервиса Яндекс.Карты. Адрес отправления_географический центр Москвы.</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>6. Доставка за пределами МКАД при заказе на 49000 руб. и более.</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>30 рублей за 1км</span>
              <p className={styles.delivery__line_col_text}>(тарифицируется поездка в обе стороны)</p>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>Маршрут рассчитывается с использованием сервиса Яндекс.Карты. Адрес отправления_географический центр Москвы.</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>7. Доставка офисной мебели и прочих товаров до транспортной компании</span>
              <p className={styles.delivery__line_col_text}>с последующей отправкой в отдаленные от Москвы регионы.</p>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>Рассчитывается индивидуально</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt} ${styles.delivery__line_col_text__cursive}`}>Список рекомендованных транспортных компаний:</p>
              <div className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>
                <ol className={styles.delivery__line_col_list}>
                  <li className={styles.delivery__line_col_list_item}>
                    <span className={styles.delivery__line_col_list_span}>Транспортная компания "Деловые линии"</span>
                    терминал по адресу Рябиновая ул, д. 37, стр. 1
                  </li>
                  <li className={styles.delivery__line_col_list_item}>
                    <span className={styles.delivery__line_col_list_span}>Транспортная Компания "ПЭК"</span>
                    терминал по адресу Рябиновая ул., д. 28 А, стр. 3
                  </li>
                  <li className={styles.delivery__line_col_list_item}>
                    <span className={styles.delivery__line_col_list_span}>Транспортная компания "Байкал-Сервис"</span>
                    терминал по адресу Рябиновая ул., д. 37, стр. 5
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.delivery__box}>
          <div className={styles.delivery__box_title}>Тарифы на разгрузку</div>
          <div className={styles.delivery__box_text}>Условия для применения тарифов на стандартную разгрузку (п.1-4)</div>
          <ul className={styles.delivery__box_list}>
            <li className={styles.delivery__box_list_item}>Наличие грузового лифта.</li>
            <li className={styles.delivery__box_list_item}>Не более 20 метров от автомобиля до грузового лифта, без лестниц.</li>
            <li className={styles.delivery__box_list_item}>Не более 30 метров от лифта до помещения, без лестниц.</li>
            <li className={styles.delivery__box_list_item}>Свободный проход. Свободное место в помещении для складирования товара.</li>
            <li className={styles.delivery__box_list_item}>Время проведения работ: с Пн до Пт с 9-00 до 18-00.</li>
          </ul>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>1. Разгрузка до 1400 кг</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>3.50 руб. за 1 кг, но не менее 800 руб.</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>При разгрузке крупногабаритных изделий (диваны, сейфы, большие шкафы, большие столы для руководителей и для переговоров, и пр.) требуется дополнительный сотрудник. Стоимость работы дополнительного сотрудника - 1300 руб.</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>2. Разгрузка от 1400 кг до 3000 кг</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>3.00 руб. за 1 кг</span>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>3. Разгрузка от 3000 кг до 5000 кг</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>2.80 руб. за 1 кг</span>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>4. Разгрузка более 5000 кг</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>2.60 руб. за 1 кг</span>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>5. Разгрузка без грузового лифта</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>4Применяются тарифы стандартной разгрузки (п.1-4) за каждый этаж, включая первый</span>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>6. Разгрузка вечерняя с грузовым лифтом</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>Применяются тарифы стандартной разгрузки (п.1-4) с коэффициентом 1.5</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>С Пн до Пт с 18-00 до 21-00.</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>7. Разгрузка вечерняя без грузового лифта</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>Применяются тарифы разгрузки без грузового лифта (п.5) с коэффициентом 1.5</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>С Пн до Пт с 18-00 до 21-00.</p>
            </div>
          </div>
          <div className={styles.delivery__box_line}>
            <div className={styles.delivery__line_col_left}>
              <span className={styles.delivery__line_col_span}>8. Разгрузка в выходные и праздничные дни</span>
            </div>
            <div className={styles.delivery__line_col_right}>
              <span className={styles.delivery__line_col_span}>По согласованию</span>
              <p className={`${styles.delivery__line_col_text} ${styles.delivery__line_col_text__mt}`}>Не является стандартной услугой и подлежит дополнительному обсуждению. Условия проведения работ, сроки и стоимость обсуждаются индивидуально с учетом различных деталей заказа</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
