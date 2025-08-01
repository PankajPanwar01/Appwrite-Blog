import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-4 py-2 rounded-xl bg-white text-gray-800 
            border border-gray-300 shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 
            transition duration-200 ease-in-out 
            placeholder-gray-400 
            w-full ${className}`}

            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input                    
