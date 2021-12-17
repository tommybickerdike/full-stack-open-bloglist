module.exports = {
	settings: {
    react: {
      version: "detect",
    },
	},
	env: {
		browser: true,
		node: true,
		"jest": true,
		es2021: true,
		"cypress/globals": true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended","plugin:cypress/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["react", "cypress"],
	rules: {
		indent: ["error", "tab"], "linebreak-style": ["error", "unix"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
