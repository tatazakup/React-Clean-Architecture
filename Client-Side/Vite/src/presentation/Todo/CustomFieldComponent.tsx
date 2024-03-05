import ImageUploader from "@components/ImageUploader/ImageUploader";
import { ITodo } from "@domain/Todo/Model/TodoModel";
import { Dispatch } from "react";

interface CustomFieldProps {
  keyDisplay: keyof ITodo;
  todoEdit: ITodo;
  setTodoEdit: Dispatch<React.SetStateAction<ITodo>>;
  isUpdate: boolean;
}

export const CustomField = (props: CustomFieldProps) => {
  const { keyDisplay, todoEdit, setTodoEdit, isUpdate } = props;

  if (keyDisplay === "title") {
    return !isUpdate ? (
      <p
        className={`body ${
          todoEdit.status === "COMPLETED" &&
          "text-decoration-line-through text-darkgray"
        }`}
        data-cy="todo-title"
      >
        {todoEdit[keyDisplay]}
      </p>
    ) : (
      <input
        id={`${todoEdit.id}-${keyDisplay}`}
        className="px-5 rounded-4"
        type="text"
        value={todoEdit[keyDisplay]}
        data-cy="todo-field-title"
        placeholder="Title"
        maxLength={100}
        onChange={(e) => {
          setTodoEdit((d) => ({ ...d, [keyDisplay]: e.target.value }));
        }}
      />
    );
  }

  if (keyDisplay === "description") {
    return !isUpdate ? (
      <p data-cy="todo-description" className={`body`}>
        {todoEdit[keyDisplay]}
      </p>
    ) : (
      <input
        id={`${todoEdit.id}-${keyDisplay}`}
        className="px-5 rounded-4"
        type="text"
        value={todoEdit[keyDisplay]}
        data-cy="todo-field-description"
        placeholder="Description"
        onChange={(e) => {
          setTodoEdit((d) => ({ ...d, [keyDisplay]: e.target.value }));
        }}
      />
    );
  }

  if (["dueto", "createAt"].includes(keyDisplay)) {
    const dateObj = new Date(todoEdit[keyDisplay]);
    const date = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    if (keyDisplay === "dueto") {
      return !isUpdate ? (
        <p data-cy="todo-dueto" className={`body`}>
          Due to: {`${date}-${month}-${year} ${hour}:${minute}`}
        </p>
      ) : (
        <input
          id={`${todoEdit.id}-${keyDisplay}`}
          type="datetime-local"
          value={todoEdit[keyDisplay].slice(0, -8)}
          data-cy="todo-field-dueto"
          onChange={(e) => {
            setTodoEdit((d) => ({
              ...d,
              [keyDisplay]: new Date(e.target.value).toISOString(),
            }));
          }}
        />
      );
    } else if (keyDisplay === "createAt") {
      return (
        <p data-cy="todo-createat" className={`body`}>
          Create at: {`${date}-${month}-${year} ${hour}:${minute}`}
        </p>
      );
    }
  }

  if (keyDisplay === "image") {
    return !isUpdate ? (
      <>
        {todoEdit.image && (
          <img
            data-cy="todo-image"
            className="h-100"
            src={todoEdit.image}
            alt="Uploaded"
          />
        )}
      </>
    ) : (
      <ImageUploader
        name={todoEdit.id}
        state={todoEdit.image}
        setState={(image) => setTodoEdit((d) => ({ ...d, image: image }))}
      />
    );
  }

  return null;
};
