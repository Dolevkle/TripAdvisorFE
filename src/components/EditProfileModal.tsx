import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react";
import { ChangeEvent, useRef, useState } from "react";
import avatarLogo from "../assets/avatar.jpeg";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import {editProfile, IUser, registerUser} from "../services/user-service";
import { uploadPhoto } from "../services/file-service";
import { useNavigate } from "@tanstack/react-router";
import useCurrentUser from "../hooks/useCurrentUser.tsx";

export default function EditProfileModal({isOpen, handleClose}) {
    const currentUser = useCurrentUser();

    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(currentUser.username);
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [imgUrl, setImgUrl] = useState(currentUser.imgUrl);
    const [secondPassword, setSecondPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const isInvalid = password !== secondPassword && isSubmitted;

    const [imgSrc, setImgSrc] = useState<File>();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0]);
        }
    };
    const selectImg = () => {
        console.log("Selecting image...");
        fileInputRef.current?.click();
    };

    const handleSubmit =  async () => {
        setIsSubmitted(true);
        const img = imgSrc ? await uploadPhoto(imgSrc!) : "";
        const user = {
            ...(username !== currentUser.username && {"username": username}),
            ...(password && password !== currentUser.password && {"password": password}),
            ...(img && {"imgUrl": img}),
            ...(firstName !== currentUser.firstName && {"firstName": firstName}),
            ...(lastName !== currentUser.lastName && {"lastName": lastName}),
        };

        if(user[0]) {
            const edited = await editProfile(currentUser._id, user);

            if (edited) {
                localStorage.setItem('currentUser', JSON.stringify(edited))
                console.log("Edited successfully!")
                handleClose();
            }
            console.log(user)
        } else { console.log("Nothing changed")}
    };

    return (
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalContent>

                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Edit profile
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center justify-center position-relative">
                                    <img
                                        src={imgSrc ? URL.createObjectURL(imgSrc) : imgUrl}
                                        className="h-24 w-24 rounded-full border border-foreground-300"
                                    />
                                    <button
                                        type="button"
                                        className="btn position-absolute bottom-0 end-0 pl-20"
                                        onClick={selectImg}
                                    >
                                        <FontAwesomeIcon
                                            icon={faImage}
                                            className="fa-xl text-default"
                                        />
                                    </button>
                                </div>

                                <input
                                    style={{ display: "none" }}
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={imgSelected}
                                ></input>
                                <Input
                                    type="text"
                                    label="Username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onValueChange={setUsername}
                                />
                                <Input
                                    type="text"
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onValueChange={setFirstName}
                                />
                                <Input
                                    type="text"
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onValueChange={setLastName}
                                />
                                <Input
                                    label="Password"
                                    placeholder="Enter new password"
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    value={password}
                                    onValueChange={setPassword}
                                />
                                <Input
                                    label="Password"
                                    placeholder="Enter matching password"
                                    type="password"
                                    //   className="max-w-xs"
                                    isInvalid={isInvalid}
                                    errorMessage={isInvalid && "Please enter a matching password"}
                                    value={secondPassword}
                                    onValueChange={setSecondPassword}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={handleClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSubmit}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                </ModalContent>
            </Modal>
    );
}
