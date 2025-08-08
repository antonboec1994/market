import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

import { setCurrentPage } from '@/redux/filters/slice';

import { SelectFilters } from '@/redux/filters/selectors';
import { feedbacksLimitOnPage } from '@/redux/getFeedbacks/consts';
import { SelectFeedbacks } from '@/redux/getFeedbacks/selectors';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import { useAppDispatch } from '@/redux/store';
import styles from './Pagination.module.scss';

type PaginationProps = {
	type: string;
};

const Pagination: React.FC<PaginationProps> = ({ type }) => {
	const dispatch = useAppDispatch();
	const { currentPage, activeShow } = useSelector(SelectFilters);
	const { productsCount } = useSelector(SelectGetProducts);
	const { feedbacks } = useSelector(SelectFeedbacks);

	const pages =
		type === 'products'
			? Math.ceil(productsCount / activeShow)
			: Math.ceil(feedbacks.length / feedbacksLimitOnPage);

	const onClickPageChange = (event: { selected: number }) => {
		dispatch(setCurrentPage(event.selected + 1));
	};

	return (
		<>
			{pages > 1 ? (
				<ReactPaginate
					forcePage={currentPage - 1}
					className={styles.pagination}
					breakLabel='...'
					nextLabel='>'
					onPageChange={event => onClickPageChange(event)}
					pageRangeDisplayed={3}
					pageCount={pages}
					previousLabel='<'
				/>
			) : (
				''
			)}
		</>
	);
};

export default Pagination;
