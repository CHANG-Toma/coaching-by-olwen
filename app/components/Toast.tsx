"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export type ToastType = "success" | "error" | "warning" | "info"

export type Toast = {
  id: string
  message: string
  type: ToastType
  duration?: number
}

type ToastProps = {
  toast: Toast
  onClose: (id: string) => void
}

function ToastItem({ toast, onClose }: ToastProps) {
  const [exiting, setExiting] = useState(false)

  const handleClose = () => {
    setExiting(true)
    // durée de l'animation de sortie (doit matcher fadeOutDown)
    const EXIT_DURATION = 300
    setTimeout(() => {
      onClose(toast.id)
    }, EXIT_DURATION)
  }

  useEffect(() => {
    const AUTO_CLOSE_DURATION = toast.duration || 5000
    const timer = setTimeout(() => {
      handleClose()
    }, AUTO_CLOSE_DURATION)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast.id, toast.duration])

  const icons = {
    success: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const styles = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: "text-green-600",
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: "text-red-600",
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-800",
      icon: "text-yellow-600",
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: "text-blue-600",
    },
  }

  const style = styles[toast.type]

  return (
    <div
      className={`${style.bg} ${style.text} border-2 ${style.bg.split(" ")[0].replace("bg-", "border-")} rounded-lg shadow-lg p-4 mb-3 flex items-start space-x-3 min-w-[300px] max-w-[500px] ${
        exiting ? "animate-fade-out-down" : "animate-fade-in-up"
      }`}
      role="alert"
    >
      <div className={`${style.icon} flex-shrink-0 mt-0.5`}>{icons[toast.type]}</div>
      <div className="flex-1 font-body">{toast.message}</div>
      <button
        onClick={handleClose}
        className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        aria-label="Fermer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

type ToastContainerProps = {
  toasts: Toast[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (typeof window === "undefined") return null

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>,
    document.body
  )
}
