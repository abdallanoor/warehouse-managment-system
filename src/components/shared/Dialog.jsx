import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";
import { X } from "lucide-react";
import ButtonLoader from "../loading/ButtonLoader";

const Dialog = ({
  children,
  dialogTrigger,
  dialogTitle,
  dialogDescription,
  actionTitle,
  handleAction,
  loadingButton,
  bottomDisabled,
  alert,
  dialogOpen,
  setDialogOpen,
  destructive,
}) => {
  return (
    <>
      <AlertDialog asChiled open={dialogOpen} onOpenChange={setDialogOpen}>
        {dialogTrigger && dialogTrigger}

        <AlertDialogContent>
          <button
            onClick={() => setDialogOpen(false)}
            className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <div className="flex flex-col space-y-2 text-center sm:text-right">
            {dialogTitle && (
              <h2 className="text-lg font-semibold">{dialogTitle}</h2>
            )}
            {dialogDescription && (
              <p className="text-sm text-muted-foreground">
                {dialogDescription}
              </p>
            )}
          </div>

          {children && (
            <form className="flex flex-col gap-5" onSubmit={handleAction}>
              {children}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <Button
                  type="submit"
                  disabled={bottomDisabled}
                  onClick={handleAction}
                >
                  {actionTitle && actionTitle}
                  {loadingButton ? <ButtonLoader /> : null}
                </Button>
              </div>
            </form>
          )}
          {alert && (
            <AlertDialogFooter>
              <Button variant={"outline"} onClick={() => setDialogOpen(false)}>
                الغي
              </Button>
              <Button
                variant={destructive ? "destructive" : "default"}
                disabled={bottomDisabled}
                onClick={handleAction}
              >
                {actionTitle && actionTitle}
                {loadingButton ? <ButtonLoader /> : null}
              </Button>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Dialog;
