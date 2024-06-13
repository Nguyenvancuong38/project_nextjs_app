'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import { useEffect, useState } from "react";
import { localAuthenticate } from "@/helpers/localAuth";
import { signout } from "@/api/auth";
import { Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';

function Header() {
    const route = useRouter();
    const [nameUser, setNameUser] = useState();

    useEffect(() => {
        const { isAuthenticated, user } = localAuthenticate();
        if (isAuthenticated) {
            setNameUser(user.name);
        }
    }, [])

    const handleLogout = async () => {
        await signout();
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
                {!nameUser ?
                    <a className="mr-2 flex justify-center items-center" href='/login'>
                        <p className="mr-1">{'Login'}</p>
                    </a>
                    :
                    <Dropdown className="mr-2 flex justify-center items-center" menu={{ items }} trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <p className="mr-1">{nameUser}</p>
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