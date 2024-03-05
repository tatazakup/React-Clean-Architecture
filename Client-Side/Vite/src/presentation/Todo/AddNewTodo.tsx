import { useEffect, useState } from "react";
import $ from "jquery";
import { AddNewTodoProps } from "./hook/useTodoModelController";

interface AddNewTodoPageProps {
  onSubmit: AddNewTodoProps;
}

export const AddNewTodo = (props: AddNewTodoPageProps) => {
  const { onSubmit } = props;

  const [IdNewTask] = useState("new-task");
  const [EnterCode] = useState(13);

  const onSubmitCreateTodo = (event: JQuery.KeyPressEvent) => {
    const newTaskInput = $(event.currentTarget);

    if (event.which === EnterCode) {
      const value: string = newTaskInput.val() as string;
      if (value.length > 0) {
        onSubmit(value.toString()).then((resp) => {
          if (resp === "success") $(`#${IdNewTask}`).val("");
        });
      }
    }
  };

  useEffect(() => {
    const newTaskDom = $(`#${IdNewTask}`);
    newTaskDom.on("keypress", onSubmitCreateTodo);

    return () => {
      newTaskDom.off("keypress", onSubmitCreateTodo);
    };
  }, []);

  return (
    <nav className="d-flex my-2">
      <input
        data-cy="todo-create-input"
        id={IdNewTask}
        type="text"
        className="px-5 rounded-4 w-100"
        placeholder="Add your todo..."
        maxLength={100}
      />
    </nav>
  );
};
