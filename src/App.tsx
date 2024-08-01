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
import WeightItems from "Client/Weight/Items";
import IBBIdent from "Interfaces/IBBIdent";
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
  FlagIcon,
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
  maleIcon,
  medicalIcon,
  saveIcon,
  stepIcon,
  updateIcon,
} from "Ux/Icons";
import ItemForm from "Client/ItemForm/ItemForm";
import WeightItem from "Client/Weight/Item";
import { HorizStack } from "Ux/StackHorizontal";
import ThemeColor from "Ux/ColorScheme";
import {
  BBIdentFromSelectedRows,
  BBIdentFromTagNr,
  BBIdentToItemId,
} from "Tools/BBIdent";
import Items from "Client/Items/Items";
import { StackGenericStyles, stackGenericToken } from "Ux/StackGeneric";
import BaseSiresCreate from "Interfaces/BaseSires";
import { TSPLBSireRead } from "Interfaces/LISTS/sires/IGLICF-Sires";
import SiresAdd from "Client/Sires/SireAdd";

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
    iconMale: <FlagIcon />,
  },
});

interface IPropsBBok {
  BaseList: string;
  TraceList: string;
  SiresList: string;
  AppName: string;
  ResetCount: number;
  SetResetCount: Dispatch<SetStateAction<number>>;
}

const BBok: React.FC<IPropsBBok> = ({
  ResetCount,
  SetResetCount,
  BaseList,
  TraceList,
  SiresList,
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

  const [Sires, SetSires] = useState<
    Map<number, Array<IBBIdent>> | undefined
  >();

  const [ItemsData, setItemsData] = useState<
    Array<TSPListBaseRead> | undefined
  >();
  const [formData, setFormData] = useState<TSPListBaseCreate | undefined>();
  const [formWeightData, setFormWeightData] = useState<
    TSPLBWeightCreate | undefined
  >();

  const [PageIsValid, SetPageIsValid] = useState<boolean>(false);

  const [ItemsWeight, SetItemsWeight] = useState<
    TSPLBWeightRead[] | undefined
  >();

  useEffect(() => {
    if (ResetCount >= 1) {
      /**
       * BB
       */
      window.eapi
        .cloudGetAllItems<TSPListBaseRead>(
          BaseList,
          `fields($select=id,tagnr,dateOfBirth,dam,bbSks,bbWeight,bbStatus)`
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
                  Status: j.fields.bbStatus,
                });
              })
            );

            setStatusMessageTitle(`Welcome to ${AppName}`);
          }
        });
    }

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
        if (BBIdents) {
          const bbident = BBIdentFromSelectedRows(BBIdents, SelectedRows);
          SetTagNr(bbident[0].TagNr);
        }
      } else if (SelectedRows.size > 1) {
        SetMode("Multiple");
      } else {
        SetMode("None");
      }
    } else {
      SetMode("None");
    }
  }, [SelectedRows, ItemsData, BBIdents]);
  useEffect(() => {
    //Mode changed!!!
    if (Mode === "None") {
      SetTagNr("0");
      SetSelectedRows(rowDefaultSelection);
      SetModeEditing("None");
      setFormData(undefined);
      setFormWeightData(undefined);
      SetItemsWeight(undefined);
      setStatusMessage(AppName);
      setStatusMessageTitle(`Welcome to ${AppName}`);
      SetResetCount((pV) => pV + 1);
    } else if (BBIdents && BBIdents.length !== 0) {
      setStatusMessage(
        BBIdentFromSelectedRows(BBIdents, SelectedRows)
          .map((j) => {
            return `${j.TagNr}-${j.Sks}`;
          })
          .join("; ")
      );
      switch (Mode) {
        case "Single":
          SetModeEditing("None"); //Single means, an item is selected, but no action chosen; technically this will do nothing, but it is a separate state!
          break;
        case "Multiple":
          SetTagNr("0");
          SetModeEditing("None");
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
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Mode]);
  useEffect(() => {
    if (ItemsData) {
      /**
       * SIRES
       */
      window.eapi
        .cloudGetAllItems<TSPLBSireRead>(
          SiresList,
          `fields($select=id,bbRef,sireRef)`
        )
        .then((res) => {
          if (res) {
            const sireP = new Map<number, Array<IBBIdent>>();

            if (BBIdents)
              BBIdents.forEach((bbIdent) => {
                const sires = res.value.filter(
                  (j) => parseInt(j.fields.bbRef, 10) === bbIdent.ItemId
                );

                if (sires.length !== 0) {
                  const siresItemIds = sires.map((j) => j.fields.sireRef);
                  const sireIdents = siresItemIds.flatMap((sireItemId) =>
                    BBIdents.filter(
                      (bbident) => bbident.ItemId === parseInt(sireItemId, 10)
                    )
                  );
                  if (sireIdents.length > 0) {
                    sireP.set(bbIdent.ItemId, sireIdents);
                  }
                }
              });
            SetSires(sireP);
            setStatusMessageTitle(`Welcome to ${AppName}...`);
          }
        });
    }
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
            bbStatus: FieldsToEdit.bbStatus,
          });
        }
      });
    }
    if (TagNr === "0") {
      setFormData(undefined);
    }
  }, [TagNr, ItemsData, SelectedRows, SiresList, AppName, BBIdents]);
  useEffect(() => {
    if (ModeEditing === "WeightAdd") {
      setStatusMessage("LARGE::Weight");
      (async () => {
        try {
          if (BBIdents && !ItemsWeight) {
            const bbident = BBIdentFromTagNr(BBIdents, TagNr);
            if (bbident) {
              const wInf = await window.eapi.cloudGetItems<TSPLBWeightRead>(
                TraceList,
                `fields/bbRefLookupId eq ${bbident.ItemId}`,
                `fields($select=*)`
              );
              SetItemsWeight(wInf.value);
            }
          }
        } catch (err) {
          if ("message" in err) {
            setStatusMessage(err.message);
          }
        }
      })();
    }
  }, [ItemsWeight, SetItemsWeight, TraceList, BBIdents, TagNr, ModeEditing]);
  const SetEditingModeTo = (editingMode: EditingMode): void => {
    if (editingMode !== "None") {
      SetMode("Editing");
      SetModeEditing(editingMode);
    } else {
      SetMode("None");
      SetModeEditing("None");
    }
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
                          SetEditingModeTo("None");
                        }
                      } catch (err) {
                        if ("message" in err) {
                          setStatusMessage(err.message);
                        }
                      }

                      try {
                        await window.eapi.cloudCreateItem<
                          TSPLBWeightRead,
                          TSPLBWeightCreate
                        >(TraceList, {
                          contentType: {
                            id: TraceWeightContentTypeId,
                          },
                          fields: formWeightData,
                        });
                      } catch (err) {
                        if ("message" in err) {
                          setStatusMessage(err.message);
                        }
                      }
                    } else {
                      setStatusMessage(
                        `Could not add trace, bbidents is empty (or something else)`
                      );
                    }

                    /** Add Weight to Trace */
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
                console.dir(ItemsWeight);
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
            <Action
              Name="Sires"
              IconProps={maleIcon}
              CurrentMode={Mode}
              VisibleWhen={["Single"]}
              Click={() => {
                SetEditingModeTo("SiresAdd");
              }}
            />
            <Stack grow />
            {statusMessage && (
              <div
                title={statusMessageTitle}
                style={{ maxWidth: 500, paddingRight: 12 }}
              >
                {statusMessage.indexOf("::") === -1 ? (
                  statusMessage
                ) : (
                  <div style={{ fontSize: "large" }}>
                    {statusMessage.split("::")[1]}
                  </div>
                )}
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
            <>
              <WeightItem
                formData={formWeightData}
                setFormData={setFormWeightData}
                SetPageIsValid={SetPageIsValid}
              />
              {ItemsWeight && (
                <Stack styles={StackGenericStyles} tokens={stackGenericToken}>
                  <WeightItems data={ItemsWeight} />
                </Stack>
              )}
            </>
          )}
          {ModeEditing === "SiresAdd" && (
            <>
              <SiresAdd BBIdents={BBIdents} />
            </>
          )}
        </Stack>
      </form>
      <Stack>
        {ItemsData && ModeEditing !== "WeightAdd" && (
          <Items
            data={ItemsData}
            selectedRows={SelectedRows}
            setSelectedRows={SetSelectedRows}
            Sires={Sires}
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
              SiresList="sires"
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
