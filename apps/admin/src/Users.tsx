import * as React from 'react';
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  // DisabledInput,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  SelectInput,
  FileField,
  FileInput,
} from 'react-admin';

const UserFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="users" alwaysOn />
  </Filter>
);

export const UsersList = (props: any) => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="users" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);
