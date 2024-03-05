import { TodoPage } from "./TodoPage";
import "../../styles/styles.css";

describe("<TodoPage />", () => {
  const todoTitle1 = "todo-1";

  beforeEach(() => {
    cy.mount(<TodoPage />);
  });

  describe("Update new task", () => {
    const target = `[data-cy=todo-detail]:nth-child(1)`;
    beforeEach(() => {
      cy.get("[data-cy=todo-create-input]").type(todoTitle1);
      cy.get("[data-cy=todo-create-input]").type("{enter}");
    });

    it("Can check", () => {
      cy.get(target)
        .get(`.checkbox-container [type=checkbox]`)
        .check({ force: true })
        .should("be.checked");
    });

    describe("Fields", () => {
      const onSave = () =>
        cy.get(target).get(`[data-cy=todo-save-change]`).click();
      beforeEach(() => {
        cy.get(target).get(`.dropdown`).click();
        cy.get('[data-cy="dropdown-item-Edit"]').click();
      });

      it("Can update title", () => {
        const newTitle = "todo-1 rename";
        cy.get(target).get(`[data-cy=todo-field-title]`).clear().type(newTitle);
        onSave();
        cy.get(target).get(`[data-cy=todo-title]`).contains(newTitle);
      });

      it("Title field limit 100 character", () => {
        const newTitle =
          "X1iAakQI4GfG8E32128tNBqcUxbK3w54ASfsdmpQzbGwcIesybh9hDaVNOXTe2sSNDvMSarb11OkXNex74yGQ4COjCagcZhh3mrP_X1iAakQI4GfG8E32128tNB";
        cy.get(target).get(`[data-cy=todo-field-title]`).clear().type(newTitle);
        onSave();
        cy.get(target)
          .get(`[data-cy=todo-title]`)
          .should("not.have.length", 100);
      });

      it("Can update description", () => {
        const description = "description";
        cy.get(target)
          .get(`[data-cy=todo-field-description]`)
          .clear()
          .type(description);
        onSave();
        cy.get(target).get(`[data-cy=todo-description]`).contains(description);
      });

      it("Can update dueto", () => {
        const dateObj = new Date();
        const date = dateObj.getDate().toString();
        const month = (dateObj.getMonth() + 1).toString();
        const year = dateObj.getFullYear() + 1;
        const value = `${year}-${month.length > 1 ? month : `0${month}`}-${
          date.length > 1 ? date : `0${date}`
        }T00:00:00`;
        cy.get(target).get(`[data-cy=todo-field-dueto]`).type(value);
        onSave();
        const displayValue = `Due to: ${date}-${month}-${year} 0:0`;
        cy.get(target).get(`[data-cy=todo-dueto]`).contains(displayValue);
      });

      it("Can upload image", () => {
        cy.get(target).get(`[data-cy=field-image]`).selectFile({
          fileName: "test",
          contents: "test.png",
        });
        onSave();
      });
    });
  });
});
