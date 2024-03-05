import { ITodo, IFilter } from "@domain/Todo/Model/TodoModel";
import type { DataSource } from "./DataSource";
import { LocalStorageUtil } from "@utils/LocalStorage";

export const LOCAL_STORAGE = "TODO";

export class OnMemoryDataSourceImpl implements DataSource {
  todos: ITodo[];
  filter: IFilter = {
    search: "",
    searchBy: "title",
    sortBy: "title",
  };

  constructor() {
    const data = LocalStorageUtil.getItem(LOCAL_STORAGE);
    if (data !== null) this.todos = data as ITodo[];
    else this.todos = [];
  }

  async getTodos(): Promise<ITodo[]> {
    const filteredTodos = this.todos.filter((todo) => {
      const searchField =
        this.filter.searchBy === "title" ? todo.title : todo.description || "";
      return searchField
        .toLowerCase()
        .includes(this.filter.search.toLowerCase());
    });

    filteredTodos.sort((a, b) => {
      if (this.filter.sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (this.filter.sortBy === "date") {
        return new Date(a.dueto).getTime() - new Date(b.dueto).getTime();
      } else if (this.filter.sortBy === "status") {
        return b.status.localeCompare(a.status);
      }
      return 0;
    });

    return filteredTodos;
  }

  async setTodos(todos: ITodo[]): Promise<void> {
    LocalStorageUtil.setItem(LOCAL_STORAGE, todos);
    this.todos = todos;
  }

  async getFilter(): Promise<IFilter> {
    return this.filter;
  }

  async setSearchFilter(search: IFilter["search"]): Promise<void> {
    this.filter.search = search;
  }

  async setSearchByFilter(searchBy: IFilter["searchBy"]): Promise<void> {
    this.filter.searchBy = searchBy;
  }

  async setSortByFilter(sortBy: IFilter["sortBy"]): Promise<void> {
    this.filter.sortBy = sortBy;
  }
}
