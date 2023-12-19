import React from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import PokemonLogo from "../assets/Poké_Ball_icon.svg";
const NavBar:React.FC = () => {
    return (
        <Navbar expand="lg" className="bg-dark navbar-dark fixed-top">
            <Container>
                <Navbar.Brand href="/" className={"d-flex justify-content-center align-items-center"}>
                    <Image src={PokemonLogo} width={40} height={40}/>
                    API Pokemon
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mx-4 px-3">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/pokemon/gen">Génération</Nav.Link>
                        <Nav.Link href="/pokemon/search">Rechercher</Nav.Link>
                        <Nav.Link href="/pokemon/advancedSearch">Recherche Avancée</Nav.Link>
                        <Nav.Link href="/pokemon/tierList">TierListe</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;