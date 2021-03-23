import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
    it("Snapshot renders correctly", () => {
        const wrapper = toJson(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
