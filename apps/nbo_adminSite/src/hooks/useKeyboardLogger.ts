import { useEffect, useState, useRef, useCallback } from 'react'
import { fromEvent, merge, Subject, Subscription } from 'rxjs'
import { map, scan } from 'rxjs/operators'

export function useKeyboardLogger() {
  const [keys, setKeys] = useState<string[]>([])
  const clearSubject$ = useRef(new Subject<void>())

  const clear = useCallback(() => {
    clearSubject$.current.next()
  }, [])

  useEffect(() => {
    const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      map(e => ({ type: 'key', key: e.key } as const))
    )

    const clearClick$ = clearSubject$.current.pipe(
      map(() => ({ type: 'clear' } as const))
    )

    const streams = merge(keydown$, clearClick$)

    const sub: Subscription = streams
      .pipe(
        scan((acc, event) => {
          if (event.type === 'clear') return []
          if (event.type === 'key') return [...acc, event.key]
          return acc
        }, [] as string[])
      )
      .subscribe((data) => {
        console.log('keys', data)
        setKeys(data)
      })

    return () => sub.unsubscribe()
  }, [])

  return { keys, clear }
}
