import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import App from "./App"
import { ENV } from "@/utils"

test("loading page", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  )

  await waitFor(() => screen.getByTestId("loading"))

  expect(screen.getByTestId("loading")).not.toBeNull()
})

test("index page", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  )

  await waitFor(() => screen.getByTestId("loading"))
  await waitFor(() => screen.getAllByText(ENV.SITE_NAME))

  // screen.debug(screen.getAllByText(ENV.SITE_NAME))

  expect(screen.getAllByText(ENV.SITE_NAME)).not.toBeNull()
})
