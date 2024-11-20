import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { addNewRoom, updateRoom } from '../../features/roomsSlice/roomsThunk';
import { getRandomId } from '../../helpers/getRandomId';
import { Amenity, RoomInterface } from '../../interfaces/room.interface';
import {
  Error,
  Form,
  FormSubmmit,
  OfferContainer,
  SelectOption,
  Ship,
  Ships,
  ShipsList,
} from '../shared/GlobalStyle';
import CheckBox from '../shared/checkBox/CheckBox';
import Input from '../shared/input/Input';
import Select from '../shared/select/Select';
import { AMENITY, ROOMTYPE, RoomSchema, roomSchema } from './roomSchema';
type RoomFormProps = {
  room?: RoomInterface | null;
};

const RoomForm = ({ room }: RoomFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      offer: false,
      offerPrice: '0',
      amenities: [],
    },
  });
  const offerValue = useWatch({
    control,
    name: 'offer',
  });

  const onHandleSubmit: SubmitHandler<RoomSchema> = async (data) => {
    const roomToSend = {
      ...data,
      offerPrice: data.offer ? parseFloat(data.offerPrice) : 0,
      price: parseFloat(data.price),
      discount: parseFloat(data.discount),
      status: data.status === 'true' ? true : false,
      roomNumber: getRandomId(),
    };
    await dispatch(addNewRoom(roomToSend as RoomInterface));

    toast.success('Room added successfully');
    navigate('/admin/rooms');
  };
  const onHandleEdit: SubmitHandler<RoomSchema> = async (data) => {
    const roomToSend: RoomInterface = {
      ...room!,
      roomType: data.roomType,
      description: data.description,
      offer: data.offer,
      offerPrice: data.offer ? parseFloat(data.offerPrice) : 0,
      price: parseFloat(data.price),
      discount: parseFloat(data.discount),
      status: data.status === 'true' ? true : false,
      amenities: data.amenities as Amenity[],
    };
    await dispatch(updateRoom(roomToSend));
    toast.success('Room edited successfully');
  };

  useEffect(() => {
    if (!room) return;
    setValue('roomType', room.roomType);
    setValue('description', room.description);
    setValue('offer', room.offer);
    setValue('offerPrice', room.offerPrice.toString());
    setValue('discount', room.discount.toString());
    setValue('price', room.price.toString());
    setValue('status', room.status ? 'true' : 'false');
    setValue('amenities', room.amenities);
  }, [room, setValue]);
  return (
    <Form onSubmit={handleSubmit(room ? onHandleEdit : onHandleSubmit)}>
      <Select label="Romm Type" id="roomType" error={errors['roomType']} {...register('roomType')}>
        {ROOMTYPE.map((roomType) => (
          <SelectOption key={roomType} value={roomType}>
            {roomType}
          </SelectOption>
        ))}
      </Select>
      <Input
        label="Description"
        error={errors['description']}
        id="description"
        type="text"
        placeholder="Write a short description"
        {...register('description')}
      />
      <OfferContainer>
        <CheckBox label="Offer" error={errors['offer']} id="offer" {...register('offer')} />

        {offerValue && (
          <Input
            label="Offer Price"
            type="text"
            error={errors['offerPrice']}
            id="offerPrice"
            placeholder="Offer Price"
            {...register('offerPrice')}
          />
        )}
      </OfferContainer>
      <Input
        label="Discount"
        type="text"
        id="discount"
        error={errors['discount']}
        placeholder="discount"
        {...register('discount')}
      />
      <Input
        label="Price"
        type="text"
        id="price"
        error={errors['price']}
        placeholder="dispricecount"
        {...register('price')}
      />
      <Select label="Status" id="status" error={errors['status']} {...register('status')}>
        <SelectOption value="true">Active</SelectOption>
        <SelectOption value="false">Ocopied</SelectOption>
      </Select>

      <Controller
        name="amenities"
        control={control}
        render={({ field }) => (
          <Ships>
            <ShipsList>
              {AMENITY.map((amenity) => (
                <Ship
                  $selected={field.value?.includes(amenity)}
                  key={amenity}
                  onClick={() => {
                    if (field.value?.includes(amenity)) {
                      field.onChange(field.value.filter((v: string) => v !== amenity));
                    } else {
                      field.onChange([...(field.value || []), amenity]);
                    }
                  }}
                >
                  {amenity}
                </Ship>
              ))}
            </ShipsList>
            <Error>{errors.amenities?.message} </Error>
          </Ships>
        )}
      />

      <FormSubmmit type="submit">{room ? 'Edit' : 'Add'}</FormSubmmit>
    </Form>
  );
};

export default RoomForm;
