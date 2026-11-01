import { StrictMode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { vi, it, expect } from "vitest";
import { CartProvider, useCart } from "../context/CartContext.jsx";
import { api } from "../api.js";

vi.mock("../api.js", () => ({ api: vi.fn() }));
vi.mock("../context/UserContext.jsx", () => ({
  useUser: () => ({ user: { id: 123 }, authSource: "restored" }),
}));

function CartState() {
  const { count, syncing } = useCart();
  return <div data-testid="sync-state">{syncing ? "syncing" : `ready:${count}`}</div>;
}

it("restores the server cart without overwriting it with the local cart, including StrictMode remounts", async () => {
  window.localStorage.setItem("nimbusmart:cart", JSON.stringify([{ id: 1, qty: 1 }]));
  const reads = [];
  api.mockImplementation((path) => {
    if (path === "/cart") return new Promise((resolve) => reads.push(resolve));
    return Promise.resolve({ id: 1, price: 10, stock: 10 });
  });
  render(<StrictMode><CartProvider><CartState /></CartProvider></StrictMode>);
  expect(api.mock.calls.some(([, options]) => options?.method === "PUT")).toBe(false);
  reads.forEach((resolve) => resolve([{ id: 1, qty: 3 }]));
  await waitFor(() => expect(screen.getByTestId("sync-state")).toHaveTextContent("ready:3"));
  expect(api.mock.calls.some(([, options]) => options?.method === "PUT")).toBe(false);
});
