import { FC, ReactElement, ReactNode, Fragment } from "react";

import { render } from "@testing-library/react-native";

type Options = Parameters<typeof render>[1];

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => (
  //here you can add your providers
  <Fragment>{children}</Fragment>
);

const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

//export all the things from testing-library when use customRender
export * from "@testing-library/react-native";

export { customRender as render };
