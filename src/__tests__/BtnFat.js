import { cleanup, fireEvent, screen, render } from "@testing-library/react";
import expect from "expect";
import { HiddenMessage } from "../App";

afterEach(cleanup);
describe("HiddenMessage", () => {
  test("should toggle hidden message on click", async () => {
    render(<HiddenMessage>Secret msg</HiddenMessage>);

    const labelText = "Toggle Message";
    const res = screen.getByLabelText(labelText);
    // console.log({ res: res.innerText });
    fireEvent.click(res);
    screen.getByText("Secret msg");
    fireEvent.click(screen.getByTestId("hide-box"));
    expect(screen.queryByText("Secret msg")).toBeFalsy();
    fireEvent.click(res);
    expect(screen.getByText(/secret msg/i)).toBeTruthy();
  });
});
