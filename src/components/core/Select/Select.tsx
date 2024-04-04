import * as Select from "@radix-ui/react-select"
import { Dispatch, SetStateAction, useState } from "react"
import styles from "./select.module.css"

interface ISelectComponentProps {
  placeholder: string
  options: string[]
  handleChange: Dispatch<SetStateAction<any>>
}
const SelectComponent: React.FC<ISelectComponentProps> = ({
  placeholder,
  options,
  handleChange,
}) => {
  const [value, setValue] = useState("")
  return (
    <Select.Root
      value={value}
      onValueChange={(value) => {
        handleChange(value)
        setValue(value)
      }}
    >
      <Select.Trigger className={styles.SelectTrigger}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={styles.SelectIcon} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white z-[9999] rounded-lg mt-10 p-1">
          <Select.Viewport>
            {options.length > 0 &&
              options.map((option, idx) => (
                <Select.Item
                  key={`${option}-${idx}`}
                  value={option}
                  className={styles.SelectItem}
                >
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default SelectComponent
