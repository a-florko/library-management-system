import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/librarians`;

export const AuthService = {
    async logIn(logInDto: {login: string, password: string}): Promise<string | null> {
        try {
            const response = await axios.post(`${API_URL}/try-to-log-in`, logInDto);
            return response.data.fullName;
        } catch (error: any) {
            return null;
        }
    }
}