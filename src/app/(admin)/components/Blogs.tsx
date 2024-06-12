import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

// React Icons
import { IoIosAdd } from "react-icons/io";
import { MdOutlineLibraryBooks } from 'react-icons/md';

// Types
import { BlogType } from '@/types';

// Actions
import { getAllBlogs } from '@/actions/blogs';

// Components
import DeleteBtn from './DeleteBtn';

import { revalidatePath } from 'next/cache';
import UpdateBlogSetting from './UpdateBlogSetting';

const Blogs = async () => {
    
    revalidatePath('/');

    const allBlogs: BlogType[] = await getAllBlogs();

    return (

        <>
            <div className='py-[0.8rem] px-[1.2rem] border-[2px] border-[#494949] flex justify-between items-center gap-[0.8rem] w-fit rounded-[6px]'>
                <MdOutlineLibraryBooks fontSize={24} fontWeight={500} />
                <h3 className='text-left tex-[1.12rem] font-[500] text-[#494949]'>Total Blogs</h3>
                <p className='text-left text-[1.28rem] font-[600] text-[#F37335]'>{(allBlogs.length > 0 && allBlogs.length < 10) ? `0${allBlogs.length}` : allBlogs.length}</p>
            </div>

            <div className='w-full mt-[3rem] flex flex-col justify-start items-start gap-[1.2rem]'>
                <div className='w-full flex justify-between items-center gap-[0.8rem]'>
                    <h2 className='text-[1.24rem] font-[600] text-[#494949] text-left underline'>Uploaded Blogs</h2>
                    <Link href="/addblog" title='Add Blog' className='py-[0.4rem] px-[0.4rem] flex justify-center items-center gap-[0.2rem] text-[0.92rem] border-[1.2px] border-[#F37335] rounded-[4px] bg-[#F37335] text-[#FFF] hover:bg-[#cb7a3c] focus-visible:bg-[#cb7a3c] outline-none cursor-pointer transition-all duration-300'><IoIosAdd fontSize={18}/><span>Add Blog</span></Link>
                </div>

                <div id='blogs' className='w-full flex flex-row flex-wrap justify-start items-start gap-[1.2rem]'>
                    {
                        allBlogs.length === 0 ? (
                            <p>Empty!</p>
                        ) : (
                            allBlogs.map((blog) => {
                                return (
                                    <article className='w-full rounded-[6px] flex-shrink-0 flex-grow-0 px-[0.8rem] py-[1rem] border-[1.2px] border-[#494949] flex flex-col justify-start items-start gap-[0.4rem]' key={blog._id}>
                                        <Image src={blog.coverImage} alt={blog.title} className="w-[320px] h-[auto] aspect-video rounded-[8px] bg-[#F3733530]" width={320} height={180} />
                                        <h2 className='text-[1.12rem] text-left font-[500] text-[#494949]'>{blog.title}</h2>
                                        <p>{blog.overview ? blog.overview : 'No overview...'}</p>
                                        <div className='w-full flex justify-start items-center gap-[0.8rem] mt-[0.6rem]'>
                                            <UpdateBlogSetting blogId={blog._id} blogSlug={blog.slug} />
                                            <DeleteBtn blogId={blog._id} />
                                        </div>
                                    </article>
                                )
                            })
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default Blogs;