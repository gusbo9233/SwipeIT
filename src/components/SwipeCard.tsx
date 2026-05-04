import { useRef, useState, useEffect, useCallback } from 'react';
import CandidateCard, { type Candidate } from './CandidateCard';
import './SwipeCard.css';

interface SwipeCardProps {
  candidate: Candidate;
  onLike: () => void;
  onDislike: () => void;
  onSuperLike?: () => void;
}

/** Minimum horizontal drag (px) to confirm a swipe. */
const SWIPE_THRESHOLD = 80;
/** Fast flick (px/ms) also triggers a swipe even below the distance threshold. */
const VELOCITY_THRESHOLD = 0.5;
/** Fly-out animation duration (ms). */
const FLY_OUT_MS = 600;

// ─── Pure helpers (no component state) ──────────────────────────────────────

function getRotationDeg(dx: number, dy: number): number {
  // Mirrors the inspiration's formula; fallback yMulti avoids zero rotation on
  // purely horizontal drags (dy === 0).
  const xMulti = dx * 0.03;
  const yMulti = dy !== 0 ? dy / 80 : 1.0;
  return xMulti * yMulti;
}

function buildExitTransform(
  direction: 'left' | 'right',
  dx: number,
  dy: number,
): string {
  const toX =
    direction === 'right' ? window.innerWidth * 1.5 : -(window.innerWidth * 1.5);
  const rotate = getRotationDeg(dx, dy);
  // Ensure a visible tilt in the flight direction regardless of drag angle.
  const clamped =
    direction === 'right' ? Math.max(rotate, 15) : Math.min(rotate, -15);
  return `translate(${toX}px, -100px) rotate(${clamped}deg)`;
}

// ─── Component ───────────────────────────────────────────────────────────────

function SwipeCard({ candidate, onLike, onDislike, onSuperLike }: SwipeCardProps) {
  // Refs: mutable state that must not trigger re-renders.
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const lastDeltaRef = useRef({ x: 0, y: 0 });
  const flyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFlyingOutRef = useRef(false);

  // Render state.
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyDirection, setFlyDirection] = useState<'left' | 'right' | null>(null);
  const [exitTransform, setExitTransform] = useState<string | null>(null);

  // Reset state when candidate changes
  useEffect(() => {
    if (flyTimeoutRef.current) {
        clearTimeout(flyTimeoutRef.current);
        flyTimeoutRef.current = null;
    }
    dragStartRef.current = null;
    lastDeltaRef.current = { x: 0, y: 0 };
    isFlyingOutRef.current = false;
    
    queueMicrotask(() => {
      setOffset({ x: 0, y: 0 });
      setIsDragging(false);
      setFlyDirection(null);
      setExitTransform(null);
    });
  }, [candidate]);

  // Cleanup pending timeout on unmount.
  useEffect(
    () => () => {
      if (flyTimeoutRef.current) clearTimeout(flyTimeoutRef.current);
    },
    [],
  );

  // ── Core fly-out logic ──────────────────────────────────────────────────────
  const flyOut = useCallback(
    (direction: 'left' | 'right', callback: () => void) => {
      // Guard against double-triggering (e.g. rapid button double-click).
      if (isFlyingOutRef.current) return;
      isFlyingOutRef.current = true;

      dragStartRef.current = null;
      setIsDragging(false);
      setFlyDirection(direction);
      setExitTransform(
        buildExitTransform(direction, lastDeltaRef.current.x, lastDeltaRef.current.y),
      );
      lastDeltaRef.current = { x: 0, y: 0 };
      setOffset({ x: 0, y: 0 });

      flyTimeoutRef.current = setTimeout(callback, FLY_OUT_MS);
    },
    // Stable: only uses refs and state setters, which never change.
    [],
  );

  // ── Pointer event handlers ──────────────────────────────────────────────────

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Let button clicks pass through untouched.
    if ((e.target as HTMLElement).closest('button')) return;
    if (isFlyingOutRef.current) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = { x: e.clientX, y: e.clientY, time: e.timeStamp };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    lastDeltaRef.current = { x: dx, y: dy };
    setOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;

    const dx = e.clientX - dragStartRef.current.x;
    const elapsed = e.timeStamp - dragStartRef.current.time;
    const velocityX = elapsed > 0 ? Math.abs(dx) / elapsed : 0;

    if (Math.abs(dx) >= SWIPE_THRESHOLD || velocityX >= VELOCITY_THRESHOLD) {
      flyOut(dx > 0 ? 'right' : 'left', dx > 0 ? onLike : onDislike);
    } else {
      // Snap back.
      dragStartRef.current = null;
      lastDeltaRef.current = { x: 0, y: 0 };
      setIsDragging(false);
      setOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    dragStartRef.current = null;
    lastDeltaRef.current = { x: 0, y: 0 };
    setIsDragging(false);
    setOffset({ x: 0, y: 0 });
  };

  // ── Derived values for rendering ────────────────────────────────────────────

  const indicatorStrength = Math.min(Math.abs(offset.x) / SWIPE_THRESHOLD, 1);
  const likeOpacity = flyDirection === 'right' ? 1 : offset.x > 0 ? indicatorStrength : 0;
  const nopeOpacity = flyDirection === 'left' ? 1 : offset.x < 0 ? indicatorStrength : 0;

  const transform =
    exitTransform ??
    `translate(${offset.x}px, ${offset.y}px) rotate(${getRotationDeg(offset.x, offset.y)}deg)`;

  const className = [
    'swipe-card',
    isDragging && 'swipe-card--dragging',
    exitTransform && 'swipe-card--flying',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      style={{ transform }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      {/* Swipe direction indicators */}
      <div
        className="swipe-card__indicator swipe-card__indicator--like"
        style={{ opacity: likeOpacity }}
        aria-hidden="true"
      >
        LIKE
      </div>
      <div
        className="swipe-card__indicator swipe-card__indicator--nope"
        style={{ opacity: nopeOpacity }}
        aria-hidden="true"
      >
        NOPE
      </div>

      {/* CandidateCard stays purely presentational; buttons trigger the same fly-out */}
      <CandidateCard
        candidate={candidate}
        onLike={() => flyOut('right', onLike)}
        onDislike={() => flyOut('left', onDislike)}
        onSuperLike={onSuperLike}
      />
    </div>
  );
}

export default SwipeCard;
export type { SwipeCardProps };
