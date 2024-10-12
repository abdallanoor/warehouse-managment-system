import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ButtonLoader from "../loading/ButtonLoader";
import { useTranslation } from "react-i18next";

const Dialog = ({
  children,
  dialogTrigger,
  dialogTitle,
  dialogDescription,
  actionTitle,
  handleAction,
  handleForm,
  loadingButton,
  bottomDisabled,
  dialogOpen,
  setDialogOpen,
  destructive,
}) => {
  const handleClose = () => setDialogOpen(false);

  const [t] = useTranslation("global");

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {dialogTrigger && dialogTrigger}
      <AlertDialogContent>
        <button
          onClick={handleClose}
          className="absolute rtl:left-4 ltr:right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="flex flex-col space-y-2 text-center ltr:sm:text-left rtl:sm:text-right">
          {dialogTitle && (
            <h2 className="text-lg font-semibold">{dialogTitle}</h2>
          )}
          {dialogDescription && (
            <p className="text-sm text-muted-foreground">{dialogDescription}</p>
          )}
        </div>
        {handleForm && (
          <form className="flex flex-col gap-5" onSubmit={handleForm}>
            {children}
            <div className="flex flex-col sm:flex-row-reverse gap-2">
              <Button
                type="submit"
                variant={destructive ? "destructive" : "default"}
                disabled={bottomDisabled}
                onClick={handleForm}
              >
                {actionTitle}
                {loadingButton && <ButtonLoader />}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                {t("cancel")}
              </Button>
            </div>
          </form>
        )}
        {handleAction && (
          <div className="flex flex-col gap-5">
            {children}
            <div className="flex flex-col sm:flex-row-reverse gap-2">
              <Button
                variant={destructive ? "destructive" : "default"}
                disabled={bottomDisabled}
                onClick={handleAction}
              >
                {actionTitle}
                {loadingButton && <ButtonLoader />}
              </Button>
              <Button variant="outline" onClick={handleClose}>
                {t("cancel")}
              </Button>
            </div>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
