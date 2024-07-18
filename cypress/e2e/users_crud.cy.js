/// <reference types="cypress" />

describe("Users CRUD", () => {
  beforeEach(() => {
    cy.task("db:erase");
    cy.visit("http://localhost:5173");
  });

  it("Deve exibir botão de criação quando listagem for vazia", () => {
    cy.contains("No User yet.");
  });

  it("Deve listar todos os usuários", () => {
    cy.task("db:create", {
      name: "Raul Garcia",
      email: "raulgarcia@teste.com",
      password: "1234",
    });
    cy.get("table.RaDatagrid-table tbody tr:first td.column-name").contains(
      "Raul Garcia"
    );
  });

  it("Deve criar um novo usuário", () => {
    cy.get(".RaCreateButton-root").click();
    cy.get("#\\:r7\\:").type("Raul Felipe Garcia");
    cy.get("#\\:rb\\:").type("raulgarcia@teste.com");
    cy.get("#\\:rf\\:").type("123456");
    cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();
    cy.contains("Element created");
  });

  it("Deve editar um usuário", () => {
    cy.task("db:create", {
      name: "Raul Garcia",
      email: "raulgarcia@teste.com",
      password: "1234",
    });
    cy.get("table.RaDatagrid-table tbody tr:first td.column-name")
      .contains("Raul Garcia")
      .click();
    cy.get("#\\:rl\\:").type(" Novo");
    cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();
    cy.contains("Element updated");
  });

  it("Deve validar a criação de um novo usuário no banco de dados preenchendo o formulário de cadastro e depois apertar Enter", () => {
    cy.get(".RaCreateButton-root").click();
    cy.get("#\\:r7\\:").type("Maria Silva");
    cy.get("#\\:rb\\:").type("mariasilva@teste.com");
    cy.get("#\\:rf\\:").type("password123").type("{enter}");
    cy.contains("Element created");

    cy.task("db:find", { email: "mariasilva@teste.com" }).then((user) => {
      expect(user).to.exist;
      expect(user.name).to.equal("Maria Silva");
      expect(user.email).to.equal("mariasilva@teste.com");
    });
  });

  it("Deve remover um evento", () => {
    cy.task("db:create", {
      name: "Raul Garcia",
      email: "raulgarcia@teste.com",
      password: "1234",
    });
    cy.get("table.RaDatagrid-table tbody tr:first").click();
    cy.get(".RaToolbar-defaultToolbar > .MuiButton-text").click();
    cy.contains("Element deleted");
  });
});
