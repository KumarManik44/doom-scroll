import { Image } from 'react-native';

type Props = { size: number };

/** Our own Doom-style face (see DESIGN.md "Doom face icon"); same drawing as the overlay and app icon. */
export function DoomFace({ size }: Props) {
  return (
    <Image
      source={require('../assets/doom-face.png')}
      style={{ width: size, height: size }}
      accessibilityIgnoresInvertColors
      accessible={false}
    />
  );
}
