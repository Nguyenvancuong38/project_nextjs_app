'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { useEffect } from "react";
import { localAuthenticate } from "@/helpers/localAuth";
import { signout } from "@/api/auth";
import { Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import { useUser } from "@/context/UserContext";

function Header() {
    const route = useRouter();
    const { userStore, setUserStore } = useUser();

    const handleLogout = async () => {
        await signout();
        setUserStore({ name: null});
        route.push('/');
    }

    const items: MenuProps['items'] = [
        {
          label: <p onClick={handleLogout}>Logout</p>,
          key: '0',
        }
      ];

    return (
        <header className="w-full h-14 flex justify-between items-center px-4 border-b fixed z-10 bg-white">
            <div className="font-bold text-2xl"><Link href="/">DASHBOARD</Link></div>
            <div className="font-medium">
                {!userStore.name ?
                    <a className="mr-2 flex justify-center items-center text-sky-600" href='/login'>
                        <p className="mr-1">{'Login'}</p>
                    </a>
                    :
                    <Dropdown className="mr-2 flex justify-center items-center cursor-pointer" menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <p className="mr-1">{userStore.name}</p>
                                <Image
                                    src="/profile.jpg"
                                    width={20}
                                    height={20}
                                    alt="Image"
                                />
                            </Space>
                        </a>
                    </Dropdown>
                }
            </div>
        </header>
    )
}

export default Header;