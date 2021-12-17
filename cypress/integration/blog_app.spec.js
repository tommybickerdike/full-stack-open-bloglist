describe("Blog app", function () {
	beforeEach(function () {
		//Create user before all tests
		cy.request("POST", "http://localhost:3003/api/testing/reset");
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};
		cy.request("POST", "http://localhost:3003/api/users/", user);
		cy.visit("http://localhost:3003");
	});

	it("Login form is shown", function () {
		cy.get("html").should("contain", "Login").and("not.contain", "Logged in");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.contains("Login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.get("#login-button").click();

			cy.get("html")
				.should("contain", "Matti Luukkainen logged in")
				.and("not.contain", "wrong username or password");
		});

		it("fails with wrong credentials", function () {
			cy.contains("Login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("badpass");
			cy.get("#login-button").click();

			cy.get("#notification")
				.should("contain", "wrong username or password")
				.and("have.css", "background-color", "rgb(255, 0, 0)")
				.and("not.contain", "logged in");
		});
	});

	describe("When logged in", function () {
		// login before
		beforeEach(function () {
			cy.request("POST", "http://localhost:3003/api/login", {
				username: "mluukkai",
				password: "salainen"
			}).then((response) => {
				localStorage.setItem("user", JSON.stringify(response.body));
				cy.visit("http://localhost:3003");
			});
		});

		describe("and own blog exists", function () {
			beforeEach(function () {
				cy.contains("Create new blog").click();
				cy.get("#title").type("Title of blog");
				cy.get("#author").type("Joe Bloggs");
				cy.get("#url").type("https//www.example.com");
				cy.contains("create").click();
			});

			it("blog is created", function () {
				cy.get("#blogs").should("contain", "Title of blog");
				cy.get("#notification").should("contain", "added");
			});

			it("blog can be deleted", function () {
				cy.visit("http://localhost:3003");
				cy.contains("View").click();
				cy.contains("remove").click();
			});
		});

		describe("and someone elses blog exists", function () {
			beforeEach(function () {
				cy.contains("Create new blog").click();
				cy.get("#title").type("Title of blog");
				cy.get("#author").type("Joe Bloggs");
				cy.get("#url").type("https//www.example.com");
				cy.contains("create").click();
				cy.get("[title='Logout']").click();
				const user = {
					name: "Someone Else",
					username: "someone",
					password: "else",
				};
				cy.request("POST", "http://localhost:3003/api/users/", user);
				cy.visit("http://localhost:3003");
				cy.request("POST", "http://localhost:3003/api/login", {
					username: "someone",
					password: "else",
				}).then((response) => {
					window.localStorage.setItem("user", JSON.stringify(response.body));
					cy.visit("http://localhost:3003");
				});
			});

			it("blog cannot be deleted", function () {
				cy.contains("View").click();
				cy.get(".blog__toggle-content").should("not.contain", "Delete");
			});
		});
	});

});
