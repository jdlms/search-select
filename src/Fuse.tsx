import { useMemo, useState } from "react";
import Select from "react-select";
import Fuse from "fuse.js";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "grape", label: "Grape" },
  { value: "orange", label: "Orange" },
  { value: "pineapple", label: "Pineapple" },
];

export default function FuseSelect() {
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const fuse = useMemo(
    () =>
      new Fuse(options, {
        keys: ["label"],
        threshold: 0.3,
      }),
    [options]
  );

  const handleInputChange = (inputValue: string) => {
    if (inputValue === "") {
      setFilteredOptions(options);
    } else {
      const results = fuse.search(inputValue).map((result) => result.item);
      setFilteredOptions(results);
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "gray", // Background of the control
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "gray", // Background of the dropdown menu
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#d3d3d3" : "gray", // Highlight focused option
      color: "white", // Text color
    }),
  };

  return (
    <Select
      options={filteredOptions}
      onInputChange={handleInputChange}
      placeholder="Search..."
      styles={customStyles}
      openMenuOnClick={false}
    />
  );
}
