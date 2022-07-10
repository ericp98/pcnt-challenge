import logo from '../assets/logo-pcnt.svg'

function Navbar() {
    return (
        <>
            <div className="flex pb-4">
                <img src={logo} alt="pcnt-logo" />
            </div>
        </>
    )
}

export default Navbar