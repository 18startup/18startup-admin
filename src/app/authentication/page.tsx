import React from 'react';
import Image from 'next/image';

const Login = () => {
  return (
    <main className='w-full min-h-[100vh] flex justify-center items-center p-[0.4rem]'>
      <section className='max-w-full flex justify-start items-start flex-col gap-[0.8rem]'>
        <Image src="/logo.svg" alt='Logo' width={144} height={48} className='object-contain w-[144px] h-auto select-none'/>
        <form className='w-[520px] max-w-full h-full p-[0.8rem] pb-[1.2rem] shadow-md shadow-[#23232330] flex flex-col justify-start items-start gap-[0.9rem] rounded-[6px]'>
          <div className='w-full flex flex-col justify-start items-start gap-[0.4rem]'>
            <label className='text-[1.02rem] font-[500] text-[#494949]' htmlFor="email">Email<span className='text-[#FF0000]'>*</span></label>
            <input className='text-[0.98rem] px-[0.4rem] py-[0.4rem] border-[1.6px] text-[#494949] outline-none border-[#494949] w-full focus:border-[#F37335] focus:text-[#F37335] focus:placeholder:text-[#F3733590] rounded-[6px] transition-all duration-[0.3s]' id='email' name='email' type="email" required aria-required placeholder='Enter your Email' title='Provide proper Email Address' />
          </div>
          <div className='w-full flex flex-col justify-start items-start gap-[0.4rem]'>
            <label className='text-[1.02rem] font-[500] text-[#494949]' htmlFor="password">Password<span className='text-[#FF0000]'>*</span></label>
            <input className='text-[0.98rem] px-[0.4rem] py-[0.4rem] border-[1.6px] text-[#494949] outline-none border-[#494949] w-full focus:border-[#F37335] focus:text-[#F37335] focus:placeholder:text-[#F3733590] rounded-[6px] transition-all duration-[0.3s]' id='password' name='password' type="password" required aria-required placeholder='Enter your Password' title='Provide valid Password' />
          </div>
          <button type='submit' title='Login' className='w-full px-[0.7rem] py-[0.4rem] rounded-[6px] border-[2px] border-[#F37335] mt-[0.8rem] bg-[#F37335] text-[#FFFFFF] hover:bg-[#cb7a3c] focus-visible:bg-[#cb7a3c] cursor-pointer transition-all duration-300 outline-none disabled:bg-[#F3733540] disabled:text-[#FFFFFFF40] disabled:border-[#F3733540] disabled:cursor-not-allowed'>Login</button>
        </form>
      </section>
    </main>
  )
}

export default Login;