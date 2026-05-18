import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from './crypto.service';
import { EncryptDataDto } from './dto/encrypt-data.dto';
import { DecryptDataDto } from './dto/decrypt-data.dto';

@ApiTags('Crypto')
@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('get-encrypt-data')
  @ApiOperation({ summary: 'Encrypt payload data' })
  @ApiBody({ type: EncryptDataDto })
  @ApiResponse({
    status: 201,
    description: 'Encrypted data response',
  })
  getEncryptData(@Body() body: EncryptDataDto) {
    return this.cryptoService.encryptData(body.payload);
  }

  @Post('get-decrypt-data')
  @ApiOperation({ summary: 'Decrypt encrypted data' })
  @ApiBody({ type: DecryptDataDto })
  @ApiResponse({
    status: 201,
    description: 'Decrypted payload response',
  })
  getDecryptData(@Body() body: DecryptDataDto) {
    return this.cryptoService.decryptData(body.data1, body.data2);
  }
}