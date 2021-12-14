import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
	id: "6170132654f16c58bf54f3f4",
	title: "A blog title",
	author: "Joe Blogs",
	url: "http://www.test.com",
	user: "616ffe778bc6624f59de2099",
	likes: 2,
};

const user = {
	id: "616ffe778bc6624f59de2099",
	username: "testuser",
	name: "John Doe",
};

test("renders content", () => {
	const component = render(<Blog blog={blog} user={user} />);

	const toggleContent = component.container.querySelector(
		".blog__toggle-content"
	);

	// have title
	expect(component.container).toHaveTextContent("A blog title");

	// have author
	expect(component.container).toHaveTextContent("Joe Blogs");

	// toggle content hidden
	expect(toggleContent).toHaveStyle("display: none");
});

test("Show details works", () => {
	const component = render(<Blog blog={blog} user={user} />);

	const toggleContent = component.container.querySelector(
		".blog__toggle-content"
	);

	const toggleButton = component.getByTestId("blog__toggle-init");

	fireEvent.click(toggleButton);

	// toggle content visible
	expect(toggleContent).toHaveStyle("display: block");

	// has likes
	expect(toggleContent).toHaveTextContent("Likes 2");

	// has url
	expect(toggleContent).toHaveTextContent("http://www.test.com");
});
