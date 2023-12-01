import React, { useState, FormEvent } from 'react';
import { Flex, Box, Heading, FormLabel, Input, Button } from '@chakra-ui/react';

interface AccountForm {
  username: string;
  email: string;
  password: string;
}

const AccountPage: React.FC = () => {
  const [formData, setFormData] = useState<AccountForm>({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle account update logic here
    console.log(formData);
  };

  return (
    <Flex direction="column" align="center" justify="center" p={5}>
      <Box width={['100%', '50%']} p={5}>
        <Heading mb={4}>Account Settings</Heading>
        <form onSubmit={handleSubmit}>
          <div>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
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
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" mt={4}>
            Update Account
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default AccountPage;
