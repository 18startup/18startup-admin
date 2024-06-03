import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const AdminLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='w-full min-h-[100vh]'>
        <nav className='w-full h-[64px] bg-white shadow-sm shadow-[#23232330] p-[0.8rem] flex justify-between items-center gap-[0.8rem]'>
            <h1 className='text-[1.3rem] font-[600] text-[#494949]'><Link href="/" className='outline-none focus-visible:underline hover:underline'>Admin <span className='text-[#F37335]'>Dashboard</span></Link></h1>
            <Image src="/logo.svg" alt='Logo' width={144} height={48} className='object-contain w-[144px] h-auto select-none'/>
        </nav>
        {children}
    </main>
  )
}

export default AdminLayout;