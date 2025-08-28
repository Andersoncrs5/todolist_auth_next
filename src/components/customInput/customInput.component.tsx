import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";

type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'hidden'
  | 'time'
  | 'url'
  | 'date'

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: InputType;
  id?: string;
  nameLabel?: string
  max?: number
  min?: number
  border?: BorderStyleType
  required?: boolean
  textColor?: TextStyleType
  padding: PaddingStyleType
}

const CustomInput: React.FC<CustomInputProps> = ({ 
    nameLabel, 
    type, 
    id, 
    value, 
    onChange, 
    placeholder, 
    required, 
    max, 
    min, 
    border,
    padding,
    textColor
 }) => {
    return (
        <>
            <label className={`${textColor}`} htmlFor={nameLabel}>{nameLabel}</label> <br />
            <input 
                type={type}
                id={id}
                name={nameLabel}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border ${border} ${textColor} w-[100%] rounded ${padding} outline-none focus:ring-2 focus:ring-blue-500`}
                required={required}
                maxLength={max == 0 ? 99999 : max }
                minLength={min == 0 ? 1 : min }
            />
        </>
    )
}

export default CustomInput