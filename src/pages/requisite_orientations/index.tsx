import { Button } from "@chakra-ui/button";
import { Box, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";

import { useRequisiteOrientations } from "../../hooks/useRequisitesOrientationsContext";

export default function RequisiteOrientationsList() {
    const { requisiteOrientations } = useRequisiteOrientations();

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading sixe="lg" fontWeight="normal"> Orientações de requisitos básicos </Heading>
                        
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                            href="/requisite_orientations/create"
                        >
                            Criar Novo
                        </Button>
                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" width="8">
                                    <Checkbox />
                                </Th>
                                <Th> Divisão por fase descrição </Th>
                                <Th> Requisitos em cada fase descrição </Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requisiteOrientations.map(requisite => (
                                <Tr key={requisite._id}>
                                    <Td px="6">
                                        <Checkbox colorScheme="pink"/>
                                    </Td>
                                    <Td>  
                                        <Text fontWeight="bold"> { requisite.division_description } </Text>
                                    </Td>
                                    <Td>  
                                        <Text fontWeight="bold"> { requisite.requisites_description } </Text>
                                    </Td>
                                    <Td>
                                        <Button
                                            as="a"
                                            size="sm"
                                            fontSize="sm"
                                            colorScheme="purple"
                                            leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                                            href={"/requisite_orientations/" + requisite._id}
                                        >
                                            Editar
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>

                    <Pagination />
                </Box>
            </Flex>
        </Box>
    )
}