import { Checkbox } from "@components/Checkbox/Checkbox";
import { ITodo } from "@domain/Todo/Model/TodoModel";
import {
  DeleteTodoProps,
  UpdateDetailTodoProps,
  UpdateStatusProps,
} from "./hook/useTodoModelController";
import { Dropdown } from "@components/Dropdown/Dropdown";
import { CustomField } from "./CustomFieldComponent";
import { useEffect, useState } from "react";

export interface TaskComponentProps {
  task: ITodo;
  updateDetailTodo: UpdateDetailTodoProps;
  updateStatus: UpdateStatusProps;
  deleteTodo: DeleteTodoProps;
}

export const TaskComponent = (props: TaskComponentProps) => {
  const { task, updateDetailTodo, updateStatus, deleteTodo } = props;
  const [isUpdate, setIsUpdate] = useState(false);
  const [todoEdit, setTodoEdit] = useState<ITodo>(task);

  const onTicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    void updateStatus(task.id, e.target.checked ? "COMPLETED" : "IN_PROGRESS");
  };

  const onSubmit = async () => {
    await updateDetailTodo(task.id, todoEdit);
    setIsUpdate(false);
  };

  useEffect(() => {
    setTodoEdit(task);
  }, [task]);

  return (
    <div className="todo-wrapper" data-cy="todo-detail">
      <div className="todo-title-wrapper">
        {!isUpdate && (
          <Checkbox checked={task.status === "COMPLETED"} onTicker={onTicker} />
        )}

        <CustomField
          keyDisplay="title"
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
          isUpdate={isUpdate}
        />
      </div>
      <div className="todo-description-wrapper">
        <CustomField
          keyDisplay="description"
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
          isUpdate={isUpdate}
        />
      </div>
      <div className="todo-dueto-wrapper">
        <CustomField
          keyDisplay="dueto"
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
          isUpdate={isUpdate}
        />
      </div>
      <div className="todo-createat-wrapper">
        <CustomField
          keyDisplay="createAt"
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
          isUpdate={isUpdate}
        />
      </div>
      <div className="todo-image-wrapper">
        <CustomField
          keyDisplay="image"
          todoEdit={todoEdit}
          setTodoEdit={setTodoEdit}
          isUpdate={isUpdate}
        />
      </div>
      <div className="todo-option-wrapper">
        {isUpdate ? (
          <button data-cy="todo-save-change" onClick={onSubmit}>
            Save
          </button>
        ) : (
          <Dropdown
            items={[
              {
                label: "Edit",
                color: "primary",
                onClick: () => {
                  void setIsUpdate(true);
                },
              },
              {
                label: "Delete",
                color: "danger",
                onClick: () => {
                  void deleteTodo(task.id);
                },
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};
