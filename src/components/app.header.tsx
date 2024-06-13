'use client'

import { useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import { localAuthenticate } from "@/helpers/localAuth";
import { useUser } from "@/context/UserContext";

function Header() {
    const { userStore, setUserStore } = useUser();

    useEffect(() => {
        const data = localAuthenticate();
        if (data.user?.name) {
            setUserStore({ name: data.user?.name });
        }
    }, [setUserStore])
    
    return (
        <header className="w-full h-14 flex justify-between items-center px-4 border-b fixed z-10 bg-white">
            <div className="font-bold text-2xl"><Link href="/">DASHBOARD</Link></div>
            <div className="font-medium">
                <a className="mr-2 flex justify-center items-center" href='/login'>
                    <p className="mr-1">{userStore.name ? userStore.name : 'Login'}</p>
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