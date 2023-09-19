import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state";

// get the type of component from redux store.
export const useTypedSelector:  TypedUseSelectorHook<RootState> = useSelector; 