// @ts-check
/// <reference types="@prettier/plugin-pug" />

/**
 * @type {import('prettier').Options}
 */
export default {
	plugins: ["@prettier/plugin-pug"],
	semi: false,
	useTabs: true,
	printWidth: 120,
	pugAttributeSeparator: "none",
	pugClassNotation: "as-is",
	pugFramework: "vue",
}
