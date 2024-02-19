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
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate({ to: '/home/kaki' })
  }

  return (
    <>
      <Button color="primary" variant="bordered" onPress={onOpen}>
        Sign In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
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
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSignIn}>
                  Sign In
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
