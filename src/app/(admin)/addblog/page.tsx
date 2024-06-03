import React from 'react';
import dynamic from 'next/dynamic';

// Components
const Newblog = dynamic(() => import('../components/Newblog'), { ssr: false });

const AddBlog = () => {
    return (
        <section className='w-full sm:w-[95%] mx-auto p-[0.8rem] my-[1.2rem]'>
            <h2 className='text-[1.24rem] font-[600] text-[#494949] text-left underline'>Add Blog</h2>
            <Newblog/>
        </section>
    )
}

export default AddBlog;