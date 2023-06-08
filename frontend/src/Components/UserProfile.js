import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import ProfileTemplate from './ProfileTemplate';

const UserProfile = () => {

    const email = window.localStorage.getItem("email");
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [showEdit, setShowEdit] = useState(false)

    const [editUserDetails, setEditUserDetails] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        privacy:"",
        email: ""
    })


    const showEditForm = () => {
        setShowEdit(true)
        setEditUserDetails({
            ...editUserDetails,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            privacy: user.privacy,
            email: email
        })
    }

    const closeEditForm = () => {
        setShowEdit(false);
    }


    const handleUserUpdate = (e) => {

        e.preventDefault();

        fetch('http://localhost:4000/updateuserprofile', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(editUserDetails)
        })
        .then(response => response.json())
        .then(result => {
            if(result.msg === 'Profile Updated SuccessFully') {
                toast.success(result.msg, {
                    position: "top-center",
                    style: {
                      backgroundColor: "green",
                      color: "white",
                    },
                });

                if(editUserDetails.privacy === 'private') {
                    setTimeout(() => {
                        toast.error("Your profile is private. No one can view your profile.", {
                            position: "top-center",
                            style: {
                              backgroundColor: "red",
                              color: "white",
                            },
                        });
                    }, 1000);
                    
                }

                else {
                    setTimeout(() => {
                        toast.success("Your profile is public. Any one can view your profile.", {
                            position: "top-center",
                            style: {
                              backgroundColor: "green",
                              color: "white",
                            },
                        });
                    }, 1000);
                }

                setShowEdit(false)
                gettheUser();
            }

            else {
                toast.error(result.msg, {
                    position: "top-center",
                    style: {
                      backgroundColor: "red",
                      color: "white",
                    },
                });

                setShowEdit(true);
            }
        })

    }

    const logoutHandler = () => {
        window.localStorage.removeItem("email");
        navigate('/login');
    }

    const gettheUser = async () => {
        await fetch('http://localhost:4000/getuser', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email })
        })
            .then(response => response.json())
            .then(result => {
                setUser(result.user);
            })
    }

    useEffect(() => {
        gettheUser();
    }, [])

    return (
        <>
            <div style={{ marginTop: '8%' }}>
                <div className='w-25 row mx-auto col-10 col-md-8 col-lg-6' style={{ display: 'flex', justifyContent: 'right'}}>
                    <button className='btn btn-primary' onClick={showEditForm}>Edit Profile</button>
                </div>
                <ProfileTemplate user={user}/>
            </div>
            <div className='w-25 row mx-auto col-10 col-md-8 col-lg-6' style={{ marginTop: '2%' }}>
                <button className='btn btn-danger' onClick={logoutHandler}>LogOut</button>
            </div>

            <Modal show={showEdit} onHide={closeEditForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={user.firstname}
                                onChange={(e) =>
                                    setEditUserDetails({
                                        ...editUserDetails,
                                        firstname: e.target.value,
                                    })
                                }
                                minLength={1}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>LastName</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={user.lastname}
                                onChange={(e) =>
                                    setEditUserDetails({
                                        ...editUserDetails,
                                        lastname: e.target.value,
                                    })
                                }
                                minLength={1}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <br></br>
                            <input
                                type="radio"
                                id='male'
                                value="M"
                                onChange={(e) =>
                                    setEditUserDetails({
                                        ...editUserDetails,
                                        gender: e.target.value,
                                    })
                                }
                                name='gender'
                                checked={editUserDetails.gender === 'M' && true}
                            />
                            <Form.Label htmlFor='male'>Male</Form.Label>
                            &nbsp;&nbsp;&nbsp;
                            <input
                                type="radio"
                                id='female'
                                value="F"
                                onChange={(e) =>
                                    setEditUserDetails({
                                        ...editUserDetails,
                                        gender: e.target.value,
                                    })
                                }
                                name='gender'
                                checked={editUserDetails.gender === 'F' && true}
                            />
                            <Form.Label htmlFor='female'>Female</Form.Label>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Privacy</Form.Label>
                            <br></br>
                            <input
                                type="radio"
                                id='public'
                                value="public"
                                onChange={(e) =>
                                    setEditUserDetails({
                                        ...editUserDetails,
                                        privacy: e.target.value,
                                    })
                                }
                                name='privacy'
                                checked={editUserDetails.privacy === 'public' && true}
                            />
                            <Form.Label htmlFor='public'>Public</Form.Label>
                            &nbsp;&nbsp;&nbsp;
                            <input
                                type="radio"
                                id='private'
                                value="private"
                                onChange={(e) =>
                                    setEditUserDetails({
                                        ...editUserDetails,
                                        privacy: e.target.value,
                                    })
                                }
                                name='privacy'
                                checked={editUserDetails.privacy === 'private' && true}
                            />
                            <Form.Label htmlFor='private'>Private</Form.Label>
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEditForm}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUserUpdate}>
                        Update Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toaster/>
        </>
    )
}

export default UserProfile