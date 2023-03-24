import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Auth from "@/components/Modal/Auth";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathName = router.pathname;

  const logout = async () => {
    await signOut(auth);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      height="75px"
      bg="white"
      boxShadow="0px 10px 15px 10px rgb(0 0 0 / 15%)"
      backdropFilter="blur(8px)"
      //   position="fixed"
      width="100%"
      zIndex={999}
      align="center"
      justify="space-between"
      borderRadius="0px 0px 10px 10px"
      color="black"
    >
      <Flex
        margin="0px auto"
        width="90%"
        align="center"
        justify="space-between"
      >
        <Flex width="65%">
          <Link href="/">
            <Image src="/assets/logo.jpg" alt="Aara Logo" width="85px" />
          </Link>
        </Flex>

        {user && (
          <>
            <Flex align="center" width="35%" justify="space-evenly">
              <Link href="/">
                <Text
                  cursor="pointer"
                  fontSize="10pt"
                  fontWeight={500}
                  color={pathName === "/" ? "orange.500" : "black"}
                >
                  Home
                </Text>
              </Link>

              <Link href="/stats">
                <Text
                  cursor="pointer"
                  fontSize="10pt"
                  fontWeight={500}
                  color={pathName.slice(1) === "stats" ? "orange.500" : "black"}
                >
                  Stats
                </Text>
              </Link>

              <Link href="/inventory">
                <Text
                  cursor="pointer"
                  fontSize="10pt"
                  fontWeight={500}
                  color={
                    pathName.slice(1) === "inventory" ? "orange.500" : "black"
                  }
                >
                  Inventory
                </Text>
              </Link>

              <Flex direction="column" align="center">
                <Flex>
                  <Text>Hi</Text>
                  <Text fontWeight={800} ml={1}>
                    {user?.displayName || user?.email?.split("@")[0]}!
                  </Text>
                </Flex>
                <Button
                  borderRadius="7pt"
                  fontSize="10pt"
                  fontWeight={700}
                  color="black"
                  bg="orange.300"
                  _hover={{
                    bg: "orange.100",
                  }}
                  onClick={() => logout()}
                >
                  Sign Out
                </Button>
              </Flex>
            </Flex>
          </>
        )}
        {!user && (
          <>
            <Auth isOpen={isOpen} onClose={onClose} />
            <Button
              borderRadius="7pt"
              fontSize="10pt"
              fontWeight={700}
              color="black"
              bg="orange.300"
              _hover={{
                bg: "orange.100",
              }}
              onClick={() => onOpen()}
            >
              Login
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Nav;
