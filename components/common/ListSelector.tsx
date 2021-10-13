import { List, ListItem, ListItemButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useState } from 'react'
import { useIntersectionObserver } from '../../lib/hooks/useIntersectionObserver'

const CustomList = styled(List)(({ theme }) => ({
  width: 200,
  color: theme.palette.success.main,
  '&.MuiList-root': {
    position: 'fixed',
    li: {
      a: {
        color: 'rgba(0, 0, 0, 0.54)',
        textDecoration: 'none',
      },
    },

    '& .Mui-selected': {
      borderLeft: '2px solid #007DFF',
      backgroundColor: 'transparent',
      a: {
        color: '#007DFF',
      },
    },
  },
}))

export type ListSelectorItem = {
  title: string
  id: string
}

interface Props {
  items: ListSelectorItem[]
}

const StyledList = ({ items }: Props) => {
  const [activeId, setActiveId] = useState('')

  const getHeadersSelectorFromItems = (items: ListSelectorItem[]): string => {
    const selectors: string[] = []
    items.forEach((item) => {
      selectors.push(`#${item.id}`)
    })
    return selectors.join(', ')
  }

  useIntersectionObserver(getHeadersSelectorFromItems(items), setActiveId)

  return (
    <CustomList>
      {items &&
        items.map((item: ListSelectorItem) => {
          return (
            <ListItem key={item.id}>
              <ListItemButton selected={activeId === item.id} onClick={() => setActiveId(item.id)}>
                <Link href={`#${item.id}`} passHref>
                  {item.title}
                </Link>
              </ListItemButton>
            </ListItem>
          )
        })}
    </CustomList>
  )
}

export default StyledList
