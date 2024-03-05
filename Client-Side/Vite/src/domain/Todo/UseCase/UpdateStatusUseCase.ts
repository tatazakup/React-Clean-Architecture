import { ITodo, ITodoStatus } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const UpdateStatusUseCase = async (
  id: ITodo["id"],
  status: ITodoStatus,
  repository: Repository
): Promise<void> => {
  try {
    const todos = await repository.getTodos();
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) throw { status: false, msg: "todo not found" };
    todo.status = status;
    await repository.updateTodo(id, todo);
  } catch (error) {
    throw error;
  }
};
