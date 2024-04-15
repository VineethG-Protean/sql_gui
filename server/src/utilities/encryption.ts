import bcrypt from "bcrypt";

export const encryptPassword = async (password: string): Promise<string> => {
    const encryptPassword = await bcrypt.hash(password, 10);
    return encryptPassword;
}

export const decryptPassword = async (password: string, hash: string): Promise<boolean> => {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
}