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
import { IUser, registerUser } from "../services/user-service";
import { uploadPhoto } from "../services/file-service";
import { useNavigate } from "@tanstack/react-router";

export default function JoinModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isInvalid = password !== secondPassword && isSubmitted;

  const [imgSrc, setImgSrc] = useState<File>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  //   const emailInputRef = useRef<HTMLInputElement>(null)
  //   const passwordInputRef = useRef<HTMLInputElement>(null)
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

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const imgUrl = await uploadPhoto(imgSrc!);
    const user: IUser = {
      email,
      password,
      imgUrl,
    };
    const registeredUser = await registerUser(user);
    if(registeredUser) {
        console.log(registeredUser);
        localStorage.setItem('currentUser', JSON.stringify(registeredUser))
        navigate({ to: '/home/kaki' });
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Join
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Join us 🎉
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center position-relative">
                  <img
                    src={imgSrc ? URL.createObjectURL(imgSrc) : avatarLogo}
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
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  isRequired
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  isRequired
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
                  isRequired
                  type="password"
                  //   className="max-w-xs"
                  isInvalid={isInvalid}
                  errorMessage={isInvalid && "Please enter a matching password"}
                  value={secondPassword}
                  onValueChange={setSecondPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Join in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
