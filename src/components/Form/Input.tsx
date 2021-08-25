import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react'; 

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
} 

export function Input({ name, label, ...rest }: InputProps) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return (
        <FormControl>
            { !!label && <FormLabel htmlFor={name}>{label}</FormLabel> }
            
            <ChakraInput 
                ref={inputRef}
                name={name}
                id={name}
                defaultValue={defaultValue}
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