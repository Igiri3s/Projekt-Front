import './styles.css'
import {Link} from "react-router-dom";
function Navbar(){
    return (
        <nav className="nav">
            <Link to="/home" className="site-title">
                Fate character creator
            </Link>
            <ul>
                <CustomLink to={"/home"}>Home</CustomLink>
                <CustomLink to={"/create"}>Create</CustomLink>
                <CustomLink to={"/about"}>About</CustomLink>
            </ul>

        </nav>
    )
}

// eslint-disable-next-line react/prop-types
function CustomLink({ to, children, ...props }){
    const path= window.location.pathname
    return(
        <li className={path === to ? "active": ""}>
            <Link href={to} {...props}>{children}</Link>
        </li>
    )

}

export default Navbar;