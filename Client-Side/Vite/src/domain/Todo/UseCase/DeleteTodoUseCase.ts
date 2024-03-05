import { ITodo } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const DeleteTodoUseCase = async (
  id: ITodo["id"],
  repository: Repository
): Promise<void> => {
  try {
    await repository.deleteTodo(id);
  } catch (error) {
    throw error;
  }
};
