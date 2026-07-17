import bcrypt from "bcrypt";


// Hash Password
export const hashPassword = async (
  password: string
): Promise<string> => {

  return await bcrypt.hash(
    password,
    10
  );

};




// Compare Password
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {

  return await bcrypt.compare(
    password,
    hashedPassword
  );

};