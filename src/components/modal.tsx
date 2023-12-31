import { useEffect, useRef, useState } from "react";
import { modalStore, myStore } from "../context/states";
import { v4 as uuidv4 } from "uuid";

export const Modal = () => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const status = modalStore((store) => store.status);
  const show = modalStore((store) => store.show);
  const hideModal = modalStore((store) => store.hideModal);
  const [newTask, setNewTask] = useState("");
  const addTask = myStore((store) => store.addTask);

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  function handleClickOutside(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      hideModal();
      setNewTask("");
    }
  }

  return (
    <>
      <div
        className={`${
          show ? "block" : "hidden"
        } w-screen h-screen bg-slate-700/20 backdrop-blur-[2px] absolute z-10`}
      ></div>
      <div
        className={`${
          show ? "block" : "hidden"
        } absolute bg-gray-700 shadow-2xl rounded-2xl z-20 p-5 min-w-[20rem] min-h-[10rem] top-1/3`}
        ref={modalRef}
      >
        <button
          className="absolute top-1 right-4 text-red-500"
          onClick={(e) => {
            e.preventDefault();
            hideModal();
          }}
        >
          X
        </button>
        <p className="text-white">Task Details</p>
        <textarea
          placeholder="Task"
          className="w-full h-full p-2"
          rows={5}
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          ref={inputRef}
        ></textarea>

        <button
          type="submit"
          className="bg-white rounded-lg py-1 px-2 h-fit w-full text-black text-sm hover:bg-slate-200"
          onClick={() => {
            const id = uuidv4();
            addTask(newTask, status, id);
            setNewTask("");
            hideModal();
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};
