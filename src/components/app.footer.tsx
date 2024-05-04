function Footer() {
    return (
        <footer className="w-full h-14 flex justify-center items-center border-t">
            <p className="font-normal text-sm font-red-500 text-slate-500">System management ©{new Date().getFullYear()} Created by MEVN</p>
        </footer>
    )
}

export default Footer;