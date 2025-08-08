import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Contacts from '@/components/Content/Blocks/Contacts/Contacts';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';
import { setMenuUrlValue } from '@/redux/filters/slice';
import { useAppDispatch } from '@/redux/store';
import { useEffect } from 'react';

const ContactsPage = () => {
	const dispatch = useAppDispatch();
	const pageTitle: string = 'Контакты';

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(setMenuUrlValue(''));
	}, [dispatch]);

	return (
		<>
			<Breadcrumbs pageTitle={pageTitle} />
			<Contacts />
			<Subscribe />
		</>
	);
};

export default ContactsPage;
