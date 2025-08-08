export const lsUser: any = localStorage.getItem("user");
export const jsonLsUser = JSON.parse(lsUser);
export const token = jsonLsUser?.token;

export const userCart: any = localStorage.getItem("userCart");
