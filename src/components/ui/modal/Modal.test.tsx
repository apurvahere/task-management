import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  const onClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("does not render when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={onClose}>
        Content
      </Modal>,
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders modal when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>,
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  test("renders title when provided", () => {
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        Content
      </Modal>,
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("calls onClose when overlay is clicked", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>,
    );

    const overlay = document.querySelector(".bg-black\\/40");

    if (overlay) fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when escape key is pressed", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when cancel button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByText(/cancel/i));

    expect(onClose).toHaveBeenCalled();
  });

  test("hides cancel button when showCancel is false", () => {
    render(
      <Modal isOpen={true} onClose={onClose} showCancel={false}>
        Content
      </Modal>,
    );

    expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument();
  });

  test("renders footer content", () => {
    render(
      <Modal isOpen={true} onClose={onClose} footer={<button>Save</button>}>
        Content
      </Modal>,
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });
});
