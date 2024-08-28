import React from 'react'


interface ButtonProps {
  text: string;
  classNames?: string;
  disabled?: boolean;
  bg: string;
  my?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, classNames, disabled = false, bg = 'bg-app-purple', my, onClick }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`rounded-lg font-satoshi ${classNames} ${bg} my-${my}`}>
      {text}
    </button>
  )
}

export default Button