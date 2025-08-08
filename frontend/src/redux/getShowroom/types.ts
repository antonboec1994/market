export type ShowroomType = {
  id: number;
  name: string;
  slides: [string];
};

export interface ShowroomSliceState {
  items: ShowroomType[];
  status: string;
}
