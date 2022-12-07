import { atom } from "nanostores";

export const tabState = atom("classesTab");

export const viewState = atom("");

export function viewMore(e) {
  let prev = viewState.get();
  let next = e.target.parentElement.id;

  const closeView = () => {
    document
      .getElementById(prev)
      .classList.remove(
        "bg-pgl-red",
        "text-white",
        "font-medium",
        "hover:bg-pgl-red",
        "hover:text-white"
      );
    document.getElementById(prev + "description").classList.add("hidden");
    viewState.set("");
  };

  const openView = () => {
    document
      .getElementById(next)
      .classList.add(
        "bg-pgl-red",
        "text-white",
        "font-medium",
        "hover:bg-pgl-red",
        "hover:text-white"
      );
    document.getElementById(next + "description").classList.remove("hidden");
    viewState.set(next);
  };

  if (prev && prev !== next) {
    closeView();
    return openView();
  }

  if (!prev) return openView();
  if (prev === next) return closeView();
}
