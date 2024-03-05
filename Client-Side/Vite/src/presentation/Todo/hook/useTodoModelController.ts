import { useEffect, useState } from "react";
import { Repository } from "@domain/Todo/Repository/Repository";
import {
  ITodo,
  IFilter,
  ITodoStatus,
  ISearchBy,
  ISortBy,
} from "@domain/Todo/Model/TodoModel";
import {
  SearchTodoUseCase,
  SearchByUseCase,
  AddTodoUseCase,
  UpdateStatusUseCase,
  DeleteTodoUseCase,
  SortByUseCase,
  UpdateDetailUseCase,
} from "@domain/Todo/UseCase";

export type SearchByTextProps = (search: IFilter["search"]) => Promise<string>;
export type UpdateSearchByProps = (
  search: IFilter["searchBy"]
) => Promise<string>;
export type SortByProps = (sortBy: IFilter["sortBy"]) => Promise<string>;
export type UpdateSortBy = (filter: IFilter["sortBy"]) => Promise<string>;
export type AddNewTodoProps = (title: ITodo["title"]) => Promise<string>;
export type UpdateDetailTodoProps = (
  id: ITodo["id"],
  todo: ITodo
) => Promise<string>;
export type UpdateStatusProps = (
  id: ITodo["id"],
  status: ITodoStatus
) => Promise<string>;
export type DeleteTodoProps = (id: ITodo["id"]) => Promise<string>;

export const SEARCH_OPTION: ISearchBy[] = ["title", "description"];
export const SORT_OPTION: ISortBy[] = ["title", "date", "status"];

export const useTodoModelController = (repository: Repository) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<IFilter>({
    search: "",
    searchBy: SEARCH_OPTION[0],
    sortBy: "title",
  });

  useEffect(() => {
    async function init() {
      const initialTodos = await repository.getTodos();
      setTodos(initialTodos);
    }
    void init();
  }, [repository]);

  const search: SearchByTextProps = async (search) => {
    await SearchTodoUseCase(search, repository);
    const todoList = await repository.getTodos();
    const filterFromDatasource = await repository.getFilter();
    setTodos([...todoList]);
    setFilter(filterFromDatasource);
    return "success";
  };

  const searchBy: UpdateSearchByProps = async (
    searchBy: IFilter["searchBy"]
  ) => {
    await SearchByUseCase(searchBy, repository);
    const todoList = await repository.getTodos();
    const filterFromDatasource = await repository.getFilter();
    setTodos([...todoList]);
    setFilter(filterFromDatasource);
    return "success";
  };

  const sortBy: SortByProps = async (sortBy) => {
    await SortByUseCase(sortBy, repository);
    const todoList = await repository.getTodos();
    const filterFromDatasource = await repository.getFilter();
    setTodos([...todoList]);
    setFilter(filterFromDatasource);
    return "success";
  };

  const addNewTodo: AddNewTodoProps = async (title) => {
    await AddTodoUseCase(title, repository);
    const todoList = await repository.getTodos();
    setTodos([...todoList]);
    return "success";
  };

  const updateDetailTodo: UpdateDetailTodoProps = async (id, todo) => {
    try {
      await UpdateDetailUseCase(id, todo, repository);
      const todoList = await repository.getTodos();
      setTodos([...todoList]);
      return "success";
    } catch (error) {
      throw new Error("error");
    }
  };

  const updateStatus: UpdateStatusProps = async (id, status) => {
    await UpdateStatusUseCase(id, status, repository);
    const todoList = await repository.getTodos();
    setTodos([...todoList]);
    return "success";
  };

  const deleteTodo: DeleteTodoProps = async (id) => {
    await DeleteTodoUseCase(id, repository);
    const todoList = await repository.getTodos();
    setTodos([...todoList]);
    return "success";
  };

  return {
    todos,
    filter,
    search,
    searchBy,
    sortBy,
    addNewTodo,
    updateDetailTodo,
    updateStatus,
    deleteTodo,
  };
};
