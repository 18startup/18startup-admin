'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// React Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Utils
import createToast from '@/utils/createToast';

// React Icons
import { MdOutlineCloudUpload } from "react-icons/md";

// Actions
import { addABlog } from '@/actions/blogs';

const Newblog = () => {

  const router = useRouter();

  const [description, setDescription] = useState('');

  const [imageSelected, setImageSelected] = useState({
    imageName: '',
    selected: false,
    imageSizeinKB: 0
  })

  const [uploadingLoad, setUploadingLoad] = useState(false);

  return (
    <form className='w-full my-[1.6rem] flex flex-col justify-start items-start gap-[1rem] mx-auto' onSubmit={async (e) => {

      e.preventDefault();

      if (imageSelected.imageSizeinKB > 2048) {
        createToast('error', 'Image should be less than 2MB.');
        return '';
      }

      if (!description) {
        createToast('error', "Description shouldn't be empty!");
        return '';
      }

      const toastId = createToast('loading', 'Uploading blog...');
      setUploadingLoad(true);
      const formData = new FormData(e.currentTarget);
      formData.append('description', description);
      const uploadResponse = await addABlog(formData);
      (uploadResponse === undefined) ? createToast('success', 'Blog uploaded successfully!', toastId) : createToast('error', uploadResponse.message, toastId);
      setImageSelected({
        imageName: '',
        selected: false,
        imageSizeinKB: 0
      });
      setUploadingLoad(false);
    }}>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem] mt-[1.2rem]' id='coverImageBox'>
        <div className='w-full flex flex-col justify-center items-center gap-[0.8rem] px-[0.6rem] py-[1rem] border-[1.5px] border-[#49494940] text-[#49494990] focus-within:border-[#494949] focus-within:text-[#494949] transition-all duration-300 rounded-[2px]'>
          <input type="file" name='coverImage' className='opacity-0 overflow-hidden h-0' onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const name = e.target.files[0].name;
              const size = e.target.files[0].size;
              setImageSelected({imageName: name, selected: true, imageSizeinKB: size/1024});
            }
          }} id='coverImage' accept='.svg, .png, .jpeg, .jpg' required aria-required title='Upload cover image' />
          <label htmlFor="coverImage" className='w-full flex flex-col justify-center items-center gap-[0.8rem] cursor-default sm:cursor-pointer'>
            <p className='text-center font-[500] text-[1.02rem]'>Upload Cover Image</p>
            <MdOutlineCloudUpload fontSize={36}/>
            <p className='text-center font-[400] text-[#494949E0] text-[0.92rem]'>Only PNG, SVG, JPG accepted.</p>
            {imageSelected.selected && <p className='text-center font-[500] text-[#494949] text-[0.92rem]'>File selected! ({imageSelected.imageName})</p>}
          </label>
        </div>
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem]' id='titleBox'>
        <label htmlFor="title" className='text-[#F37335] text-left font-[500] text-[0.98rem]'>Title of Blog<span className='text-[#FF0000]'>*</span></label>
        <input type="text" required aria-required placeholder='Enter title of blog' id='title' name='title' className='w-full outline-none pb-[0.5rem] border-b-[1.5px] border-b-[#49494940] text-[1.02rem] font-[400] focus:border-b-[#494949] transition-all duration-300' />
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem]' id='overviewBox'>
        <label htmlFor="overview" className='text-[#F37335] text-left font-[500] text-[0.98rem]'>Overview of Blog<span className='text-[#FF0000]'>*</span></label>
        <input type="text" required aria-required placeholder='Enter short overview' id='overview' name='overview' className='w-full outline-none pb-[0.5rem] border-b-[1.5px] border-b-[#49494940] text-[1.02rem] font-[400] focus:border-b-[#494949] transition-all duration-300' />
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem]' id='authorBox'>
        <label htmlFor="authorName" className='text-[#F37335] text-left font-[500] text-[0.98rem]'>Author of Blog<span className='text-[#FF0000]'>*</span></label>
        <input type="text" required aria-required defaultValue="18startup" placeholder='Enter author name' id='authorName' name='authorName' className='w-full outline-none pb-[0.5rem] border-b-[1.5px] border-b-[#49494940] text-[1.02rem] font-[400] focus:border-b-[#494949] transition-all duration-300' />
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem]' id='tagsBox'>
        <label htmlFor="tagsInput" className='text-[#F37335] text-left font-[500] text-[0.98rem]'>Keywords <span className='text-[#494949B0] text-[0.72rem]'>(comma seperated)</span></label>
        <input type="text" required aria-required placeholder='Enter keywords (comma seperated)' id='tagsInput' name='tagsInput' className='w-full outline-none pb-[0.5rem] border-b-[1.5px] border-b-[#49494940] text-[1.02rem] font-[400] focus:border-b-[#494949] transition-all duration-300' />
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem]' id='descriptionBox'>
        <label htmlFor="description" className='text-[#F37335] text-left font-[500] text-[0.98rem]'>Description<span className='text-[#FF0000]'>*</span></label>
        <ReactQuill modules={{ toolbar: [{ 'header': [2, 3, 4, 5, 6] }, 'bold', 'italic', 'underline', 'strike', 'link', { 'list': 'ordered'}, { 'list': 'bullet' }, { 'script': 'sub'}, { 'script': 'super' }, 'clean'] }} className='w-full h-[85vh]' theme='snow' value={description} id='description' onChange={setDescription} />
      </div>

      <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] mt-[3.2rem]' id='submitBox'>
        <button disabled={uploadingLoad ? true : false} type='submit' title='Upload new Blog' className='w-full py-[0.6rem] px-[0.7rem] flex justify-center items-center gap-[0.2rem] text-[0.98rem] border-[1.2px] border-[#F37335] rounded-[4px] bg-[#F37335] text-[#FFF] hover:bg-[#cb7a3c] focus-visible:bg-[#cb7a3c] outline-none cursor-pointer transition-all duration-300 disabled:bg-[#F3733540] disabled:text-[#FFFFFFF40] disabled:border-[#F3733540] disabled:cursor-not-allowed'>{uploadingLoad ? 'Uploading...' : 'Upload Blog'}</button>
      </div>

    </form>
  )
}

export default Newblog;