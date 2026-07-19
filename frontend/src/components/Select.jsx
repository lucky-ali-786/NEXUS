import React, { useId } from 'react'
// in this we will use forward ref and useId;
// dekho we use useid bcoz we want to link a label with input 
// agar ham id use na kre aur ekk name use krenge to ekk se jyada baar use krne par label same hoga dono me means labelname same aajeaga
// but we want ki ikk input me ikk label hi aae iske liye ham useId krte hai taaki har render par ikk unique id generate ho
// and label saahi se link ho
const Select = (
    {
        options,
        label,
        className,
        ...props
    },
    ref
) => {
    const id = useId();
    return (
        <div>
            {
                label && (
                    <label htmlFor={id}>
                    </label>
                )
            }
            <select id={id}
                {...props}
                ref={ref}
                     >
                {
                    options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
