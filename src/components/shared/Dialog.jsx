import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import DialogStateContext from "@/context/DialogStateContext";

const Dialog = ({
  children,
  dialogTrigger,
  dialogTitle,
  dialogDescription,
  actionTitle,
  logout,
  handleAction,
  scrollStyle,
}) => {
  const { isOpen, setIsOpen } = useContext(DialogStateContext);
  return (
    <>
      <AlertDialog open={isOpen}>
        {logout && (
          <AlertDialogTrigger
            onClick={() => setIsOpen(true)}
            className="flex items-center w-full p-2 hover:bg-secondary transition-colors rounded gap-2"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </AlertDialogTrigger>
        )}

        {dialogTrigger && (
          <Button className="w-full" onClick={() => setIsOpen(true)}>
            {dialogTrigger}
          </Button>
        )}

        <AlertDialogContent>
          <AlertDialogHeader>
            {dialogTitle && <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>}
            {dialogDescription && (
              <AlertDialogDescription>
                {dialogDescription}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          {children && (
            <div
              className={`${scrollStyle ? "overflow-y-auto h-96 scroll" : ""}`}
            >
              <div
                className={`flex flex-col gap-4 ${
                  scrollStyle ? "sm:w-[99%]" : ""
                }`}
              >
                {children}
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              الغي
            </AlertDialogCancel>
            <Button onClick={handleAction}>{actionTitle && actionTitle}</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dialog;
