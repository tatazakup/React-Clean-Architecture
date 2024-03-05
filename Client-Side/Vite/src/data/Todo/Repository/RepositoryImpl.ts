import { Repository } from "@domain/Todo/Repository/Repository";
import { DataSource } from "../DataSource/DataSource";
import { IFilter, ITodo } from "@domain/Todo/Model/TodoModel";

export class RepositoryImpl implements Repository {
  dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  getFilter = async () => {
    return this.dataSource.getFilter();
  };

  updateSearchText = async (search: IFilter["search"]) => {
    void this.dataSource.setSearchFilter(search);
  };

  updateSearchBy = async (searchBy: IFilter["searchBy"]) => {
    void this.dataSource.setSearchByFilter(searchBy);
  };

  updateSortBy = async (sortBy: IFilter["sortBy"]) => {
    void this.dataSource.setSortByFilter(sortBy);
  };

  getTodos = async () => {
    return this.dataSource.getTodos();
  };

  addTodo = async (todo: ITodo) => {
    let todos = await this.dataSource.getTodos();
    todos.push(todo);
    await void this.dataSource.setTodos(todos);
  };

  updateTodo = async (id: ITodo["id"], todo: ITodo) => {
    try {
      if (todo.title.length > 100) {
        throw "title length > 100";
      }
      let todos = await this.dataSource.getTodos();
      const index = todos.findIndex((todo) => todo.id === id);
      if (index > -1) {
        todos[index] = todo;
        await this.dataSource.setTodos(todos);
        return "success";
      } else {
        return "id invalid";
      }
    } catch (error) {
      throw error;
    }
  };

  deleteTodo = async (id: ITodo["id"]) => {
    let todos = await this.dataSource.getTodos();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index > -1) {
      todos.splice(index, 1);
      await void this.dataSource.setTodos(todos);
    }
    return;
  };
}
