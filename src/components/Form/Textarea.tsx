import { Textarea as ChakraTextarea, FormLabel, FormControl, TextareaProps as ChakraTextareaProps } from '@chakra-ui/react';

interface TextareaProps extends ChakraTextareaProps {
    name: string;
    label?: string;
} 

export function Textarea({ name, label, ...rest }: TextareaProps) {
    return (
        <FormControl>
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
            
            <ChakraTextarea 
                name={name}
                id={name}
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgColor: "gray.900"
                }}
                size="lg"
                {...rest}
            />
        </FormControl>
    )
}