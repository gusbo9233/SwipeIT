import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import type { CandidatePreview } from '../../types/Candidate'
import CandidateCard from './CandidateCard';
import './SwipeCard.css';

type SwipeCardProps = {
  candidate: CandidatePreview
  onDislike: () => void
  onLike: () => void
}

const swipeThreshold = 80
const velocityThreshold = 0.5
const flyOutMs = 600
const deckEntryTransform = 'translate(34px, 28px) rotate(4.5deg) scale(0.965)'

function getRotationDeg(dx: number, dy: number) {
  const xMulti = dx * 0.03
  const yMulti = dy !== 0 ? dy / 80 : 1.0
  return xMulti * yMulti
}

function buildExitTransform(direction: 'left' | 'right', dx: number, dy: number) {
  const toX = direction === 'right' ? window.innerWidth * 1.5 : -(window.innerWidth * 1.5)
  const rotate = getRotationDeg(dx, dy)
  const clamped = direction === 'right' ? Math.max(rotate, 15) : Math.min(rotate, -15)
  return `translate(${toX}px, -100px) rotate(${clamped}deg)`
}
function SwipeCard({ candidate, onLike, onDislike }: SwipeCardProps) {
  // Refs: mutable state that must not trigger re-renders.
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastDeltaRef = useRef({ x: 0, y: 0 });
  const flyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFlyingOutRef = useRef(false);

  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [flyDirection, setFlyDirection] = useState<'left' | 'right' | null>(null)
  const [exitTransform, setExitTransform] = useState<string | null>(null)
  const [entryTransform, setEntryTransform] = useState<string | null>(deckEntryTransform)

  useEffect(
    () => () => {
      if (flyTimeoutRef.current) {
        clearTimeout(flyTimeoutRef.current)
      }
    },
    [],
  )

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntryTransform(null))

    return () => cancelAnimationFrame(frame)
  }, [])

  const flyOut = useCallback((direction: 'left' | 'right', callback: () => void) => {
    if (isFlyingOutRef.current) {
      return
    }

    isFlyingOutRef.current = true
    dragStartRef.current = null
    setIsDragging(false)
    setFlyDirection(direction)
    setExitTransform(buildExitTransform(direction, lastDeltaRef.current.x, lastDeltaRef.current.y))
    lastDeltaRef.current = { x: 0, y: 0 }
    setOffset({ x: 0, y: 0 })

    flyTimeoutRef.current = setTimeout(callback, flyOutMs)
  }, [])

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button') || isFlyingOutRef.current) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    dragStartRef.current = { x: event.clientX, y: event.clientY, time: event.timeStamp }
    setIsDragging(true)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!dragStartRef.current) {
      return
    }

    const dx = event.clientX - dragStartRef.current.x
    const dy = event.clientY - dragStartRef.current.y
    lastDeltaRef.current = { x: dx, y: dy }
    setOffset({ x: dx, y: dy })
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!dragStartRef.current) {
      return
    }

    const dx = event.clientX - dragStartRef.current.x
    const elapsed = event.timeStamp - dragStartRef.current.time
    const velocityX = elapsed > 0 ? Math.abs(dx) / elapsed : 0

    if (Math.abs(dx) >= swipeThreshold || velocityX >= velocityThreshold) {
      flyOut(dx > 0 ? 'right' : 'left', dx > 0 ? onLike : onDislike)
      return
    }

    dragStartRef.current = null
    lastDeltaRef.current = { x: 0, y: 0 }
    setIsDragging(false)
    setOffset({ x: 0, y: 0 })
  }

  function handlePointerCancel() {
    dragStartRef.current = null
    lastDeltaRef.current = { x: 0, y: 0 }
    setIsDragging(false)
    setOffset({ x: 0, y: 0 })
  }

  const indicatorStrength = Math.min(Math.abs(offset.x) / swipeThreshold, 1)
  const likeOpacity = flyDirection === 'right' ? 1 : offset.x > 0 ? indicatorStrength : 0
  const nopeOpacity = flyDirection === 'left' ? 1 : offset.x < 0 ? indicatorStrength : 0
  const transform =
    exitTransform ??
    `translate(${offset.x}px, ${offset.y}px) rotate(${getRotationDeg(offset.x, offset.y)}deg)`
  const className = [
    'swipe-card',
    entryTransform && 'swipe-card--entering',
    isDragging && 'swipe-card--dragging',
    exitTransform && 'swipe-card--flying',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={className}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ transform: entryTransform ?? transform }}
    >
      <div
        aria-hidden="true"
        className="swipe-card__indicator swipe-card__indicator--like"
        style={{ opacity: likeOpacity }}
      >
        LIKE
      </div>
      <div
        aria-hidden="true"
        className="swipe-card__indicator swipe-card__indicator--nope"
        style={{ opacity: nopeOpacity }}
      >
        NOPE
      </div>

      <CandidateCard
        candidate={candidate}
        onDislike={() => flyOut('left', onDislike)}
        onLike={() => flyOut('right', onLike)}
      />
    </div>
  )
}

export default SwipeCard
export type { SwipeCardProps }
