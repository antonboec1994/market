export type GraphicType = {
	id: number;
	name: string;
	values: any;
};

export type GraphicsErrorResponse = {
	status: number;
	data: {
		message: string;
	};
};

export type AreaGraphic = {
	name: string;
	values: string;
};

export interface getGraphicsSliceState {
	status: string;
	favorites: any;
}
