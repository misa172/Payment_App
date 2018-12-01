import Realm from "realm";

const USER_SCHEMA = "user";
const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id : "string",
    name: "string",
    phone: "string",
    money: "double",
    gender: "bool", // true: male - false: female
    isFirstTime: "bool",
    memberAt: "string",
    address: "string?",
    email: "string?",
    birthday: "string?",
    avatar:"string"
  }
}

const databaseOptions = {
  path: "OPApp.realm",
  schema: [UserSchema],
  schemaVersion: 1
}

export {
  USER_SCHEMA,
  databaseOptions
}
export default new Realm(databaseOptions);