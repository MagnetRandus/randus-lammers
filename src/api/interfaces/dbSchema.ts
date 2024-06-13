interface RootObject {
  status: string;
  adb?: Adb[] | undefined;
}

interface Adb {
  id: number;
  dateOfBirth?: string;
  dam?: Dam;
  sire?: Dam;
}

interface Dam {
  id: number;
}

export default RootObject;
