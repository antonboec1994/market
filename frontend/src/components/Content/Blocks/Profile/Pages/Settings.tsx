import TabContent from '@/components/Content/Elements/Tabs/TabContent';
import TabHead from '@/components/Content/Elements/Tabs/TabHead';
import React, { useState } from 'react';
import styles from '../Profile.module.scss';

export const settingsTabList = [
	{ name: 'персональные данные' },
	{ name: 'Изменить пароль' },
	{ name: 'Удалить аккаунт' },
];

const Settings: React.FC = () => {
	const [value, setValue] = useState<number>(0);

	return (
		<>
			<div className={styles.title}>Настройки</div>
			<TabHead value={value} setValue={setValue} />
			<TabContent value={value} />
		</>
	);
};

export default Settings;
