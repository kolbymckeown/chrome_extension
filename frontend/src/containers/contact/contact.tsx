import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useState, FormEvent } from 'react';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to a server)
    //send as email to us
    console.log(formData);
  };

  return (
    <Flex
      direction={['column', 'row']}
      align="center"
      justify="space-around"
      p={5}
    >
      <Box width={['100%', '50%']} p={5}>
        <Heading color={'scheme.main-green-blue'} mb={4}>
          Contact Us
        </Heading>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" mt={2}>
            Send
          </Button>
        </form>
      </Box>

      <Box width={['100%', '40%']} alignSelf="start">
        <Image src="/contact.png" />
        <Text
          color={'scheme.main-green-blue'}
          fontSize={'large'}
          fontWeight={'600'}
          w={'400px'}
        >
          We want to know what we can improve. Are there websites that don't
          quite work with Genius? Are there features that would make it easier
          or better for you? Let us know!
        </Text>
      </Box>
    </Flex>
  );
};

export default ContactPage;
