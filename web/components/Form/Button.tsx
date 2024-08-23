import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  label?: string;
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'black' | 'grey';
}

export const Button = ({ label, onClick, leftIcon, rightIcon, variant = 'black' }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative overflow-hidden flex items-center justify-center space-x-2 p-2 px-4 rounded-md my-2 cursor-pointer w-full text-center',
        variant === 'black' ? 'bg-black text-white' : 'bg-[#EEE] text-black',
        'hover:bg-black/20 backdrop-blur-lg text-black transition-colors duration-500',
      )}
      type='button'
    >
      {leftIcon && <span className='relative z-10'>{leftIcon}</span>}
      <span className='relative z-10'>{label}</span>
      {rightIcon && <span className='relative z-10'>{rightIcon}</span>}
      <div className=' z-50 inset-0 bg-white '></div>
    </button>
  );
};
