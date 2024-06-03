'use client';
import React, { useState } from 'react'
import UpdateBlog from './UpdateBlog';

const UpdateBlogSetting = ({blogId, blogSlug}: {blogId: string, blogSlug: string}) => {

    const [blogShow, setBlogShow] = useState(false);

    return (
        <>
            <button type='button' title='Update Blog' className='text-[#F37335] outline-none font-[400] text-[0.9rem] py-[0.12rem] px-[0.48rem] rounded-[4px] border-[1.2px] border-[#F37335] focus-visible:bg-[#F37335] focus-visible:text-[#FFFFFF] hover:bg-[#F37335] hover:text-[#FFFF] transition-all duration-300' onClick={() => {setBlogShow(true)}}>Update</button>

            {(blogShow && blogId) && <UpdateBlog blogId={blogId} blogSlug={blogSlug} setBlogShow={setBlogShow} />}
        </>
    )
}

export default UpdateBlogSetting