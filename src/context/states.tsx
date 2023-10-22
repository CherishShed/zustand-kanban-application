import { create } from "zustand";
type storetype = {
  tasks: { id: string; title: string; status: string }[];
  addTask: (title: string, status: string, id: string) => void;
  removeTask: (id: string) => void;
};
type modalType = {
  show: boolean;
  status:string;
  showModal: (status:string) => void;
  hideModal: () => void;
};
export const modalStore = create<modalType>()((set) => ({
  show: false,
  status:"",
  showModal: (status) => set(() => ({ show: true, status: status })),
  hideModal: () => set(() => ({ show: false, status: "" })),
}));
export const myStore = create<storetype>()((set) => ({
  tasks: [
  ],
  addTask: (title: string, status: string, id: string) =>
    set((store) => ({ tasks: [...store.tasks, { id, title, status }] })),
  removeTask: (id: string) => {
    set((store) => ({
      tasks: store.tasks.filter((task) => id !== task.id),
    }));
  },
}));
