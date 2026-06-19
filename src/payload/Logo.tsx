import Image from 'next/image'

export default function Logo() {
  return <Image src="/brand/viakasa-logo-tagline.png" alt="Viakasa" width={180} height={72} style={{ objectFit: 'contain' }} />
}
