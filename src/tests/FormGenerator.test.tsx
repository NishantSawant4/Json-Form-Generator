import { render, screen, fireEvent } from "@testing-library/react";
import DynamicForm from "../components/DynamicForm";

test("renders JSON editor and form preview", () => {
  render(<DynamicForm />);
  expect(screen.getByText(/JSON Editor/i)).toBeInTheDocument();
  expect(screen.getByText(/Submit/i)).toBeInTheDocument();
});
