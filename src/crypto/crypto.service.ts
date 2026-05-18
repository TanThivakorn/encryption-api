import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
    ApiResponse,
    DecryptDataResponse,
    EncryptDataResponse,
} from './interfaces/api-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
    constructor(private readonly configService: ConfigService) {}
    private get publicKey(): string {
        return this.configService
            .get<string>('PUBLIC_KEY')!
            .replace(/\\n/g, '\n');
    }

    private get privateKey(): string {
        return this.configService
            .get<string>('PRIVATE_KEY')!
            .replace(/\\n/g, '\n');
    }

    encryptData(payload: string): ApiResponse<EncryptDataResponse> {
        try {
            const aesKey = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);

            const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
            const encryptedPayload = Buffer.concat([
                cipher.update(payload, 'utf8'),
                cipher.final(),
            ]);

            const data2 = Buffer.concat([iv, encryptedPayload]).toString('base64');

            const encryptedAesKey = crypto.privateEncrypt(
                {
                    key: this.privateKey,
                    padding: crypto.constants.RSA_PKCS1_PADDING,
                },
                aesKey,
            );

            const data1 = encryptedAesKey.toString('base64');

            return {
                successful: true,
                error_code: '',
                data: {
                    data1,
                    data2,
                },
            };
        } catch (error) {
            return {
                successful: false,
                error_code: 'ENCRYPT_FAILED',
                data: null,
            };
        }
    }

    decryptData(data1: string, data2: string): ApiResponse<DecryptDataResponse> {
        try {
            const aesKey = crypto.publicDecrypt(
                {
                    key: this.publicKey,
                    padding: crypto.constants.RSA_PKCS1_PADDING,
                },
                Buffer.from(data1, 'base64'),
            );

            const encryptedPayloadWithIv = Buffer.from(data2, 'base64');
            const iv = encryptedPayloadWithIv.subarray(0, 16);
            const encryptedPayload = encryptedPayloadWithIv.subarray(16);

            const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
            const decryptedPayload = Buffer.concat([
                decipher.update(encryptedPayload),
                decipher.final(),
            ]);

            return {
                successful: true,
                error_code: '',
                data: {
                    payload: decryptedPayload.toString('utf8'),
                },
            };
        } catch {
            return {
                successful: false,
                error_code: 'DECRYPT_FAILED',
                data: null,
            };
        }
    }
}