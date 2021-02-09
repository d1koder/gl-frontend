describe("test HomeScreen", () => {
   it("should include a nav bar and buttons", () => {
    cy.visit("/login")
    cy.findByTestId("loginForm").submit(); 
    cy.url().should("include", "/")
   })
})