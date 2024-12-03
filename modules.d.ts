//this line is help to expo understand the image type when we import it in this case like jpg
declare module "*.jpg" {
  const value: any;
  export default value;
}
//this line is help to expo understand the image type when we import it in this case svg
declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
