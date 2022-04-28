# React Hook for otplib
Unfortunately `@otplib/preset-browser` doesn't work out of the box for service side rendered applicaitons as it relies on the `window` global.

This is a simple wrapper aorund the sources of `@otplib/preset-browser`.

## Installation
This package isn't published, feel free to copy the sources to your project etc.

## Usage
```tsx
import { useOtpAuthenticator } from '...';


export function TwoFactorImage() {
  const { image, secret, getImage } = useOtpAuthenticator();

  React.useEffect(() => {
    getImage();
  }, [])

  return (
    <form>
      <input name="secret" type="hidden" value={secret} />
      <img src={image} alt="" />
    </form>
  )
}