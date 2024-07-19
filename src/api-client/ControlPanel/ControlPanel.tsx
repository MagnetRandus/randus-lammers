import {
  Stack,
  BaseButton,
  registerIcons,
  IIconProps,
  IStackStyles,
  IButtonStyles,
} from "@fluentui/react";
import { TableRowId } from "@fluentui/react-table";
import IdTagNr from "Interfaces/IdTagNr";
import { defaultSelection, RELOAD } from "Types/const";
import colorScheme from "Ux/ColorScheme";
import * as React from "react";

registerIcons({
  icons: {},
});

const stackStyle: Partial<IStackStyles> = {
  root: {
    backgroundColor: colorScheme.almondCream,
    border: `1px solid ${colorScheme.desertTan}`,
    gap: 7,
    padding: 4,
    marginTop: 7,
    paddingLeft: 12,
  },
  inner: {
    // border: `1px solid green`,
  },
};

const baseButtonStyles: IButtonStyles = {
  root: {
    width: 75,
    height: 35,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colorScheme.coralOrange,
    padding: 3,
  },
};

const saveIcon: IIconProps = {
  iconName: "iconSave",
  styles: {
    root: { marginTop: -3, color: colorScheme.coralOrange, fontSize: 20 },
  }, // Custom styles for the icon
};
const cancelIcon: IIconProps = {
  iconName: "iconCancel",
  styles: {
    root: { marginTop: -3, color: colorScheme.coralOrange, fontSize: 20 },
  }, // Custom styles for the icon
};
const deletelIcon: IIconProps = {
  iconName: "iconDelete",
  styles: {
    root: { marginTop: -3, color: colorScheme.coralOrange, fontSize: 20 },
  }, // Custom styles for the icon
};

const updateIcon: IIconProps = {
  iconName: "iconUpdate",
  styles: {
    root: { marginTop: -3, color: colorScheme.coralOrange, fontSize: 20 },
  }, // Custom styles for the icon
};

const clearFilterIcon: IIconProps = {
  iconName: "iconClear",
  styles: {
    root: { marginTop: -3, color: colorScheme.coralOrange, fontSize: 20 },
  }, // Custom styles for the icon
};

const addIcon: IIconProps = {
  iconName: "iconAdd",
  styles: {
    root: {
      marginTop: -3,
      color: colorScheme.coralOrange,
      fontSize: 20,
    },
  }, // Custom styles for the icon
};

interface IPropControlPanel {
  statusMessage: string | undefined;
  selectedRows: Set<TableRowId>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Set<TableRowId>>>;
  setStatusMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  ValidTagNrs: Array<IdTagNr> | undefined;
  editItemId: string;
  setEditItemId: React.Dispatch<React.SetStateAction<string | undefined>>;
  EditActive: boolean;
  SetEditActive: React.Dispatch<React.SetStateAction<boolean>>;
  AddActive: boolean;
  SetAddActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanel: React.FC<IPropControlPanel> = ({
  statusMessage,
  setStatusMessage,
  selectedRows,
  setSelectedRows,
  ValidTagNrs,
  editItemId,
  setEditItemId,
  EditActive,
  SetEditActive,
  AddActive,
  SetAddActive,
}) => {
  React.useEffect(() => {
    console.log(`Control Panel ItemId: ${editItemId}`);
  }, [editItemId]);

  const [disableEditBtn, SetDisableEditButton] = React.useState<boolean>(false);
  const [disableDelBtn, SetDisableDelButton] = React.useState<boolean>(false);

  return (
    <Stack horizontal styles={stackStyle}>
      <>
        {!AddActive && selectedRows.size == 0 && (
          <BaseButton
            type="button"
            onClick={() => {
              SetAddActive(true);
            }}
            iconProps={addIcon}
            title="Add"
            styles={baseButtonStyles}
          >
            Add
          </BaseButton>
        )}

        {(AddActive || editItemId !== "0") && (
          <>
            <BaseButton
              title="Save"
              iconProps={saveIcon}
              type="submit"
              styles={baseButtonStyles}
              onClick={() => {
                SetDisableEditButton(false);
                SetDisableDelButton(false);
              }}
            >
              Save
            </BaseButton>
            <BaseButton
              iconProps={cancelIcon}
              title="Cancel"
              styles={baseButtonStyles}
              onClick={() => {
                setEditItemId("0");
                SetAddActive(false);
                SetEditActive(false);
                SetDisableEditButton(false);
                SetDisableDelButton(false);
              }}
            >
              Cancel
            </BaseButton>
          </>
        )}
        {selectedRows.size !== 0 && (
          <BaseButton
            title="Clear Selection"
            styles={baseButtonStyles}
            iconProps={clearFilterIcon}
            onClick={() => {
              setSelectedRows(defaultSelection);
            }}
          >
            Clear
          </BaseButton>
        )}
      </>
      {EditActive && (
        <BaseButton
          hidden={disableEditBtn}
          title="Edit"
          iconProps={updateIcon}
          styles={baseButtonStyles}
          onClick={() => {
            if (ValidTagNrs) {
              const updateIds = new Array<string>();
              selectedRows.forEach((tagNr) => {
                const SelRef = ValidTagNrs.find((h) => h?.TagNr === tagNr);
                if (SelRef) updateIds.push(SelRef.ItemId.toString());
              });

              setEditItemId(updateIds[0]);
              SetDisableEditButton(true);
              SetDisableDelButton(true);
            }
          }}
        >
          Edit
        </BaseButton>
      )}
      {selectedRows.size >= 1 && (
        <BaseButton
          hidden={disableDelBtn}
          title="Delete"
          iconProps={deletelIcon}
          styles={baseButtonStyles}
          onClick={() => {
            if (ValidTagNrs) {
              const deleteIds = new Array<string>();
              selectedRows.forEach((tagNr) => {
                const SelRef = ValidTagNrs.find((h) => h?.TagNr === tagNr);
                if (SelRef) {
                  deleteIds.push(SelRef.ItemId.toString());
                } else {
                  window.eapi.localLogging(
                    "Error",
                    "Bad Integrity",
                    `Couldn't resolve TagNr:[${tagNr}] to ItemId.`
                  );
                }
              });
              window.eapi
                .cloudDeleteItems<Array<string>>("base", deleteIds)
                .then(() => {
                  setStatusMessage(`Deleted ${deleteIds.join(`,`)}`);
                  setTimeout(() => {
                    setStatusMessage(RELOAD);
                  }, 3000);
                })
                .catch((err) => {
                  if ("message" in err) {
                    setStatusMessage(`Error: ${err.message}`);
                  }
                  window.eapi.localLogging(
                    "Error",
                    "eapi.cloudDeleteItems",
                    err
                  );
                });
            } else {
              window.eapi.localLogging(
                "Error",
                "Bad Integrity",
                `ValidTagNrs is undefined`
              );
            }
          }}
        >
          Delete
        </BaseButton>
      )}

      <Stack grow />
      {statusMessage && <div>{statusMessage}</div>}
    </Stack>
  );
};

export default ControlPanel;
