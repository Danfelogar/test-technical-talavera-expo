import { ReactNode } from "react";
import { KeyboardTypeOptions, StyleProp } from "react-native";

//Input
export interface CustomInputGeneric {
  borderColor?: string;
  inputStyle?: StyleProp<any>;
  keyboardType?: KeyboardTypeOptions;
  firstIcon?: ReactNode;
  placeholder: string;
  placeholderTextColor: string;
  autoCorrect: boolean;
  isSecretText?: boolean;
  inputColor: string;
  lastIcon?: ReactNode;
  multiline?: boolean;
  multilineStyle?: StyleProp<any>;
  heightMultiline?: number;
  //control
  name: string;
  control: any;
}
