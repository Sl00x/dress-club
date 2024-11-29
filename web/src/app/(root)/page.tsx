import { Button } from '../../../components/Form/Button';

const Home = () => {
  return (
    <div className='flex flex-col h-full px-4 lg:px-20 py-10'>
      <div className='relative w-full h-full'>
        <img src={'../image/sell.jpg'} className='h-full w-full object-cover rounded-lg shadow-md' />
        <div className='absolute top-0 left-0 rounded-lg w-full h-full  bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center space-y-10'>
          <span className='font-bold text-6xl text-white'>VENDEZ MAINTENANT</span>
          <span className='w-1/2 text-center text-white/80'>
            Libérez la valeur de votre luxe : Vendez vos vêtements, bijoux, montres et sacs de créateur sur DressClub
            dès aujourd'hui !
          </span>
          <div>
            <Button label='VENDRE UN PRODUIT' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{
  /* <div className='relative w-full aspect-video'>
  <img src={'../image/sell.jpg'} className='h-1/2 w-full object-cover rounded-lg shadow-md' />
  <div className='absolute top-0 left-0 rounded-lg w-full h-1/2 bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center space-y-5'>
    <span className='font-bold text-6xl text-white'>VENDEZ MAINTENANT</span>
    <span className='w-1/2 text-center text-white'>
      Libérez la valeur de votre luxe : Vendez vos vêtements, bijoux, montres et sacs de créateur sur DressClub dès
      aujourd'hui !
    </span>
  </div>
</div>; */
}
