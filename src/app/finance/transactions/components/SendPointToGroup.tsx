import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "@/app/components/generic/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { GroupType, MultipleUsersPointPayload } from "../types/groups.types";
import GroupUsers from "./GroupUsers";
import EditUserSendPointPayload from "./EditUserSendPointPayload";

export default function SendPointToGroup() {
  const [step, setStep] = useState(2);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [groupPayload, setGroupPayload] = useState({
    ids: "",
    points: "",
    narration: "",
  });

  const [editableIndex, setEditableIndex] = useState<number>(-1);
  const [editableData, setEditableData] = useState({
    points: "",
    narration: "",
  });

  const [selectedGroups, setSelectedGroups] = useState<GroupType[]>([]);
  const [singlePayloadOpen, setSinglePayloadOpen] = useState(false);
  const [viewedPayload, setViewedPayload] = useState<MultipleUsersPointPayload>();
  const [pointsPayLoad, setPointsPayload] = useState<MultipleUsersPointPayload[]>([
    {
      firstName: "Tola",
      lastName: "Banjo",
      email: "banjotola12@gmail.com",
      points: "2000",
      narration: "narration",
    },
    {
      firstName: "Tola",
      lastName: "Oluwaseun",
      email: "oluwaseun@gmail.com",
      points: "27000",
      narration: "narration",
    },
  ]);

  const groups = [
    {
      id: "1",
      name: "Group 1",
    },
    {
      id: "2",
      name: "Group 2",
    },
    {
      id: "3",
      name: "Group 3",
    },
    {
      id: "4",
      name: "Group 4",
    },
  ];

  const validateInitialGroupPayload = () => {
    const { points, narration } = groupPayload;

    if (!selectedGroups.length) {
      return {
        message: "Pleae select at least one group",
        name: "group_ids",
        error: true,
      };
    }
    if (Number(points) < 20) {
      return {
        message: "You cannot send less than 20 points",
        name: "points",
        error: true,
      };
    }
    if (narration.length < 10) {
      return {
        message: "Pleae ensure narration has minimum of 10 characters",
        name: "narration",
        error: true,
      };
    }
    return { message: "", name: "", error: false };
  };

  const handleUsersGroupChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value, id } = e.target;

    const chosenGroup = groups.find((group) => group.id === value);

    if (!selectedGroups.find((op) => op.id === value) && chosenGroup) {
      setSelectedGroups((prev) => [...prev, chosenGroup]);
    } else {
      const newGroups = selectedGroups.filter((group) => group.id != value);
      setSelectedGroups(newGroups);
    }
  };

  const removeGroup = (value: string) => {
    const newGroups = selectedGroups.filter((group) => group.id != value);
    setSelectedGroups(newGroups);
  };

  const handleInitialGroupPayload = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value, id } = e.target;

    setGroupPayload((prev) => ({
      ...prev,
      [id]: value,
    }));
  };



  const handleViewSinglePayload = (payload: MultipleUsersPointPayload, index: number) => {
    setEditableIndex(index);
    setViewedPayload(payload);
    setEditableData({
      narration: payload.narration,
      points: payload.points
    });
    setSinglePayloadOpen(true);
    return;
  };

  const handleSinglePayloadModification = (field: string, value: string) => {
    setEditableData({
      ...editableData,
      [field]: value,
    });
  };

  const handleSaveChanges = (index: number) => {
    const updatedPayload = pointsPayLoad.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          points: editableData.points || item.points,
          narration: editableData.narration || item.narration,
        };
      }
      return item;
    });
    setPointsPayload(updatedPayload);
    setEditableIndex(-1);
    setSinglePayloadOpen(false)
  };

  const handleRemove = (index: number) => {
    const updatedPayload = pointsPayLoad.filter((_, i) => i != index);
    setPointsPayload(updatedPayload);
    setSinglePayloadOpen(false)
  };

  return (
    <React.Fragment>
      {step == 1 ? (
        <div className="grid grid-cols-1 lg:grid-cols-1 ">
          <div>
            <div className="min-h-[54px]  rounded-[8px] border-[1px] p-[10px] mt-3 relative">
              <div className="text-[14px] w-full  flex justify-between items-center">
                <div className="p-2  w-[90%] min-h-[50px] flex flex-row  flex-wrap px-[10px] gap-2">
                  {selectedGroups.length ? (
                    selectedGroups.map((group) => (
                      <div
                        key={group.id}
                        className="rounded-[4px] border-[#eee] gap-2 border-[1px] h-[25px] px-3 py-2 flex items-center justify-center"
                      >
                        <p className="font-satoshi text-[14px] font-[600]">
                          {group.name}
                        </p>
                        <MdClose
                          className="text-[12px]"
                          onClick={() => removeGroup(group.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-[16px] font-medium">Select Groups</p>
                  )}
                </div>

                <div className="w-[15px]">
                  {openDropDown ? (
                    <IoMdArrowDropup onClick={() => setOpenDropDown(false)} />
                  ) : (
                    <IoMdArrowDropdown onClick={() => setOpenDropDown(true)} />
                  )}
                </div>
              </div>

              {openDropDown ? (
                <div className="border-[0.5px] border-[#696868] rounded-md p-4 max-h-[200px] overflow-auto flex flex-wrap gap-5">
                  {groups.map((group) => (
                    <label htmlFor={`${group.id}_id`} key={group.id}>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`${group.id}_id`}
                          checked={
                            selectedGroups.find((item) => item.id == group.id)
                              ? true
                              : false
                          }
                          value={group.id}
                          onChange={handleUsersGroupChange}
                        />
                        <p className="font-satoshi m-0">{group.name}</p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            <small className="text-red-400">
              {validateInitialGroupPayload().name == "group_ids"
                ? validateInitialGroupPayload().message
                : ""}
            </small>
            <div className="h-[54px] rounded-[8px] border-[1px] px-[10px] mt-3">
              <input
                type="number"
                placeholder="Enter initial point"
                id="points"
                className="text-[14px] h-full w-full outline-none"
                value={groupPayload.points}
                onChange={handleInitialGroupPayload}
              />
            </div>
            <small className="text-red-400">
              {validateInitialGroupPayload().name == "points"
                ? validateInitialGroupPayload().message
                : ""}
            </small>
            <div className="h-[120px] rounded-[8px] border-[1px] p-[10px] mt-3">
              <textarea
                id="narration"
                placeholder="Enter Narration"
                className="text-[14px] h-full w-full outline-none resize-none"
                onChange={handleInitialGroupPayload}
                value={groupPayload.narration}
              ></textarea>
            </div>
            <small className="text-red-400">
              {validateInitialGroupPayload().name == "narration"
                ? validateInitialGroupPayload().message
                : ""}
            </small>
            <div className="flex justify-end mt-3">
              <Button
                text="Continue"
                bg={
                  validateInitialGroupPayload().error
                    ? "bg-disabled-btn"
                    : "bg-app-purple"
                }
                classNames="p-3 text-white w-[50%] lg:w-[157px] h-[45px]"
                disabled={validateInitialGroupPayload().error}
                onClick={() => setStep(2)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <GroupUsers
            payload={pointsPayLoad}
            isLoading={false}
            handleViewTxn={handleViewSinglePayload}
            handleRemove={handleRemove}
          />
        </div>
      )}
      <EditUserSendPointPayload
        open={singlePayloadOpen}
        onClose={() => setSinglePayloadOpen(false)}
        setOpen={setSinglePayloadOpen}
        txn={viewedPayload}
        editableData={editableData}
        handleChange={handleSinglePayloadModification}
        index={editableIndex}
        handleSaveChanges={handleSaveChanges}
      />
    </React.Fragment>
  );
}
