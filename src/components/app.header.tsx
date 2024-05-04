import Link from "next/link";

function Header() {
    return(
        <header className="w-full h-14 flex justify-between items-center px-4 border-b fixed z-10 bg-white">
            <div className="font-bold text-2xl"><Link href="/">DASHBOARD</Link></div>
            <div className="font-medium">
                <Link className="mr-2" href='/login'>Login</Link>
                <Link href='/create'>Create</Link>
            </div>
        </header>
    )
}

export default Header;