import React from 'react';
import qrcode from 'qrcode';
import { createDigest, createRandomBytes } from '@otplib/plugin-crypto-js';
import { keyDecoder, keyEncoder } from '@otplib/plugin-base32-enc-dec';
import { Authenticator, AuthenticatorOptions } from '@otplib/core';

function initiate() {
  return new Authenticator<AuthenticatorOptions>({
    createDigest,
    createRandomBytes,
    keyDecoder,
    keyEncoder
  });
}

export interface UseOtpAuthenticator  {
  getImage(accountName: string): Promise<void>;
  image: string;
  secret: string;
}

export function useOtpAuthenticator(): UseOtpAuthenticator {
  const ref = React.useRef<Authenticator | undefined>(undefined);
  const [image, setImage] = React.useState('');
  const [secret, setSecret] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !ref.current) {
      ref.current = initiate();
    }
  }, []);

  async function getImage(userId: string) {
    if (!ref.current) {
      ref.current = initiate();
    }
    const secret = ref.current.generateSecret();
    setSecret(secret);
    const otpUri = ref.current.keyuri(userId, 'Cotiss', secret);
    const imageUrl = await qrcode.toDataURL(otpUri);
    setImage(imageUrl);
  }

  return {
    getImage,
    image,
    secret,
  };
}
