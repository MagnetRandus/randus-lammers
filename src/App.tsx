/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  initializeIcons,
  registerIcons,
  Stack,
  ThemeProvider,
} from "@fluentui/react";
import styles from "./App.module.scss";
import BaseTheme from "Ux/BaseTheme";
import {
  TSPListBaseCreate,
  TSPListBaseRead,
} from "Interfaces/LISTS/base/IGraphListItemCustomField";
import Items from "Client/Items/Items";
import IBBIdent from "Interfaces/IdTagNr";
import ObjectMake from "Tools/ObjectMake";
import { TableRowId } from "@fluentui/react-table";
import {
  rowDefaultSelection,
  RELOAD,
  formDefaults,
  FormDefaultsWeightInit,
  TraceWeightContentTypeId,
} from "Types/const";
import {
  AddIcon,
  CalendarIcon,
  CancelIcon,
  ClearSelectionIcon,
  DeleteIcon,
  MedicalIcon,
  SaveAsIcon,
  SaveIcon,
  StepIcon,
} from "@fluentui/react-icons-mdl2";
import {
  TSPLBWeightCreate,
  TSPLBWeightRead,
} from "Interfaces/LISTS/trace/IGLICF-Weight";
import { EditingMode, SelectMode } from "Types/SelectMode";
import { Action } from "Client/Action/Actions";
import {
  addIcon,
  cancelIcon,
  clearFilterIcon,
  deletelIcon,
  medicalIcon,
  saveIcon,
  stepIcon,
  updateIcon,
} from "Ux/Icons";
import ItemForm from "Client/ItemForm/ItemForm";
import TraceWeight from "Client/Trace/Weight";
import { HorizStack } from "Ux/StackHorizontal";
import ThemeColor from "Ux/ColorScheme";
import { BBIdentToItemId } from "Tools/BBIdent";

initializeIcons();
registerIcons({
  icons: {
    calender: <CalendarIcon />,
    iconCancel: <CancelIcon />,
    iconSave: <SaveIcon />,
    iconUpdate: <SaveAsIcon />,
    iconAdd: <AddIcon />,
    icondelete: <DeleteIcon />,
    iconclear: <ClearSelectionIcon />,
    iconstep: <StepIcon />,
    iconmedical: <MedicalIcon />,
  },
});

interface IPropsBBok {
  BaseList: string;
  TraceList: string;
  AppName: string;
  ResetCount: number;
  SetResetCount: Dispatch<SetStateAction<number>>;
}

const BBok: React.FC<IPropsBBok> = ({
  ResetCount,
  SetResetCount,
  BaseList,
  TraceList,
  AppName,
}) => {
  const [Mode, SetMode] = useState<SelectMode>("None");
  const [ModeEditing, SetModeEditing] = useState<EditingMode>("None");

  const [statusMessage, setStatusMessage] = useState<string | undefined>(
    AppName
  );
  const [statusMessageTitle, setStatusMessageTitle] = useState<
    string | undefined
  >();
  const [SelectedRows, SetSelectedRows] =
    useState<Set<TableRowId>>(rowDefaultSelection);

  const [TagNr, SetTagNr] = useState<string>("0");
  const [BBIdents, SetBBIdents] = useState<Array<IBBIdent> | undefined>();
  const [ItemsData, setItemsData] = useState<
    Array<TSPListBaseRead> | undefined
  >();
  const [formData, setFormData] = useState<TSPListBaseCreate | undefined>();
  const [formWeightData, setFormWeightData] = useState<
    TSPLBWeightCreate | undefined
  >();

  const [PageIsValid, SetPageIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (ResetCount >= 1)
      window.eapi
        .cloudGetItems<TSPListBaseRead>(
          BaseList,
          `fields($select=id,tagnr,dateOfBirth,dam,sire,bbSks)`
        )
        .then((res) => {
          if (res) {
            setItemsData(res.value);
            SetBBIdents(
              res.value.map((j) => {
                return ObjectMake<IBBIdent>({
                  ItemId: parseInt(j.id, 10),
                  TagNr: j.fields.tagnr,
                  Sks: j.fields.bbSks,
                  Weight: j.fields.bbWeight,
                });
              })
            );
            setStatusMessageTitle(`Welcome to ${AppName}`);
          }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ResetCount]);
  useEffect(() => {
    switch (statusMessage) {
      case undefined:
        console.log("message cleared");
        break;
      case RELOAD:
        location.reload();
        break;
    }
  }, [statusMessage]);
  useEffect(() => {
    if (SelectedRows.has(0)) SelectedRows.delete(0);
    if (ItemsData) {
      if (SelectedRows.size === 1) {
        SetMode("Single");
      } else if (SelectedRows.size > 1) {
        SetMode("Multiple");
      } else {
        SetMode("None");
      }
    } else {
      SetMode("None");
    }
  }, [SelectedRows, ItemsData]);
  useEffect(() => {
    switch (Mode) {
      case "Single":
        SetModeEditing("None");
        if (BBIdents && BBIdents.length !== 0)
          setStatusMessage(
            `Selected: ${BBIdentToItemId(SelectedRows, BBIdents)}`
          );
        //Single means, an item is selected, but no action chosen; technically this will do nothing, but it is a separate state!
        break;
      case "Multiple":
        SetTagNr("0");
        break;
      case "Editing":
        if (ModeEditing === "ItemEdit") {
          SetTagNr(Array.from(SelectedRows.values())[0].toLocaleString());
        }
        if (ModeEditing === "ItemAdd") {
          setFormData(formDefaults);
        }
        if (ModeEditing === "WeightAdd" && BBIdents) {
          setFormWeightData(
            FormDefaultsWeightInit(BBIdentToItemId(SelectedRows, BBIdents))
          );
        }

        if (BBIdents && BBIdents.length !== 0)
          setStatusMessage(
            `${ModeEditing}:${BBIdents[0].Sks}-${BBIdents[0].TagNr}`
          );

        break;
      case "None":
        SetTagNr("0");
        SetSelectedRows(rowDefaultSelection);
        SetModeEditing("None");
        setFormData(undefined);
        setFormWeightData(undefined);
        setStatusMessage(AppName);
        setStatusMessageTitle(`Welcome to ${AppName}`);
        SetResetCount((pV) => pV + 1);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Mode]);
  useEffect(() => {
    if (TagNr !== "0" && ItemsData) {
      SelectedRows.forEach((v) => {
        const FieldsToEdit = ItemsData.filter((j) => j.fields.tagnr === v)[0]
          .fields;

        if (FieldsToEdit) {
          setFormData({
            tagnr: FieldsToEdit.tagnr,
            bbSks: FieldsToEdit.bbSks,
            bbWeight: FieldsToEdit.bbWeight,
            dateOfBirth: new Date(FieldsToEdit.dateOfBirth),
            damLookupId: FieldsToEdit.dam ? FieldsToEdit.dam : undefined,
            sireLookupId: FieldsToEdit.sire ? FieldsToEdit.sire : undefined,
          });
        }
      });
    }
    if (TagNr === "0") {
      setFormData(undefined);
    }
  }, [TagNr, ItemsData, SelectedRows]);

  const SetEditingModeTo = (editingMode: EditingMode): void => {
    SetMode("Editing");
    SetModeEditing(editingMode);
  };

  const [CPStackHorizStyles, CPStackHorizToken] = HorizStack({
    bgColor: ThemeColor.almondCream,
    bordercolor: ThemeColor.peachBeige,
    gap: 0,
    childrenGap: 0,
    marginBottom: 0,
  });

  return (
    <ThemeProvider applyTo="body" theme={BaseTheme}>
      <form>
        <Stack className={styles.Main}>
          <Stack
            horizontal
            styles={CPStackHorizStyles}
            tokens={CPStackHorizToken}
          >
            <Action
              Name="Clear"
              IconProps={clearFilterIcon}
              CurrentMode={Mode}
              HiddenWhen={["Editing"]}
              VisibleWhen={["Single", "Multiple"]}
              Click={() => {
                SetSelectedRows(rowDefaultSelection);
              }}
            />
            <Action
              Name="Add"
              IconProps={addIcon}
              CurrentMode={Mode}
              VisibleWhen={["None"]}
              Click={() => {
                SetEditingModeTo("ItemAdd");
              }}
            />
            <Action
              Name="Edit"
              IconProps={updateIcon}
              CurrentMode={Mode}
              VisibleWhen={["Single"]}
              Click={() => {
                SetEditingModeTo("ItemEdit");
              }}
            />
            <Action
              Name="Save"
              IconProps={saveIcon}
              CurrentMode={Mode}
              VisibleWhen={["Editing"]}
              Click={(ev) => {
                ev.preventDefault();
                (async () => {
                  if (ModeEditing === "ItemAdd") {
                    if (BBIdents && formData) {
                      try {
                        await window.eapi.cloudCreateItem<
                          TSPListBaseRead,
                          TSPListBaseCreate
                        >(BaseList, {
                          fields: formData,
                        });
                        SetMode("None");
                      } catch (error) {
                        if ("message" in error) {
                          setStatusMessage(error.message);
                        }
                      }
                    }
                  }
                  if (ModeEditing === "ItemEdit") {
                    if (BBIdents && BBIdents.length !== 0) {
                      try {
                        const itemId = BBIdentToItemId(SelectedRows, BBIdents);
                        if (itemId) {
                          await window.eapi.cloudUpdateItem<
                            TSPListBaseRead,
                            TSPListBaseCreate
                          >(BaseList, itemId, {
                            fields: formData,
                          });
                          SetMode("None");
                        }
                      } catch (error) {
                        if ("message" in error) {
                          setStatusMessage(error.message);
                        }
                      }
                    }
                  }
                  if (ModeEditing === "WeightAdd" && formWeightData) {
                    /**Add Weight to base profile */

                    if (BBIdents && BBIdents.length !== 0) {
                      try {
                        const itemId = BBIdentToItemId(SelectedRows, BBIdents);
                        if (itemId) {
                          await window.eapi.cloudUpdateItem<
                            TSPListBaseRead,
                            Partial<TSPListBaseCreate>
                          >(BaseList, itemId, {
                            fields: {
                              bbWeight: formWeightData.bbWeight,
                            },
                          });
                          SetMode("None");
                        }
                      } catch (error) {
                        if ("message" in error) {
                          setStatusMessage(error.message);
                        }
                      }
                    }

                    /** Add Weight to Trace */

                    const traceItm = await window.eapi.cloudCreateItem<
                      TSPLBWeightRead,
                      TSPLBWeightCreate
                    >(TraceList, {
                      contentType: {
                        id: TraceWeightContentTypeId,
                      },
                      fields: formWeightData,
                    });

                    SetMode("Single");

                    window.eapi.localLogging(
                      "Info",
                      "weight traceitm create",
                      JSON.stringify(traceItm)
                    );

                    SetMode("Single");
                  }
                })();
              }}
              IsDisabled={!PageIsValid}
            />
            <Action
              Name="Cancel"
              IconProps={cancelIcon}
              CurrentMode={Mode}
              VisibleWhen={["Editing"]}
              Click={() => {
                SetMode("None");
              }}
            />
            <Action
              Name="Delete"
              IconProps={deletelIcon}
              CurrentMode={Mode}
              HiddenWhen={["Editing"]}
              VisibleWhen={["Single", "Multiple"]}
              Click={() => {
                //
              }}
            />
            <Action
              Name="Meds"
              IconProps={medicalIcon}
              CurrentMode={Mode}
              VisibleWhen={["Single"]}
              Click={() => {
                SetEditingModeTo("MedicationAdd");
              }}
            />
            <Action
              Name="Weight"
              IconProps={stepIcon}
              CurrentMode={Mode}
              VisibleWhen={["Single"]}
              Click={() => {
                SetEditingModeTo("WeightAdd");
              }}
            />
            <Stack grow />
            {statusMessage && (
              <div
                title={statusMessageTitle}
                style={{ maxWidth: 500, paddingRight: 12 }}
              >
                {statusMessage}
              </div>
            )}
          </Stack>
          {ModeEditing === "ItemEdit" && formData && BBIdents && (
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              BBIdents={BBIdents}
              SetPageIsValid={SetPageIsValid}
              setStatusMessage={setStatusMessage}
            />
          )}
          {ModeEditing === "ItemAdd" && formData && BBIdents && (
            <ItemForm
              formData={formData}
              setFormData={setFormData}
              BBIdents={BBIdents}
              SetPageIsValid={SetPageIsValid}
              setStatusMessage={setStatusMessage}
            />
          )}
          {ModeEditing === "WeightAdd" && formWeightData && (
            <TraceWeight
              formData={formWeightData}
              setFormData={setFormWeightData}
              SetPageIsValid={SetPageIsValid}
            />
          )}
        </Stack>
      </form>
      <Stack>
        {ItemsData && (
          <Items
            data={ItemsData}
            selectedRows={SelectedRows}
            setSelectedRows={SetSelectedRows}
          />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default function App() {
  const [ResetCount, SetResetCount] = useState<number>(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <BBok
              BaseList="base"
              TraceList="trace"
              AppName="Lammers"
              ResetCount={ResetCount}
              SetResetCount={SetResetCount}
            />
          }
        />
      </Routes>
    </Router>
  );
}

const rootContainer = document.getElementById("root");

if (rootContainer) {
  const root = createRoot(rootContainer);
  root.render(<App />);
} else {
  console.error(`broken html, cannot find root`);
}
