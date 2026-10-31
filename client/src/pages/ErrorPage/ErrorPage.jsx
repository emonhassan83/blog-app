import { Link, useRouteError } from 'react-router-dom'
import img from '../../assets/404/404_img.svg'
import { Helmet } from 'react-helmet-async'

const ErrorPage = () => {
  const { error, status } = useRouteError();
  return (
    <section className='h-screen p-16 text-gray-900'>
      <Helmet>
        <title>Uni Bookings | 404</title>
      </Helmet>
      <div className='container md:flex items-center justify-center px-5 mx-auto my-8 gap-10'>
        <div className='max-w-md text-center mx-auto'>
          <h2 className='mb-8 font-extrabold text-9xl text-gray-700'>
            <span className='sr-only'>Error</span>
            {status || 404}
          </h2>
          <p className='text-2xl font-bold md:text-3xl text-gray-800 mb-8'>
            {error?.message}
          </p>
          <Link to='/'className="btn btn-sm px-5 rounded-3xl text-white bg-[#A81C51]  hover:bg-[#A81C59] hover:border-none my-4 uppercase">
            Back to homepage
          </Link>
        </div>
        <div>
        <img className='w-full lg:w-[650px]' src={img} alt="" />
        </div>
      </div>
    </section>
  )
}

export default ErrorPage;