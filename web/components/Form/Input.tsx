import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'required'> {
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors;
  required?: string | boolean;
  options?: RegisterOptions;
  label?: string;
}

export const Input = (props: FormProps) => {
  return (
    <div className='flex-1 flex flex-col space-y-1'>
      {props.label && (
        <div className='flex flex-row space-x-1'>
          <span className='text-sm text-black/50'>{props.label}</span>
          {props.required && <span className='text-xs text-red-400'>*</span>}
        </div>
      )}
      <input
        {...(props as Omit<FormProps, 'required'>)}
        {...props.register(props.name, { required: props.required, ...props.options })}
        className={clsx(
          'p-2 rounded-md border outline-none',
          props.errors[props.name] ? 'border-red-400' : 'border-black/20',
        )}
      />
      {props.errors[props.name] && (
        <p className='text-xs text-red-500'>{props.errors[props.name]!.message?.toString()}</p>
      )}
    </div>
  );
};
