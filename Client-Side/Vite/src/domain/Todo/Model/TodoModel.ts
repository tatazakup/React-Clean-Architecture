export type ITodoStatus = "IN_PROGRESS" | "COMPLETED";

export type ITodo = {
  id: string;
  title: string;
  description: string;
  status: ITodoStatus;
  image: string;
  dueto: string;
  createAt: string;
};

export type ISortBy = "title" | "date" | "status";
export type ISearchBy = "title" | "description";

export type IFilter = {
  sortBy: ISortBy;
  searchBy: ISearchBy;
  search: string;
};
