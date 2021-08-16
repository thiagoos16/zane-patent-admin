import { Box, Divider, Flex, Icon, Heading, VStack, SimpleGrid, HStack, Button, FormLabel, IconButton } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Textarea } from "../../components/Form/Textarea";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useGeneralOrientations } from "../../hooks/useGeneralOrientationsContext";
import { useState, FormEvent } from "react";
import { ValueInterface } from "../../interfaces/value.interface";
import { Form } from "@unform/web";
import { useRouter } from 'next/router';
import { RiAddLine } from "react-icons/ri";

export default function CreateGeneralOrientations() {
    const router = useRouter();

    const { createGeneralOrientation } = useGeneralOrientations();

    const [which_is, setWhichIs] = useState('');
    const [what_is_it_for, setWhatIsItFor] = useState('');
    const [average_time, setAverageTime] = useState('');
    const [values, setValues] = useState<ValueInterface[]>([]);
    
    async function handleNewGeneralOrientation(event: FormEvent) {
        await createGeneralOrientation({
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
            <Form onSubmit={handleNewGeneralOrientation}>
                <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                    <Sidebar />
                    
                    <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                        <Heading size="lg" fontWeight="normal">Criar Orientação Geral</Heading>

                        <Divider my="6" borderColor="gray.700" />

                        <VStack spacing="8">
                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Textarea name="which_is" label="O que é" value={which_is} onChange={event => setWhichIs(event.target.value)} />
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Textarea name="what_for" label="Para que serve" value={what_is_it_for} onChange={event => setWhatIsItFor(event.target.value)}/> 
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="average_time" label="Tempo Médio" value={average_time} onChange={event => setAverageTime(event.target.value)} />
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <FormLabel>Valores</FormLabel>
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input name="value" label="Valor"/> 
                                <Textarea name="descricao" label="Descrição"/> 
                            </SimpleGrid>

                            <SimpleGrid minChildWidth="240px" w="100%">
                                <Flex justify="flex-start">
                                    <HStack>
                                        <IconButton
                                            as="a"
                                            aria-label="Add mais um valor" 
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
                                <Button colorScheme="pink" type="submit"> Salvar </Button>
                            </HStack>
                        </Flex>
                    </Box>
                </Flex>
            </Form>
        </Box>
    )
}