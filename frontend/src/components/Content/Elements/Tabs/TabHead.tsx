import { settingsTabList } from '@/components/Content/Blocks/Profile/Pages/Settings';
import { Box, Tab, Tabs } from '@mui/material';
import styles from './Tabs.module.scss';

type TabHeadBoxProps = {
	value: number;
	setValue: React.Dispatch<React.SetStateAction<number>>;
};

export const tabProps = (index: number) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

const TabHeadBox: React.FC<TabHeadBoxProps> = ({ value, setValue }) => {
	const handleChange = (_: any, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box className={styles.gallery__tabs_tabs}>
			<Tabs centered value={value} onChange={handleChange}>
				{settingsTabList.map((item, index) => (
					<Tab
						className={styles.gallery__tabs_tab_link}
						label={item?.name}
						{...tabProps(index)}
						key={index}
					/>
				))}
			</Tabs>
		</Box>
	);
};

export default TabHeadBox;
