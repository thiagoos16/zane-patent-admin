import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button, FormLabel, IconButton } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Textarea } from "../../components/Form/Textarea";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine } from "react-icons/ri";

import { useRequisiteOrientations } from "../../hooks/useRequisitesOrientationsContext";
import { useState, FormEvent } from "react";
import { DivisionsInterface } from "../../interfaces/divisions.interface";  
import { RequisitesInterface } from "../../interfaces/requisites.interface";  
import { useRouter } from 'next/router';

import { Form } from "@unform/web";
import { Scope } from "@unform/core";

interface divisionInput extends DivisionsInterface {
    fieldId: string;
}

export default function CreateRequisiteOrientations() {
    const router = useRouter();

    const { createRequisiteOrientation } = useRequisiteOrientations();

    const [division_description, setDivisionDescription] = useState('');
    const [division_by_phase, setDivisionByPhase] = useState<DivisionsInterface[]>([]);
    const [requisites_description, setRequistesDescription] = useState('');
    const [requisite_by_phase, setRequisiteByPhase] = useState<RequisitesInterface[]>([]);

    async function handleNewRequisiteOrientation(event: FormEvent) {
        console.log(event);
        // await createRequisiteOrientation({
        //     division_description,
        //     division_by_phase,
        //     requisites_description,
        //     requisite_by_phase
        // });

        // setDivisionDescription('');
        // setDivisionByPhase([]);
        // setRequistesDescription('');
        // setRequisiteByPhase([]);

        // router.push("/requisites_orientations")
    }

    const [inputListDivisions, setInputListDivisions] = useState([]);

    const onAddNewDivisionInput = event => {
        setInputListDivisions(inputListDivisions.concat(
            <SimpleGrid key={inputListDivisions.length} minChildWidth="240px" spacing="8" w="100%">
                <Scope path={"division_by_phase[" + inputListDivisions.length + "]"}>
                    <Input name={"title"} label="Título da divisão"/> 
                    <Textarea name={"description"} label="Descrição da divisão"/> 
                </Scope>
            </SimpleGrid>
        ));
    }

    const [inputListRequisites, setInputListRequisites] = useState([]);

    const onAddNewRequisiteInput = event => {
        setInputListRequisites(inputListRequisites.concat(
            <SimpleGrid key={inputListRequisites.length} minChildWidth="240px" spacing="8" w="100%">
                <Scope path={"requisite_by_phase[" + inputListRequisites.length + "]"}>
                    <Input name="title" label="Título do requisito"/> 
                    <Textarea name="description" label="Descrição do requisito"/>
                </Scope>  
            </SimpleGrid> 
        ));
    }

    return (
        <Box>
            <Header />
                <Form onSubmit={handleNewRequisiteOrientation}>
                    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                        <Sidebar />

                        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                            <Heading size="lg" fontWeight="normal">Criar Orientação de Requisitos Básicos</Heading>

                            <Divider my="6" borderColor="gray.700" />

                            <VStack spacing="8">
                                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                    <FormLabel>Divisão por Fase</FormLabel>
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                    <Textarea name="division_description" label="Divisão por fase descrição"/>
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                    <Scope path={"division_by_phase[" + inputListDivisions.length + "]"}>
                                        <Input name="title" label="Título da divisão"/> 
                                        <Textarea name="description" label="Descrição da divisão"/> 
                                    </Scope>
                                </SimpleGrid>

                                { inputListDivisions }

                                <SimpleGrid minChildWidth="240px" w="100%">
                                    <Flex justify="flex-start">
                                        <HStack>
                                            <IconButton
                                                as="a"
                                                aria-label="Add mais uma fase" 
                                                colorScheme="pink"
                                                icon={<RiAddLine />} 
                                                onClick={onAddNewDivisionInput}
                                            />
                                        </HStack>
                                    </Flex>
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                    <FormLabel>Requisitos por Fase</FormLabel>
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                    <Textarea name="requisites_description" label="Requisitos por fase descrição"/>
                                </SimpleGrid>

                                <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                    <Scope path={"requisite_by_phase[" + inputListRequisites.length + "]"}>
                                        <Input name="title" label="Título do requisito"/> 
                                        <Textarea name="description" label="Descrição do requisito"/>
                                    </Scope> 
                                </SimpleGrid>

                                { inputListRequisites }

                                <SimpleGrid minChildWidth="240px" w="100%">
                                    <Flex justify="flex-start">
                                        <HStack>
                                            <IconButton
                                                as="a"
                                                aria-label="Add mais um requisito" 
                                                colorScheme="pink"
                                                icon={<RiAddLine />}
                                                onClick={onAddNewRequisiteInput}
                                            />
                                        </HStack>
                                    </Flex>
                                </SimpleGrid>
                            </VStack>

                            <Flex mt="8" justify="flex-end">
                                <HStack spacing="4">
                                    <Button colorScheme="whiteAlpha"> Cancelar </Button>
                                    <Button colorScheme="pink" type="submit"> Salvar </Button>
                                </HStack>
                            </Flex>
                        </Box>
                    </Flex>
                </Form>
        </Box>
    )
}