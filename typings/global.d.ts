import Apis from "../dist";

declare global {
  interface Window {
    SDK: any;
    apis: Apis
  }
}
