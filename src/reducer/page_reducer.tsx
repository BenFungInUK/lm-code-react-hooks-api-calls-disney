import { PageAction } from "../action/page_action";

export function pageReducer(state: string, action: PageAction): string {
  switch (action.type) {
    case "favourite":
      if (state === "favourite") return "1";
      return "favourite";
    case "next":
      if (state === "favourite") return "1";
      return (parseInt(state) + 1).toString();
    case "prev":
      if (state === "favourite" || parseInt(state) < 2) return "1";
      return (parseInt(state) - 1).toString();
    default:
      return "1";
  }
}
