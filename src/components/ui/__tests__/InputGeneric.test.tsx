import React from "react";
import { InputGeneric } from "../InputGeneric";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/src/utils";
import { render, screen, userEvent } from "@/src/test";
import { FormProvider, useForm } from "react-hook-form";

const errorMessage = "This field is required";

let mockInputValue = "New Value";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: jest.fn(),
    formState: {
      errors: {},
    },
  })),
  Controller: ({
    control,
    name,
    render,
  }: {
    control: any;
    name: string;
    render: any;
  }) => {
    return render({
      field: {
        onChange: (value: string) => {
          mockInputValue = value;
        },
        value: mockInputValue,
      },
      formState: {
        errors: {
          defaultValue: {
            message: errorMessage,
          },
        },
      },
    });
  },
}));

describe("Testing InputGeneric component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const WrapperInput = () => {
    const methods = useForm<{ defaultValue: "string" }>();

    return (
      <FormProvider {...methods}>
        <InputGeneric
          control={methods.control}
          name="defaultValue"
          placeholder="Testing Default Value"
          firstIcon={
            <Feather name="search" size={25} color={Colors.gray["500"]} />
          }
          lastIcon={
            <Feather name="arrow-left" size={27} color={Colors.gray["300"]} />
          }
          inputStyle={{ width: "73%" }}
          keyboardType="default"
          placeholderTextColor={Colors.gray["700"]}
          inputColor={Colors.black}
          autoCorrect={false}
        />
      </FormProvider>
    );
  };

  test("should render InputGeneric with default values", () => {
    render(<WrapperInput />);

    const input = screen.getByPlaceholderText("Testing Default Value");
    const view = screen.getByTestId("view-component");

    expect(input).toBeTruthy();

    //expect all props styles
    expect(view.props.style).toEqual({
      alignItems: "center",
      borderColor: "transparent",
      borderRadius: 10,
      borderWidth: 1,
      display: "flex",
      flexDirection: "row",
      height: "auto",
      justifyContent: "center",
      paddingHorizontal: 10,
      paddingVertical: 6,
      width: "73%",
    });

    expect(screen.findByText("search")).toBeTruthy();
    expect(screen.findByText("arrow-left")).toBeTruthy();

    //expect the color of the input
    expect(input.props.placeholderTextColor).toBe(Colors.gray["700"]);
    expect(input.props.style.color).toBe(Colors.black);

    expect(input.props.autoCorrect).toBeFalsy();

    expect(input.props.keyboardType).toBe("default");

    expect(input.props.multiline).toBe(false);

    expect(input.props.value).toBe(mockInputValue);
  });

  test("should render InputGeneric with error", () => {
    render(<WrapperInput />);
    const errorText = screen.getByTestId("error-msm");

    expect(errorText).toBeTruthy();
    expect(errorText.props.style.color).toBe(Colors.danger.default);
  });
});
