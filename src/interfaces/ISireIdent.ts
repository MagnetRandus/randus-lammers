import IBBIdent from "./IBBIdent";

interface ISireIdent {
  ItemId: string; //This itemId is the ItemId of the item in Sires NOT
  bb: IBBIdent;
  sire: IBBIdent;
}

export default ISireIdent;
