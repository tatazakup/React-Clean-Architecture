import { v4 as uuidv4 } from "uuid";
import { OnMemoryDataSourceImpl } from "@data/Todo/DataSource/OnMemoryDataSourceImpl";
import { RepositoryImpl } from "@data/Todo/Repository/RepositoryImpl";
import { ITodo } from "@domain/Todo/Model/TodoModel";

describe("<AddNewTodo />", () => {
  let dataSource: OnMemoryDataSourceImpl;
  let repository: RepositoryImpl;

  beforeEach(() => {
    dataSource = new OnMemoryDataSourceImpl();
    repository = new RepositoryImpl(dataSource);
  });

  it("Can create a Todo", async () => {
    const todoTitle = "todo-1";
    const createAt = new Date();
    const todo: ITodo = {
      id: uuidv4(),
      title: todoTitle,
      description: "description-1",
      status: "IN_PROGRESS",
      image: "",
      dueto: createAt.toISOString(),
      createAt: createAt.toISOString(),
    };
    await repository.addTodo(todo);
    const TodoList = await repository.getTodos();
    expect(TodoList).length(1);
    expect(TodoList[0].title).to.equal(todoTitle);
  });
});
