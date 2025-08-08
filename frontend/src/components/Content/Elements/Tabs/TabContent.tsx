import ChangePassword from '@/components/Content/Blocks/Profile/Settings/ChangePassword';
import DeleteAccount from '@/components/Content/Blocks/Profile/Settings/DeleteAccount';
import UpdateUser from '@/components/Content/Blocks/Profile/Settings/UpdateUser';
import TabPanel from './TabPanel';

type TabContentProps = {
	value: number;
};

const TabContent: React.FC<TabContentProps> = ({ value }) => {
	return (
		<>
			<TabPanel value={value} index={0}>
				<UpdateUser />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ChangePassword />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<DeleteAccount />
			</TabPanel>
		</>
	);
};

export default TabContent;
