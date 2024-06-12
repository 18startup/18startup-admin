import React from 'react'
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="w-[100%] min-h-[100vh] p-[0.8rem] flex flex-col justify-center items-center gap-[1.2rem]">
      <h1 className='text-[3.4rem] font-[700] text-red-700'>Page Not Found!</h1>
      <svg fill="rgb(185, 28, 28)" className='w-[240px] h-[auto] aspect-square object-contain' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,204.274c-57.645,0-104.542,46.897-104.542,104.542c0,57.645,46.897,104.542,104.542,104.542 c57.645,0,104.542-46.897,104.542-104.542C360.542,251.172,313.644,204.274,256,204.274z M291.315,368.754L256,333.438 l-33.65,33.65l-22.165-22.165l33.65-33.65l-35.315-35.315l22.165-22.165L256,289.108l33.65-33.65l22.165,22.165l-33.65,33.65 l35.315,35.315L291.315,368.754z"></path> </g> </g> <g> <g> <rect x="433.633" y="23.6" width="78.367" height="72.095"></rect> </g> </g> <g> <g> <rect y="23.6" width="402.286" height="72.095"></rect> </g> </g> <g> <g> <path d="M0,127.042V488.4h512V127.042H0z M256,444.705c-74.93,0-135.889-60.959-135.889-135.889S181.07,172.927,256,172.927 s135.889,60.959,135.889,135.889S330.93,444.705,256,444.705z"></path> </g> </g> </g></svg>
      <p className='text-center text-[1.28rem] font-[600] text-[#494949]'>You&#39;re in URL that doesn&#39;t exists.</p>
      <Link href="/" title='Back to Home page' className='py-[0.4rem] px-[0.8rem] flex justify-center items-center gap-[0.2rem] text-[0.92rem] border-[1.2px] border-[#F37335] rounded-[4px] bg-[#F37335] text-[#FFF] hover:bg-[#cb7a3c] focus-visible:bg-[#cb7a3c] outline-none cursor-pointer transition-all duration-300' aria-label='Back to Home Page'>Back to Home</Link>
    </div>
  )
}

export default NotFound;