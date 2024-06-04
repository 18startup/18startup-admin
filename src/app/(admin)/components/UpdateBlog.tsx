import React from 'react';
import dynamic from 'next/dynamic';

// Components
const UpdateForm = dynamic(() => import('./UpdateForm'), { ssr: false });

// React Icons
import { MdOutlineClose } from 'react-icons/md';

const UpdateBlog = ({blogId, blogSlug, setBlogShow}: {blogId: string, blogSlug: string, setBlogShow: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <aside className="w-full h-[100vh] fixed bg-[#49494970] top-0 left-0 z-[1000] flex justify-center items-center p-[0.8rem]">
      <div className="w-[600px] max-w-full h-[95vh] bg-[#FFFF] rounded-[4px] flex flex-col overflow-y-auto">

        {/* Head */}

        <div className='w-full py-[0.6rem] px-[1rem] h-[56px] border-b-[1.2px] border-b-[#494949A0] flex justify-between items-center gap-[0.8rem]'>
          <h3 className='text-[1.02rem] font-[600] text-left color-[#494949]'>Update Blog</h3>
          <button className='w-[28px] h-[28px] rounded-[2px] flex justify-center items-center border-[1.2px] border-[#494949A0] bg-transparent text-[#494949] hover:bg-[#494949] hover:text-[#FFF] transition-all duration-300' title='Close Update Popup' type='button' onClick={() => {
            setBlogShow(false);
          }}><MdOutlineClose fontSize={20} /></button>
        </div>

        {/* Head */}

        {/* Update Form */}

        <UpdateForm blogId={blogId} blogSlug={blogSlug} setBlogShow={setBlogShow} />

        {/* Update Form */}

      </div>
    </aside>
  )
}

export default UpdateBlog