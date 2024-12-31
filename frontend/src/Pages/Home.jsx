import React from "react";
import { useState, useEffect } from "react";
import { createGoal, getGoals } from "../store/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import GoalContainer from "../Components/goalContainer";

export default function Home() {
  const dispatch = useDispatch();
  const goals = useSelector((store) => store.goal.goals);
  const [text, setText] = useState("");
  const formHandle = (e) => {
    e.preventDefault();
    dispatch(createGoal(text));
    setText("");
  };

  useEffect(() => {
    dispatch(getGoals());
  }, [getGoals]);

  return (
    <div className=" w-full flex flex-col items-center gap-4">
      <form onSubmit={formHandle}>
        <input
          className="border-2 px-2 py-1 rounded-sm w-80 mx-3 border-black"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          placeholder="Enter a goal"
        ></input>
        <button
          className="bg-orange-400 p-1.5 w-20 rounded-sm text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
      {goals?.map((goal) => {
        return <GoalContainer goal={goal} key={goal._id}></GoalContainer>;
      })}
    </div>
  );
}
