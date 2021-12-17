import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Store from "./store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Store>
			<App />
		</Store>
	</BrowserRouter>,
	document.getElementById("root")
);
