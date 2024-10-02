import { useAppDispatch } from "@/lib/hooks";
import { AlertType, hideAlert, showAlert } from "./alertSlice";

export const useAlert = () => {
  const dispatch = useAppDispatch();

  const alert= (
    message: string,
    type: AlertType = "info",
    duration: number = 5000
  ) => {
    dispatch(showAlert({ message, type }));

    // Only set the timeout if a positive duration is provided
    if (duration > 0) {
      setTimeout(() => dispatch(hideAlert()), duration);
    }
  };

  return { alert };
};
