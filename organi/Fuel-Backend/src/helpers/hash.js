import bcrypt from 'bcrypt'
export const convertHash = async (plainText) => {
  if (plainText) {
    const hash = await bcrypt.hashSync(plainText, 10);
    return hash;
  }
};

export const compareHash = async (plainText, hash) => {
  if (plainText && hash) {
    return await bcrypt.compareSync(plainText, hash);
  }
};