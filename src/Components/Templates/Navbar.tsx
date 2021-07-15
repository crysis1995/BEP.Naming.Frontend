import React from "react";
import * as Bootstrap from "react-bootstrap";

type Props = {
    text?: string;
};

function Navbar({text= "Warbud | BIM Naming Generator" }:Props) {
    return (
        <Bootstrap.Navbar bg="dark" variant="dark">
            <Bootstrap.Navbar.Brand>{text}</Bootstrap.Navbar.Brand>
        </Bootstrap.Navbar>
    );
}

export default Navbar;
