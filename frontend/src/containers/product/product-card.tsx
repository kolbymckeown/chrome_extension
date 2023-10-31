import ProductCardDisplay from '@/components/product/product-card-display';
import ProductCardEdit from '@/components/product/product-card-edit';
import { useMutation } from '@/hooks/use-query';
import { editReduxItem } from '@/redux/slices/items.slice';
import { CartItem } from '@/types/item';
import { Flex, Spinner, VStack, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

export const ProductCard = ({ item }: { item: CartItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CartItem>(item);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const { mutate: editItem, isLoading } = useMutation(`cart-item`, {
    type: 'PUT',
  });

  const { mutate: deleteItem } = useMutation(`cart-item`, {
    type: 'DELETE',
    query: { cartItemId: item.id },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    editItem(
      { ...formData },
      {
        onSuccess: () => {
          dispatch(editReduxItem(formData));
          toast({
            title: 'Item edited.',
            description: 'Your item has been successfully edited.',
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
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteItem({
      onSuccess: () => {
        toast({
          title: 'Item deleted.',
          description: 'Your item has been successfully deleted.',
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
    });
  };

  return (
    <VStack
      key={item.id}
      w="250px"
      h="375px"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={'scheme.main-green-blue'}
      overflow="hidden"
      mb={5}
      align="center"
      position="relative"
      m={2}
      gap={0}
      boxShadow={'10px 10px #4c8d99'}
    >
      {isLoading && (
        <Flex position={'absolute'} top={'40%'}>
          <Spinner size={'lg'} color="scheme.main-green-blue" thickness="3px" />
        </Flex>
      )}
      {!isEditing ? (
        <ProductCardDisplay
          item={item}
          onEditClick={() => setIsEditing(true)}
          onDeleteClick={handleDelete}
          onTogglePurchased={() =>
            editItem({ ...item, purchased: !item.purchased })
          }
          isPurchasing={isLoading}
          isModalOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          openModal={() => setModalIsOpen(true)}
          title="Delete item?"
        />
      ) : (
        <ProductCardEdit
          item={item}
          onChange={handleChange}
          onCancel={() => {
            setIsEditing(false), setFormData(item);
          }}
          onSave={onSubmit}
        />
      )}
    </VStack>
  );
};
