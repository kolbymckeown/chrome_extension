import React, { ChangeEvent } from 'react';
import {
  FormControl,
  Input,
  Checkbox,
  useToast,
  Tooltip,
  IconButton,
  Box,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { Category } from '@/types/category';
import { useMutation } from '@/hooks/use-query';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { editReduxCategory } from '@/redux/slices/category.slice';
import CategoryDisplaySingleImage from './category-display-single-image';

interface EditableCategoryCardProps {
  category: Category;
  setIsEditing: (value: boolean) => void;
  displayImage: string;
}

const EditableCategoryCard = ({
  category,
  setIsEditing,
  displayImage,
}: EditableCategoryCardProps) => {
  const { title, isPublic } = category;
  const [formData, setFormData] = React.useState<Category>(category);
  const toast = useToast();
  const dispatch = useDispatch();
  const { mutate: updateCategory, isLoading } = useMutation(`categories`, {
    type: 'PUT',
  });

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(category);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    updateCategory(
      { ...formData },
      {
        onSuccess: () => {
          toast({
            title: 'Category edited.',
            description: 'Your category has been successfully edited.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Something went wrong.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
    dispatch(editReduxCategory(formData));
    setIsEditing(false);
  };

  return (
    <Box px={'25px'} pt={'3px'}>
      <form onSubmit={handleEdit} style={{
        position: 'relative',
      }}>
        <Flex direction={'column'} width={'140px'} position={'absolute'} top={'32%'} left={'23%'} style={{
          textAlignLast: 'center',
        }} zIndex={10} bg={'scheme.light-rose'}>
          <FormControl>
            <Input
              onClick={(e) => e.preventDefault()}
              onChange={handleChange}
              placeholder="Enter title"
              name="title"
              defaultValue={title}
              zIndex={10}
              border={'none'}
              bg={'scheme.light-rose'}
              fontSize={'large'}
              color={'scheme.main-green-blue'}
              fontWeight={'700'}
              borderBottom={'1px solid'}
              borderRadius={'none'}
              borderColor={'scheme.dusty-rose'}
              _hover={{borderBottom: '1px solid'}}
              _focusVisible={{
                border: 'none',
                borderBottom: '1px solid',
                width: '80%',
              }}
              textShadow={'2px 2px #e5ebe7'}
            />
          </FormControl>
        </Flex>

          <FormControl textAlign={'end'}>
            <Checkbox
              id="private-toggle"
              name="isPublic"
              color={'scheme.dusty-rose'}
              fontWeight={'700'}
              iconColor="scheme.light-rose"
              zIndex={10}
              defaultChecked={!isPublic}
              onChange={() => setFormData({ ...formData, isPublic: !isPublic })}
            >
              Private
            </Checkbox>
          </FormControl>
        <CategoryDisplaySingleImage displayImage={displayImage} />
        <Flex direction={'column'} alignItems="center">
          <Divider borderColor="scheme.light-rose" width={'90%'}  />
        </Flex>
        <Flex pt={'16px'} justify={'space-around'}>
          <Tooltip label={'Save'} aria-label="save-edit-item">
            <IconButton
              bg={'transparent'}
              aria-label="Purchased"
              color={'scheme.dusty-rose'}
              icon={<FaCheck />}
              borderRadius={'full'}
              onClick={handleEdit}
            />
          </Tooltip>
          <Tooltip label={'Cancel'} aria-label="cancel-edit-item">
            <IconButton
              bg={'transparent'}
              aria-label="Purchased"
              color={'scheme.dusty-rose'}
              icon={<FaArrowLeft />}
              borderRadius={'full'}
              onClick={handleCancel}
            />
          </Tooltip>
        </Flex>
      </form>
    </Box>
  );
};

export default EditableCategoryCard;
