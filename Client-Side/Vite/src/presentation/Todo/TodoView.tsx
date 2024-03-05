import { Repository } from "@domain/Todo/Repository/Repository";
import { FilterView } from "./FilterView";
import { TodosView } from "./TodosView";
import { AddNewTodo } from "./AddNewTodo";
import { useTodoModelController } from "./hook/useTodoModelController";

interface TodoViewProps {
  repository: Repository;
}

export const TodoView = (props: TodoViewProps) => {
  const { repository } = props;
  const {
    todos,
    filter,
    search,
    searchBy,
    sortBy,
    addNewTodo,
    updateDetailTodo,
    updateStatus,
    deleteTodo,
  } = useTodoModelController(repository);

  return (
    <div id="contain-wrapper">
      <FilterView
        filter={filter}
        search={search}
        searchBy={searchBy}
        sortBy={sortBy}
      />
      <AddNewTodo onSubmit={addNewTodo} />
      <TodosView
        todos={todos}
        updateDetailTodo={updateDetailTodo}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};
