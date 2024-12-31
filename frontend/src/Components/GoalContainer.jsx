import React from "react";
import { MdDelete } from "react-icons/md";

import { useDispatch } from "react-redux";
import { deleteGoal } from "../store/goalSlice";
export default function GoalContainer({ goal }) {
  const dispatch = useDispatch();
  const deleteHandle = (goal) => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <div
      key={goal._id}
      className=" p-2 flex justify-between border-2 border-gray-600 w-1/5"
    >
      <p>{goal.goal}</p>
      <div className="flex gap-4">
        <MdDelete size={25} onClick={() => deleteHandle(goal)} />
      </div>
    </div>
  );
}
