import { Listing } from '.prisma/client'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useDeleteListing } from '../../lib/apiClient'
import useIsMyListing from '../../lib/hooks/useIsMyListing'

interface Props {
  listing: Listing
}

export default function DeleteListingButton({ listing }: Props) {
  const { deleteListing } = useDeleteListing()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const isMyListing = useIsMyListing()

  const handleConfirm = async () => {
    try {
      await deleteListing(listing.id)
      enqueueSnackbar('Listing successfully deleted', { variant: 'success' })
      router.push('/dashboard')
    } catch (error) {
      enqueueSnackbar('Failed to delete listing. Try again.', { variant: 'error' })
    } finally {
      handleCloseDialog()
    }
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  if (!isMyListing(listing.userId)) {
    return <></>
  }

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="delete-listing-dialog-title"
        aria-describedby="delete-listing-dialog-description"
      >
        <DialogTitle id="delete-listing-dialog-title">{'Delete this listing'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-listing-dialog-description">
            Deleting this listing cannot be undone. If you only want to remove it from public view,
            you can disable it instead.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
