import IBB from "./IBB";

interface RootObject {
  status: string;
  adb?: IBB[] | undefined;
}

export default RootObject;
