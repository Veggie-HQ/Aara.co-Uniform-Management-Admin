import { auth, firestore, storage } from "@/firebase/clientApp";
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
import React, { useState, useRef } from "react";
// import ImageUpload from "./ImageUpload";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Index = ({ isOpen, onClose, item }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const selectFileRef = useRef(null);
  const [textInputs, setTextInputs] = useState({
    slug: item.slug,
    title: item.title,
    price: item.price,
  });
  const [gender, setGender] = useState(item.gender);
  const [sizes, setSizes] = useState(item.size);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeText = ({ target: { name, value } }) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sizeHandler = (e) => {
    setSizes(e.target.value.split(","));
  };

  const genderHandler = (e) => {
    setGender(e.target.value.split(","));
  };

  const onSelectImage = (event) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result);
      }
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ItemDetails = {
      slug: textInputs.slug,
      title: textInputs.title,
      price: textInputs.price,
      //   imageURL: "",
      gender: gender,
      size: sizes,
    };
    if (error) setError("");
    setLoading(true);
    try {
      const itemDocRef = await addDoc(
        collection(firestore, "items"),
        ItemDetails
      );
      //   Image processing
      if (selectedFile) {
        const imageRef = ref(storage, `items/${itemDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(itemDocRef, {
          imageURL: downloadURL,
        });
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setSelectedFile("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
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
              <Text>Edit Item Details</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Flex width="100%" align="center" justify="space-evenly">
                <Input
                  value={textInputs.slug}
                  width="49%"
                  required
                  name="slug"
                  placeholder="ID / Slug"
                  type="text"
                  mb={2}
                  color="black"
                  onChange={onChangeText}
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
                  value={textInputs.title}
                  width="49%"
                  required
                  name="title"
                  placeholder="Product Name"
                  type="text"
                  mb={2}
                  color="black"
                  onChange={onChangeText}
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
              </Flex>

              <Flex width="100%" align="center" justify="space-evenly">
                <Input
                  value={textInputs.price}
                  width="49%"
                  required
                  name="price"
                  placeholder="Price"
                  type="number"
                  mb={2}
                  color="black"
                  onChange={onChangeText}
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
                  value={gender.join(",")}
                  width="49%"
                  required
                  name="gender"
                  placeholder="Gender (Separate With Comma)"
                  type="text"
                  mb={2}
                  color="black"
                  onChange={genderHandler}
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
              </Flex>

              <Input
                value={sizes.join(",")}
                required
                name="sizes"
                placeholder="Sizes Available (If many, Separate With Comma)"
                type="text"
                onChange={sizeHandler}
                color="black"
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

              {/* <ImageUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                selectFileRef={selectFileRef}
                onSelectImage={onSelectImage}
              /> */}
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
              <Button
                isDisabled
                borderRadius="7pt"
                fontSize="10pt"
                fontWeight={700}
                width="100%"
                type="submit"
                height="36px"
                mt={2}
                mb={2}
                isLoading={loading}
                color="black"
                bg="orange.300"
                _hover={{
                  bg: "orange.100",
                }}
              >
                Confirm Changes
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
