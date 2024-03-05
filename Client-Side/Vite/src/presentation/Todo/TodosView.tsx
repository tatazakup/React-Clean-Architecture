import { ITodo } from "@domain/Todo/Model/TodoModel";
import { TaskComponent } from "./TaskComponent";
import {
  DeleteTodoProps,
  UpdateDetailTodoProps,
  UpdateStatusProps,
} from "./hook/useTodoModelController";

export interface TodosViewProps {
  todos: ITodo[];
  updateDetailTodo: UpdateDetailTodoProps;
  updateStatus: UpdateStatusProps;
  deleteTodo: DeleteTodoProps;
}

export const TodosView = (props: TodosViewProps) => {
  const { todos = [], updateDetailTodo, updateStatus, deleteTodo } = props;
  return (
    <main>
      {todos.length === 0 && <p data-cy="todo-empty-text">No Todo List</p>}
      {todos.map((task, i) => (
        <TaskComponent
          task={task}
          key={i}
          updateDetailTodo={updateDetailTodo}
          updateStatus={updateStatus}
          deleteTodo={deleteTodo}
        />
      ))}
    </main>
  );
};
