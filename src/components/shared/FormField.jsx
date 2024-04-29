import { CircleAlert } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FormField = ({
  labelTitle,
  id,
  onChange,
  value,
  onBlur,
  messageErrorCondition,
  messageError,
  disabled,
}) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-2">
        {messageErrorCondition && (
          <div className="col-span-3 col-start-2 flex items-center gap-1 text-red-600 animate-fadeIn">
            <CircleAlert className="w-4 h-4" />
            <p className="text-xs">{messageError}</p>
          </div>
        )}
        <Label htmlFor={id} className="text-right col-span-1">
          {labelTitle && labelTitle}
        </Label>

        <Input
          disabled={disabled}
          className={`col-span-3 ${
            messageErrorCondition &&
            "border-destructive focus:border-destructive/70 focus-visible:ring-destructive"
          }`}
          id={id}
          onChange={onChange}
          value={value !== null ? value : ""}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};

export default FormField;
