import { TodoPage } from "./TodoPage";
import "../../styles/styles.css";
import { LOCAL_STORAGE } from "@data/Todo/DataSource/OnMemoryDataSourceImpl";

describe("Search", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE,
      `[{"id":"efedd83c-b2b6-454e-9813-4928622530fe","title":"todo-1","description":"todo-description-1","status":"IN_PROGRESS","image":"","dueto":"2024-02-22T06:27:30.403Z","createAt":"2024-02-22T06:27:30.403Z"},{"id":"1925408a-d778-4cf1-bf94-43072b75ee4d","title":"todo-2","description":"todo-description-2","status":"IN_PROGRESS","image":"","dueto":"2024-02-22T06:27:33.079Z","createAt":"2024-02-22T06:27:33.079Z"},{"id":"f0140c44-44d4-4d33-981b-b7d8872298fe","title":"todo-3","description":"todo-description-3","status":"IN_PROGRESS","image":"","dueto":"2024-02-22T06:27:35.233Z","createAt":"2024-02-22T06:27:35.233Z"}]`
    );
    cy.mount(<TodoPage />);
  });

  describe("Search by text", () => {
    it(`Search "todo"`, () => {
      cy.get("[data-cy=search-field]").type("todo");
      cy.get("[data-cy=todo-detail]").should("have.length", 3);
    });

    it(`Search "todo-1"`, () => {
      cy.get("[data-cy=search-field]").type("todo-1");
      cy.get("[data-cy=todo-detail]").should("have.length", 1);
    });
  });

  describe("Search by description", () => {
    beforeEach(() => {
      const selection = cy.get(`#searchby-selection`);
      selection.click();
      selection.get(`li#description`).click();
    });

    it(`search string "description"`, () => {
      cy.get("[data-cy=search-field]").type("description");
      cy.get("[data-cy=todo-detail]").should("have.length", 3);
    });

    it(`search string "description-1"`, () => {
      cy.get("[data-cy=search-field]").type("description-1");
      cy.get("[data-cy=todo-detail]").should("have.length", 1);
    });
  });
});

describe("Sort", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      LOCAL_STORAGE,
      `[{"id":"efedd83c-b2b6-454e-9813-4928622530fe","title":"todo-1","description":"todo-description-1","status":"COMPLETED","image":"","dueto":"2024-02-22T06:27:30.403Z","createAt":"2024-02-22T06:27:30.403Z"},{"id":"1925408a-d778-4cf1-bf94-43072b75ee4d","title":"todo-2","description":"todo-description-2","status":"IN_PROGRESS","image":"","dueto":"2024-02-22T06:27:33.079Z","createAt":"2024-02-22T06:27:33.079Z"},{"id":"f0140c44-44d4-4d33-981b-b7d8872298fe","title":"todo-3","description":"todo-description-3","status":"IN_PROGRESS","image":"","dueto":"2024-02-21T06:27:35.233Z","createAt":"2024-02-22T06:27:35.233Z"}]`
    );
    cy.mount(<TodoPage />);
  });

  it(`sort by title`, () => {
    const target = `[data-cy=todo-detail]:nth-child(1)`;
    cy.get(target).get(`[data-cy=todo-title]`).contains("todo-1");
  });

  it(`sort by status`, () => {
    const selection = cy.get(`#sortby-selection`);
    selection.click();
    selection.get(`li#status`).click();

    const target = `[data-cy=todo-detail]:nth-child(1)`;
    cy.get(target).get(`[data-cy=todo-title]`).contains("todo-2");
  });

  it(`sort by date`, () => {
    const selection = cy.get(`#sortby-selection`);
    selection.click();
    selection.get(`li#date`).click();

    const target = `[data-cy=todo-detail]:nth-child(1)`;
    cy.get(target).get(`[data-cy=todo-title]`).contains("todo-3");
  });
});
