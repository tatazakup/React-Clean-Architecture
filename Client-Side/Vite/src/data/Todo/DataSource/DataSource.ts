import { ITodo, IFilter } from "@domain/Todo/Model/TodoModel";

export interface DataSource {
  setTodos(todos: ITodo[]): Promise<void>;
  getTodos(): Promise<ITodo[]>;

  getFilter(): Promise<IFilter>;
  setSearchFilter(search: IFilter["search"]): Promise<void>;
  setSearchByFilter(search: IFilter["searchBy"]): Promise<void>;
  setSortByFilter(search: IFilter["sortBy"]): Promise<void>;
}
