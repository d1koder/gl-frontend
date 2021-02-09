describe("sign_up form test", () => {
    it("should render username, email, password and passwords inputs", () => {
      cy.visit("/sign_up")
      cy.url().should("include", "/sign_up")
      cy.get("form");
    })

    it("should allow users to fill the form", () => {
        cy.get('input[name="username"]')
        .type("test03")
        .should("have.value", "test03")

        cy.get('input[name="email"]')
        .type("test03@@test.com")
        .should("have.value", "test03@@test.com")
  
        cy.get('input[name="password"]')
        .type("@password")
        .should("have.value", "@password")
         
        cy.get('input[name="password_confirmation"]')
        .type("@password")
        .should("have.value", "@password")
    }) 
    
    it("should render a button and allow users to sign_up, and then be directed to root path", () => {
        cy.get("button")
        cy.findByTestId("signUpForm").submit();  
        cy.url().should("include", "/")
    })
})