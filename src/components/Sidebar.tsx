import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react"; 
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";

export function Sidebar() {
    return (
        <Box as="aside" w="64" mr="8"> 
            <Stack spacing="12" align="flex-start">
                <Box>
                    <Text fontWeight="bold" color="gray.400" fontSize="small"> GERAL </Text>
                    <Stack spacing="4" mt="8" align="stretch">
                        <Link display="flex" align="center">
                            <Icon as={RiDashboardLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Dashboard </Text>
                        </Link>

                        <Link href="/users" display="flex" align="center">
                            <Icon as={RiContactsLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Usuários </Text>
                        </Link>
                    </Stack>
                </Box>

                <Box>
                    <Text fontWeight="bold" color="gray.400" fontSize="small"> SESSÕES </Text>
                    <Stack spacing="4" mt="8" align="stretch">
                        <Link href="/general_orientations" display="flex" align="center">
                            <Icon as={RiInputMethodLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Orientações gerais </Text>
                        </Link>

                        <Link href="/requisite_orientations" display="flex">
                            <Icon as={RiGitMergeLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Orientações de requisitos básicos  </Text>
                        </Link>

                        <Link display="flex" align="center">
                            <Icon as={RiInputMethodLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Cartilhas  </Text>
                        </Link>

                        <Link display="flex" align="center">
                            <Icon as={RiGitMergeLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Simulação </Text>
                        </Link>

                        <Link display="flex" align="center">
                            <Icon as={RiInputMethodLine} fontSize="20"/>
                            <Text ml="4" fontWeight="medium"> Fale Conosco </Text>
                        </Link>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}