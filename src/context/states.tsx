import { create } from "zustand";
type taskType = { id: string; title: string; status: string };
type storetype = {
  tasks: taskType[];
  addTask: (title: string, status: string, id: string) => void;
  removeTask: (id: string) => void;
  setDraggedTask: (id: string) => void;
  moveTask: (id: string, status: string) => void;
  draggedTask: string;
};

type modalType = {
  show: boolean;
  status: string;
  showModal: (status: string) => void;
  hideModal: () => void;
};

export const modalStore = create<modalType>()((set) => ({
  show: false,
  status: "",
  showModal: (status: string) => set(() => ({ show: true, status: status })),
  hideModal: () => set(() => ({ show: false, status: "" })),
}));

export const myStore = create<storetype>()((set) => ({
  tasks: [],
  draggedTask: "",
  addTask: (title: string, status: string, id: string) =>
    set((store: storetype) => ({
      tasks: [...store.tasks, { id, title, status }],
    })),
  removeTask: (id: string) => {
    set((store: storetype) => ({
      tasks: store.tasks.filter((task) => id !== task.id),
    }));
  },
  setDraggedTask: (id: string) => {
    set({ draggedTask: id });
  },
  moveTask: (id: string, status: string) => {
    set((store: storetype) => ({
      tasks: store.tasks.map((task) => {
        if (task.id === id) {
          task.status = status;
        }
        return task;
      }),
    }));
  },
}));
