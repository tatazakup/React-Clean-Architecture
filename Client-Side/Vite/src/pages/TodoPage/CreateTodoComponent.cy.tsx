import { TodoPage } from "./TodoPage";
import "../../styles/styles.css";

describe("<TodoPage />", () => {
  const todoTitle1 = "todo-1";

  beforeEach(() => {
    cy.mount(<TodoPage />);
    cy.get("[data-cy=todo-empty-text]").contains("No Todo List");
  });

  describe("Create new task", () => {
    beforeEach(() => {
      cy.get("[data-cy=todo-create-input]").type(todoTitle1);
      cy.get("[data-cy=todo-create-input]").type("{enter}");
    });
    it("Can create new task", () => {
      cy.get("[data-cy=todo-detail]", {
        timeout: 1000,
      }).should("have.length", 1);
    });

    it("After create new task then input will clear itself", () => {
      cy.get("[data-cy=todo-create-input]").should("be.empty");
    });
  });
});
