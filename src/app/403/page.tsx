import Link from "next/link";
import { Button } from 'antd';

function Page() {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center pt-14'>
            <h1 className='text-7xl font-bold mb-4'>403</h1>
            <p>You don't have permission to access on this page!</p>
            <Link href='/'>
                <Button type="link">Go to Dashboard</Button>
            </Link>
        </div>
    )
}

export default Page;