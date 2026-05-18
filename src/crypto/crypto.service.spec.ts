import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encryptData', () => {
    it('should encrypt payload successfully', () => {
      const result = service.encryptData('hello world');

      expect(result.successful).toBe(true);
      expect(result.error_code).toBe('');
      expect(result.data).not.toBeNull();
      expect(result.data?.data1).toBeDefined();
      expect(result.data?.data2).toBeDefined();
      expect(typeof result.data?.data1).toBe('string');
      expect(typeof result.data?.data2).toBe('string');
    });
  });

  describe('decryptData', () => {
    it('should decrypt encrypted data and return original payload', () => {
      const payload = 'hello world';

      const encryptedResult = service.encryptData(payload);

      expect(encryptedResult.successful).toBe(true);
      expect(encryptedResult.data).not.toBeNull();

      const decryptedResult = service.decryptData(
        encryptedResult.data!.data1,
        encryptedResult.data!.data2,
      );

      expect(decryptedResult.successful).toBe(true);
      expect(decryptedResult.error_code).toBe('');
      expect(decryptedResult.data).not.toBeNull();
      expect(decryptedResult.data?.payload).toBe(payload);
    });

    it('should return DECRYPT_FAILED when data is invalid', () => {
      const result = service.decryptData('invalid-data1', 'invalid-data2');

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('DECRYPT_FAILED');
      expect(result.data).toBeNull();
    });
  });
});