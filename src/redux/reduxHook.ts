import { TypedUseSelectorHook, useSelector } from "react-redux";
import { stateReduced } from "./store";

export const useAppSelector: TypedUseSelectorHook<stateReduced> = useSelector;