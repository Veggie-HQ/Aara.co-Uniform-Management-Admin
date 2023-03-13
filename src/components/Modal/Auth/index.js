import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Index = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, user, loading, userError] =
    useSignInWithEmailAndPassword(auth);

  const onChange = (event) => {
    setUserDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (error) setError("");

    try {
      signInWithEmailAndPassword(userDetails.email, userDetails.password);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
              color="black"
              fontWeight={800}
              fontSize="12pt"
              align="center"
              justify="center"
            >
              <Text>Login to Aara Admin</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Input
                required
                name="email"
                placeholder="Email"
                type="email"
                mb={2}
                onChange={onChange}
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                bg="gray.50"
              />
              <Input
                required
                name="password"
                placeholder="Password"
                type="password"
                onChange={onChange}
                fontSize="10pt"
                mb={2}
                _placeholder={{ color: "gray.500" }}
                _hover={{
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                _focus={{
                  outline: "none",
                  bg: "white",
                  border: "1px solid",
                  borderColor: "blue.500",
                }}
                bg="gray.50"
              />
              <Button
                width="100%"
                type="submit"
                height="36px"
                mt={2}
                mb={2}
                isLoading={loading}
              >
                Log In
              </Button>
              {userError && (
                <Text
                  color="red.500"
                  fontWeight="600"
                  fontSize="9pt"
                  textAlign="center"
                  mb={3}
                >
                  {" "}
                  {FIREBASE_ERRORS[userError.message]}
                </Text>
              )}
            </form>

            {userError && (
              <Text
                color="red.500"
                fontWeight="600"
                fontSize="9pt"
                textAlign="center"
                mb={3}
              >
                {FIREBASE_ERRORS[userError.message]}
              </Text>
            )}
            {error && (
              <Text
                color="red.500"
                fontWeight="600"
                fontSize="9pt"
                textAlign="center"
                mb={3}
              >
                {error}
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
