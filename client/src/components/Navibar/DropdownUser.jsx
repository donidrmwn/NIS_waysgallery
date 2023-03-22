import { useContext, useEffect } from "react";
import { Button, Dropdown, Image, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { API } from '../../config/api';
import { UserContext } from "../../context/userContext";
import { useState } from "react";

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
    const [isLoading, setIsLoading] = useState(false)
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
    let { data: profile } = useQuery("profileCache", async () => {
        setIsLoading(true)
        const response = await API.get("/profile/user");
        setIsLoading(false)
        return response.data.data;
    })

    return (
        <>
            {isLoading ? null :
                <NavDropdown
                    title={
                        <Image style={style.roundedImage} className="m-auto me-4" src={`${profile?.profile_picture}`} />
                    }
                    id="basic-nav-dropdown">
                    <NavDropdown.Item as={Button} onClick={() => navigate("/profile/my-profile")} className="py-2 me-5 fw-bold">
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
            }
        </>
    )
}