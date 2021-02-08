describe("login form test", () => {
    it("should render email and password inputs", () => {
      cy.visit("/login")
      cy.url().should("include", "/login")
      cy.get("form");
    })

    it("should allow users to fill the form", () => {
        cy.get('input[name="email"]')
        .type("admin@example.com")
        .should("have.value", "admin@example.com")
  
        cy.get('input[name="password"]')
        .type("password")
        .should("have.value", "password")
    }) 
    
    it("should render a button and allow users to login, and then be directed to root path", () => {
        cy.get("button")
        cy.findByTestId("loginForm").submit();  
        cy.url().should("include", "/")
    })

    it("should render a logout button and redirect users to login again",() => {
        cy.findByTestId("logout").click()
        cy.url().should("include", "/login")
    })

    it("should include a link which redirects users to sign up page", () => {
      cy.findByTestId("sign_up").click()
      cy.url().should("include", "/sign_up")
    })
})