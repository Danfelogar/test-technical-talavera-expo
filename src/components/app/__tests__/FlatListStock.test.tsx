import { render } from "@/src/test";
import { FlatListStock } from "../FlatListStock";

describe("FlatListStock Component", () => {
  it("should render the title correctly", () => {
    const { getByText } = render(<FlatListStock />);

    const title = getByText("Stocks");
    expect(title).toBeTruthy();
  });
  // it("should render the list of stocks correctly", () => {
  //   const { getByTestId } = render(<FlatListStock />);

  //   const stockList = getByTestId("stock-list");
  //   expect(stockList).toBeTruthy();
  // });
});
