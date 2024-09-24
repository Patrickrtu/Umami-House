
export default function Header(){
    return(
        <nav className = 'nav-header'>
            <span className="nav-logo "> Logo Image here </span>

            <ul className="nav-list" >
                {/* Clicking the Logo or Home would take a user to the landing page */}
                <li> Home </li>
                <li> Menu </li>
                <li> Make Reservation </li>
                <li> Order Food / Takeout</li>
                <li> Contact Us</li>
            </ul>
        </nav>
    );
}