import React from 'react';
import styles from './Subscribe.module.scss';

const Subscribe: React.FC = () => {
	return (
		<section className={styles.subscribe}>
			<div className={styles.subscribe__inner}>
				<form className={styles.subsrcibe__form}>
					<label
						className={styles.subscribe__form_label}
						htmlFor='subscribe-input'
					>
						Подписаться
					</label>
					<div className={styles.subscribe__form_wrapper}>
						<input
							className={styles.subscribe__form_input}
							id='subscribe-input'
							type='text'
							placeholder='Введите ваш email'
							required
						/>
						<i
							className={`${styles.subscribe__form_input_icon} icon_envelope_o`}
						></i>
					</div>
					<button
						className={styles.subscribe__form_button}
						type='submit'
					></button>
				</form>
			</div>
		</section>
	);
};

export default Subscribe;
