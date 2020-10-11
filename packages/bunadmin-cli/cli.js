#!/usr/bin/env node
"use strict"
const React = require("react")
const importJsx = require("import-jsx")
const { render } = require("ink")
const meow = require("meow")

const ui = importJsx("./lib/ui")

const cli = meow(`
	Usage
	  Create a new project
	  $ bunadmin new {name}

	Options
		--plugin  with demo plugin
		--doc     with demo document

	Examples
	  $ bunadmin new my-dashboard
	  Your project "my-dashboard" has been created.
`)

render(
  React.createElement(ui, {
    inputs: cli.input,
    options: cli.flags
  })
)
