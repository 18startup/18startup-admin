'use server';

// Types
import { BlogType } from "@/types";

// Next.js
import { revalidatePath } from "next/cache";

// 1. Fetch all blogs

export const getAllBlogs =  async () => {
    try {
        
        const response = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/blogs`, {
            method: 'GET',
        });
    
        const blogsData = await response.json();
    
        if (!response.ok) {
            console.log(blogsData);
            throw new Error('Issue fetching blogs. Try again!');
        }

        const { blogs }: { blogs: BlogType[] } = blogsData; 

        return blogs;

    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
}

// 2. Get single blog using slug

export const getBlogBySlug = async (slug: string) => {
    try {
        
        const response = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/blogs/${slug}`, {
            method: 'GET',
        });
    
        const blogData = await response.json();
    
        if (!response.ok) {
            console.log(blogData);
            throw new Error('Issue fetching blog details. Try again!');
        }

        const { blog }: { blog: BlogType } = blogData; 

        return blog;

    } catch (error) {
        console.log(error);
        throw new Error('Internal Server Error');
    }
}

// 3. Add a Blog

export const addABlog = async (formData: FormData) => {
    const tagsInput = formData.get('tagsInput')?.toString();
    const tags = tagsInput?.split(',').map((value: string) => value.trim());

    formData.delete('tagsInput');
    formData.append('tags', JSON.stringify(tags));


    try {
        
        const addResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/blogs/add`, {
            method: 'POST',
            body: formData
        });

        const responseData = await addResponse.json();
        console.log(responseData);

        if (!addResponse.ok) {
            console.log(responseData);
            return {
                status: 'error',
                message: 'Issue adding blog. Try again!'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }

    revalidatePath('/');

}

// 4. Delete a blog

export const deleteABlogById = async (blogId: string) => {

    if (!blogId) {
        return {
            status: 'error',
            message: 'Invalid Blog. Try again!'
        }
    }

    try {

        const deleteResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/blogs/${blogId}`, {
            method: 'DELETE'
        });

        const responseData = await deleteResponse.json();

        if (!deleteResponse.ok) {
            return {
                status: 'error',
                message: 'Issue deleting blog. Try again!'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }

    revalidatePath('/');
}

// 5. Update a blog

export const updateABlogById = async (formData: FormData, blogId: string) => {
    
    if (!blogId) {
        return {
            status: 'error',
            message: 'Invalid Blog!'
        }
    }

    try {
        
        const updateResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/blogs/${blogId}`, {
            method: 'PATCH',
            body: formData
        });

        const responseData = await updateResponse.json();

        if (!updateResponse.ok) {
            console.log(responseData);
            return {
                status: 'error',
                message: 'Issue updating blog. Try again!'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }

    revalidatePath('/');
}