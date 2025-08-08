import type {
	CategoriesList,
	ColorList,
	MenuList,
	ShowList,
	SortList,
} from './types';

export const menuList: MenuList[] = [
	{ id: 0, name: 'Главная', url: '/' },
	{ id: 1, name: 'Каталог', url: '/catalog' },
	{ id: 2, name: 'Доставка', url: '/delivery' },
	{ id: 3, name: 'Шоу-рум', url: '/showroom' },
	{ id: 4, name: 'Партнерство', url: '/partnership' },
	{ id: 5, name: 'Оплата', url: '/payment' },
];
export const menuList2: MenuList[] = [
	{ id: 6, name: 'О компании', url: '/about' },
	{ id: 7, name: 'Контакты', url: '/contacts' },
];
export const categoriesList: CategoriesList[] = [
	{
		name: 'Кресла',
		value: 'kresla',
	},
	{
		name: 'Диваны',
		value: 'divanu',
	},
	{
		name: 'Стойки ресепшн',
		value: 'stoiki-resepshn',
	},
	{
		name: 'Офисные перегородки',
		value: 'ofisnue-peregorodki',
	},
];
export const colorsList: ColorList[] = [
	{ name: 'Красный', value: 'red' },
	{ name: 'Серый', value: 'grey' },
	{ name: 'Синий', value: 'blue' },
	{ name: 'Черный', value: 'black' },
	{ name: 'Желтый', value: 'yellow' },
	{ name: 'Бежевый', value: 'beige' },
	{ name: 'Зеленый', value: 'green' },
	{ name: 'Все', value: '' },
];
export const sortList: SortList[] = [
	{ name: 'Цена: сначала недорогие', value: 'salePrice' },
	{ name: 'Сначала популярные', value: 'rating' },
	{ name: 'По алфавиту', value: 'name' },
];
export const showList: ShowList[] = [{ value: 6 }, { value: 9 }, { value: 12 }];
export const defaultPriceMin: number = 0;
export const defaultPriceMax: number = 600000;
