import axios from 'axios';

export async function getPublicKey(server: string): Promise<string> {
    const response = await axios.get(server);
    return `-----BEGIN PUBLIC KEY-----\r\n${response.data.public_key}\r\n-----END PUBLIC KEY-----`;
}

