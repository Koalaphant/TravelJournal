import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

const StarRating = () => {
    const [selected, setSelected] = useState(1); // Set default selected value to 1

    const data = [
        { key: 1, value: 1 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 4, value: 4 },
        { key: 5, value: 5 },
    ];

    const handleSelectionChange = (selectedValue) => {
        setSelected(selectedValue);
    };

    return (
        <SelectList
            setSelected={handleSelectionChange}
            data={data}
            search={false}
            boxStyles={{ borderRadius: 0, backgroundColor:'pink', borderBlockColor: 'transparent' }}
            inputStyles={{fontSize: 20, color: 'white'}}
            dropdownStyles={{backgroundColor: 'pink', borderBlockColor: 'white'}}
            dropdownTextStyles={{color:'white', fontSize: 20}}
            placeholder="Select your rating" 
        />
    );
};

export default StarRating;
