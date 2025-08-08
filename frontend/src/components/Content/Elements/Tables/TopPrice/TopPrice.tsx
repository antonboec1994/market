import { DataGrid, ruRU, type GridColDef } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';

import { categoriesList } from '@/redux/filters/consts';
import { SelectGetProducts } from '@/redux/getProducts/selectors';
import type { ProductTypeForTable } from '@/redux/getProducts/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Tables.module.scss';

const TopPrice: React.FC = () => {
	const { productsAll } = useSelector(SelectGetProducts);
	const [array, setArray] = useState<ProductTypeForTable[]>([]);

	useEffect(() => {
		const changedArray =
			productsAll?.map(item => {
				const categoryObj = categoriesList[item?.category];
				return {
					...item,
					category: categoryObj ? categoryObj.name : 'Неизвестно',
				};
			}) || [];
		setArray(changedArray);
	}, [productsAll]);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', minWidth: 30 },
		{ field: 'name', headerName: 'Название', minWidth: 200 },
		{ field: 'salePrice', headerName: 'Цена', minWidth: 70 },
		{ field: 'rating', headerName: 'Рейтинг', minWidth: 30 },
		{ field: 'category', headerName: 'Категория', minWidth: 100 },
		{
			field: 'link',
			headerName: 'Ссылка',
			minWidth: 100,
			renderCell: params => (
				<Link to={`/product/${params.row.id}`}>Смотреть</Link>
			),
		},
	];

	return (
		<>
			<h3 className={styles.title}>Каталог товаров</h3>
			<div className={styles.tableBox}>
				<DataGrid
					localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
					className={styles.table}
					rows={array}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</div>
		</>
	);
};

export default TopPrice;
