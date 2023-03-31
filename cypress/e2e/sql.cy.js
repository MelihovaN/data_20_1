describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });
  it("Input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (1, "Natalia", "02-2022", "Barcelana"),
      (2, "Katerina", "03-2022", "Paris"),
      (3, "Anton", "02-2023", "London");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });

  it("select", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM Students WHERE City="Paris"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Katerina");
    });
  });

  it("add students", () => {
    cy.task(
      "queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup,City) VALUES
      (4, "Lyubov", "03-2022", "Milan"),
      (5, "Ivan", "03-2022", "Paris")`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(2);
    });
  });

  it("select all students", () => {
    cy.task("queryDb", `SELECT * FROM Students;`).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[2].City).to.equal("London");
    });
  });

  it("can delete the db", () => {
    cy.task("queryDb", "DROP TABLE Students");
  });
});
