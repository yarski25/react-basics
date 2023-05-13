import React from 'react'

type SelectOption = {
    name: string;
    value: string;
}

type Props = {
    options: SelectOption[];
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


const MySelect = ({options, defaultValue, value, onChange} : Props) => {
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
