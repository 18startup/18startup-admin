'use client';
import React from 'react'
import Link from 'next/link';

const Error = ({ error, reset }: { error: Error & { digest?: string, message: string }, reset: () => void }) => {
  return (
    <div className="w-[100%] min-h-[100vh] p-[0.8rem] flex flex-col justify-center items-center gap-[1.2rem]">
      <h1 className='text-[3.4rem] font-[700] text-red-700'>Error occured!</h1>
      <svg viewBox="0 0 24 24" fill="rgb(185, 28, 28)" className='w-[240px] h-[auto] aspect-square object-contain' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"></path></g></svg>
      <p>{error.message}</p>
      <div className='flex flex-row justify-center items-center gap-[1.8rem]'>
        <Link href="/" title='Back to Home page' className='py-[0.4rem] px-[0.8rem] flex justify-center items-center gap-[0.2rem] text-[0.92rem] border-[1.2px] border-[#F37335] rounded-[4px] bg-[#F37335] text-[#FFF] hover:bg-[#cb7a3c] focus-visible:bg-[#cb7a3c] outline-none cursor-pointer transition-all duration-300' aria-label='Back to Home Page'>Back to Home</Link>
        <button type='button' title='Try again' className='py-[0.4rem] px-[0.8rem] flex justify-center items-center gap-[0.2rem] text-[0.92rem] border-[1.2px] border-[#F37335] rounded-[4px] bg-[#FFF] text-[#F37335] hover:bg-[#F37335] hover:text-[#FFF] focus-visible:text-[#FFF] focus-visible:bg-[#F37335] outline-none cursor-pointer transition-all duration-300' onClick={() => {reset()}}>Try again</button>
      </div>
    </div>
  )
}

export default Error;