import Link from 'next/link';

function ManageData() {
    return (
        <div className='pt-14 w-full flex justify-center items-center p-24 h-screen'>
            <Link className='w-40 h-60 border mr-4 rounded-md flex justify-center items-center bg-orange-200 text-neutral-600' href='/manage-data/user'>
                <p className='font-bold'>USER</p>
            </Link>

            <Link className='w-40 h-60 border mr-4 rounded-md flex justify-center items-center bg-orange-200 text-neutral-600' href='/manage-data/product'>
                <p className='font-bold'>PRODUCT</p>
            </Link>

            <Link className='w-40 h-60 border mr-4 rounded-md flex justify-center items-center bg-orange-200 text-neutral-600' href='/manage-data/type'>
                <p className='font-bold'>TYPE</p>
            </Link>

            <Link className='w-40 h-60 border mr-4 rounded-md flex justify-center items-center bg-orange-200 text-neutral-600' href='/manage-data/department'>
                <p className='font-bold'>DEPARTMENT</p>
            </Link>
        </div>
    )
}

export default ManageData;