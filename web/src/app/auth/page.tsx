'use client';
import { RiGoogleFill } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../components/Form/Button';
import { Input } from '../../../components/Form/Input';
import { LogoText } from '../../../components/Logo/LogoText';
import { useUserHook } from '../../../features/hooks/user-hook';
import { ILoginForm } from '../../../interfaces/login.form';

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit: SubmitHandler<ILoginForm> = (data) => login(data);
  const { user, login } = useUserHook();
  const router = useRouter();

  if (user) router.push('/');

  return (
    <div className='h-full w-full p-4 md:p-10'>
      <LogoText />
      <div className='h-full w-full flex flex-col space-y-2 justify-center items-center'>
        <span className='text-2xl font-semibold'>Se connecter</span>
        <span className='text-black/50 text-center'>Entrez vos informations pour vous connecter.</span>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col pt-4 w-full lg:w-1/3 space-y-2'>
          <Input
            register={register}
            errors={errors}
            name='email'
            label='Adresse mail'
            required={'Vous devez remplir le champ.'}
            options={{
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: "L'adresse mail n'est pas valide.",
              },
            }}
            type='email'
          />
          <Input
            register={register}
            errors={errors}
            name='password'
            label='Mot de passe'
            required={'Vous devez remplir le champ.'}
            options={{
              minLength: {
                value: 6,
                message: 'Le mot de passe de contenir plus de 6 caractères.',
              },
            }}
            type='password'
          />
          <Button label='Connexion' />
        </form>
        <div className='flex flex-row space-x-2 w-full lg:w-1/3 items-center py-2'>
          <div className='flex-1 w-full h-[1px] bg-black/20' />
          <span className='text-sm text-black/50'>Ou continuer avec</span>
          <div className='flex-1 w-full h-[1px] bg-black/20' />
        </div>
        <div className='w-full lg:w-1/3'>
          <Button label='Google' variant='grey' leftIcon={<RiGoogleFill />} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
