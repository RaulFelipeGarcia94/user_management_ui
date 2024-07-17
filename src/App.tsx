import { Admin, Resource, ShowGuesser } from "react-admin";
import { EventEdit, EventList, EventCreate } from "./event";

import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider("http://127.0.0.1:3000");

export const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="events"
      list={EventList}
      edit={EventEdit}
      create={EventCreate}
      show={ShowGuesser}
    />
  </Admin>
);
