import { useContext, useEffect } from "react";
import { Button, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function DropdownUser() {
    const style = {
        dropDownIcon: {
            width: "25px",
            heigth: "25px",
        },
        roundedImage: {
            borderRadius: "100%",
            width: "60px",
            heigth: "60px",
        }
    }
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext)
    const logout = () => {
        dispatch({
            type: "LOGOUT"
        });
    }
    
    useEffect(() => {
        if (!state.isLogin) {
            navigate("/")
        }
    }, [state])
    return (
        <NavDropdown
            title={
                <Image style={style.roundedImage} className="m-auto me-4" src={`${"/profile.png"}`} />
            }
            id="basic-nav-dropdown">
            <NavDropdown.Item as={Button} onClick={() => navigate("/profile")} className="py-2 me-5 fw-bold">
                <Image style={style.dropDownIcon} src="/user 1.png" className="m-auto me-3" />
                Profile
            </NavDropdown.Item>

            <NavDropdown.Item as={Button} onClick={() => navigate("/order")} className="py-2 me-5 fw-bold">
                <Image style={style.dropDownIcon} src="/transaction 1.png" className="m-auto me-3" />
                Order
            </NavDropdown.Item>
            <Dropdown.Divider />

            <NavDropdown.Item as={Button} onClick={() => logout()} className="py-2 me-5 fw-bold" >
                <Image style={style.dropDownIcon} src="/logout 1.png" className="m-auto me-3" />
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    )
}