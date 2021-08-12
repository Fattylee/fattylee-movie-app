import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Header } from "./components/Header/Header";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { App, ButtonFat } from "./App";
import expect from "expect";

Enzyme.configure({ adapter: new Adapter() });

afterEach(cleanup);
describe("App", () => {
  const wrapper = shallow(<Header />);
  const text = wrapper.find(".nav a");

  // console.dir(wrapper.find(Header), "==================");
  it("Should render Logo with the text 'Mreact'", () => {
    expect(wrapper.text()).toBeTruthy();
  });
  it("should render App corrently", async () => {
    const { getByText, debug } = render(<App />);
    // await
    // debug();

    // expect(getByText("Mreact")).toBe("mreact");
    // expect(8).
  });
  test("should render ButtonFat", () => {
    const { getByText } = render(<ButtonFat />);
    // getByText("Some funky paragraph");
    getByText("Some funky paragraph");
    getByText("Click here");
    // expect(getByText("lick here").textContent).toEqual("Click here");
  });
});
