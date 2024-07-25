// import {
//   Stack,
//   BaseButton,
//   IIconProps,
//   IStackStyles,
//   IButtonStyles,
// } from "@fluentui/react";
// import { TableRowId } from "@fluentui/react-table";
// import IBBIdent from "Interfaces/IdTagNr";
// import { BBIdentToItemId } from "Tools/BBIdent";
// import { rowDefaultSelection } from "Types/const";
// import ThemeColor from "Ux/ColorScheme";
// import * as React from "react";

// const stackStyle: Partial<IStackStyles> = {
//   root: {
//     backgroundColor: ThemeColor.almondCream,
//     border: `1px solid ${ThemeColor.desertTan}`,
//     gap: 7,
//     padding: 4,
//     marginTop: 7,
//     paddingLeft: 12,
//   },
//   inner: {
//     // border: `1px solid green`,
//   },
// };
// const baseButtonStyles: IButtonStyles = {
//   root: {
//     width: 75,
//     height: 35,
//     borderRadius: 7,
//     borderWidth: 1,
//     borderColor: ThemeColor.coralOrange,
//     padding: 3,
//   },
// };
// const saveIcon: IIconProps = {
//   iconName: "iconSave",
//   styles: {
//     root: { marginTop: -3, color: ThemeColor.coralOrange, fontSize: 20 },
//   }, // Custom styles for the icon
// };
// const cancelIcon: IIconProps = {
//   iconName: "iconCancel",
//   styles: {
//     root: { marginTop: -3, color: ThemeColor.coralOrange, fontSize: 20 },
//   }, // Custom styles for the icon
// };
// const deletelIcon: IIconProps = {
//   iconName: "icondelete",
//   styles: {
//     root: { marginTop: -3, color: ThemeColor.coralOrange, fontSize: 20 },
//   }, // Custom styles for the icon
// };
// const updateIcon: IIconProps = {
//   iconName: "iconUpdate",
//   styles: {
//     root: { marginTop: -3, color: ThemeColor.coralOrange, fontSize: 20 },
//   }, // Custom styles for the icon
// };
// const clearFilterIcon: IIconProps = {
//   iconName: "iconclear",
//   styles: {
//     root: { marginTop: -3, color: ThemeColor.coralOrange, fontSize: 20 },
//   }, // Custom styles for the icon
// };
// const addIcon: IIconProps = {
//   iconName: "iconAdd",
//   styles: {
//     root: {
//       marginTop: -3,
//       color: ThemeColor.coralOrange,
//       fontSize: 20,
//     },
//   }, // Custom styles for the icon
// };

// interface IPropControlPanel {
//   statusMessage: string | undefined;
//   setStatusMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
//   selectedRows: Set<TableRowId>;
//   setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
//   ValidTagNrs: Array<IBBIdent> | undefined;
//   setEditItemId: React.Dispatch<React.SetStateAction<string | undefined>>;
// }

// const ControlPanel: React.FC<IPropControlPanel> = ({
//   statusMessage,
//   setStatusMessage,
//   selectedRows,
//   setSelectedRows,
//   ValidTagNrs,
//   setEditItemId,
// }) => {
//   const [statusMsgTitle, SetStatusMsgTitle] = React.useState<string>(
//     "Status Message Information"
//   );

//   return (
//     <Stack horizontal styles={stackStyle}>
//       {selectedRows.size !== 0 && (
//         <BaseButton
//           title="Clear Selection"
//           styles={baseButtonStyles}
//           iconProps={clearFilterIcon}
//           onClick={() => {
//             setSelectedRows(rowDefaultSelection);
//           }}
//         >
//           Clear
//         </BaseButton>
//       )}
//       <BaseButton
//         title="Add"
//         type="button"
//         onClick={() => {
//           // SetAddActive(true);
//         }}
//         iconProps={addIcon}
//         styles={baseButtonStyles}
//       >
//         Add
//       </BaseButton>

//       <BaseButton
//         title="Save"
//         iconProps={saveIcon}
//         type="submit"
//         styles={baseButtonStyles}
//         onClick={() => {
//           //Save clicked
//         }}
//       >
//         Save
//       </BaseButton>

//       <BaseButton
//         iconProps={cancelIcon}
//         title="Cancel"
//         styles={baseButtonStyles}
//         onClick={() => {
//           console.log("Cancel Clicked");
//         }}
//       >
//         Cancel
//       </BaseButton>
//       <BaseButton
//         // hidden={DisableEditButton}
//         title="Edit"
//         iconProps={updateIcon}
//         styles={baseButtonStyles}
//         onClick={() => {
//           if (ValidTagNrs) {
//             setEditItemId(
//               BBIdentToItemId(selectedRows, ValidTagNrs)
//             );
//           }
//         }}
//       >
//         Edit
//       </BaseButton>
//       <BaseButton
//         styles={baseButtonStyles}
//         title="Weight"
//         onClick={() => {
//           // SetTraceWeightActive(true);
//           // SetEditActive(false);
//         }}
//       >
//         Weight
//       </BaseButton>
//       <BaseButton
//         styles={baseButtonStyles}
//         onClick={() => {
//           console.log("do Medicine stuff");
//         }}
//       >
//         Medicine
//       </BaseButton>
//       <BaseButton
//         title="Delete"
//         iconProps={deletelIcon}
//         styles={baseButtonStyles}
//         onClick={() => {
//           if (ValidTagNrs) {
//             for (const tagNrSelected of selectedRows) {
//               ValidTagNrs.map(async (j) => {
//                 if (j.TagNr === tagNrSelected) {
//                   try {
//                     await window.eapi.cloudDeleteItems<Array<string>>("base", [
//                       j.ItemId.toString(),
//                     ]);
//                   } catch (error) {
//                     setStatusMessage(`Could not delete ${j.Sks}-${j.TagNr}`);
//                     SetStatusMsgTitle(error.message);
//                     window.eapi.localLogging(
//                       "Error",
//                       `Couldn't delete ${j.Sks}-${j.TagNr}`,
//                       `---${error.message}`
//                     );
//                   }
//                 }
//               });
//             }
//           } else {
//             window.eapi.localLogging(
//               "Error",
//               "Bad Integrity",
//               `ValidTagNrs is undefined`
//             );
//           }
//         }}
//       >
//         Delete
//       </BaseButton>

//       <Stack grow />
//       {statusMessage && (
//         <div title={statusMsgTitle} style={{ maxWidth: 500 }}>
//           {statusMessage}
//         </div>
//       )}
//     </Stack>
//   );
// };

// export default ControlPanel;
