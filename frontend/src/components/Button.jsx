import React from 'react'

const Button = ({
    children,
    type = "button",
    bgcolor = "bg-indigo-600",
    className = "",
    onClick,
    disabled = false,
    size = "md",
    variant = "solid"
}) => {
  const baseStyles = "font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
    xl: "px-10 py-4 text-xl"
  }

  const variants = {
    solid: `${bgcolor} text-white hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`,
    outline: `border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 disabled:opacity-50 disabled:cursor-not-allowed`,
    ghost: `text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-indigo-900/30 disabled:opacity-50 disabled:cursor-not-allowed`
  }

  return (
    <button 
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick} 
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
