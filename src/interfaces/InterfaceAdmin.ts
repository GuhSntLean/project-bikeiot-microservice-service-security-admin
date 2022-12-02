interface InterfaceAdmin {
  userName: string;
  email: string;
  password: string;
}

interface InterfaceResponseAdmin {
  id: string;
  username: string;
  email: string;
  role: string;
}

export { InterfaceAdmin, InterfaceResponseAdmin };
