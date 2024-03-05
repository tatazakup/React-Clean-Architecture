import { ITodo } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const UpdateDetailUseCase = async (
  id: ITodo["id"],
  todo: ITodo,
  repository: Repository
): Promise<string> => {
  try {
    return await repository.updateTodo(id, todo);
  } catch (error) {
    throw error;
  }
};
