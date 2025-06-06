import clsx from "clsx";

export const Input = ({
  label,
  icon,
  type = 'text',
  value,
  onChange,
  name,
  rightElement,
  className,
  error,
  onBlur,
  disabled,
}: {
  label: string;
  icon?: React.ReactNode;
  type?: string;
  className?: string;
  value: string | number;
  name: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  rightElement?: React.ReactNode;
  error?: string | false;
}) => (
  <div className={clsx('space-y-2', className)}>
    <label className='text-sm text-gray-300'>{label}</label>
    <div className='relative'>
      {icon && (
        <div className='absolute left-3 top-1/2 -translate-y-1/2'>{icon}</div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={clsx(
          'w-full pl-10 py-2 rounded-xl bg-gray-800 border',
          error ? 'border-red-500' : 'border-gray-700',
          rightElement ? 'pr-20' : 'pr-4',
          'text-white focus:outline-none focus:ring-2 focus:ring-cyan-500'
        )}
      />
      {rightElement && (
        <div className='absolute right-3 top-1/2 -translate-y-1/2'>
          {rightElement}
        </div>
      )}
    </div>
    {error && <p className='text-xs text-red-500'>{error}</p>}
  </div>
);
