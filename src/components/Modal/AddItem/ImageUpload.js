import React, { Ref } from "react";
import { Flex, Stack, Button, Image } from "@chakra-ui/react";

const ImageUpload = ({
  selectedFile,
  setSelectedFile,
  selectFileRef,
  onSelectImage,
}) => {
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            maxWidth="200px"
            maxHeight="2s00px"
            alt="Selected Image"
          />
          <Stack direction="row" mt={4}>
            <Button
              color="#D8863D"
              size="sm"
              bg="#27201A"
              _hover={{ opacity: 0.7 }}
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={10}
          border="1px dashed"
          borderColor="gray.200"
          borderRadius={4}
          width="100%"
        >
          <Button
            color="#D8863D"
            size="sm"
            bg="#27201A"
            _hover={{ opacity: 0.7 }}
            onClick={() => selectFileRef.current.click()}
          >
            Add Image
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/*"
            hidden
            ref={selectFileRef}
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default ImageUpload;
