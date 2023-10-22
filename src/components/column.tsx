import { useMemo } from "react";
import { modalStore, myStore } from "../context/states";
import "./column.css";
import { Task } from "./task";
import { Modal } from "./modal";
type proptype = { status: string };
export const Column = ({ status }: proptype) => {
  const tasks = myStore((store) => store.tasks);
   const showModal = modalStore((store) => store.showModal);
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );
  return (
    <div className="bg-gray-700 w-1/3 text-white min-h-[20rem] p-2 mx-2 rounded-lg flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <h2>{status}</h2>
        <button
          className="bg-white rounded-lg py-1 px-2 h-fit text-black text-sm hover:bg-slate-200"
          onClick={() => {
             showModal(status)
          }}
        >
          ADD
        </button>
      </div>
      {filteredTasks.map((task, index) => (
        <Task
          status={task.status}
          title={task.title}
          key={index}
          id={task.id}
        />
      ))}
    </div>
  );
};
