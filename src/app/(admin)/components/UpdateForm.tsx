'use client';
import React, {useState, useEffect} from 'react';

// Types
import { BlogType } from "@/types";

// React Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Utils
import createToast from '@/utils/createToast';

// React Icons
import { MdOutlineCloudUpload } from 'react-icons/md';

// Actions
import { getBlogBySlug, updateABlogById } from '@/actions/blogs';

const UpdateForm = ({blogId, blogSlug, setBlogShow}: {blogId: string, blogSlug: string, setBlogShow: React.Dispatch<React.SetStateAction<boolean>>}) => {

    const [gettingBlogDetailsLoad, setGettingBlogDetailsLoad] = useState(false);

    const [updateDetails, setUpdateDetails] = useState({
        // title: '',
        overview: '',
        authorName: '',
    })

    const [imageSelected, setImageSelected] = useState({
        imageName: '',
        selected: false,
        imageSizeinKB: 0
    })

    const [blogDescUpdate, setBlogDescUpdate] = useState('');

    const fetchBlogDetails = async () => {
        setGettingBlogDetailsLoad(true);
        const toastId = createToast('loading', 'Fetching blog details...');
        const blog = await getBlogBySlug(blogSlug);
        if (blog) {
            createToast('success', 'Blog details fetched!', toastId);
            setUpdateDetails({
                // title: blog.title,
                overview: blog.overview,
                authorName: blog.authorName,
            });
            setBlogDescUpdate(blog.description)
        } else {
            createToast('error', 'Issue fetching blog. Try again!', toastId);
        }
        setGettingBlogDetailsLoad(false);
    }

    useEffect(() => {
        fetchBlogDetails();
        // eslint-disable-next-line
    }, []);

    const [updatingLoad, setUpdatingLoad] = useState(false);

    if (gettingBlogDetailsLoad) {
        return (
            <div className="w-full p-[0.8rem] flex-1 h-[100%] flex justify-center items-center">
                <p className="text-center text-[1.02rem] text-[#494949] font-[500]">Loading Details...</p>
            </div>
        )
    }


    return (
        <form className='w-full p-[0.8rem] flex flex-col justify-start items-start gap-[0.8rem]' onSubmit={async (e) => {
            e.preventDefault();

            if (imageSelected.imageSizeinKB > 2048) {
                createToast('error', 'Image should be less than 2MB.');
                return '';
            }

            if (!blogDescUpdate) {
                createToast('error', "Description shouldn't be empty!");
                return '';
            }

            const toastId = createToast('loading', 'Updating blog...');
            setUpdatingLoad(true);
            const formData = new FormData(e.currentTarget);
            if (!imageSelected.selected) {
                formData.delete('coverImage');
            }
            formData.append('description', blogDescUpdate);
            const updateResponse = await updateABlogById(formData, blogId);
            (updateResponse === undefined) ? createToast('success', 'Blog updated successfully!', toastId) : createToast('error', updateResponse.message, toastId);
            setUpdatingLoad(false);
            setImageSelected({
                imageName: '',
                selected: false,
                imageSizeinKB: 0
            });
            setBlogShow(false);
        }}>

            <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] my-[0.6rem] mt-[1.2rem]' id='coverImageBox'>
                <div className='w-full flex flex-col justify-center items-center gap-[0.8rem] px-[0.6rem] py-[1rem] border-[1.5px] border-[#49494940] text-[#49494990] focus-within:border-[#494949] focus-within:text-[#494949] transition-all duration-300 rounded-[2px]'>
                <input type="file" name='coverImage' className='opacity-0 overflow-hidden h-0' onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const name = e.target.files[0].name;
                        const size = e.target.files[0].size;
                        setImageSelected({imageName: name, selected: true, imageSizeinKB: size/1024});
                    }
                }} id='coverImage' accept='.svg, .png, .jpeg, .jpg' title='Update cover image' />
                <label htmlFor="coverImage" className='w-full flex flex-col justify-center items-center gap-[0.8rem] cursor-default sm:cursor-pointer'>
                    <p className='text-center font-[500] text-[1.02rem]'>Update Cover Image</p>
                    <MdOutlineCloudUpload fontSize={36}/>
                    <p className='text-center font-[400] text-[#494949E0] text-[0.92rem]'>Only PNG, SVG, JPG accepted.</p>
                    {imageSelected.selected && <p className='text-center font-[500] text-[#494949] text-[0.92rem]'>File selected! ({imageSelected.imageName})</p>}
                </label>
                </div>
            </div>

            {/* <div className='w-full flex flex-col justify-start items-start gap-[0.4rem] my-[0.4rem]' id='overviewBox'>
                <label htmlFor="title" className='text-[#F37335] text-left font-[500] text-[0.92rem]'>Title of Blog<span className='text-[#FF0000]'>*</span></label>
                <input type="text" required aria-required placeholder='Enter Title of blog' id='title' name='title' className='w-full outline-none pb-[0.4rem] border-b-[1.5px] border-b-[#49494940] text-[0.96rem] font-[400] focus:border-b-[#494949] transition-all duration-300' value={updateDetails.title} onChange={(e) => {setUpdateDetails({...updateDetails, [e.target.name]: e.target.value})}} />
            </div> */}

            <div className='w-full flex flex-col justify-start items-start gap-[0.4rem] my-[0.4rem]' id='overviewBox'>
                <label htmlFor="overview" className='text-[#F37335] text-left font-[500] text-[0.92rem]'>Overview of Blog<span className='text-[#FF0000]'>*</span></label>
                <input type="text" required aria-required placeholder='Enter overview of blog' id='overview' name='overview' className='w-full outline-none pb-[0.4rem] border-b-[1.5px] border-b-[#49494940] text-[0.96rem] font-[400] focus:border-b-[#494949] transition-all duration-300' value={updateDetails.overview} onChange={(e) => {setUpdateDetails({...updateDetails, [e.target.name]: e.target.value})}} />
            </div>

            <div className='w-full flex flex-col justify-start items-start gap-[0.4rem] my-[0.4rem]' id='authorBox'>
                <label htmlFor="authorName" className='text-[#F37335] text-left font-[500] text-[0.92rem]'>Author of Blog<span className='text-[#FF0000]'>*</span></label>
                <input type="text" defaultValue="18startup" required aria-required placeholder='Enter Author of blog' id='authorName' name='authorName' className='w-full outline-none pb-[0.4rem] border-b-[1.5px] border-b-[#49494940] text-[0.96rem] font-[400] focus:border-b-[#494949] transition-all duration-300' value={updateDetails.authorName} onChange={(e) => {setUpdateDetails({...updateDetails, [e.target.name]: e.target.value})}} />
            </div>
            
            <div className='w-full flex flex-col justify-start items-start gap-[0.4rem] my-[0.4rem]' id='descriptionBox'>
                <label htmlFor="authorName" className='text-[#F37335] text-left font-[500] text-[0.92rem]'>Description<span className='text-[#FF0000]'>*</span></label>
                <ReactQuill modules={{ toolbar: [{ 'header': [2, 3, 4, 5, 6] }, 'bold', 'italic', 'underline', 'strike', 'link', { 'list': 'ordered'}, { 'list': 'bullet' }, { 'script': 'sub'}, { 'script': 'super' }, 'clean'] }} className='w-full h-[60vh]' theme='snow' value={blogDescUpdate} id='description' onChange={setBlogDescUpdate} />
            </div>

            

            <div className='w-full flex flex-col justify-start items-start gap-[0.6rem] mt-[3rem]' id='submitBox'>
                <button disabled={updatingLoad ? true : false} type='submit' title='Update Blog' className='w-full py-[0.6rem] px-[0.7rem] flex justify-center items-center gap-[0.2rem] text-[0.98rem] border-[1.2px] border-[#F37335] rounded-[4px] bg-[#F37335] text-[#FFF] hover:bg-[#cb7a3c] focus-visible:bg-[#cb7a3c] outline-none cursor-pointer transition-all duration-300 disabled:bg-[#F3733540] disabled:text-[#FFFFFFF40] disabled:border-[#F3733540] disabled:cursor-not-allowed'>{updatingLoad ? 'Updating...' : 'Update Blog'}</button>
            </div>

        </form>
    )
}

export default UpdateForm;