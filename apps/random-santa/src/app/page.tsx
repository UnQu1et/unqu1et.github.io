'use client'

import Stack from '@mui/material/Stack'
import { usePathname, useSearchParams } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add';
import { AvatarGroup, Button, CssBaseline, Fab, Switch, TextField, ThemeProvider, Tooltip, Typography } from '@mui/material'
import Image from '@/components/Image'
import { useEffect, useRef, useState } from 'react'
import theme from '@/components/theme'
import RandomAvatar from '@/components/RandomAvatar'
import { useRouter } from 'next/navigation';

const PLAYERS_QUERY_PARAM = 'players';

const toBase64 = (string: string) => btoa(unescape(encodeURIComponent(string)));
const fromBase64 = (string: string) => decodeURIComponent(escape(atob(string)))

function tryCall<T extends () => R, R>(fn: T, fallback: R) {
  try { return fn(); } catch { return fallback; }
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const routeData = useRef({ router, pathname, searchParams })

  const [playersGroups, setPlayersGroups] = useState<string[][]>(
    tryCall(() => JSON.parse(fromBase64(searchParams.get(PLAYERS_QUERY_PARAM)|| '')), [])
  );
  const [group, setGroup] = useState<string[]>([]);
  const [isPair, setIsPair] = useState(false);
  const [results, setResults] = useState<string[][]>([])

  useEffect(function updateRouteData() {
    routeData.current = { router, pathname, searchParams }
  }, [router, pathname, searchParams])

  useEffect(function savePlayersInToQuery() {
    if (!playersGroups.length) return;
    const { pathname, router } = routeData.current;
    const params = new URLSearchParams();
    params.set(PLAYERS_QUERY_PARAM, toBase64(JSON.stringify(playersGroups)))
    router.push(`${pathname}?${params}`);
  }, [playersGroups, pathname, router])

  function handleAdd() {
    setPlayersGroups([...playersGroups, isPair ? group : [group[0]]]);
    setIsPair(false);
    setGroup([]);
  }

  function calculate() {
    const allPlayers = ([] as string[]).concat(...playersGroups);
    const giftedPlayers: string[] = [];
    const tempResults: typeof results = [];
    playersGroups.forEach(group =>
      group.forEach(player => {
        const candidates = allPlayers.filter(x => !group.includes(x) && !giftedPlayers.includes(x));
        const gifted = candidates[Math.floor(Math.random() * candidates.length)];
        giftedPlayers.push(gifted);
        tempResults.push([player, gifted]);
      })
    );
    setResults(tempResults);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2} m="0 auto" alignItems="center" maxWidth={420}>
        <Image
          src="/main.png"
          alt="Steklovata"
          width={960}
          height={640}
          sx={{ width: 400, height: 300 }}
          priority
        />
        {!results.length ? (
          <>
            <Stack component="form" direction="row" spacing={2} width="100%" noValidate>
              <Tooltip title="Пара?" placement="top">
                <Switch checked={isPair} onChange={() => setIsPair(x => !x)} sx={{ mr: 12 }} color="success" />
              </Tooltip>
              <>
                <TextField
                  label="Имя 1"
                  name="name_1"
                  value={group[0] || ''}
                  onChange={e => setGroup(Object.assign([], group, { 0: e.target.value }))}
                  size="small"
                  fullWidth
                  autoFocus
                />
                {isPair && (
                  <TextField
                    label="Имя 2"
                    name="name_2"
                    value={group[1] || ''}
                    onChange={e => setGroup(Object.assign([], group, { 1: e.target.value }))}
                    size="small"
                    fullWidth
                  />
                )}
              </>
              <Fab
                color="error"
                aria-label="add"
                size="small"
                onClick={handleAdd}
                sx={{ flexShrink: 0 }}
              >
                <AddIcon />
              </Fab>
            </Stack>
            {!!playersGroups.length && <Typography variant="h6" alignSelf="flex-start">Список участников:</Typography>}
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
              {playersGroups.map((item, index) => (
                <Stack key={index} alignItems="center">
                  {item.length > 1 ? (
                    <AvatarGroup sx={{ m: "-2px" }}>
                      <RandomAvatar />
                      <RandomAvatar />
                    </AvatarGroup>
                  ) : (
                    <RandomAvatar />
                  )}
                  {item.join(' / ')}
                </Stack>
              ))}
            </Stack>
            <Button color="error" onClick={calculate}>Распределить</Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Результаты:</Typography>
            {results.map((row, index) => (
              <Typography key={index} variant="body1">{row.join(' -> ')}</Typography>
            ))}
          </>
        )}
      </Stack>
    </ThemeProvider>
  )
}
