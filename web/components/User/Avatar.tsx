import { User } from '../../interfaces/user.interface';

interface Props {
  user?: User | null;
}

export const Avatar = ({ user }: Props) => {
  return (
    <>
      {user && (
        <div className='w-10 h-10 rounded-full bg-blue-400 flex flex-row items-center justify-center font-bold hover:opacity-50 cursor-pointer select-none'>
          {user.firstname![0]}
          {user.lastname![0]}
        </div>
      )}
    </>
  );
};
