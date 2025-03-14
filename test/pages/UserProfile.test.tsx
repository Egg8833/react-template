import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "../../src/pages/UserProfile";
import { describe, it, expect, vi,beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";



describe("UserProfile", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  })

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('fetches and displays the user data', async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      json: async () => ({ name: "John Doe", email: "john@example.com" }),
    })

    render(<UserProfile userId={4} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /john doe/i })).toBeInTheDocument();

      expect(screen.getByText(/john@example\.com/i)).toBeInTheDocument();
    })
  })

});
