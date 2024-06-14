interface RootObject {
  status: string;
  adb?: IBB[] | undefined;
}

interface IBB {
  id: number;
  dateOfBirth?: string;
  gender: "Buck" | "Doe";
  dam?: IBB;
  sire?: IBB;
}

export default RootObject;
