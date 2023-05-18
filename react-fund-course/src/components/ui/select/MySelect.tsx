import React from 'react'

type MySelectOption = {
    name: string;
    value: string;
}

type MySelectProps = {
    options: MySelectOption[];
    defaultValue: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    //onChange?: (sort: string) => void;
}

// const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>{
//   const newValue = e.target.value;
// }

// const onChangeSelect = (sort: string) =>{
//   const newValue = sort.target.value;
// }


const MySelect = ({options, defaultValue, value, onChange} : MySelectProps) => {
  return (
    <select value={value}
            onChange={onChange}>
        <option disabled value="">{defaultValue}</option>
        {options.map(option =>
            <option key={option.value} value={option.value}>
                {option.name}
            </option>)}
    </select>
  )
}

export default MySelect
