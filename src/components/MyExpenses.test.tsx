import { render, screen, waitFor } from "@testing-library/react";
import MyExpenses from "./MyExpenses";

const axios = require("axios");
jest.mock("axios");

axios.get.mockResolvedValue({
  data: [
    {
      id: "10e4c686-6d75-4c58-b5f5-56540b4dcbf8",
      name: "apple",
      amount: 3,
      category: "food",
    },
    {
      id: "f94f4a9f-f32a-49c4-9555-3dc8ae6578bc",
      name: "strawberries",
      amount: 15,
      category: "food",
    },
    {
      id: "61433451-8093-4c97-a993-f71c923e3e9d",
      name: "cat food",
      amount: 50,
      category: "animals",
    },
  ],
});

test("renders my expenses title", async () => {
  // arrange
  render(<MyExpenses />);
  // act
  // assert
  const linkElement = screen.getByText(/My Expenses/i);
  expect(linkElement).toBeInTheDocument();
});
