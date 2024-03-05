import { ITodo, IFilter } from "../Model/TodoModel";

export interface Repository {
  getFilter: () => Promise<IFilter>;
  updateSearchText: (search: IFilter["search"]) => Promise<void>;
  updateSearchBy: (searchBy: IFilter["searchBy"]) => Promise<void>;
  updateSortBy: (filter: IFilter["sortBy"]) => Promise<void>;
  getTodos: () => Promise<ITodo[]>;
  addTodo: (todo: ITodo) => Promise<void>;
  updateTodo: (id: ITodo["id"], todo: ITodo) => Promise<string>;
  deleteTodo: (id: ITodo["id"]) => Promise<void>;
}
