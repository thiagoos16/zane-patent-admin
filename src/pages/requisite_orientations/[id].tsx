import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button, FormLabel, IconButton } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useRequisiteOrientations } from "../../hooks/useRequisitesOrientationsContext";
import { useState, FormEvent } from "react";
import { useEffect } from "react";
import { Form } from "@unform/web";
import { useRouter } from 'next/router';
import { Textarea } from "../../components/Form/Textarea";
import { RiAddLine } from "react-icons/ri";

import { DivisionsInterface } from "../../interfaces/divisions.interface";  
import { RequisitesInterface } from "../../interfaces/requisites.interface"; 

import { RequisiteOrientation } from "../../interfaces/requisiteOrientation.interface";

type FormData = Omit<RequisiteOrientation, '_id'>; 

export default function CreateRequisiteOrientations() {
    const { updateRequisiteOrientation, requisiteOrientations } = useRequisiteOrientations();
    const [ selectedRequisiteOrientationID, setRequisiteOrientationID ] = useState('');

    const [division_description, setDivisionDescription] = useState('');
    const [division_by_phase, setDivisionByPhase] = useState<DivisionsInterface[]>([]);
    const [requisites_description, setRequistesDescription] = useState('');
    const [requisite_by_phase, setRequisiteByPhase] = useState<RequisitesInterface[]>([]);

    const uri = '/requisites_orientations/';

    const router = useRouter();

    useEffect(()=> {
        if (!router.isReady) return

        const { id } = router.query;

        setRequisiteOrientationID(id?.toString());
        
        const generalRequisiteToUpdate = requisiteOrientations.filter(go => go._id === id)['0'];
        
        setDivisionDescription(generalRequisiteToUpdate.division_description);
        setRequistesDescription(generalRequisiteToUpdate.requisites_description);
    }, [router.isReady]);

    async function handleUpdateRequisiteOrientation(event: FormEvent) {
        await updateRequisiteOrientation(selectedRequisiteOrientationID, {
            division_description,
            division_by_phase,
            requisites_description,
            requisite_by_phase
        });

        setDivisionDescription('');
        setDivisionByPhase([]);
        setRequistesDescription('');
        setRequisiteByPhase([]);

        router.push("/general_orientations")
    }

    return (
        <Box>
            <Header />
            <Form onSubmit={handleUpdateRequisiteOrientation}>
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
                                <Textarea name="division_description" label="Divisão por fase descrição" value={division_description} onChange={event => setDivisionDescription(event.target.value)} />
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="division_title" label="Título da divisão"/> 
                                <Textarea name="division_description" label="Descrição da divisão"/> 
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" w="100%">
                                <Flex justify="flex-start">
                                    <HStack>
                                        <IconButton
                                            as="a"
                                            aria-label="Add mais uma fase" 
                                            colorScheme="pink"
                                            icon={<RiAddLine />} 
                                        />
                                    </HStack>
                                </Flex>
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <FormLabel>Requisitos por Fase</FormLabel>
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Textarea name="requisites_description" label="Requisitos por fase descrição" value={requisites_description} onChange={event => setRequistesDescription(event.target.value)} />
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="requisite_title" label="Título do requisito"/> 
                                <Textarea name="requisite_description" label="Descrição do requisito"/> 
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" w="100%">
                                <Flex justify="flex-start">
                                    <HStack>
                                        <IconButton
                                            as="a"
                                            aria-label="Add mais um requisito" 
                                            colorScheme="pink"
                                            icon={<RiAddLine />} 
                                        />
                                    </HStack>
                                </Flex>
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
            </Form>
        </Box>
    )
}