import { myStore } from "../context/states";
import "./task.css";

type taskProps = {
  title: string;
  status: string;
  id: string;
};
export const Task = ({ title, status, id }: taskProps) => {
  const removeTask = myStore((store) => store.removeTask);
  return (
    <div className="bg-white rounded-lg min-h-[5rem] relative text-black p-3 flex flex-col justify-between">
      <button
        className="text-red-400 absolute top-2 right-4"
        onClick={() => {
          console.log(id);
          removeTask(id);
        }}
      >
        x
      </button>
      <div>{title}</div>
      <div>
        <p
          className={`float-right text-right ${status} p-1 rounded-xl w-fit text-sm`}
        >
          {status}
        </p>
      </div>
    </div>
  );
};
