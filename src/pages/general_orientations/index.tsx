import { Button } from "@chakra-ui/button";
import { Box, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination";

import { useGeneralOrientations } from "../../hooks/useGeneralOrientationsContext";

export default function GeneralOrientationsList() {
    const { generalOrientations } = useGeneralOrientations();

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading sixe="lg" fontWeight="normal"> Orientações Gerais </Heading>
                        
                        <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                            href="/general_orientations/create"
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
                                <Th> O que é </Th>
                                <Th> Para que serve </Th>
                                <Th> Tempo Médio </Th>
                                <Th>  </Th>
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>
                        
                        <Tbody>
                            {generalOrientations.map(orientation => (
                                <Tr key={orientation._id}>
                                    <Td px="6">
                                        <Checkbox colorScheme="pink"/>
                                    </Td>
                                    <Td>
                                        <Box>
                                            <Text fontWeight="bold"> {orientation.which_is} </Text>
                                        </Box>
                                    </Td>
                                    <Td>  
                                        <Text fontWeight="bold"> {orientation.what_is_it_for} </Text>
                                    </Td>
                                    <Td>  
                                        <Text fontWeight="bold"> {orientation.average_time} </Text>
                                    </Td>
                                    {/* <Td>  
                                        <Text fontWeight="bold"> {orientation.values} </Text>
                                    </Td> */}
                                    <Td>
                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="purple"
                                        leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                                        href={"/general_orientations/" + orientation._id}
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