import { Box, Grow } from '@mui/material'
import React, { useRef, useEffect, useState } from 'react'

import { HorizontalScrollPaper } from './HorizontalScrollContainer.styles'

type HorizontalScrollContainerProps = {
  children: React.ReactNode
  isLoading?: boolean
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  isLoading,
}) => {
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
        const newScrollLeft =
          scrollRef.current.scrollLeft + (event.deltaY > 0 ? scrollAmount : -scrollAmount)
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && childWidth > 0) {
        const maxScrollLeft = scrollRef.current.scrollWidth - containerWidth
        if (scrollRef.current.scrollLeft >= maxScrollLeft - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          const numChildren = Math.max(1, Math.floor(containerWidth / childWidth))
          const newScrollLeft = scrollRef.current.scrollLeft + childWidth * numChildren
          scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [childWidth, containerWidth])

  return (
    <HorizontalScrollPaper ref={scrollRef}>
      {React.Children.map(children, (child, index) => (
        <Grow in={!isLoading} timeout={1000}>
          <Box ref={index === 0 ? childRef : null} sx={{ margin: 1 }}>{child}</Box>
        </Grow>
      ))}
    </HorizontalScrollPaper>
  )
}
import { Box, Grow } from '@mui/material'
import React, { useRef, useEffect, useState } from 'react'

import { HorizontalScrollPaper } from './HorizontalScrollContainer.styles'

type HorizontalScrollContainerProps = {
  children: React.ReactNode
  isLoading?: boolean
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  isLoading,
}) => {
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
        const newScrollLeft =
          scrollRef.current.scrollLeft + (event.deltaY > 0 ? scrollAmount : -scrollAmount)
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && childWidth > 0) {
        const maxScrollLeft = scrollRef.current.scrollWidth - containerWidth
        if (scrollRef.current.scrollLeft >= maxScrollLeft - 1) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          const numChildren = Math.max(1, Math.floor(containerWidth / childWidth))
          const newScrollLeft = scrollRef.current.scrollLeft + childWidth * numChildren
          scrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
        }
      }
    }, 5000)

    return () => clearInterval(interval)
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
