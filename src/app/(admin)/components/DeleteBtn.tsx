'use client';
import React, { useState } from 'react'

// Actions
import { deleteABlogById } from '@/actions/blogs';

// Utils
import createToast from '@/utils/createToast';

const DeleteBtn = ({blogId}: {blogId: string}) => {

    const [deleteLoad, setDeleteLoad] = useState(false);

    return (
        <button type='button' title='Delete Blog' className='text-[#FF0000] outline-none font-[400] text-[0.9rem] py-[0.12rem] px-[0.48rem] rounded-[4px] border-[1.2px] border-[#FF0000] focus-visible:bg-[#FF0000] focus-visible:text-[#FFFFFF] hover:bg-[#FF0000] hover:text-[#FFFF] transition-all duration-300 disabled:bg-[#FF000060] disabled:text-[#494949] disabled:border-[#FF000060] disabled:pointer-events-none disabled:cursor-not-allowed' onClick={async() => {

            if (!blogId) {
                createToast('error', 'Invalid blog');
            }

            let toastId = createToast('loading', 'Deleting blog...');
            setDeleteLoad(true);
            const deleteResponse = await deleteABlogById(blogId);
            (deleteResponse === undefined) ? createToast('success', 'Blog deleted successfully!', toastId): createToast('error', deleteResponse.message, toastId);
            setDeleteLoad(false);

        }} disabled={deleteLoad ? true : false} aria-disabled={deleteLoad ? true : false}>{deleteLoad ? 'Deleting...' : 'Delete'}</button>
    )
}

export default DeleteBtn