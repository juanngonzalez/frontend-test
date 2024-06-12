import { Flex, Image } from "@chakra-ui/react";

export default function MobileButtons({ handlePrevPage, handleNextPage }) {
    return (
        <Flex flexDirection="row" justifyContent="space-evenly" w="100%">
            <Image src="/arrow-left.svg" alt="left arrow" style={{ height: 60, cursor: "pointer" }} onClick={handlePrevPage} />
            <Image src="/arrow-right.svg" alt="right arrow" style={{ height: 60, cursor: "pointer" }} onClick={handleNextPage} />
        </Flex>
    );
}