import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default function CreateGeneralOrientations() {
    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Heading size="lg" fontWeight="normal">Criar Orientação Geral</Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="what_is" label="O que é" />
                            <Input name="what_for" label="Para que serve"/> 
                        </SimpleGrid> 

                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input name="average_time" label="Tempo Médio" />
                            <Input name="value" label="Valores"/> 
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Button colorScheme="whiteAlpha"> Cancelar </Button>
                            <Button colorScheme="pink"> Salvar </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )
}