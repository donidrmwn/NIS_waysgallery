import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Brand from "../Brand/Brand";
import BrandImage from "../Brand/BrandImage";
import DropdownUser from "./DropdownUser";

import { useEffect } from "react";
import { useState } from "react";

export default function Navibar() {
    const navigate = useNavigate();
 
    return (
        <Navbar className="mb-3 px-5">
            <Container fluid>
                <Nav>
                    <Navbar.Brand as={Link} to={"/home"}>
                        <Brand />
                        <BrandImage
                            top={"-10px"}
                            width={"100px"}
                            left={"7.5%"}
                        />
                    </Navbar.Brand>
                </Nav>
                <Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="d-flex gap-3 align-items-center" >
                            <Button onClick={() => navigate("/upload")} style={{ width: "140px", height: "40px", backgroundColor: "#2FC4B2", border: "none" }}>Upload</Button>
                            <DropdownUser />
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Container>
            <hr />
        </Navbar>

    )
}