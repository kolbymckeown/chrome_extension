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
import CategoryDisplayImages from './category-display-images';
import { useDispatch } from 'react-redux';
import { editReduxCategory } from '@/redux/slices/category.slice';

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
    <Box p={4}>
      <form onSubmit={handleEdit}>
        <Flex align={'baseline'}>
          <FormControl>
            <Input
              onClick={(e) => e.preventDefault()}
              onChange={handleChange}
              placeholder="Enter title"
              name="title"
              defaultValue={title}
              border={'none'}
              borderBottom={'1px solid'}
              borderColor={'scheme.dusty-rose'}
              borderRadius={'none'}
              color={'scheme.dusty-rose'}
              fontWeight={'700'}
              _focusVisible={{
                border: 'none',
                borderBottom: '1px solid',
                borderColor: 'scheme.dusty-rose',
              }}
              padding={'0'}
              mb={'6px'}
              h={'30px'}
            />
          </FormControl>
          <FormControl>
            <Checkbox
              id="private-toggle"
              name="isPublic"
              color={'scheme.dusty-rose'}
              fontWeight={'700'}
              mb={1}
              iconColor="scheme.light-rose"
              defaultChecked={!isPublic}
              onChange={() => setFormData({ ...formData, isPublic: !isPublic })}
            >
              Private
            </Checkbox>
          </FormControl>
        </Flex>
        <CategoryDisplayImages displayImage={displayImage} />
        <Flex direction={'column'} alignItems="center">
          <Divider borderColor="scheme.light-rose" width={'90%'} mt={4} />
        </Flex>
        <Flex pt={'16px'} justify={'space-around'}>
          <Tooltip label={'Save'} aria-label="save-edit-item">
            <IconButton
              bg={'scheme.light-rose'}
              aria-label="Purchased"
              color={'scheme.dusty-rose'}
              icon={<FaCheck />}
              borderRadius={'full'}
              onClick={handleEdit}
            />
          </Tooltip>
          <Tooltip label={'Cancel'} aria-label="cancel-edit-item">
            <IconButton
              bg={'scheme.light-rose'}
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
