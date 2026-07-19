import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        className = "",
        placeholder,
        type = "text",
        error,
        ...props
    }, ref) {
        const id = useId();
        
        return (
            <div className="w-full">
                {label && (
                    <label 
                        htmlFor={id}
                        className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                    >
                        {label}
                    </label>
                )}
                <input 
                    type={type} 
                    className={`w-full px-4 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md ${error ? 'border-red-500 dark:border-red-500 focus:ring-red-500' : ''} ${className}`}
                    ref={ref} 
                    {...props} 
                    placeholder={placeholder} 
                    id={id}
                />
                {error && (
                    <p className="mt-1.5 text-sm text-red-500 dark:text-red-400 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18.101 12.93a.75.75 0 00-1.025-1.09l-3.857 3.143-1.993-1.679a.75.75 0 10-1.06 1.061l2.378 2.004a.75.75 0 001.025-.073l4.532-3.266z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        )
    }
)

export default Input
