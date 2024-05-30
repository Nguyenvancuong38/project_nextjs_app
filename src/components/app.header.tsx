'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { localAuthenticate } from "@/helpers/localAuth";

function Header() {
    const [userName, setUserName] = useState<string | null>()

    useEffect(() => {
        const data = localAuthenticate();
        setUserName(data.user?.name);
    }, [])
    
    return (
        <header className="w-full h-14 flex justify-between items-center px-4 border-b fixed z-10 bg-white">
            <div className="font-bold text-2xl"><Link href="/">DASHBOARD</Link></div>
            <div className="font-medium">
                <a className="mr-2 flex justify-center items-center" href='/login'>
                    <p className="mr-1">{userName ? userName : 'Login'}</p>
                    <Image
                        src="/profile.jpg"
                        width={20}
                        height={20}
                        alt="Image"
                    />
                </a>
            </div>
        </header>
    )
}

export default Header;