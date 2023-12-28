'use client'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { useSearchParams } from 'next/navigation'
import { Button, ButtonGroup, CssBaseline, TextField, ThemeProvider } from '@mui/material'
import Image from '@/components/Image'
import { useState } from 'react'
import theme from '@/components/theme'

export default function Home() {
  const [players, setPlayers] = useState<Array<string | string[]>>([])
  const query = useSearchParams()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} m="0 auto" alignItems="center" maxWidth={380}>
        <Image
          src="/main.png"
          alt="Next.js Logo"
          width={960}
          height={640}
          sx={{ width: 400, height: 300 }}
          priority
        />
        <Stack component="form" spacing={2} alignItems="center" width="100%" noValidate>
          <ButtonGroup>
            <Button onClick={() => setPlayers(x => [...x, ''])}>Добавить одного</Button>
            <Button onClick={() => setPlayers(x => [...x, ['', '']])}>Добавить пару</Button>
          </ButtonGroup>
          {players.map((item, index) => (
            typeof item === 'string'
              ? <TextField
                key={index}
                label="Имя"
                name={`name_${index}`}
                value={item}
                onChange={e => setPlayers(
                  Object.assign(
                    [], players, { [index]: e.target.value }
                  )
                )}
                size="small"
                fullWidth
                autoFocus
              />
              : <Stack key={index} spacing={2} direction="row" width="100%">
                {item.map((subItem, subIndex) =>
                  <TextField
                    key={subIndex}
                    label={`Имя ${subIndex + 1}`}
                    name={`name_${index}_${subIndex}`}
                    value={subItem}
                    onChange={e => setPlayers(
                      Object.assign([], players, {
                        [index]: Object.assign([], item, { [subIndex]: e.target.value })
                      })
                    )}
                    size="small"
                    fullWidth
                    autoFocus={!subIndex}
                  />
                )}
              </Stack>
          ))}
        </Stack>
      </Stack>
    </ThemeProvider>
  )
}
