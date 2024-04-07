import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FormField = ({ labelTitle, id, onChange, value, onBlur }) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={id} className="text-right">
          {labelTitle && labelTitle}
        </Label>
        <Input
          className="col-span-3"
          id={id}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};

export default FormField;
