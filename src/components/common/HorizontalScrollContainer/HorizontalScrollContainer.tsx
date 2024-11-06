import { Box, Grow } from '@mui/material'
import React, { useRef, useEffect, useState } from 'react'

import { HorizontalScrollPaper } from './HorizontalScrollContainer.styles'

type HorizontalScrollContainerProps = {
  children: React.ReactNode
  isLoading?: boolean
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({ children, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const [childWidth, setChildWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (childRef.current) {
      setChildWidth(childRef.current.clientWidth)
    }
  }, [children])

  useEffect(() => {
    if (scrollRef.current) {
      setContainerWidth(scrollRef.current.clientWidth)
    }
  }, [scrollRef.current, children])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollRef.current && childWidth > 0 && event.deltaY !== 0) {
        const numChildren = Math.max(1, Math.floor(containerWidth / childWidth))
        const scrollAmount = childWidth * numChildren
        const newScrollLeft = scrollRef.current.scrollLeft + (event.deltaY > 0 ? scrollAmount : -scrollAmount)
        scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
        event.preventDefault()
      }
    }

    const currentRef = scrollRef.current
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel)
      }
    }
  }, [childWidth, containerWidth])

  return (
    <HorizontalScrollPaper ref={scrollRef}>
      {React.Children.map(children, (child, index) => (
        <Grow in={!isLoading} timeout={1000}>
          <Box ref={index === 0 ? childRef : null}>{child}</Box>
        </Grow>
      ))}
    </HorizontalScrollPaper>
  )
}
