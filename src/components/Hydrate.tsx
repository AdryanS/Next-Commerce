'use client';

import { ReactNode, useState, useEffect } from "react";

export default function HydrateComponent({children}: { children: ReactNode}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? <>{children}</> : <span>carregando...</span>
}