import React from 'react'


interface InputProps {
  type?: string;
  classNames?: string;
  disabled?: boolean;
  bg?: string;
  my: string;
  h?: string;
  w?: string;
  ph?: string;
  hasEndIcon?: boolean;
  value?: string | undefined;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconClick?: () => void;
}

const CustomInput: React.FC<InputProps> = ({ type = 'text', classNames, bg = 'bg-input-bg', my, h = '48', w = '400', ph, value, onChange, hasEndIcon = false,iconClick }) => {
  return (
    <div className='relative '>
      <input onChange={onChange} type={type} value={value} placeholder={ph ?? ''} className={`rounded-lg ${classNames} px-3 ${bg} h-[48px] w-[${w}px] my-${my}`} />
      {
        hasEndIcon ? <p onClick={iconClick} className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>icon</p> : <></>
      }
    </div>
  )
}

export default CustomInput