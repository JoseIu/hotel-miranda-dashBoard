import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addNewUser, updateUser } from '../../features/usersSlice/usersThunk';
import { Employee, EmployeeToSend, Role } from '../../interfaces/employee.interface';
import { Form, FormSubmmit, SelectOption } from '../shared/GlobalStyle';
import { FormRow } from '../shared/StyledComponets';
import CheckBox from '../shared/checkBox/CheckBox';
import Input from '../shared/input/Input';
import Select from '../shared/select/Select';
import { UserSchema, userSchema } from './userSchema';
type UserFormProps = {
  user?: Employee | null;
};
const UserForm = ({ user }: UserFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      status: false,
    },
  });
  console.log(errors);
  const onHandleSubmit: SubmitHandler<UserSchema> = async (data) => {
    const userToSend: EmployeeToSend = {
      ...data,
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/183.jpg',
      role: data.role as Role,
    };
    await dispatch(addNewUser(userToSend));
    console.log(userToSend);
  };
  const onHandleEdit: SubmitHandler<UserSchema> = async (data) => {
    const userToSend: Employee = {
      ...user!,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
      startDate: data.startDate,
      role: data.role as Role,
      status: data.status,
      description: data.description,
    };
    await dispatch(updateUser(userToSend));
  };
  useEffect(() => {
    if (!user) return;
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
    setValue('phone', user.phone);
    setValue('password', user.password);
    setValue('startDate', user.startDate);
    setValue('role', user.role);
    setValue('status', user.status);
    setValue('description', user.description);
  }, [user, setValue]);
  return (
    <Form onSubmit={handleSubmit(user !== undefined ? onHandleEdit : onHandleSubmit)}>
      <FormRow>
        <Input
          label="Name"
          error={errors['firstName']}
          id="name"
          type="text"
          placeholder="Name"
          {...register('firstName')}
        />

        <Input
          label="Last Name"
          type="text"
          id="lastName"
          placeholder="Last Name"
          error={errors['lastName']}
          {...register('lastName')}
        />
        <Input
          label="email"
          type="email"
          id="email"
          placeholder="email: example@example.com"
          error={errors['email']}
          {...register('email')}
        />
        <Input
          label="Phone"
          type="text"
          id="phone"
          placeholder="Phone"
          error={errors['phone']}
          {...register('phone')}
        />
        <Input
          label="password"
          type="password"
          id="password"
          placeholder="email: 1234"
          error={errors['password']}
          {...register('password')}
        />
        <Input
          label="Starde Date"
          id="startDare"
          type="date"
          placeholder="startDare"
          error={errors['startDate']}
          {...register('startDate')}
        />
      </FormRow>
      <FormRow>
        <Select label="Role" id="role" error={errors['role']} {...register('role')}>
          <SelectOption value="Manager">Manager</SelectOption>
          <SelectOption value="Receptionist">Receptionist</SelectOption>
          <SelectOption value="Room Services">Room Services</SelectOption>
        </Select>
        <CheckBox label="Status" id="status" error={errors['status']} {...register('status')} />
      </FormRow>
      <Input
        label="Description"
        type="text"
        id="description"
        placeholder="Write a short description"
        error={errors['description']}
        {...register('description')}
      />
      <FormSubmmit type="submit">{user ? 'Edit' : 'Add'}</FormSubmmit>
    </Form>
  );
};

export default UserForm;
