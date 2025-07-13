import { Avatar } from "@mui/material"
import avatar_1 from './avatar-1.jpeg'
import avatar_2 from './avatar-2.jpeg'
import avatar_3 from './avatar-3.jpeg'
import avatar_4 from './avatar-4.jpeg'
import avatar_5 from './avatar-5.jpeg'
import avatar_6 from './avatar-6.png'
import avatar_7 from './avatar-7.jpeg'
import avatar_8 from './avatar-8.jpeg'
import avatar_9 from './avatar-9.jpeg'
import avatar_10 from './avatar-10.jpeg'
import avatar_11 from './avatar-11.jpeg'
import avatar_12 from './avatar-12.jpeg'
import avatar_13 from './avatar-13.jpeg'
import avatar_14 from './avatar-14.jpeg'
import { useState } from "react";
import Image from "../Image";

const allAvatars = [
  {
    ...avatar_1, alt: 'Пацан с гитарой', sx: {
      transform: 'scale(0.3) translate(-142px, -10px)'
    }
  },
  {
    ...avatar_2, alt: 'Наталья морская пехота', sx: {
      transform: 'scale(0.25) translate(5px, 11px)'
    }
  },
  {
    ...avatar_3, alt: 'Ибрагим', sx: {
      transform: 'scale(0.11) translate(36px, -10px)'
    }
  },
  {
    ...avatar_4, alt: 'Свидетель', sx: {
      transform: 'scale(0.34) translate(-276px, 176px)'
    }
  },
  {
    ...avatar_5, alt: 'Двайт', sx: {
      transform: 'scale(0.27) translate(-8px, 9px)'
    }
  },
  {
    ...avatar_6, alt: 'Майкл', sx: {
      transform: 'scale(0.18) translate(44px, 28px)'
    }
  },
  {
    ...avatar_7, alt: 'Какой пацан', sx: {
      transform: 'scale(0.07) translate(80px, 86px)'
    }
  },
  {
    ...avatar_8, alt: 'Девочка взгляд', sx: {
      transform: 'scale(0.3) translate(0px, 14px)'
    }
  },
  {
    ...avatar_9, alt: 'Девочка пожар', sx: {
      transform: 'scale(0.05)'
    }
  },
  {
    ...avatar_10, alt: 'Скептический пацан', sx: {
      transform: 'scale(0.2) translate(0px, 29px)'
    }
  },
  {
    ...avatar_11, alt: 'Гомер', sx: {
      transform: 'scale(0.2) translate(-54px, 66px)'
    }
  },
  {
    ...avatar_12, alt: 'Фрай', sx: {
      transform: 'scale(0.03) translate(-60px, -10px)'
    }
  },
  {
    ...avatar_13, alt: 'Бетман', sx: {
      transform: 'scale(0.06)'
    }
  },
  {
    ...avatar_14, alt: 'Женщина орёт на кота', sx: {
      transform: 'scale(0.1) translate(350px, 30px)'
    }
  },
  {
    ...avatar_14, alt: 'Кот', sx: {
      transform: 'scale(0.15) translate(-380px, 20px)'
    }
  }
]

const avatars = [...allAvatars]

function getAvatar() {
  const [avatar] = avatars.splice(Math.floor(Math.random() * avatars.length), 1);
  if (!avatars.length) avatars.push(...allAvatars);
  return avatar;
}

export default function RandomAvatar() {
  const [avatar] = useState(getAvatar)
  return <Avatar><Image {...avatar} /></Avatar>
}