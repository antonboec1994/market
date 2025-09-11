import Banner from '@/components/Content/Blocks/Banner/Banner';
import Brands from '@/components/Content/Blocks/Brands/Brands';
import Breadcrumbs from '@/components/Content/Blocks/Breadcrumbs/Breadcrumbs';
import Catalog from '@/components/Content/Blocks/Catalog/Catalog';
import Subscribe from '@/components/Content/Blocks/Subscribe/Subscribe';

const CatalogPage = () => {
	const pageTitle: string = 'Каталог';

	return (
		<>
			<Banner />
			<Breadcrumbs pageTitle={pageTitle} />
			<Catalog />
			<Brands />
			<Subscribe />
		</>
	);
};

export default CatalogPage;
