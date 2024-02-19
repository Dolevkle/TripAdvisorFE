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
import { useState } from "react";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";

export default function JoinModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isInvalid = password !== secondPassword && isSubmitted;

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
                <Button color="primary" onPress={() => setIsSubmitted(true)}>
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
