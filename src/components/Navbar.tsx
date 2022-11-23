import { Button, Container, Nav, Navbar as Navbarbs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    return (<Navbarbs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to="/Store" as={NavLink}>
                    Store
                </Nav.Link>
                <Nav.Link to="/About" as={NavLink}>
                    About
                </Nav.Link>
            </Nav>
            {cartQuantity > 0 && (<Button onClick={openCart}
                style={{
                    width: "3rem", height: "3rem", position: "relative"
                }} variant="outline-primary" className="rounded-circle">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="24.000000pt" height="24.000000pt" viewBox="0 0 24.000000 24.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M10 210 c0 -5 4 -10 10 -10 16 0 34 -43 34 -85 l1 -40 68 -3 c42 -2 67 1 67 8 0 6 -25 10 -61 10 -37 0 -58 4 -54 10 3 6 26 10 50 10 42 0 46 2 65 40 11 21 20 42 20 45 0 3 -36 5 -80 5 -47 0 -80 4 -80 10 0 6 -9 10 -20 10 -11 0 -20 -4 -20 -10z m158 -55 c-16 -36 -80 -36 -96 0 l-12 25 60 0 60 0 -12 -25z" />
                        <path d="M54 49 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z" />
                        <path d="M154 49 c-10 -17 13 -36 27 -22 12 12 4 33 -11 33 -5 0 -12 -5 -16 -11z" />
                    </g>
                </svg>
                <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                        color: "white",
                        width: "1.5rem",
                        height: "1.5rem",
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                    }}>
                    {cartQuantity}</div>
            </Button>
            )
            }
        </Container>
    </Navbarbs>
    )
}