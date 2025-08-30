import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";

interface CustomTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  more?: string;
  nameLabel?: string;
  maxLength?: number;
  minLength?: number;
  border?: BorderStyleType
  textColor: TextStyleType
}

const CustomTextarea: React.FC<CustomTextareaProps> =({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  more = '',
  nameLabel = '',
  maxLength = 9999999,
  minLength = 1,
  border,
  textColor
}) => {
    return (
        <div>
          <label className={`${textColor}`} htmlFor={nameLabel}>{nameLabel}</label>
          <textarea
            id={nameLabel}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`${border} ${textColor} border rounded p-1 outline-none focus:ring-2 focus:ring-blue-500 resize-none w-full ${more}`}
            required
            maxLength={maxLength}
            minLength={minLength}
          />
        </div>
    );
};
export default CustomTextarea
