import { Box, Divider, Flex, Heading, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useGeneralOrientations } from "../../hooks/useGeneralOrientationsContext";
import { useState, FormEvent } from "react";
import { ValueInterface } from "../../interfaces/value.interface";
import { useRef, useEffect } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRouter } from 'next/router';
import { api } from "../../services/api";

interface FormData {
    which_is: string
    what_is_it_for: string
    average_time: string
}

interface GeneralOrientation {
    _id: string;
    which_is: string;
    what_is_it_for: string;
    average_time: string;
    values: ValueInterface[];
}

export default function CreateGeneralOrientations() {
    

    const { updateGeneralOrientation, generalOrientations } = useGeneralOrientations();
    const [ selectedGeneralOrientationID, setGeneralOrientationID ] = useState('');

    //const generalOrientationToUpdate = generalOrientations.filter(go => go._id === id)['0'];
    //console.log(generalOrientationToUpdate);
    const [which_is, setWhichIs] = useState('');
    const [what_is_it_for, setWhatIsItFor] = useState('');
    const [average_time, setAverageTime] = useState('');
    const [values, setValues] = useState<ValueInterface[]>([]);

    const uri = '/general_orientations/';

    // const { id } = router.query;
    // console.log(id);
    // const generalOrientationToUpdate = generalOrientations.filter(go => go._id === id)['0'];
    // console.log(generalOrientationToUpdate);
    const router = useRouter();
    useEffect(()=> {
        if (!router.isReady) return

        const { id } = router.query;

        setGeneralOrientationID(id?.toString());
        
        const generalOrientationToUpdate = generalOrientations.filter(go => go._id === id)['0'];
        
        setWhichIs(generalOrientationToUpdate.which_is);
        setWhatIsItFor(generalOrientationToUpdate.what_is_it_for);
        setAverageTime(generalOrientationToUpdate.average_time);
    }, [router.isReady]);

    async function handleUpdateGeneralOrientation(event: FormEvent) {
        await updateGeneralOrientation(selectedGeneralOrientationID, {
            which_is,
            what_is_it_for,
            average_time,
            values
        });

        setWhichIs('');
        setWhatIsItFor('');
        setAverageTime('');
        setValues([]);

        router.push("/general_orientations")
    }

    return (
        <Box>
            <Header />
            <div>
                {selectedGeneralOrientationID}
            </div>
            <Form onSubmit={handleUpdateGeneralOrientation}>
                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />

                    
                    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                        <Heading size="lg" fontWeight="normal">Criar Orientação Geral</Heading>

                        <Divider my="6" borderColor="gray.700" />

                        <VStack spacing="8">
                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="what_is" label="O que é" value={which_is} onChange={event => setWhichIs(event.target.value)} />
                                <Input name="what_for" label="Para que serve" value={what_is_it_for} onChange={event => setWhatIsItFor(event.target.value)}/> 
                            </SimpleGrid> 

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="average_time" label="Tempo Médio" value={average_time} onChange={event => setAverageTime(event.target.value)} />
                                <Input name="value" label="Valores"/> 
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