import { v4 as uuidv4 } from "uuid";
import { ITodo } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const AddTodoUseCase = async (
  title: ITodo["title"],
  repository: Repository
) => {
  const createAt = new Date();
  const todo: ITodo = {
    id: uuidv4(),
    title: title,
    description: "",
    status: "IN_PROGRESS",
    image: "",
    dueto: createAt.toISOString(),
    createAt: createAt.toISOString(),
  };

  void (await repository.addTodo(todo));
};
