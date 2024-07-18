import { Stack, BaseButton, ITextFieldStyles } from "@fluentui/react";
import { TableRowId } from "@fluentui/react-table";
import IdTagNr from "Interfaces/IdTagNr";
import { RELOAD } from "Types/Reload";
import colorScheme from "Ux/ColorScheme";
import * as React from "react";
// Define the styles for the TextField component using the colorScheme
const textFieldStyles: Partial<ITextFieldStyles> = {
  root: {
    backgroundColor: colorScheme.almondCream,
    border: `1px solid ${colorScheme.desertTan}`,
    height: `35px`,
    padding: `3px`,
    gap: `7px`,
  },
  fieldGroup: {
    borderColor: colorScheme.walnutBrown,
  },
  field: {
    color: colorScheme.walnutBrown,
  },
  errorMessage: {
    color: colorScheme.coralOrange,
  },
};

// Use the TextField component with the defined styles

interface IPropControlPanel {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  isAdding: boolean;
  setStatusMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  statusMessage: string | undefined;
  selectedRows: Set<TableRowId>;
  ValidTagNrs: Array<IdTagNr> | undefined;
  setEditItemId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ControlPanel: React.FC<IPropControlPanel> = ({
  setIsAdding,
  isAdding,
  statusMessage,
  setStatusMessage,
  selectedRows,
  ValidTagNrs,
  setEditItemId,
}) => {
  return (
    <Stack horizontal styles={textFieldStyles}>
      {selectedRows.size == 0 && (
        <>
          <BaseButton
            hidden={isAdding}
            type="button"
            onClick={() => {
              setIsAdding(!isAdding);
            }}
          >
            Add
          </BaseButton>
          <BaseButton hidden={!isAdding} type="submit">
            Save
          </BaseButton>
          <BaseButton hidden={!isAdding} onClick={() => setIsAdding(false)}>
            Cancel
          </BaseButton>
        </>
      )}
      {selectedRows.size == 1 && (
        <BaseButton
          onClick={() => {
            if (ValidTagNrs) {
              const updateIds = new Array<string>();
              selectedRows.forEach((tagNr) => {
                const SelRef = ValidTagNrs.find((h) => h?.TagNr === tagNr);

                if (SelRef) {
                  updateIds.push(SelRef.ItemId.toString());
                } else {
                  window.eapi.localLogging(
                    "Error",
                    "Bad Integrity",
                    `Couldn't resolve TagNr:[${tagNr}] to ItemId.`
                  );
                }
              });

              setEditItemId(updateIds[0]);
              console.log(`Update item: ${updateIds[0]}`);

              // window.eapi.cloudUpdateItem(
              //   "base",
              //   parseInt(updateIds[0], 10),
              //   {}
              // );
            }
          }}
        >
          Edit
        </BaseButton>
      )}
      {selectedRows.size >= 1 && (
        <BaseButton
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
